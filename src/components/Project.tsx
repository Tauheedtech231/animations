"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from 'swiper';
import Image from "next/image";
import { ArrowRight, ArrowLeft, Eye } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".projects-description", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".swiper-slide", {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".swiper", start: "top 80%" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Modern Villa Design",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Luxury Apartment",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1600585154361-9f24a931c7e6?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Contemporary House",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 4,
      title: "Minimalist Home",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1598300053656-6d5c1a1bfa3d?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 5,
      title: "Urban Residence",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 6,
      title: "Family House",
      category: "Residential",
      img: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-white dark:bg-gray-950 py-24 lg:py-32 overflow-hidden transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="projects-heading">
            <div className="inline-flex items-center gap-2 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-400/30 text-yellow-700 dark:text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              OUR Projects
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
              Creative{" "}
              <span className="text-transparent bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text">
                Projects That
              </span>{" "}
              Define Our Style
            </h2>
          </div>

          <p className="projects-description mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Discover our diverse portfolio of beautifully crafted spaces — from
            stunning residential designs to innovative commercial interiors that
            inspire and transform.
          </p>
        </div>

        {/* Swiper Section */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4 mb-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="group w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="group w-12 h-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors" />
            </button>
          </div>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={24}
            slidesPerView={1.1}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".custom-pagination",
              bulletClass: "custom-bullet",
              bulletActiveClass: "custom-bullet-active",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              640: { slidesPerView: 1.2, spaceBetween: 20 },
              768: { slidesPerView: 2.2, spaceBetween: 24 },
              1024: { slidesPerView: 3.1, spaceBetween: 28 },
              1280: { slidesPerView: 3.3, spaceBetween: 32 },
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 brightness-[0.95] dark:brightness-[0.8]"
                    />

                    {/* Overlay with View Text */}
                    <div className="absolute inset-0 bg-black/50 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center">
                      <Eye className="w-10 h-10 text-white mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500" />
                      <span className="text-white text-xl font-semibold tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                        View Project
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/40 dark:border-gray-700 px-4 py-2 rounded-full text-gray-800 dark:text-gray-100 font-semibold text-sm shadow-lg">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {project.category}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Pagination */}
          <div className="custom-pagination flex justify-center gap-2 mt-8"></div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-yellow-500/30 transition-all duration-500 hover:scale-105">
            <span className="relative z-10 flex items-center gap-3">
              View All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-bullet {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          border-radius: 50%;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .custom-bullet-active {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          transform: scale(1.2);
        }
        :global(.dark .custom-bullet) {
          background: #4b5563;
        }
        :global(.dark .custom-bullet-active) {
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
        }
      `}</style>
    </section>
  );
}
