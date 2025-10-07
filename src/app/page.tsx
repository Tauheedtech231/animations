'use client'
import { useEffect, useState } from 'react'
import { gsap } from '../lib/gsap'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Projects from '@/components/Project'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    if (showIntro) {
      // Prevent scrolling during animation
      document.body.style.overflow = 'hidden'

      const masterTL = gsap.timeline({
        onComplete: () => {
          setShowIntro(false)
          document.body.style.overflow = 'auto'
        }
      })

      // Fast circle emergence - only 0.8 seconds
      masterTL.fromTo('.intro-center-circle',
        {
          scale: 0,
          opacity: 0
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out'
        }
      )

      // Quick glow effect - 0.3 seconds
      masterTL.to('.intro-center-circle', {
        scale: 1.05,
        boxShadow: '0 0 40px 15px rgba(59, 130, 246, 0.6)',
        duration: 0.3,
        ease: 'sine.inOut'
      })

      // Fast expansion - only 1 second
      masterTL.to('.intro-center-circle', {
        scale: 20,
        opacity: 0,
        boxShadow: '0 0 80px 30px rgba(59, 130, 246, 0.4)',
        duration: 1,
        ease: 'power2.inOut'
      })

      // Quick content reveal - 0.5 seconds with overlap
      masterTL.fromTo('.main-content',
        {
          opacity: 0,
          scale: 0.98
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out'
        },
        '-=0.5' // Overlap with circle expansion
      )
    }

    return () => {
      if (showIntro) {
        document.body.style.overflow = 'auto'
      }
    }
  }, [showIntro])

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* Fast Intro Animation */}
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          {/* Simple Center Circle */}
          <div className="intro-center-circle w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transform-gpu"></div>
        </div>
      )}

      {/* Main Content - Always rendered but hidden during intro */}
      <div className={`main-content ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Testimonials />
        <Contact />
        <Footer />
      </div>

      {/* Optimized Global Styles */}
      <style jsx global>{`
        /* Simple and fast animations */
        .main-content {
          transition: opacity 0.3s ease-out;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          .intro-center-circle {
            width: 16vw;
            height: 16vw;
          }
        }
      `}</style>
    </main>
  )
}