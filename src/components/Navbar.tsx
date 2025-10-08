'use client'
import { useState } from 'react'
import { Menu, Search, Phone, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null)

  const navItems = [
    {
      title: 'Home',
      sub: [
        { title: 'Main Home' },
        {
          title: 'Creative Home',
          sub: ['Modern', 'Classic', 'Minimal'],
        },
        { title: 'Minimal Home' },
      ],
    },
    {
      title: 'Services',
      sub: [
        { title: 'Interior Design' },
        { title: 'Architecture' },
        { title: 'Consulting' },
      ],
    },
    {
      title: 'Projects',
      sub: [
        { title: 'Residential' },
        { title: 'Commercial' },
        { title: 'Industrial' },
      ],
    },
    {
      title: 'Pages',
      sub: [
        { title: 'About Us' },
        { title: 'Team' },
        { title: 'FAQ' },
      ],
    },
    {
      title: 'Blog',
      sub: [
        { title: 'Latest Posts' },
        { title: 'Single Post' },
      ],
    },
    {
      title: 'Contact Us',
      sub: [
        { title: 'Contact Form' },
        { title: 'Map Location' },
      ],
    },
  ]

  const handleSubMenuToggle = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title)
  }

  // Simple framer-motion variants for mobile menu animation
  // Smooth, staggered variants for mobile menu
  const ease = [0.22, 1, 0.36, 1]

  const mobileMenuVariants: Variants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { when: 'afterChildren', duration: 0.35,  }
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.06,
        duration: 0.45,
      
      }
    }
  }

  const containerVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  const mobileItemVariants: Variants = {
    closed: { y: -10, opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.36 } }
  }

  return (
    <header className="w-full">
      {/* 🟩 Envato Top Bar */}
      <div className="w-full bg-[#262626] text-white text-sm flex justify-between items-center px-6 py-2">
        <div className="flex items-center space-x-2">
          <div className="bg-[#82b440] w-5 h-5 flex items-center justify-center rounded-sm">
            <span className="text-xs font-bold text-black">E</span>
          </div>
          <span className="font-medium">envato market</span>
        </div>
        <button className="bg-[#82b440] hover:bg-[#6fa237] text-black px-4 py-1 rounded text-sm font-semibold transition">
          Buy now
        </button>
      </div>

      {/* 🖤 Main Navbar */}
      <div className="bg-[#1b1b1b] text-white">
        <div className="flex justify-between items-center px-6 lg:px-12 py-4 max-w-7xl mx-auto">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#c69b5e] rounded-sm flex items-center justify-center">
              <span className="font-bold text-xl text-white">A</span>
            </div>
            <span className="text-2xl font-semibold">antra</span>
          </div>

          {/* 🌐 Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 text-[15px] font-medium relative">
            {navItems.map((item, idx) => (
              <div key={idx} className="group relative">
                <a href="#" className="relative inline-block pb-1">
                  {item.title}
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#c69b5e] transition-all duration-300 group-hover:w-full"></span>
                </a>

                {/* Dropdown */}
                {item.sub && (
                  <div className="absolute left-0 top-full mt-3 w-56 bg-[#242424] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out transform group-hover:translate-y-2 z-50">
                    {item.sub.map((subItem, i) => (
                      <div key={i} className="relative group/sub">
                        <a
                          href="#"
                          className="relative block px-4 py-2 text-sm text-gray-200 hover:text-white transition-all duration-300"
                        >
                          {subItem.title}
                          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#c69b5e] transition-all duration-300 group-hover/sub:w-full"></span>
                        </a>
                        {subItem.sub && (
                          <div className="absolute left-full top-0 ml-1 w-44 bg-[#2e2e2e] rounded-md shadow-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 ease-out transform group-hover/sub:translate-x-2 z-50">
                            {subItem.sub.map((nested, k) => (
                              <a
                                key={k}
                                href="#"
                                className="relative block px-4 py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 group/nested"
                              >
                                {nested}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#c69b5e] transition-all duration-300 group-hover/nested:w-full"></span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 📞 Right Section */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-[#c69b5e]" />
              <div>
                <p className="text-xs text-gray-400">Call Us Phone</p>
                <p className="font-semibold text-white">(+480) 123 678 900</p>
              </div>
            </div>

            <button className="bg-[#c69b5e] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#b98a50] transition">
              Get A Quote!
            </button>

            {/* Search Icon */}
            <div className="relative group cursor-pointer">
              <Search className="w-5 h-5 transition-all duration-300 group-hover:text-[#c69b5e] group-hover:scale-110" />
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#c69b5e] transition-all duration-300 group-hover:w-full"></span>
            </div>

            {/* Dotted Circle */}
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center relative hover:border-[#c69b5e] transition-all group">
              <div className="grid grid-cols-2 gap-1.5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-white/70 rounded-full transition-all duration-300 group-hover:bg-[#c69b5e]"
                  />
                ))}
              </div>
            </div>
          </div>

        <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Menu size={28} />
          </motion.button>
        </div>

        {/* 📱 Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              layout
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-[#242424] flex flex-col items-center text-sm font-medium overflow-hidden"
            >
              <motion.div
                layout
                variants={containerVariants}
                className="w-full"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.title}
                    layout
                    variants={mobileItemVariants}
                    className="w-full flex flex-col items-center border-b border-white/10"
                  >
                    <motion.button
                      onClick={() =>
                        item.sub ? handleSubMenuToggle(item.title) : null
                      }
                      className="w-full flex justify-between items-center px-6 py-3 text-white hover:text-[#c69b5e] transition-all"
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>{item.title}</span>
                      {item.sub && (
                        <motion.div
                          animate={{ rotate: openSubMenu === item.title ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>

                    {/* Submenu (Mobile) */}
                    <AnimatePresence>
                      {item.sub && openSubMenu === item.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full bg-[#1e1e1e] overflow-hidden"
                        >
                          {item.sub.map((sub, idx) => (
                            <motion.a
                              key={idx}
                              href="#"
                              className="block px-10 py-2 text-gray-300 hover:text-white relative group/sub transition-all"
                              whileHover={{ x: 5 }}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              {sub.title}
                              <motion.span 
                                className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#c69b5e]"
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                              />
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#c69b5e] text-white font-semibold px-5 py-2 mt-4 rounded-full hover:bg-[#b98a50] transition mx-6 mb-4"
                >
                  Get A Quote!
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
