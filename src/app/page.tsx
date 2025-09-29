// components/AcmeUniversity.tsx
'use client';

import { Variants } from "framer-motion";
import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  FiCheck, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiTrendingUp, 
  FiHome, 
  FiBook, 
  FiMail, 
  FiPhone,
  FiArrowRight,
  FiGlobe,
  FiAward,
  FiBriefcase,
  FiMenu,
  FiX
} from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

// Enhanced Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    }
  }
};

const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94] 
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Enhanced StatsCount component with better animation
const StatsCount: React.FC<{ end: number; duration?: number; suffix?: string }> = ({ 
  end, 
  duration = 2000, 
  suffix = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
    
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentCount = Math.floor(progress * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [end, duration, isInView]);

  return (
    <motion.span 
      ref={ref}
      initial={{ scale: 0.5 }}
      animate={isInView ? { scale: 1 } : { scale: 0.5 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-block"
    >
      {count.toLocaleString()}{suffix}
    </motion.span>
  );
};

// Enhanced Stats Section
export const StatsSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stats = [
    { 
      icon: <FiUsers className="w-6 h-6 sm:w-8 sm:h-8" />, 
      label: 'Students Enrolled', 
      value: 10000, 
      suffix: '+', 
      description: 'Active learners worldwide' 
    },
    { 
      icon: <FiTrendingUp className="w-6 h-6 sm:w-8 sm:h-8" />, 
      label: 'Growth Rate', 
      value: 65, 
      suffix: '%', 
      description: 'Year-over-year growth' 
    },
    { 
      icon: <FiHome className="w-6 h-6 sm:w-8 sm:h-8" />, 
      label: 'Colleges', 
      value: 25, 
      suffix: '+', 
      description: 'Specialized institutions' 
    },
  ];

  return (
    <section id="stats" ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <motion.div 
                className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {stat.icon}
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 font-inter">
                <StatsCount end={stat.value} suffix={stat.suffix} />
              </h3>
              <p className="text-base sm:text-lg font-semibold text-gray-800 mb-2">{stat.label}</p>
              <p className="text-sm sm:text-base text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Animated Section Wrapper
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
  delay?: number;
}> = ({ children, direction = 'up', className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const getVariant = () => {
    switch (direction) {
      case 'left': return fadeInLeft;
      case 'right': return fadeInRight;
      case 'scale': return scaleIn;
      default: return fadeInUp;
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={getVariant()}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Enhanced Navigation Component


const AcmeUniversity = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Smooth scrolling for anchor links on page load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Enhanced Navigation */}
  

      {/* Main Content */}
      <main>
        {/* Enhanced Hero Section */}
        <section id="home" ref={heroRef} className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white min-h-screen flex items-center justify-center overflow-hidden">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBEuAvUy5aE3s1-FUmYxvYifm1K5mVJyGeIhyY-nW48GzHBJRkzg_Wuhfg0b5i5MlySkr6kW8hwJmiBw-oUBKEUW_JbZFWD02Pknz0VjxLkWdWohqxpq0VzyVfPeTvk0gIANtgDs1VfqHW64ZhqE9U8WyM0TcLc-xkXMU_z1aJ_9pFScVJyQlEBxzhqTxx9E8c6MgwgKracTOCgD8LoZz0KU7dKNScS030gI7vGPlEGmzGp4upxN0I0P_W6w9sf44xpRTH1R6pfZCQ")',
              y,
              scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
            }}
          />
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/5"
                style={{
                  width: Math.random() * 100 + 50,
                  height: Math.random() * 100 + 50,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative container mx-auto px-4 py-20 lg:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 font-inter"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Unlock Your Potential at{' '}
                <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Acme University
                </span>
              </motion.h1>
              <motion.p 
                className="text-xl lg:text-2xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto font-light"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Embark on a transformative educational journey with our diverse programs and supportive community.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <ScrollLink to="programs" smooth={true} duration={800} offset={-70}>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-2xl hover:shadow-3xl"
                  >
                    Explore Programs
                  </motion.button>
                </ScrollLink>
                <ScrollLink to="about" smooth={true} duration={800} offset={-70}>
                  <motion.button 
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all backdrop-blur-sm"
                  >
                    Virtual Tour
                  </motion.button>
                </ScrollLink>
              </motion.div>
            </div>
          </div>

        
        </section>

        {/* Stats Section */}
        <StatsSection />

        {/* Enhanced About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <AnimatedSection direction="left" delay={0.2}>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900 mb-6 font-inter">About Acme University</h2>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    Acme University is dedicated to providing a world-class education that empowers students to excel in their chosen fields. Our commitment to innovation, research, and community engagement creates a vibrant learning environment.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-8">
                    With state-of-the-art facilities and industry-expert faculty, we prepare students for successful careers in a rapidly evolving global landscape.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
                    >
                      Contact Now
                    </motion.button>
                  </div>
                </div>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.4}>
                <div className="relative">
                  <motion.div 
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXdwsQhacxRyXOAXzUOCPwJ5dhaqk_F9tkR1TfIM1dV6DO13qa6KGs39f2PZFzxGtj-UJy_wGSUh3jx3wAb5CAizDrx0TfkVz7oxOnRtbh-BmnNmJUeoFl5gVwcDaPeLLm1sRIpEZaeVBsJc2TNuEhhTo9m2vQC7-1PLuaHbSDqBZs5CSUeXYlQTvk9xAQFXUsjdleLBLoOU96hHmqDE7H8FPDVt1hRgEuZDfdSwuMZG7lI1Ihd3xSR1CK71xwIjF4xZqInO6VYk8"
                      alt="Acme University Campus"
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true, margin: "-50px" }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                        <FiAward className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Top Ranked</p>
                        <p className="text-sm text-gray-500">Nationwide</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <ProgramsSection />
        
        {/* Success Stories Section */}
        <SuccessStoriesSection />
        
        {/* Featured Projects Section */}
        <FeaturedProjectsSection />
        
        {/* Application Steps Section */}
        <ApplicationStepsSection />
        
        {/* Why Choose Us Section */}
        <WhyChooseUsSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Enhanced Footer */}
      <Footer />
    </div>
  );
};

// Enhanced Programs Section Component
const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const programs = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZyZI6rdCXJ8HvyV4rkaEbF53CtU3QYEOn-9-WegJ5_1PzmnG59ksBCfuYvyv-pQOJVpFC19JN8merJ3R9wrQsdMl73ZkvfpkmGs9ZdnHkwNWolOd6AX7lTIPs_qQO9PZnBzvC6vfXzgaVmKfi3I26w2ZaGiRxPDSqokySYu_jN4eVdN7FHNsOqzyMEU1QP8UvnEhae9sJiC411rVdmPVUS7uNXDmRN9KXJ43dIclFr_ZYbggvnW6493CKh1nXWx8c8T3KVwYv3u0",
      title: "Information Technology",
      description: "Explore the latest in tech and software development",
      duration: "4 Years",
      courses: "48 Courses"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDM3PwRT4zbIY-22C_hpkc1-wlBP9yj-9mq-Y2ZmvpJ1gN21SCFH1CqD6LzKGMAypEIX4RVb-f4adv4JsWn9d3pLoaSbOtkLE_bZuRH5FjDqzzRJgdg7fD-eGv2wnxmaotuUDBRursCHLM4d2WR9A2M8fmKpza7rGRTpXsRbFeofyJ7URSLX4K0Om7Gr335ezCmH-mw-gjqBi054cQHMhAI6Z1Vj01WzVafM10QO6U4YYJXa7RhIBIRg3OEDtHts0av2XMmiRcjvV8",
      title: "Business Administration",
      description: "Lead with innovation and strategic thinking",
      duration: "4 Years",
      courses: "42 Courses"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW9fPXC7dt5LaKCxyDpHWv6CNJqk2PQ2gRowgZYbPXStNTJZmlnp5kP1xH5Q1Rmxxzgs1O_9KL09pgvgnnhAMaI1Q-Es_8VclvmFrNVZtzuoIfRbk6wNZBxy2X7n8gzT0NneCcHTmATyDz1t267Di5jf43uoiNjXyUyacoJBQ31SkBn6raVWc_f_GzF-CxNaKS_OHsSA_ZnzYHBgAteTYmk4ztz70uEG8oC2HR4LTwWqOU2h8me7P7sOxbG8SD01gSUpei277BlBI",
      title: "Creative Arts",
      description: "Express your creativity through various mediums",
      duration: "3 Years",
      courses: "36 Courses"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE70aJI3_4jJhTN92dhQ2F6rDkgLU9HcRuE6DtuWgKa8Vq_bAxczdPZpm7v4lER-CZzFBesTXMqViVq_UAaersRrDpasXuhbw78533DabcCuqMpZjbt7Eu5sWgiIgFyOaXqglvWP4-bAiknKONH_FVPDcdjnEg5fYg7VXT-zhrPHgLEGkKdD8lUNx-gqBIAwLBk1IA4tMeaRA_zELzJF7wkoBA04c5PcjmbgDlYbcZTmOGf9jKMk7WwV9lAb0_nZRI_Vou1Ie-ckk",
      title: "Health Sciences",
      description: "Care for the future with medical expertise",
      duration: "5 Years",
      courses: "52 Courses"
    }
  ];

  return (
    <section id="programs" ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of undergraduate and graduate programs designed for your success.
            </p>
          </div>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100"
            >
              <div className="relative overflow-hidden w-full h-48">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full py-2 bg-white/90 backdrop-blur-sm text-gray-900 font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4 flex-1">{program.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    {program.duration}
                  </span>
                  <span>{program.courses}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  Learn More
                  <FiArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              View All Programs
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Enhanced Success Stories Section Component
const SuccessStoriesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const stories = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB57s2YsOkUz9IVAPk9rCW_5Q_ZslRYBeuRK8SM4-irKgEvrNGpUwAc2KTeM2KRx78JMaAIoKSz8IkVUIUJbkH4GJR229lxIdsi_hoVBWnUiY_6EKS15dtd8rnmDw9UqKIVEjjN2scSeYt34-J-gR6tp0FKfgLyuUfPL_gIppebBcOWLw55RNTHmblxOgYikrbAA9b5HxvOfVD3P2eHA11F4solLo7SxPCfP49iW_OR88AN9E3SlaJJ8UrMGqbrra0EWcnJJmVr9sA",
      title: "From Classroom to Boardroom",
      description: "Meet Sarah, a graduate who now leads a tech startup.",
      name: "Sarah Johnson",
      role: "CEO, Tech Innovations"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZZw6vL6vN7cARUN2s2B9IeUJFlx5vhGgQ_yUzXE1lmRsG36UWktnoVIp4_knK2DbqdjtfAggGm-9nLuiozfnHQyQJ21tuHFii_UrZXc2eg6c3Z6oGK_kC05_h-f9K-L9YZVk-9R8kGGPJuRFVItf3Fck2e9I5g6JO7OO2GQOFNKmY-e_xepCLefYgqXzz-FruRnBaiNAsT8D5aChQpadLxCe8AIdOW6cbFznZoA9X380eUg7F5ntjmS5tICKrh0NrCk2rWIirIwk",
      title: "Alumni Spotlight: Leading in Innovation",
      description: "Follow David's journey from student to industry leader.",
      name: "David Chen",
      role: "Product Director, Google"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBtKit_LzXAwl9CGEDPBy90dLdbn0Zo0QnyOY0RQK7Fx2GI3IpTa99f7Cwqe6ccBAbJaX93l91dZ5j0c10aTmFUG38hA4N5YKiipBWW6JRrgx8R2O0spYN1iIQNN665-1H826F_fJWPQGOeY63IXlAhWW0xvwBsR0ziyZwhZ8WerZMhrKY7VP8FdIgqDRRivzRwO7_EBw6hB6p7sQY11yLCYo3OwbvZhmTFVDzDpDkXPL34WRi3UX0X76etrgsg2zWYqx16gu4hq3c",
      title: "Transforming Passion into Profession",
      description: "Discover how Emily turned her passion into a thriving career.",
      name: "Emily Davis",
      role: "Creative Director, Netflix"
    }
  ];

  return (
    <section id="success-stories" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from our alumni who are making a difference in their industries.
            </p>
          </div>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stories.map((story, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 flex flex-col justify-between hover:shadow-2xl transition-all duration-300 min-h-[450px] border border-gray-100 group"
            >
              <div>
                <div className="relative mb-6 w-full h-48 overflow-hidden rounded-xl">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{story.description}</p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{story.name}</p>
                <p className="text-sm text-gray-500">{story.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Featured Projects Section Component
const FeaturedProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const projects = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsYvbGrpNnURV4yj9qDAA7Mx9TUPIAcVs9lUbTQqZfpDWNyOxQSItHN_fAbzrmCGpPHLvQBIFrvk64Wr35NY5RMJ66EASHN_h2D0GuRBfzajZyZrO1YpcEyXQ_9KZlaGTSVPcbRnJtF-5OjFLtvJYGG2APFqSremNKlRe85ZNqWLIqDDZvb7JRgXWfqOoCbiKD0TdUMx4JH11bzibUZWP9yiqAQ0Q0nI0eo8dUp1jkmF0MVezZA_kzz9GfKJBD5juceNMrripUWaE",
      title: "Innovative Tech Project",
      description: "A student-led project revolutionizing urban mobility with AI-powered solutions.",
      category: "Technology"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGZR9Dc3mOJzZZA4zDhJ0YWw390LjzPpKTVnzlpyU-Isf-sbDKDeWX9ugBVY-TXNk5v190dqovEv5KH1X2IBKYYsi7cHVQj8PpTxERvJLqQw6jtURvkEbO_jG4pCwH06FbbK89kOP6Wfr2NR5s2UbqRcuusBGymlhWXl1rZnb6nR5peMGtVXbGpiZsiDCpmCc_VdxzjGjWGwAJogM659WzxV1hQTR3G8WJ6V0P3X1NXg19p1krc6pza9-3hcuZQuL1bfEYDOaD13M",
      title: "Business Case Study",
      description: "A successful business strategy developed by our students for Fortune 500 companies.",
      category: "Business"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxcVvpi5SYfbgPuhwYVcBDODSGooS2WQS7l9TG3aRb3csoyry1D3rc-g9QUFoADAY3QFEwZDVI7YAtN90hrYDmlDe5DQTifgfMmhUVAYtVAGBAAbB9sF3rddQZTIUJswk_NROakrrumbeaQq05JgaozSeXcFCx2IMU5gsGxczvqxUPGxAJDztypQQvRx_KJrMARZgrXRO5EJzWO5mxG0BLVOlRcXU0Kn6TPNs-Vp--qb1ApiRMuB9O1tedcjC_gB8F5CgNX5EoIMw",
      title: "Creative Design Showcase",
      description: "A showcase of creative works from our arts program featured in international exhibitions.",
      category: "Arts"
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJgKeDjUIpozZWAPeYulIsXKhNfgxnhiOCtxAWxjgugQfg31KcpBy7_v9_xKcCfSMoq3sWWnsbSvecyUyWWn6LINSgS6JHeqId2ozxmp9yPsMpUtV_1TZjDHDz5fcKn_Zh9gCxbd9lb2-aWdXGWaaNeg-ZuWvi8iZXgLvBetJurZ_PupnICgg8lvplnCz5mmz4APkAkxCb60F15wag0yT3LJbEJBnmgyO_Xv5IypBXlzYygO0oTXpkvniQIEHJ1SFHF2gf436UHJA",
      title: "Health Science Research",
      description: "Groundbreaking research in health sciences leading to new medical treatments.",
      category: "Science"
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore innovative projects and research from our students and faculty.
            </p>
          </div>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 group border border-gray-100"
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                <motion.button 
                  whileHover={{ x: 4 }}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-2 group"
                >
                  View Project
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced Application Steps Section Component
const ApplicationStepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const steps = [
    {
      icon: <FiCheck className="w-6 h-6" />,
      title: "Check Eligibility",
      description: "Review requirements and ensure you qualify for your chosen program"
    },
    {
      icon: <FiBook className="w-6 h-6" />,
      title: "Submit Application",
      description: "Complete and submit your application with required documents"
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Track Status",
      description: "Monitor your application progress through our portal"
    }
  ];

  return (
    <section id="apply" ref={ref} className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">Apply in 3 Easy Steps</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your journey to Acme University with our simple application process.
            </p>
          </div>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className="text-center relative"
            >
              <div className="relative">
                {/* Connection line between steps */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent -z-10" />
                )}
                
                {/* Step number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
                
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.icon}
                </motion.div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <AnimatedSection direction="up" delay={0.4}>
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/applicant_portal/my_application'}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform shadow-xl hover:shadow-2xl"
            >
              Start Your Application
            </motion.button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// Enhanced Why Choose Us Section Component
const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const features = [
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Fast Admission",
      description: "Quick and efficient application process with 48-hour initial review"
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Affordable Education",
      description: "Competitive tuition fees and comprehensive financial aid options"
    },
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: "Career Guidance",
      description: "Dedicated career services with 95% employment rate after graduation"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Global Community",
      description: "Diverse student body from over 80 countries worldwide"
    }
  ];

  return (
    <section id="why-choose-us" ref={ref} className="py-16 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-inter">Why Choose Acme University?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes us the preferred choice for students worldwide.
            </p>
          </div>
        </AnimatedSection>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-2xl transition-all duration-300 border border-white/20"
            >
              <motion.div 
                className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// Enhanced CTA Section Component


const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      id="cta"
      ref={ref}
      className="py-16 sm:py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-inter">
            Your Future Starts Today
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful students who started their journey at Acme University. Take the first step toward your dream career.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all transform shadow-lg sm:shadow-2xl hover:shadow-xl sm:hover:shadow-3xl text-sm sm:text-base"
            >
              Secure Your Admission
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-sm sm:text-base"
            >
              Schedule Campus Tour
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};




// Enhanced Footer Component
const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const footerSections = [
    {
      title: "Academics",
      links: ["Undergraduate", "Graduate", "Online Programs"],
    },
    {
      title: "Admissions",
      links: ["Apply Now", "Requirements", "Tuition & Fees", "Financial Aid", "Visit Campus"],
    },
    {
      title: "Campus Life",
      links: ["Student Life", "Housing", "Events"],
    },
    {
      title: "About",
      links: ["History", "Leadership", "Careers", "News", "Contact"],
    },
  ];

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.6 }}
      className="bg-gray-900 text-white"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 text-center sm:text-left">
            <motion.div 
              className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">AU</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Acme University</h3>
                <p className="text-gray-400 text-sm">Excellence in Education</p>
              </div>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto sm:mx-0 leading-relaxed">
              Empowering students to achieve their dreams through quality education and innovative learning.
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              {[FiPhone, FiMail, FiGlobe].map((Icon, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <Icon className="w-5 h-5" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerSections.map((section, index) => (
            <motion.div 
              key={index} 
              className="text-center sm:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <h4 className="font-semibold mb-4 text-white">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-sm block py-1"
                      whileHover={{ x: 4 }}
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div 
          className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 Acme University. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default AcmeUniversity;