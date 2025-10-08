import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BlogPage = () => {
  const sliderSectionRef = useRef<HTMLDivElement>(null);
  const firstLayerRef = useRef<HTMLDivElement>(null);
  const secondLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sliderSectionRef.current || !firstLayerRef.current || !secondLayerRef.current) return;

    // First layer (background) slides to the left
    gsap.to(firstLayerRef.current, {
      x: '-30%',
      ease: 'none',
      scrollTrigger: {
        trigger: sliderSectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    // Second layer (foreground) slides to the right
    gsap.to(secondLayerRef.current, {
      x: '20%',
      ease: 'none',
      scrollTrigger: {
        trigger: sliderSectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const sliderImages = [
    {
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      alt: 'Modern Living Room'
    },
    {
      url: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1200&q=80',
      alt: 'Contemporary Interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
      alt: 'Luxury Bedroom'
    },
    {
      url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Architectural Design'
    },
    {
      url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      alt: 'Minimalist Space'
    },
  ];

  const blogs = [
    {
      title: 'Power Tools',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      category: 'Construction',
      description: 'Explore the latest innovations in power tools that redefine efficiency and durability for construction professionals.',
    },
    {
      title: 'Electrical & Lighting',
      image: 'https://images.unsplash.com/photo-1598300056390-4c8879f1d3d9?auto=format&fit=crop&w=800&q=80',
      category: 'Interior Design',
      description: 'Modern lighting solutions that combine energy efficiency with stunning aesthetics for any interior space.',
    },
    {
      title: 'Accessories',
      image: 'https://images.unsplash.com/photo-1618220179428-22790b8615e3?auto=format&fit=crop&w=800&q=80',
      category: 'Home Decor',
      description: 'Discover premium accessories that add a refined touch to your home or office interiors with contemporary style.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white pb-20 transition-colors duration-300">
      {/* Two-Layer Image Slider Section */}
     

      {/* Blog Content Section */}
      <section className="relative z-30 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center py-16">
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-yellow-600 dark:bg-yellow-500 rounded-full" />
              <span className="text-sm font-medium border px-6 py-2 rounded-full shadow-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                STRAIGHT FROM THE NEWSROOM
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Take A Look At <span className="text-yellow-600 dark:text-yellow-500">Our Latest</span>{' '}
              <span className="text-yellow-600 dark:text-yellow-500">Blog</span> & Articles
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Stay updated with the latest trends, insights, and innovations in interior design and architecture.
            </p>
          </div>

          {/* Blog Cards */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white dark:bg-gray-700 hover:-translate-y-2 border border-gray-100 dark:border-gray-600"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={800}
                    height={500}
                    className="object-cover w-full h-60 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                    {blog.title}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/20 transition-all duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 px-3 py-1 rounded-full">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-yellow-700 dark:group-hover:text-yellow-400 transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{blog.description}</p>
                  <div className="inline-flex items-center text-yellow-600 dark:text-yellow-400 font-semibold transition-all duration-300 group-hover:gap-3 gap-2">
                    Read More
                    <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          <section 
        ref={sliderSectionRef}
        className="relative h-screen overflow-hidden bg-gray-900 dark:bg-black"
      >
        {/* First Layer - Background (Slides Left) */}
        <div 
          ref={firstLayerRef}
          className="absolute inset-0 flex opacity-40 dark:opacity-30"
        >
          {sliderImages.map((image, index) => (
            <div 
              key={`first-${index}`}
              className="relative min-w-[60vw] md:min-w-[40vw] h-full flex-shrink-0"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 40vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 dark:from-black/70 dark:to-black/70" />
            </div>
          ))}
          {/* Duplicate images for seamless loop */}
          {sliderImages.map((image, index) => (
            <div 
              key={`first-dup-${index}`}
              className="relative min-w-[60vw] md:min-w-[40vw] h-full flex-shrink-0"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 dark:from-black/70 dark:to-black/70" />
            </div>
          ))}
        </div>

        {/* Second Layer - Foreground (Slides Right) - Positioned 10rem lower */}
        <div 
          ref={secondLayerRef}
          className="absolute inset-0 flex items-start justify-center z-10 pt-40" // pt-40 adds 10rem top padding
        >
          {sliderImages.map((image, index) => (
            <div 
              key={`second-${index}`}
              className="relative min-w-[50vw] md:min-w-[35vw] h-[50vh] flex-shrink-0 mx-2 md:mx-6 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-white/10"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 dark:via-black/20 dark:to-black/60" />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-lg md:text-xl font-bold mb-2">{image.alt}</h3>
                <div className="w-12 h-1 bg-yellow-500 rounded-full mb-3"></div>
                <p className="text-sm text-white/80 dark:text-white/70">Modern Interior Design</p>
              </div>
            </div>
          ))}
          {/* Duplicate images for seamless loop */}
          {sliderImages.map((image, index) => (
            <div 
              key={`second-dup-${index}`}
              className="relative min-w-[50vw] md:min-w-[35vw] h-[50vh] flex-shrink-0 mx-2 md:mx-6 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-white/10"
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 35vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40 dark:via-black/20 dark:to-black/60" />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-lg md:text-xl font-bold mb-2">{image.alt}</h3>
                <div className="w-12 h-1 bg-yellow-500 rounded-full mb-3"></div>
                <p className="text-sm text-white/80 dark:text-white/70">Modern Interior Design</p>
              </div>
            </div>
          ))}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 dark:from-black/40 dark:to-black/50 z-15 pointer-events-none"></div>
      </section>
      </section>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-5 bg-gradient-to-br from-gray-900 via-transparent to-gray-900 dark:from-gray-100 dark:to-gray-100 pointer-events-none"></div>
    </div>
  );
};

export default BlogPage;