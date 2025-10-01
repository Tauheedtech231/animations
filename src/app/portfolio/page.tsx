// pages/index.tsx
"use client"
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CollegePortfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeVision, setActiveVision] = useState(0);

  // Refs for GSAP animations with proper typing
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
   const socialLinks = [
    { name: 'Facebook', icon: <FaFacebookF />, url: 'https://facebook.com' },
    { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com' },
    { name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com' },
    { name: 'LinkedIn', icon: <FaLinkedinIn />, url: 'https://linkedin.com' },
  ];

  // High-quality image URLs from Unsplash
  const images = {
    hero: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    timeline1: "/r1.jpg",
    timeline2: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2126&q=80",
    timeline3: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    timeline4: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    milestone1: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    milestone2: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2022&q=80",
    milestone3: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80",
    alumni1: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    alumni2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    alumni3: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    campus: "https://images.unsplash.com/photo-1541336032412-2048a678540d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80",
    future1: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    future2: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    future3: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  };
const quickLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Journey', id: 'journey' },
    { name: 'Milestones', id: 'milestones' },
    { name: 'Future Vision', id: 'future' },
    { name: 'Contact', id: 'contact' },
  ];
  // Stats data with animated counters
  const stats = [
    { value: 5000, label: 'Students Enrolled', suffix: '+' },
    { value: 150, label: 'Courses Offered', suffix: '+' },
    { value: 98, label: 'Graduation Rate', suffix: '%' },
    { value: 200, label: 'Awards Won', suffix: '+' }
  ];

  // Timeline data
  const timelineData = [
    {
      year: '2023',
      title: 'New Research Center',
      description: 'Opened state-of-the-art research facility for STEM programs',
      image: images.timeline1
    },
    {
      year: '2022',
      title: 'International Recognition',
      description: 'Ranked among top 100 colleges globally for innovation',
      image: images.timeline2
    },
    {
      year: '2021',
      title: 'Campus Expansion',
      description: 'Added new campus buildings and student facilities',
      image: images.timeline3
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented comprehensive online learning platform',
      image: images.timeline4
    }
  ];

  // Milestones data
  const milestones = [
    {
      title: 'Science Fair 2023',
      description: 'Our students won 3 national awards in the annual science competition',
      image: images.milestone1,
      category: 'Competition'
    },
    {
      title: 'Research Publication',
      description: 'Faculty research published in international journals',
      image: images.milestone2,
      category: 'Research'
    },
    {
      title: 'Community Outreach',
      description: '500+ hours of community service completed by students',
      image: images.milestone3,
      category: 'Service'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Computer Science, Class of 2022',
      content: 'Aspire College provided me with the perfect foundation for my career. The faculty and facilities are exceptional.',
      image: images.alumni1
    },
    {
      name: 'Michael Chen',
      role: 'Business Administration, Class of 2021',
      content: 'The practical learning approach and industry connections helped me secure my dream job immediately after graduation.',
      image: images.alumni2
    },
    {
      name: 'Emily Rodriguez',
      role: 'Engineering, Class of 2023',
      content: 'The research opportunities and mentorship at Aspire College shaped my academic and professional journey.',
      image: images.alumni3
    }
  ];

  // Future Vision data
  const futureVision = [
    {
      year: '2025',
      title: 'AI-Enhanced Learning',
      description: 'Implementing AI-powered personalized learning paths for every student',
      goals: ['AI tutoring systems', 'Personalized curriculum', 'Predictive learning analytics'],
      image: images.future1
    },
    {
      year: '2026',
      title: 'Global Campus Network',
      description: 'Establishing international campuses and virtual exchange programs',
      goals: ['5 international campuses', 'Virtual reality classrooms', 'Global student exchange'],
      image: images.future2
    },
    {
      year: '2027',
      title: 'Sustainable Innovation',
      description: 'Becoming carbon-neutral while pioneering green technology research',
      goals: ['Carbon-neutral campus', 'Green tech incubator', 'Sustainable curriculum'],
      image: images.future3
    }
  ];

  // Initialize GSAP animations
  useEffect(() => {
    // Hero section animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.5, 
          ease: 'power3.out'
        }
      );
    }

    // Stats counter animation
    if (statsRef.current) {
      const statElements = statsRef.current.querySelectorAll('.stat-number');
      statElements.forEach((element: Element) => {
        const target = parseInt(element.getAttribute('data-target') || '0');
        gsap.to(element, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
          }
        });
      });
    }

    // Timeline animations
    if (timelineRef.current) {
      const timelineElements = timelineRef.current.querySelectorAll('.timeline-item');
      gsap.fromTo(timelineElements, 
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          }
        }
      );
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Testimonial carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Future vision carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVision((prev) => (prev + 1) % futureVision.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [futureVision.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset form status after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  type FormFields = 'name' | 'email' | 'subject' | 'message';

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const field = e.target.name as FormFields; // type assertion
  const value = e.target.value;
  setFormData(prev => ({ ...prev, [field]: value }));
};


  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  const navItems = ['Home', 'Journey', 'Milestones', 'Future', 'Testimonials', 'Contact'];

  const handleLearnMore = (title: string) => {
    alert(`More information about ${title} will be displayed here. This could open a modal or navigate to a detailed page.`);
  };

  const handleExploreJourney = () => {
    scrollToSection('journey');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
   <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md z-50 shadow-sm">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="flex justify-between items-center py-4">
      {/* Logo */}
      <h1 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        BrainWave
      </h1>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-300"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 relative z-50 flex flex-col justify-center items-center gap-1"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-200 transform transition duration-300 ease-in-out ${
            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-200 transition-opacity duration-300 ease-in-out ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 bg-gray-700 dark:bg-gray-200 transform transition duration-300 ease-in-out ${
            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>
    </div>

    {/* Mobile Navigation */}
    <div
      className={`md:hidden overflow-hidden transition-all duration-500 ${
        isMenuOpen ? "max-h-96 py-4" : "max-h-0"
      }`}
    >
      <div className="space-y-4">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 font-medium transition-colors duration-300"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  </div>
</nav>


      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <Image
            src={images.hero}
            alt="Aspire College Campus"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-blue-900/50"></div>
        
        <motion.div
          ref={heroRef}
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
           
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Shaping Future Leaders Through Innovation and Excellence in Education
          </motion.p>
          <motion.button
            onClick={handleExploreJourney}
            className="bg-white text-blue-800 px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-colors duration-300 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Journey
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Journey Section */}
     <section id="journey" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Our Educational Journey
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      A legacy of excellence and innovation in education spanning decades
    </motion.p>

    {/* Mobile Timeline - Cards */}
    <div className="block md:hidden space-y-6">
      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <div className="relative h-48">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-3">
              <span className="text-blue-600 font-bold text-lg mr-4">{item.year}</span>
              <div className="h-1 flex-1 bg-blue-100 dark:bg-blue-800"></div>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
            <button 
              onClick={() => handleLearnMore(item.title)}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300 text-sm"
            >
              Learn More →
            </button>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Desktop Timeline */}
    <div ref={timelineRef} className="hidden md:block relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-blue-200 dark:bg-blue-800 h-full"></div>

      {timelineData.map((item, index) => (
        <div
          key={index}
          className={`timeline-item mb-12 flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
        >
          <div className="w-1/2 px-8">
            <motion.div
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-700 hover:shadow-xl transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <span className="text-blue-600 font-bold text-lg">{item.year}</span>
              <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-800 dark:text-gray-100">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              <button 
                onClick={() => handleLearnMore(item.title)}
                className="mt-4 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300"
              >
                Learn More →
              </button>
            </motion.div>
          </div>
          <div className="w-8 h-8 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 z-10"></div>
          <div className="w-1/2 px-8">
            <motion.div
              className="relative h-64 rounded-lg overflow-hidden shadow-md dark:shadow-gray-700"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 400px, 100vw"
              />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Milestones Section */}
     <section id="milestones" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Major Milestones & Events
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Celebrating our achievements and impact in education and beyond
    </motion.p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {milestones.map((milestone, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-600 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
        >
          <div className="relative h-48 sm:h-56 overflow-hidden">
            <Image
              src={milestone.image}
              alt={milestone.title}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
              {milestone.category}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{milestone.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{milestone.description}</p>
            <button 
              onClick={() => handleLearnMore(milestone.title)}
              className="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-200 transition-colors duration-300 text-sm"
            >
              Learn More →
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Future Vision Section */}
     <section id="future" className="py-16 sm:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Our Future Vision
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Pioneering the future of education through innovation and forward-thinking initiatives
    </motion.p>

    <div className="max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeVision}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl dark:shadow-gray-700 overflow-hidden"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:grid lg:grid-cols-2">
            <div className="p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600 mr-4">
                  {futureVision[activeVision].year}
                </span>
                <div className="h-1 w-12 sm:w-16 bg-blue-600"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {futureVision[activeVision].title}
              </h3>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {futureVision[activeVision].description}
              </p>
              <div className="space-y-3 mb-6 sm:mb-8">
                {futureVision[activeVision].goals.map((goal, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-200 text-sm sm:text-base">{goal}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => handleLearnMore(futureVision[activeVision].title)}
                className="bg-blue-600 hover:bg-blue-700 text-white dark:text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 text-sm sm:text-base"
              >
                Explore Vision
              </button>
            </div>
            <div className="h-64 sm:h-80 lg:h-auto order-1 lg:order-2">
              <Image
                src={futureVision[activeVision].image}
                alt={futureVision[activeVision].title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-6 sm:mt-8 space-x-3">
        {futureVision.map((_, index) => (
          <button
            key={index}
            className={`w-8 sm:w-12 h-2 rounded-full transition-all duration-300 ${
              index === activeVision ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => setActiveVision(index)}
          />
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Testimonials Section */}
    <section id="testimonials" className="py-16 sm:py-20 bg-gray-50 dark:bg-gray-900">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Alumni Testimonials
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Hear from our graduates who are making a difference around the world
    </motion.p>

    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTestimonial}
          className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-lg dark:shadow-gray-700 text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 sm:mb-6 overflow-hidden relative">
            <Image
              src={testimonials[activeTestimonial].image}
              alt={testimonials[activeTestimonial].name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-200 mb-4 sm:mb-6 italic leading-relaxed">
            {testimonials[activeTestimonial].content}
          </p>
          <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
            {testimonials[activeTestimonial].name}
          </h4>
          <p className="text-blue-600 dark:text-blue-400 text-sm sm:text-base">
            {testimonials[activeTestimonial].role}
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-6 sm:mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeTestimonial ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => setActiveTestimonial(index)}
          />
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Stats Section */}
    <section id="stats" className="py-16 sm:py-20 bg-blue-600 dark:bg-blue-800 text-white">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-3xl sm:text-4xl font-bold text-center mb-3 sm:mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      By The Numbers
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl text-center text-blue-100 dark:text-blue-200 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Quantifying our impact and reach in the education landscape
    </motion.p>

    <div ref={statsRef} className="grid grid-cols-2 gap-6 sm:gap-8 text-center">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="p-4 sm:p-6"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="stat-number" data-target={stat.value}>0</span>
            {stat.suffix}
          </div>
          <div className="text-blue-100 dark:text-blue-200 text-sm sm:text-base">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Section */}
    <section id="contact" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
  <div className="container mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-3xl sm:text-4xl font-bold text-center text-gray-800 dark:text-gray-100 mb-3 sm:mb-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      Get In Touch
    </motion.h2>
    <motion.p
      className="text-lg sm:text-xl text-center text-gray-600 dark:text-gray-300 mb-12 sm:mb-16 max-w-3xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
    >
      Ready to join our educational community? We would love to hear from you
    </motion.p>

    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">Contact Information</h3>
        <div className="space-y-4">
          {/** Contact Items **/}
          {[
            {
              icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              title: 'Address',
              info: <>123 Education Boulevard<br />Knowledge City, KC 12345</>
            },
            {
              icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              ),
              title: 'Phone',
              info: '+1 (555) 123-4567'
            },
            {
              icon: (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
              title: 'Email',
              info: 'info@aspirecollege.edu'
            },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-100">{item.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">{item.info}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/** Form Fields **/}
        {['name', 'email', 'subject', 'message'].map((field, idx) => (
          <div key={idx}>
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 capitalize">
              {field === 'message' ? 'Message' : field.replace(/^\w/, c => c.toUpperCase())}
            </label>
            {field !== 'message' ? (
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                name={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 text-sm sm:text-base"
                required
              />
            ) : (
              <textarea
                id={field}
                name={field}
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300 text-sm sm:text-base"
                required
              ></textarea>
            )}
          </div>
        ))}

        <motion.button
          type="submit"
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300 disabled:opacity-50 text-sm sm:text-base"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={formStatus === 'submitting'}
        >
          {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
        </motion.button>

        <AnimatePresence>
          {formStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg text-sm sm:text-base"
            >
              Thank you for your message! We will get back to you soon.
            </motion.div>
          )}
          {formStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg text-sm sm:text-base"
            >
              Sorry, there was an error sending your message. Please try again.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </div>
  </div>
</section>


<footer className="bg-gray-900 text-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2">Aspire College</h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Empowering students through quality education and innovative learning experiences.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 justify-center">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 text-gray-400 text-sm sm:text-base w-full">
          <p>&copy; 2024 Aspire College. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  );
}