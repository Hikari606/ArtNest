// src/pages/AddHandmadePage.jsx
import React, { useState } from "react";

const AddHandmadePage = () => {
  const [formData, setFormData] = useState({ name: "", description: "", link: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    alert("Item added successfully!");
    setFormData({ name: "", description: "", link: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fff7fb] via-[#ffe6e0] to-[#bde0fe] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 flex flex-col gap-4"
      >
        <h2 className="text-3xl font-bold text-[#bf4b6a] mb-4 text-center">
          Add Handmade Item
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bf4b6a] transition"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bf4b6a] transition resize-none"
          rows={4}
        />

        <input
          type="text"
          name="link"
          placeholder="Instagram Link"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#bf4b6a] transition"
        />

        <button
          type="submit"
          className="mt-2 bg-[#bf4b6a] text-white font-semibold py-3 rounded-xl hover:bg-[#d76b91] transition transform hover:-translate-y-1"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddHandmadePage;
