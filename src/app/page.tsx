'use client'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Projects from '@/components/Project'
import Testimonials from '../components/Testimonials'

import Footer from '../components/Footer'
import ProcessSection from '@/components/Process'
import TeamSection from '@/components/TeamSection'
import Building from "@/components/Building"
import BlogPage from '@/components/Blog'

export default function Home() {
  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <ProcessSection/>
      <Projects />
      <Testimonials />
      <Building/>
      <TeamSection />

     <BlogPage/>
      <Footer />

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </main>
  )
}
