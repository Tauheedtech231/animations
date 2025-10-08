"use client";

import React, { useEffect, useState } from "react";
import { Building2, Ruler, Palette, Home, Landmark } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Building = () => {
  const [isDark, setIsDark] = useState(false);

  // Detect system dark mode
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const logos = [
    { icon: <Building2 className="w-6 h-6" />, title: "BUILDING", subtitle: "CONSTRUCTION" },
    { icon: <Ruler className="w-6 h-6" />, title: "ARCHITECT", subtitle: "REAL ESTATE" },
    { icon: <Palette className="w-6 h-6" />, title: "TREND", subtitle: "INTERIORS" },
    { icon: <Home className="w-6 h-6" />, title: "INTERIOR", subtitle: "PREMIUM" },
    { icon: <Landmark className="w-6 h-6" />, title: "STRUCTURE", subtitle: "DESIGN" },
  ];

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      } overflow-hidden`}
    >
      {/* Header */}
      <header
        className={`text-center py-6 border-b sticky top-0 z-20 backdrop-blur-md transition-all duration-500 ${
          isDark
            ? "bg-gray-900/70 border-gray-700"
            : "bg-white/70 border-gray-200"
        }`}
      >
        <h2 className="text-lg font-semibold">
          Our Website{" "}
          <span className="text-yellow-500 font-bold">75,000+</span> VIP Customers
        </h2>
      </header>

      {/* Smooth Scrolling Swiper */}
      <section className="py-12">
        <Swiper
          slidesPerView={2}
          spaceBetween={40}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          loop
          speed={9000} // slower smooth movement
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          modules={[Autoplay]}
          className="flex items-center justify-center select-none"
        >
          {[...logos, ...logos, ...logos].map((item, i) => (
            <SwiperSlide key={i}>
              <div className="text-center group transition-transform duration-300 hover:scale-105">
                <div
                  className={`w-16 h-16 border flex items-center justify-center mx-auto mb-3 rounded-lg shadow-md transition-all duration-300 ${
                    isDark
                      ? "border-gray-700 bg-gray-800 group-hover:border-yellow-500"
                      : "border-gray-300 bg-white group-hover:border-yellow-500"
                  }`}
                >
                  <span className="text-yellow-500">{item.icon}</span>
                </div>
                <h3
                  className={`font-semibold tracking-wide transition-colors ${
                    isDark ? "text-gray-200" : "text-gray-800"
                  } group-hover:text-yellow-500`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm ${
                    isDark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Divider Label */}
      <div className="flex justify-center items-center gap-3 mt-8">
        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
        <span
          className={`text-sm font-medium border px-4 py-1 rounded-full shadow-sm transition-all duration-500 ${
            isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
          }`}
        >
          360-DEGREE PANORAMAS
        </span>
      </div>

      {/* Headings */}
      <main className="text-center mt-12 px-4 relative z-10">
        <h1 className="text-5xl font-extrabold leading-tight">
          Create An Even{" "}
          <span className="text-yellow-500">Greater</span>
        </h1>
        <h1 className="text-5xl font-extrabold text-yellow-500 mt-2">
          Experience
        </h1>
      </main>

      {/* Subtle Background */}
      <div
        className={`absolute top-0 left-0 w-full h-full -z-10 opacity-10 transition-all duration-500 ${
          isDark
            ? "bg-[url('/building-bg-dark.png')]"
            : "bg-[url('/building-bg.png')]"
        } bg-cover bg-center`}
      ></div>
    </div>
  );
};

export default Building;
