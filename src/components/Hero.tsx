// app/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// High-quality interior design background images from Unsplash
const backgroundImages = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2153&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2200&q=80',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2200&q=80',
];

export default function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Background image rotation with pause on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered]);

  // GSAP entrance animations
  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate main heading
    tl.fromTo('.main-heading', 
      {
        y: 80,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Animate description text
    tl.fromTo('.description-text', 
      {
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
      },
      "-=0.5"
    );

    // Animate buttons with stagger
    tl.fromTo('.button-item', 
      {
        y: 30,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    );
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Images with Framer Motion Transitions */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
              backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </AnimatePresence>
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl w-full text-center">
          {/* Main Heading */}
          <h1 className="main-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            The Art of Stunning<br />
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Interior Design
            </span>
          </h1>

          {/* Description */}
          <p className="description-text text-white text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto mb-12 leading-relaxed opacity-95">
            Whether it is your home, office, or a commercial project, we are always dedicated to bringing your vision to life.
          </p>

          {/* Buttons */}
<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
  {/* Take Counsel Button */}
  <button className="relative flex items-center gap-3 bg-white text-gray-900 px-8 sm:px-10 py-4 sm:py-5 rounded-lg font-bold text-lg sm:text-xl transition-all duration-500 transform hover:scale-95 shadow-2xl group overflow-hidden">
    <span className="relative z-10 transition-all duration-500 group-hover:text-white">
      Take Counsel
    </span>

    {/* Always showing "Nice ↗" */}
    <span className="relative z-10 flex items-center gap-2 text-green-600 font-semibold text-base sm:text-lg transition-all duration-500 group-hover:text-white">
     
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:rotate-45"
      >
        {/* by default diagonal ↗ (rotated -45deg), hover → */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14M12 5l7 7-7 7"
          transform="rotate(-45 12 12)"
        />
      </svg>
    </span>

    {/* Gold hover background */}
    <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600"></span>
  </button>

  {/* Green Button with gold hover */}

</div>




        </div>
      </div>

      {/* Background Indicator Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}