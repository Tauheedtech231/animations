// components/HeroSection.tsx
'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap } from '../lib/gsap'

export default function HeroSection() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  
  const heroRef = useRef(null)
  const smallHeadingRef = useRef(null)
  const mainHeadingRef = useRef(null)
  const subheadingRef = useRef(null)
  const bgRefs = useRef<(HTMLDivElement | null)[]>([])

  // High-quality, calming interior design images
  const backgroundImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
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

  // Background image rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text animations with smooth staggered entrance
      const tl = gsap.timeline()

      tl.fromTo(smallHeadingRef.current,
        {
          y: 40,
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out"
        }
      )
      .fromTo(mainHeadingRef.current,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out"
        },
        "-=0.6"
      )
      .fromTo(subheadingRef.current,
        {
          y: 30,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out"
        },
        "-=0.4"
      )

      // Background parallax effect on scroll
      if (bgRefs.current[currentBgIndex]) {
        gsap.to(bgRefs.current[currentBgIndex], {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  // Background transition animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      bgRefs.current.forEach((bg, index) => {
        if (bg) {
          gsap.to(bg, {
            opacity: index === currentBgIndex ? 1 : 0,
            duration: 1.5,
            ease: "power2.inOut"
          })
        }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [currentBgIndex])

  // Ripple effect for interactive elements
  const createRipple = (e: React.MouseEvent) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const size = Math.max(rect.width, rect.height)

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }

    setRipples(prev => [...prev, newRipple])
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 800)
  }

  const addToBgRefs = (el: HTMLDivElement | null) => {
    if (el && !bgRefs.current.includes(el)) {
      bgRefs.current.push(el)
    }
  }

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images with Smooth Transitions */}
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          ref={addToBgRefs}
          className={`absolute inset-0 transition-opacity duration-1500 ${
            index === currentBgIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={image}
            alt={`Interior Design ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
          {/* Adaptive Overlay */}
          <div className={`absolute inset-0 ${
            isDarkMode ? 'bg-black/40' : 'bg-black/25'
          } transition-colors duration-500`}></div>
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Small Heading */}
        <div ref={smallHeadingRef} className="mb-6">
          <div className="inline-flex items-center space-x-3 px-4 py-2 rounded-full backdrop-blur-sm bg-white/10 border border-white/20">
            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
            <span className="text-white/90 text-sm font-medium tracking-wider">
              Fast and Reliable
            </span>
            <div className="w-1.5 h-1.5 bg-gold rounded-full"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 
          ref={mainHeadingRef}
          className="font-playfair text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
        >
          The Art of{' '}
          <span className="text-gold">Stunning</span>
          <br />
          Interior Design
        </h1>

        {/* Subtitle */}
        <p 
          ref={subheadingRef}
          className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Creating spaces that inspire and transform. Professional design solutions 
          tailored to elevate your environment with elegance and precision.
        </p>

        {/* CTA Button with Ripple Effect */}
        <div className="flex justify-center">
          <button
            onClick={createRipple}
            className="relative overflow-hidden bg-gold text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300"
          >
          
            
            {/* Ripple Effects */}
            {ripples.map(ripple => (
              <div
                key={ripple.id}
                className="absolute bg-white/30 rounded-full animate-ripple"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Background Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-3">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBgIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentBgIndex 
                  ? 'bg-gold scale-125' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dark Mode Indicator */}
   

      {/* Scroll Indicator */}
    

      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.8s ease-out;
        }
      `}</style>
    </section>
  )
}