import React from "react";
import Hero from "../components/Hero";
import GalleryPage from "./GalleryPage";

export default function HomePage() {
  return (
    <div className="bg-[#faf8f8] min-h-screen">
      <Hero />
      <GalleryPage />
    </div>
  );
}
