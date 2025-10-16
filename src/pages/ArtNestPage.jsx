import React from "react";
import { imageData } from "../data/imageData";
import ImageCard from "../components/ImageCard";

export default function ArtNestPage() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {imageData.map((img) => (
        <ImageCard key={img.id} img={img} />
      ))}
    </div>
  );
}
