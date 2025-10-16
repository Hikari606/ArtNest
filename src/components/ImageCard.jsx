import React from "react";
import { useCart } from "../context/CartContext";

export default function ImageCard({ img }) {
  const { addToCart } = useCart();

  return (
    <div className="rounded shadow overflow-hidden hover:shadow-lg transition cursor-pointer">
      <img src={img.src} alt={img.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h2 className="font-bold">{img.name}</h2>
        <p className="text-sm text-gray-500">{img.description}</p>
        <p className="text-lg font-semibold mt-2">${img.price}</p>
        <button onClick={() => addToCart(img)} className="mt-2 w-full bg-pink-600 text-white py-1 rounded hover:bg-pink-500 transition">Add to Cart</button>
      </div>
    </div>
  );
}
