import React, { useEffect, useRef, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const mouse = useRef({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(y);
          ticking = false;
        });
        ticking = true;
      }
    };

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouse.current = { x: nx, y: ny };
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePos({ ...mouse.current });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const titleTranslate = Math.min(40, scrollY * 0.15);
  const blob1 = { tx: mousePos.x * 20 - scrollY * 0.01, ty: mousePos.y * 20 - scrollY * 0.01, scale: 1.05 };
  const blob2 = { tx: -mousePos.x * 15 - scrollY * 0.005, ty: -mousePos.y * 15 - scrollY * 0.005, scale: 0.95 };
  const blob3 = { tx: mousePos.x * 10 + 5, ty: -mousePos.y * 8 + 5, scale: 1.1 };

  const handleScrollToGallery = () => {
    const el = document.getElementById("gallery");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      aria-label="Hero — Art Nest"
      className="relative overflow-hidden rounded-b-3xl mb-8"
      style={{
        background: "linear-gradient(135deg, #fce1f3 0%, #e0f7fa 50%, #fef7d7 100%)",
        backgroundSize: "300% 300%",
        animation: "fullGradient 20s ease infinite",
      }}
    >
      {/* الخلفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          style={{
            transform: `translate(${blob1.tx}px, ${blob1.ty}px) scale(${blob1.scale})`,
            transition: "transform 300ms ease-out",
          }}
          className="absolute -left-28 -top-16 w-96 h-96 rounded-full blur-4xl bg-[#bde0fe]/40 mix-blend-multiply"
        />
        <div
          style={{
            transform: `translate(${blob2.tx}px, ${blob2.ty}px) scale(${blob2.scale})`,
            transition: "transform 400ms ease-out",
          }}
          className="absolute right-12 -top-12 w-80 h-80 rounded-[36%] blur-4xl bg-[#ffdbe6]/35 mix-blend-screen"
        />
        <div
          style={{
            transform: `translate(${blob3.tx}px, ${blob3.ty}px) scale(${blob3.scale})`,
            transition: "transform 350ms ease-out",
          }}
          className="absolute left-1/3 bottom-6 w-44 h-44 rounded-full blur-3xl bg-[#ffe6e0]/40 mix-blend-overlay"
        />
      </div>

      {/* النص */}
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-28 relative z-10">
        <div
          style={{
            transform: `translateY(-${titleTranslate}px)`,
            transition: "transform 300ms ease-out",
          }}
          className="space-y-4 md:pr-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Art Nest — Where Creativity Thrives
          </h1>
          <p className="text-gray-700 max-w-xl text-lg">
            Your online destination to discover and shop unique handmade creations, supporting talented artists and crafters from around the world
          </p>

          <div className="flex gap-3 items-center mt-6">
            <button
              onClick={handleScrollToGallery}
              className="inline-block px-6 py-3 rounded-full bg-white/80 text-[#bf4b6a] font-semibold shadow-md hover:scale-105 hover:shadow-lg transition transform"
            >
              Browse Gallery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
