import React from "react";
import { useNavigate } from "react-router-dom";
import { imageData } from "../data/imageData";

export default function GalleryPage() {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/stores?category=${category}`);
  };

  return (
    <section id="gallery" className="mb-8 mt-12 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Our Handmade Gallery
      </h2>

      {/* شبكة الصور */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {imageData.map((img) => (
          <div
            key={img.id}
            onClick={() => handleClick(img.category)}
            className="cursor-pointer rounded-lg overflow-hidden shadow hover:scale-105 transition-transform bg-white"
          >
            <img
              src={img.src}
              alt={img.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-center">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {img.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
