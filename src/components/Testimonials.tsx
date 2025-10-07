// components/NewsroomSlider.tsx
'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion'

interface Article {
  id: number
  category: string
  author: string
  title: string
  snippet: string
  imageUrl: string
  date: string
  readTime: string
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  const articles: Article[] = [
    {
      id: 1,
      category: 'Interior Design',
      author: 'Sarah Chen',
      title: 'The Future of Sustainable Interior Design',
      snippet: 'Exploring innovative materials and technologies that are shaping the future of eco-friendly interior spaces.',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      date: 'Mar 15, 2024',
      readTime: '5 min read'
    },
    {
      id: 2,
      category: 'Architecture',
      author: 'Michael Rodriguez',
      title: 'Minimalist Architecture: Less is More',
      snippet: 'How minimalist principles are transforming modern architectural design and creating more meaningful spaces.',
      imageUrl: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      date: 'Mar 12, 2024',
      readTime: '4 min read'
    },
    {
      id: 3,
      category: 'Commercial Design',
      author: 'Emily Watson',
      title: 'Transforming Workspaces for Productivity',
      snippet: 'Strategic office designs that boost employee productivity, creativity, and overall well-being.',
      imageUrl: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      date: 'Mar 8, 2024',
      readTime: '6 min read'
    },
    {
      id: 4,
      category: 'Residential',
      author: 'David Kim',
      title: 'Smart Home Integration in Modern Design',
      snippet: 'Seamlessly blending technology with aesthetics to create intelligent living spaces.',
      imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      date: 'Mar 5, 2024',
      readTime: '7 min read'
    },
    {
      id: 5,
      category: 'Trends',
      author: 'Lisa Thompson',
      title: '2024 Color Trends in Interior Design',
      snippet: 'Discover the color palettes that are defining interior spaces this year and how to incorporate them.',
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      date: 'Mar 1, 2024',
      readTime: '3 min read'
    }
  ]

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex, isAutoPlaying, isPaused])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % articles.length)
  }, [articles.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length)
  }, [articles.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } as Transition
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeInOut" } as Transition
    }
  }

  const imageVariants: Variants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" } as Transition
    }
  }

  const contentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2, ease: "easeOut" } as Transition
    }
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Latest <span className="text-amber-500">Insights</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest trends, ideas, and innovations in architecture and design
          </p>
        </div>

        {/* Mobile Stack Layout */}
        <div className="block lg:hidden space-y-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative h-48">
                <motion.img
                  variants={imageVariants}
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <motion.div variants={contentVariants} className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>By {article.author}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
                  {article.snippet}
                </p>
                
                <button className="text-amber-500 font-medium hover:text-amber-600 transition-colors duration-200">
                  Read Article →
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Slider */}
        <div className="hidden lg:block">
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Slider Container */}
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="flex h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    {/* Image Section */}
                    <motion.div 
                      className="w-1/2 relative"
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <img
                        src={articles[currentIndex].imageUrl}
                        alt={articles[currentIndex].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                      <div className="absolute top-6 left-6">
                        <span className="px-4 py-2 bg-amber-500 text-white font-medium rounded-full text-sm">
                          {articles[currentIndex].category}
                        </span>
                      </div>
                    </motion.div>

                    {/* Content Section */}
                    <motion.div 
                      className="w-1/2 p-8 flex flex-col justify-center"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    >
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span>{articles[currentIndex].date}</span>
                        <span className="mx-2">•</span>
                        <span>{articles[currentIndex].readTime}</span>
                        <span className="mx-2">•</span>
                        <span>By {articles[currentIndex].author}</span>
                      </div>
                      
                      <h3 className="text-2xl lg:text-3xl font-light text-gray-900 dark:text-white mb-4 leading-tight">
                        {articles[currentIndex].title}
                      </h3>
                      
                      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {articles[currentIndex].snippet}
                      </p>
                      
                      <div className="flex items-center space-x-4">
                        <button className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-all duration-300 transform hover:scale-105">
                          Read Full Article
                        </button>
                        <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:border-amber-400 transition-all duration-300">
                          Save for Later
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 group"
              aria-label="Previous article"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-300 group"
              aria-label="Next article"
            >
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-amber-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {articles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-amber-500 scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-amber-300'
                  }`}
                  aria-label={`Go to article ${index + 1}`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <div className="absolute top-6 right-6">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  isAutoPlaying
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {isAutoPlaying ? 'Auto: On' : 'Auto: Off'}
              </button>
            </div>
          </div>
        </div>

        {/* View All Articles CTA */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border-2 border-amber-500 text-amber-500 font-medium rounded-lg hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-105">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  )
}