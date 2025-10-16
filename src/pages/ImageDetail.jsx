import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ImageDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useCart();

  const passedImage = location.state?.image;

  const fallbackImage = {
    id,
    src: "https://via.placeholder.com/600x400?text=No+Image",
    name: `Item ${id || "unknown"}`,
    description: "No detailed description available.",
  };

  const image = passedImage || fallbackImage;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <img src={image.src} alt={image.name} className="max-w-md rounded mb-4" />
      <h2 className="text-2xl font-bold mb-2">{image.name}</h2>
      <p className="text-gray-700 mb-4">{image.description}</p>
      <button
        onClick={() => addToCart({ ...image, id: image.id || id })}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ImageDetail;
