// components/Projects.tsx
'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<(HTMLDivElement | null)[]>([])
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const backgroundRef = useRef<HTMLDivElement>(null)

  // Sample projects data with high-quality architectural images
  const projects = [
    {
      id: 1,
      title: "Skyline Penthouse",
      location: "New York, USA",
      year: "2024",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    },
    {
      id: 2,
      title: "Minimalist Villa",
      location: "Berlin, Germany",
      year: "2024",
      image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
    },
    {
      id: 3,
      title: "Ocean View Residence",
      location: "Malibu, California",
      year: "2023",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "Urban Loft Space",
      location: "Tokyo, Japan",
      year: "2024",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 5,
      title: "Mountain Retreat",
      location: "Swiss Alps, Switzerland",
      year: "2023",
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2067&q=80"
    },
    {
      id: 6,
      title: "Desert Oasis",
      location: "Dubai, UAE",
      year: "2024",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  ]

  useEffect(() => {
    // Background parallax effect
    gsap.to(backgroundRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    })

    // Title animation
    gsap.fromTo(titleRef.current,
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Subtitle animation
    gsap.fromTo(subtitleRef.current,
      {
        y: 60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: subtitleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Project cards animations
    projectsRef.current.forEach((project, index) => {
      if (!project) return

      let animationFrom: gsap.TweenVars
      
      // Alternate animation directions
      if (index % 3 === 0) {
        animationFrom = { x: -100, opacity: 0 } // Left
      } else if (index % 3 === 1) {
        animationFrom = { x: 100, opacity: 0 } // Right
      } else {
        animationFrom = { y: 100, opacity: 0 } // Bottom
      }

      gsap.fromTo(project,
        animationFrom,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: project,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Image hover animations setup
    imagesRef.current.forEach((image) => {
      if (!image) return

      // Initial state
      gsap.set(image, { transformPerspective: 1000 })

      // Hover animation
      const hoverAnimation = gsap.to(image, {
        scale: 1.05,
        duration: 0.8,
        ease: "power2.out",
        paused: true
      })

      // Glow effect
      const glowAnimation = gsap.to(image, {
        boxShadow: "0 0 40px 10px rgba(245, 158, 11, 0.3)",
        duration: 0.8,
        ease: "power2.out",
        paused: true
      })

      image.addEventListener('mouseenter', () => {
        hoverAnimation.play()
        glowAnimation.play()
      })

      image.addEventListener('mouseleave', () => {
        hoverAnimation.reverse()
        glowAnimation.reverse()
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Helper function to assign refs
  const addToRefs = (el: HTMLDivElement | null, index: number, type: 'project' | 'image') => {
    if (type === 'project') {
      projectsRef.current[index] = el
    } else {
      imagesRef.current[index] = el
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden py-20"
    >
      {/* Animated Background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-black opacity-40"
      />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-amber-400 rounded-full opacity-40" />
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-amber-400 rounded-full opacity-30 animate-pulse" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20 lg:mb-28">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6 tracking-tight"
          >
            Creative Projects That <span className="text-amber-500">Define</span> Our Style
          </h1>
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Our portfolio showcases a diverse range of projects — from beautifully crafted residential spaces to functional and stylish commercial interiors.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => addToRefs(el, index, 'project')}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div
                  ref={el => addToRefs(el, index, 'image')}
                  className="relative h-80 md:h-96 w-full transform-gpu transition-all duration-800"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9faKGwqwSOz2QYvVkSshIqyBWh5w//2Q=="
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  {/* Golden Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-400/30 transition-all duration-500 rounded-2xl" />
                </div>

                {/* Project Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-xl font-light mb-1">{project.title}</h3>
                      <p className="text-amber-200 text-sm font-light">{project.location}</p>
                    </div>
                    <span className="text-amber-300 text-lg font-light bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Golden Accent Line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex items-center space-x-4 text-gray-600 dark:text-gray-300">
            <div className="w-8 h-px bg-amber-400"></div>
            <span className="text-sm font-light tracking-wider">EXPLORE MORE WORK</span>
            <div className="w-8 h-px bg-amber-400"></div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .project-card {
          transform-style: preserve-3d;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom gold gradient */
        .gold-gradient {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);
        }
        
        /* Luxury shadow effects */
        .luxury-shadow {
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(245, 158, 11, 0.05);
        }
      `}</style>
    </section>
  )
}

export default Projects