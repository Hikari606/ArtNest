// src/pages/AboutPage.jsx
import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] p-8 flex flex-col items-center">
      
      {/* العنوان */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#bf4b6a] drop-shadow-lg">
        About Art Nest
      </h1>

      {/* الوصف */}
      <p className="text-gray-700 max-w-2xl text-center text-lg mb-12">
      ART NEST is a cozy community for handmade artisans in Iraq. 
      The website brings together all Instagram pages and creations of local crafters in one place,
      allowing visitors to discover unique products, creative tools, and support talented makers.
      Our platform celebrates creativity, pastel colors, and the joyful spirit of handmade crafts.
      </p>
      {/* cards توضح مميزات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-[#bf4b6a] mb-2">Unique Products</h2>
          <p className="text-gray-600">Handmade items with love and creativity for your everyday joy.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-[#bf4b6a] mb-2">Support Creators</h2>
          <p className="text-gray-600">Empower artisans by choosing handmade and sustainable products.</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
          <h2 className="text-xl font-semibold text-[#bf4b6a] mb-2">Creative Community</h2>
          <p className="text-gray-600">Join a warm, playful space where art and pastel vibes thrive.</p>
        </div>
      </div>

      {/* Footer decoration */}
      <div className="mt-16 w-full flex justify-center">
        <span className="w-24 h-1 rounded-full bg-[#bf4b6a]/50 animate-pulse"></span>
      </div>
    </div>
  );
};

export default AboutPage;
