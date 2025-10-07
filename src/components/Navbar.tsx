'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Detect system dark mode
  useEffect(() => {
    const matchDark = window.matchMedia('(prefers-color-scheme: dark)')
    setIsDarkMode(matchDark.matches)
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches)
    matchDark.addEventListener('change', handleChange)
    return () => matchDark.removeEventListener('change', handleChange)
  }, [])

  // Navbar colors
  const bgColor = isScrolled
    ? isDarkMode
      ? 'bg-gray-950/90 shadow-md backdrop-blur-md'
      : 'bg-white/90 shadow-md backdrop-blur-md'
    : 'bg-transparent'

  const textColor = isScrolled
    ? isDarkMode
      ? 'text-white'
      : 'text-gray-900'
    : 'text-white'

  // Golden animation variants
  const goldenButtonVariants: Variants = {
    initial: {
      scale: 1,
      background: "transparent",
      color: textColor,
      boxShadow: "0 0 0 0 rgba(234, 179, 8, 0)"
    },
    hover: {
      scale: 1.05,
      background: [
        "linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #f59e0b 100%)",
        "linear-gradient(135deg, #fbbf24 0%, #f59e0b 25%, #d97706 50%, #f59e0b 75%, #fbbf24 100%)"
      ],
      color: "#1f2937",
      boxShadow: [
        "0 0 0 0 rgba(234, 179, 8, 0.3)",
        "0 0 20px 5px rgba(234, 179, 8, 0.4)",
        "0 0 15px 3px rgba(234, 179, 8, 0.3)"
      ],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      } as Transition
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 } as Transition
    }
  }

  const shineVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    hover: {
      x: "100%",
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      } as Transition
    }
  }

  const floatingAnimation: { y: number[]; transition: Transition } = {
    y: [0, -3, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    } as Transition
  }

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${bgColor}`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo với animation nổi */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          animate={floatingAnimation}
          className="flex items-center space-x-2 cursor-pointer group"
        >
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg group-hover:shadow-yellow-500/25"
          />
          <motion.span
            className={`font-playfair text-2xl font-bold ${textColor} group-hover:text-yellow-500 transition-colors duration-300`}
          >
            Antra
          </motion.span>
        </motion.div>

        {/* Desktop Links với golden button animation */}
        <div className="hidden md:flex items-center space-x-1">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <motion.div
              key={item}
              className="relative"
              onHoverStart={() => setActiveLink(item)}
              onHoverEnd={() => setActiveLink('')}
            >
              <motion.a
                href={`#${item.toLowerCase()}`}
                variants={goldenButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="relative px-6 py-3 rounded-xl font-semibold tracking-wide overflow-hidden block"
                style={{
                  background: 'transparent',
                  color: textColor
                }}
              >
                {/* Shine effect */}
                <motion.div
                  variants={shineVariants}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12"
                />
                
                {/* Border glow */}
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    boxShadow: "0 0 30px 8px rgba(234, 179, 8, 0.3)",
                    transition: { duration: 0.4 }
                  }}
                />
                
                <span className="relative z-10">{item}</span>
              </motion.a>

              {/* Active indicator */}
              <AnimatePresence>
                {activeLink === item && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="md:hidden focus:outline-none text-yellow-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`md:hidden overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-white'} border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}
          >
            <div className="flex flex-col py-4 space-y-2 px-4">
              {['Home', 'About', 'Services', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="relative block text-center"
                    whileHover={{ 
                      scale: 1.02,
                      background: "linear-gradient(135deg, #fbbf24 0%, #d97706 50%, #f59e0b 100%)",
                      color: "#1f2937"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className={`py-4 rounded-xl font-semibold text-lg ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      } transition-all duration-300 border-2 border-transparent hover:border-yellow-500/30`}
                      whileHover={{
                        boxShadow: "0 0 25px 5px rgba(234, 179, 8, 0.3)"
                      }}
                    >
                      {/* Mobile shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 opacity-0"
                        whileHover={{
                          opacity: 1,
                          x: ["-100%", "100%"],
                          transition: {
                            duration: 0.8,
                            ease: "easeInOut"
                          }
                        }}
                      />
                      <span className="relative z-10">{item}</span>
                    </motion.div>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}