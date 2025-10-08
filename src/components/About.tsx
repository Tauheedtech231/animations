'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Check, Building2, Home, ClipboardList, Layers } from 'lucide-react'

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const elements = gsap.utils.toArray('.fade-up') as Element[]
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      )
    })
  }, [])

  const cards = [
    {
      title: 'Architectural Design',
      icon: Building2,
      text: 'We bring your dream concepts to life with precision, from large-scale layouts to refined architectural details.',
    },
    {
      title: 'Interior Design & Planning',
      icon: Home,
      text: 'Our interior designs blend comfort and creativity, transforming your spaces into artful reflections of you.',
    },
    {
      title: 'Consulting Services',
      icon: ClipboardList,
      text: 'Expert guidance at every step — our consultancy ensures each project shines with innovation and practicality.',
    },
    {
      title: 'Project Management',
      icon: Layers,
      text: 'We oversee every detail from start to finish — ensuring beauty, efficiency, and peace of mind throughout.',
    },
  ]

  return (
    <div className="bg-white dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 transition-colors duration-500 overflow-hidden">

      {/* WHO WE ARE SECTION */}
      <section className="relative py-24 px-6 md:px-16 overflow-hidden bg-gray-50 dark:bg-[#111] transition-colors duration-500">
        <div className="absolute inset-0 bg-[url('/patterns/architect-bg.svg')] bg-center bg-contain opacity-10 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center md:text-left space-y-12">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center md:items-start space-y-2 mb-6">
              <div className="flex items-center space-x-2 bg-[#fff3e0] dark:bg-[#3a2d17] text-[#c69b5e] px-4 py-1 rounded-full text-sm font-semibold">
                <span className="w-2 h-2 bg-[#c69b5e] rounded-full"></span>
                <span>WHO WE ARE</span>
              </div>

              <motion.div
                className="h-[3px] w-28 rounded-full bg-gradient-to-r from-[#c69b5e] via-[#e1c17b] to-[#c69b5e] relative overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{ width: '7rem' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold leading-tight fade-up">
              Experience <span className="text-[#c69b5e]">The Art Of Interior Design</span>
            </h2>
            <p className="mt-4 max-w-2xl text-gray-600 dark:text-gray-400 fade-up">
              We specialize in transforming visions into reality. Explore our portfolio of innovative
              architectural and interior design projects crafted with precision and passion.
            </p>
          </motion.div>

          {/* Cards Section */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {cards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 0.97 }}
                  className="group relative bg-white dark:bg-[#181818]/80 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
                >
                  <div className="absolute top-6 right-6 text-[#c69b5e]/20 group-hover:rotate-12 transition-transform duration-700">
                    <Icon className="w-10 h-10" />
                  </div>
                  <div className="mb-5">
                    <Icon className="w-10 h-10 text-[#c69b5e] mb-3 transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{card.text}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

   

      {/* CTA SECTION */}
      <section className="bg-[#0e0e0e] dark:bg-[#111] text-white py-20 px-6 md:px-16 overflow-hidden transition-colors duration-500">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center space-x-2 text-[#c69b5e] font-semibold tracking-wide">
              <span className="w-2 h-2 bg-[#c69b5e] rounded-full"></span>
              <span>STARTED IN 1991</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              Where Spaces Inspire, <br />
              <span className="text-[#c69b5e]">And Design Comes Alive</span>
            </h2>

            <div className="grid grid-cols-2 gap-4 text-[15px] sm:text-base">
              {['Latest Technologies', 'High-Quality Designs', '5 Years Warranty', 'Residential Design'].map(
                (item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-[#c69b5e]" />
                    <span>{item}</span>
                  </div>
                )
              )}
            </div>

            <p className="text-gray-300 max-w-lg leading-relaxed">
              Whether it’s your home, office, or a commercial project, we are always dedicated
              to bringing your vision to life. Our numbers speak better than words.
            </p>

            <motion.button
              whileHover={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="relative group overflow-hidden px-8 py-4 border-2 border-[#c69b5e] text-white font-semibold rounded-full flex items-center gap-3 w-fit hover:bg-[#c69b5e] hover:text-white transition-all duration-500"
            >
              More About Us
              <span className="text-lg transition-transform duration-500 group-hover:rotate-0 rotate-45">↗</span>
            </motion.button>
          </motion.div>

          {/* Right Side Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="relative h-[420px] sm:h-[500px] md:h-[560px] w-full rounded-2xl overflow-hidden shadow-2xl group"
          >
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2200&q=80"
              alt="Modern Living Room"
              fill
              className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
