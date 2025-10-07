// components/About.tsx
'use client'
import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { motion } from 'framer-motion'

export default function About() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const statsRef = useRef(null)
  const searchRef = useRef(null)

  // Ripple effect state
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number; size: number }>>([])
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Detect system dark mode preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Enhanced ripple effect with better physics
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

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 1000)
  }

  // Enhanced scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation with better timing
      gsap.fromTo(contentRef.current,
        { 
          x: -80, 
          opacity: 0,
          rotationY: -5
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Image animation with parallax effect
      gsap.fromTo(imageRef.current,
        { 
          x: 80, 
          opacity: 0, 
          scale: 0.92,
          rotationY: 5
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Stats animation with stagger
      gsap.fromTo('.stat-item',
        { 
          y: 60, 
          opacity: 0,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Feature items animation
      gsap.fromTo('.feature-item',
        { 
          x: -40, 
          opacity: 0 
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.feature-item',
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )

      // Search bar animation
      gsap.fromTo(searchRef.current,
        { 
          y: 40, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: 0.6,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: searchRef.current,
            start: "top 95%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      title: "Latest Technologies",
      subtitle: "High-Quality Designs",
      icon: "✓",
      description: "Cutting-edge tools and innovative approaches"
    },
    {
      title: "5 Years Warranty",
      subtitle: "Residential Design",
      icon: "✓",
      description: "Long-term commitment to quality and satisfaction"
    }
  ]

  const stats = [
    { number: "150+", label: "Projects Completed", suffix: "" },
    { number: "15+", label: "Years Experience", suffix: "" },
    { number: "50+", label: "Awards Won", suffix: "" },
    { number: "98", label: "Client Satisfaction", suffix: "%" }
  ]

  // Dark mode classes
  const darkModeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-white',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textMuted: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    card: isDarkMode ? 'bg-gray-800' : 'bg-light-gray',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-300',
    hover: isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
  }

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className={`py-20 ${darkModeClasses.background} transition-colors duration-500`}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 className={`font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${darkModeClasses.text}`}>
                Where Spaces Inspire,<br />
                <span className="text-gold">And Design Comes Alive</span>
              </h2>
              
              {/* Dark mode indicator */}
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isDarkMode ? 'bg-green-400' : 'bg-blue-400'}`}></div>
                <span className={darkModeClasses.textMuted}>
                  {isDarkMode ? 'Dark mode' : 'Light mode'} • System preference
                </span>
              </div>
            </motion.div>

            {/* Features List */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="feature-item group cursor-pointer"
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div 
                    className={`flex items-start space-x-4 p-4 rounded-2xl transition-all duration-300 ${darkModeClasses.hover} ${darkModeClasses.card} border ${darkModeClasses.border}`}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="flex-shrink-0 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    >
                      {feature.icon}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className={`font-playfair text-xl font-bold mb-1 group-hover:text-gold transition-colors ${darkModeClasses.text}`}>
                        {feature.title}
                      </h3>
                      <p className={`font-semibold mb-1 ${darkModeClasses.text}`}>{feature.subtitle}</p>
                      <p className={`text-sm ${darkModeClasses.textMuted}`}>{feature.description}</p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="w-2 h-2 bg-gold rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`p-6 rounded-2xl border-l-4 border-gold ${darkModeClasses.card} shadow-lg`}
            >
              <p className={`text-lg leading-relaxed ${darkModeClasses.text}`}>
                Whether it is your home, office, or a commercial project, we are always dedicated to bringing your vision to life. Our numbers speak better than words:
              </p>
            </motion.div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item group"
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                >
                  <div 
                    className={`text-center p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 group-hover:shadow-xl ${darkModeClasses.card} ${darkModeClasses.hover} border ${darkModeClasses.border}`}
                  >
                    <div className="font-playfair text-2xl md:text-3xl font-bold text-gold mb-2">
                      {stat.number}<span className="text-sm">{stat.suffix}</span>
                    </div>
                    <div className={`text-sm font-medium ${darkModeClasses.textMuted} group-hover:text-gold transition-colors`}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

         
          </div>

          {/* Image Section */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[600px] rounded-3xl overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Architecture Design"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                priority
              />
              
              {/* Dynamic overlay based on dark mode */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                isDarkMode ? 'bg-gradient-to-br from-gray-900/40 to-transparent' : 'bg-gradient-to-br from-white/20 to-transparent'
              }`}></div>
              
              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className={`absolute bottom-6 left-6 backdrop-blur-md p-4 rounded-xl shadow-2xl border ${
                  isDarkMode ? 'bg-gray-800/90 border-gray-700 text-white' : 'bg-white/90 border-white/20'
                }`}
              >
                <h4 className="font-playfair text-lg font-bold">Modern Design</h4>
                <p className="text-sm text-gold">Architecture & Interior</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute top-6 right-6 bg-gold text-white p-4 rounded-full shadow-2xl"
              >
                <span className="text-sm font-bold block">15+ Years</span>
                <span className="text-xs">Experience</span>
              </motion.div>
            </div>

            {/* Background decorative elements */}
            <motion.div
              animate={{ 
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold rounded-2xl -z-10 opacity-20"
            />
            <motion.div
              animate={{ 
                rotate: [0, -5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className={`absolute -top-6 -left-6 w-24 h-24 rounded-full -z-10 opacity-50 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            />
          </motion.div>
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { icon: "🎯", title: "Visionary Approach", desc: "Pushing boundaries with innovative design solutions" },
            { icon: "⚡", title: "Fast Execution", desc: "Efficient project delivery without compromising quality" },
            { icon: "💎", title: "Premium Quality", desc: "Using finest materials and craftsmanship" }
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
              className={`p-8 rounded-2xl text-center cursor-pointer border transition-all duration-300 ${darkModeClasses.card} ${darkModeClasses.border} ${darkModeClasses.hover}`}
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-gold rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-lg"
              >
                {item.icon}
              </motion.div>
              <h3 className={`font-playfair text-2xl font-bold mb-4 ${darkModeClasses.text}`}>
                {item.title}
              </h3>
              <p className={darkModeClasses.textMuted}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}