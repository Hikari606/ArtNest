import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.length;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // تحديث موقع الماوس بالنسبة للعنصر
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10; // حركة أفقية
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;  // حركة عمودية
    setMousePos({ x, y });
  };
  const transformStyle = {
    transform: `translate(${mousePos.x}px, ${mousePos.y}px) rotate(${mousePos.x}deg)`,
    transition: "transform 0.1s ease-out",
  };
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-3 no-underline"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
        >
          {/* أيقونة AN حيوية */}
          <div
            style={transformStyle}
            className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#ffdbe6] via-[#bde0fe] to-[#d0f0c0] flex items-center justify-center text-white font-extrabold shadow-lg cursor-pointer"
          >
            AN
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-800">Art Nest</h1>
            <p className="text-xs text-gray-500">Handmade & cozy</p>
          </div>
        </Link>
        {/* Navigation */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            to="/"
            className="relative px-4 py-2 rounded-lg hover:shadow-lg hover:bg-[#ffe6e0]/50 transition-all duration-200 text-gray-700 font-medium"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="relative px-4 py-2 rounded-lg hover:shadow-lg hover:bg-[#bde0fe]/50 transition-all duration-200 text-gray-700 font-medium"
          >
            Profile
          </Link>
          <Link
            to="/add-handmade"
            className="relative px-4 py-2 rounded-lg hover:shadow-lg hover:bg-[#d0f0c0]/50 transition-all duration-200 text-gray-700 font-medium"
          >
            Add Handmade
          </Link>
          <Link
            to="/about"
            className="relative px-4 py-2 rounded-lg hover:shadow-lg hover:bg-[#ffdbe6]/50 transition-all duration-200 text-gray-700 font-medium"
          >
            About
          </Link>
          <Link
            to="/stores"
            className="relative px-4 py-2 rounded-lg hover:shadow-lg hover:bg-[#ffe6e0]/50 transition-all duration-200 text-gray-700 font-medium"
          >
            Stores
          </Link>
          <Link
            to="/cart"
            className="relative px-4 py-2 rounded-lg hover:shadow-lg hover:bg-[#ffdbe6]/50 transition-all duration-200 text-gray-700 font-medium"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#bf4b6a] text-white rounded-full text-xs px-2 py-0.5">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
