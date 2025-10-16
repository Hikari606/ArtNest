// src/components/Hero.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = heroRef.current.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 30,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 30,
    });
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen flex items-center justify-center bg-gradient-to-b from-pink-200 to-blue-200 overflow-hidden"
    >
      <div
        className="text-center text-gray-900 z-10 transform transition-transform duration-200"
        style={{
          transform: `translateX(${offset.x}px) translateY(${offset.y}px)`,
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4">Welcome to Art Nest</h1>
        <p className="text-xl mb-6">Discover handmade art & crafts</p>
        <Link to="/gallery" className="px-6 py-3 bg-pink-400 text-white rounded shadow hover:bg-pink-500">
          Explore Gallery
        </Link>
      </div>
    </section>
  );
}
