"use client";

import Image from "next/image";

export default function ProcessSection() {
  const processSteps = [
    {
      id: "01",
      title: "Initial Consultation",
      desc: "We begin by understanding your vision, goals, and needs, building a foundation for success.",
      img: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "02",
      title: "Design & Planning",
      desc: "Our expert team crafts detailed plans that blend functionality and creativity seamlessly.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "03",
      title: "Implementation",
      desc: "Using premium materials and precise craftsmanship, we turn your ideas into living spaces.",
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "04",
      title: "Project Handover",
      desc: "After thorough quality checks, we deliver a flawless space — ready for you to enjoy.",
      img: "https://images.unsplash.com/photo-1596075780750-81249df16d5e?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <div className="text-center lg:text-left flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-gray-100">
              A{" "}
              <span className="text-yellow-600 dark:text-yellow-400">
                Seamless Process
              </span>{" "}
              For{" "}
              <span className="text-black dark:text-white">
                Exceptional Results.
              </span>
            </h2>
          </div>
          <div className="max-w-lg text-gray-600 dark:text-gray-300 text-lg">
            <p>
              Our process evolves — adapting, refining, and growing with your
              vision.
            </p>
            <p className="mt-3">
              Like artists with a blank canvas, we transform rooms into living
              works of art.
            </p>
          </div>
        </div>

        {/* Staircase Layout */}
        <div className="mt-20 flex flex-col md:flex-row items-center md:items-start justify-center md:space-x-6 relative">
          {processSteps.map((step, index) => (
            <div
              key={step.id}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 w-full md:w-1/4 ${
                index === 1
                  ? "md:mt-12"
                  : index === 2
                  ? "md:mt-24"
                  : index === 3
                  ? "md:mt-36"
                  : ""
              }`}
            >
              {/* Image */}
              <div className="relative w-full h-56">
                <Image
                  src={step.img}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  <span className="text-yellow-600 dark:text-yellow-400 mr-1">
                    {step.id}.
                  </span>{" "}
                  {step.title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {step.desc}
                </p>
                <div className="text-5xl font-extrabold text-gray-100 dark:text-gray-800 text-right -mt-6 select-none">
                  {step.id}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <button className="px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 bg-yellow-600 text-white hover:bg-yellow-700">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
