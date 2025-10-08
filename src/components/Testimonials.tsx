"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const images = [
    "https://images.unsplash.com/photo-1581090465901-b6b67e809fef?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto slide images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // GSAP fade-in animation on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-content", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="transition-colors duration-500 bg-gray-50 dark:bg-neutral-900 py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div className="testimonial-content text-center lg:text-left mb-12">
          <span className="text-yellow-600 font-semibold uppercase tracking-wide">
            ● Our Clients Say
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2 text-gray-900 dark:text-white">
            Here’s What{" "}
            <span className="text-yellow-600">Warm Words</span>{" "}
            <span className="text-gray-900 dark:text-gray-100">
              Our Clients Say
            </span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="testimonial-content grid lg:grid-cols-2 gap-10 items-center">
          {/* Image Slider */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl h-[400px]">
            <Image
              src={images[currentImage]}
              alt="Client project site"
              fill
              className="object-cover w-full h-full transition-all duration-700 ease-in-out"
            />

            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentImage === index
                      ? "bg-yellow-500 scale-110"
                      : "bg-white/50 dark:bg-gray-600"
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Text Content */}
          <div>
            <div className="flex items-center gap-2 text-5xl font-extrabold text-gray-900 dark:text-white">
              4.80
              <span className="text-yellow-500 text-2xl">★★★★★</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              2,688 reviews
            </p>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 leading-snug">
              “From Concept To Reality, The Team Turned My Vision Into A Stunning,
              Livable Space. Couldn’t Be Happier With This!”
            </h3>

            <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
              “I absolutely love my new modern living room! The clean lines, neutral
              tones, and minimalist interior create such a calming & stylish
              atmosphere. Highly recommend their modern interior design services!”
            </p>

            {/* Client Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Client photo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                  Morgan Dufresne
                </h4>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  Company Owner
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
