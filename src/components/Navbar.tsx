'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${bgColor}`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
          <span
            className={`font-playfair text-2xl font-bold ${textColor}`}
          >
            Antra
          </span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Services', 'Contact'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`relative font-medium tracking-wide ${textColor} transition-all duration-300`}
              whileHover={{ scale: 1.05 }}
            >
              {item}
              {/* Smooth golden underline animation */}
              <motion.span
                className="absolute left-0 bottom-0 h-[2px] bg-yellow-500"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none text-yellow-500"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${bgColor} border-t ${
              isDarkMode ? 'border-gray-800' : 'border-gray-200'
            }`}
          >
            <div className="flex flex-col items-center py-4 space-y-4">
              {['Home', 'About', 'Services', 'Contact'].map(
                (item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={`relative font-medium text-lg ${textColor} tracking-wide`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {item}
                    <motion.span
                      className="absolute left-0 bottom-0 h-[2px] bg-yellow-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
