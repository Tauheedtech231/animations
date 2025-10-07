// components/ServicesSection.tsx
'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Services() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const descriptionRef = useRef(null)
  const servicesRef = useRef<(HTMLDivElement | null)[]>([])

  // Services data
  const services = [
    {
      title: "Residential Interior Design",
      description: "Transform your living spaces into personalized sanctuaries that reflect your style and enhance your daily life.",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "🏠"
    },
    {
      title: "Outdoor & Landscape Design",
      description: "Create seamless indoor-outdoor transitions with beautifully designed landscapes and exterior living areas.",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "🌳"
    },
    {
      title: "Interior Design Consultation",
      description: "Expert guidance and creative solutions to bring your vision to life with professional design expertise.",
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "💡"
    },
    {
      title: "Commercial Interior Design",
      description: "Design innovative workspaces that inspire productivity, collaboration, and reflect your brand identity.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "🏢"
    },
    {
      title: "Renovation and Remodeling",
      description: "Breathe new life into existing spaces with thoughtful renovations that maximize functionality and aesthetics.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "🔨"
    },
    {
      title: "Interior 2D/3D Layouts",
      description: "Visualize your space before construction with detailed 2D plans and immersive 3D renderings.",
      image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      icon: "📐"
    }
  ]

  // Detect system dark mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        {
          y: 80,
          opacity: 0,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Description animation
      gsap.fromTo(descriptionRef.current,
        {
          y: 50,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Services grid animation with stagger
      servicesRef.current.forEach((service, index) => {
        if (!service) return

        gsap.fromTo(service,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
            rotationY: 10
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            delay: index * 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: service,
              start: "top 90%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        )

        // 3D hover effect
        const image = service.querySelector('.service-image')
        const content = service.querySelector('.service-content')
        
        service.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.1,
            rotationY: 5,
            rotationX: 5,
            duration: 0.8,
            ease: "power2.out"
          })
          gsap.to(content, {
            y: -10,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out"
          })
        })

        service.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power2.out"
          })
          gsap.to(content, {
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          })
        })
      })

      // Parallax effect for service images
      servicesRef.current.forEach((service) => {
        if (!service) return
        
        const image = service.querySelector('.service-image')
        gsap.to(image, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: service,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToServicesRefs = (el: HTMLDivElement | null) => {
    if (el && !servicesRef.current.includes(el)) {
      servicesRef.current.push(el)
    }
  }

  const darkModeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    card: isDarkMode ? 'bg-gray-800/80' : 'bg-white/80',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    hover: isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50/80'
  }

  return (
   <section 
  ref={sectionRef} 
  id="services" 
  className={`py-20 lg:py-32 transition-colors duration-500 ${darkModeClasses.background}`}
>
  <div className="container mx-auto px-6">
    {/* Section Header */}
    <div className="text-center mb-16 lg:mb-24">
      <div ref={headingRef} className="inline-block mb-4">
        <div className="flex items-center space-x-3 px-6 py-3 rounded-full backdrop-blur-sm bg-gold/10 border border-gold/20">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          <span className="text-amber-500 text-sm font-semibold tracking-widest uppercase">
            Our Services
          </span>
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
        </div>
      </div>

      <h2 
        ref={headingRef}
        className={`font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${darkModeClasses.text}`}
      >
        Premium Design{' '}
        <span className="text-amber-500">Services</span>
      </h2>

      <p 
        ref={descriptionRef}
        className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${darkModeClasses.textMuted}`}
      >
        We specialize in transforming visions into reality. Explore our portfolio of innovative 
        architectural and interior design projects crafted with precision.
      </p>
    </div>

    {/* Services Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <div
          key={index}
          ref={addToServicesRefs}
          className={`group relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-500 cursor-pointer h-96 ${darkModeClasses.card} ${darkModeClasses.border} ${darkModeClasses.hover}`}
          style={{ perspective: '1000px' }}
        >
          {/* Background Image */}
          <div className="service-image absolute inset-0 transform-gpu transition-transform duration-700">
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isDarkMode ? 'from-gray-900/80 via-gray-900/40 to-transparent' : 'from-white/90 via-white/40 to-transparent'
            }`}></div>
          </div>

          {/* Content */}
          <div className="service-content absolute bottom-0 left-0 right-0 p-6 transform-gpu transition-transform duration-500">
            {/* Icon */}
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-white text-xl mb-4 transform-gpu group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>

            {/* Title (Golden) */}
            <h3 className={`font-playfair text-2xl font-bold mb-3 group-hover:text-amber-500 transition-colors duration-300 ${darkModeClasses.text}`}>
              {service.title}
            </h3>

            {/* Description */}
            <p className={`text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${darkModeClasses.textMuted}`}>
              {service.description}
            </p>

            {/* CTA Arrow */}
            <div className="flex items-center text-amber-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <span>Learn More</span>
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>

          {/* 3D Border Effect */}
          <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
            isDarkMode ? 'border-amber-500/30' : 'border-amber-500/20'
          }`}></div>

          {/* Hover Glow */}
          <div className="absolute inset-0 rounded-2xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
        </div>
      ))}
    </div>

    {/* Bottom CTA */}
    <div className="text-center mt-16">
      <button className={`group border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105`}>
        <span className="flex items-center space-x-2">
          <span>View All Services</span>
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </span>
      </button>
    </div>
  </div>

  {/* Background Decorative Elements */}
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl"></div>
  </div>
</section>

  )
}