"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [counts, setCounts] = useState({ projects: 0, team: 0, clients: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade-in animation for services
      gsap.from(".service-item", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });

      // Heading animation
      gsap.from(".heading", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
      });

      // Left image scroll animation
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    // Count-up animation
    const targets = { projects: 0, team: 0, clients: 0 };
    const interval = setInterval(() => {
      setCounts((prev) => ({
        projects: prev.projects < 190 ? prev.projects + 2 : 190,
        team: prev.team < 260 ? prev.team + 3 : 260,
        clients: prev.clients < 328 ? prev.clients + 4 : 328,
      }));
    }, 50);

    return () => {
      clearInterval(interval);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 transition-colors duration-300 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="heading flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="order-2 lg:order-1">
            <button className="relative group overflow-hidden px-6 py-2 text-sm font-semibold rounded-full border-2 border-yellow-600 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-600 dark:hover:bg-yellow-400 hover:text-white transition-all duration-500">
              <span className="relative z-10 flex items-center gap-2">
                Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>

          <div className="text-center lg:text-right order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Explore Our{" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                Comprehensive
              </span>{" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                Interior Design
              </span>{" "}
              <span className="text-black dark:text-white">Services</span>
            </h2>
            <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:ml-auto text-lg">
              We specialize in transforming visions into reality. Explore our
              portfolio of innovative architectural and interior design projects
              crafted with precision.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
              alt="Interior Design"
              fill
              className="object-cover"
            />
          </div>

          {/* Services List */}
          <div className="space-y-8">
            {[
              {
                id: "01",
                title: "Residential Interior Design",
              },
              {
                id: "02",
                title: "Outdoor & Landscape Design",
              },
              {
                id: "03",
                title: "Interior Design Consultation",
              },
            ].map((service) => (
              <div
                key={service.id}
                className="service-item flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-5 hover:translate-x-2 transition-transform duration-300"
              >
                <div>
                  <span className="text-gray-400 font-semibold text-lg">
                    {service.id}
                  </span>
                  <h3 className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="flex items-center justify-center bg-yellow-100 dark:bg-yellow-900/30 w-10 h-10 rounded-full">
                  <ArrowRight className="text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          <div>
            <h3 className="text-5xl font-extrabold text-yellow-600 dark:text-yellow-400">
              2013
            </h3>
            <p className="mt-3 text-lg font-medium">Improving Homes</p>
            <p className="text-gray-500 dark:text-gray-400">
              Expert craftsmanship improving homes for years.
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-extrabold text-yellow-600 dark:text-yellow-400">
              {counts.projects}+
            </h3>
            <p className="mt-3 text-lg font-medium">Projects Completed</p>
            <p className="text-gray-500 dark:text-gray-400">
              Over 250 successful projects delivered with care.
            </p>
          </div>

          <div>
            <h3 className="text-5xl font-extrabold text-yellow-600 dark:text-yellow-400">
              {counts.clients}+
            </h3>
            <p className="mt-3 text-lg font-medium">Client Satisfaction</p>
            <p className="text-gray-500 dark:text-gray-400">
              Every client satisfied with our design & service.
            </p>
          </div>
        </div>

        {/* Scrolling House Image Section */}
        <div
          ref={imageRef}
          className="mt-24 relative w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1920&q=80"
            alt="Luxury Modern House"
            fill
            className="object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
