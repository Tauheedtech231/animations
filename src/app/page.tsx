// components/ModernCollegeHome.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiArrowDown,
  FiUsers,
  FiAward,
  FiMapPin,
  FiBook,
  FiMail,
  FiPhone,
  FiMessageCircle,
  FiFacebook,
  FiInstagram,
  FiLinkedin
} from 'react-icons/fi';
import Image from 'next/image';

const ModernCollegeHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);

  const contactFormRef = useRef<HTMLDivElement>(null);

  // Hero slider images
  const courses = [ { id: 1, name: "Intermediate in Computer Science (ICS)", description: "Comprehensive computer science program with programming, software development, and IT fundamentals.", fee: "PKR 25,000", duration: "2 Years", subjects: ["Programming", "Mathematics", "Physics", "Computer Fundamentals"], image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80", features: ["Modern Computer Lab", "Industry Experts", "Programming Projects"] }, { id: 2, name: "Bachelor of Commerce (B.Com)", description: "Professional commerce education covering accounting, business, and finance principles.", fee: "PKR 22,000", duration: "2 Years", subjects: ["Accounting", "Business Studies", "Economics", "Finance"], image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80", features: ["Business Simulations", "Case Studies", "Professional Training"] }, { id: 3, name: "Intermediate in Commerce (I.Com)", description: "Foundation in commerce and business studies for career-oriented students.", fee: "PKR 20,000", duration: "2 Years", subjects: ["Commerce", "Accounting", "Business Math", "Economics"], image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80", features: ["Practical Accounting", "Business Basics", "Career Guidance"] }, { id: 4, name: "Faculty of Arts (FA)", description: "Liberal arts education with focus on humanities, social sciences, and languages.", fee: "PKR 18,000", duration: "2 Years", subjects: ["English", "Urdu", "Islamic Studies", "Pakistan Studies"], image: "https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80", features: ["Creative Writing", "Language Skills", "Cultural Studies"] }, { id: 5, name: "Faculty of Science (FSC Pre-Medical)", description: "Medical sciences program preparing students for medical and dental colleges.", fee: "PKR 28,000", duration: "2 Years", subjects: ["Biology", "Chemistry", "Physics", "English"], image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80", features: ["Modern Labs", "Research Projects", "Medical Prep"] }, { id: 6, name: "Faculty of Science (FSC Pre-Engineering)", description: "Engineering sciences program with advanced mathematics and physics.", fee: "PKR 26,000", duration: "2 Years", subjects: ["Mathematics", "Chemistry", "Physics", "English"], image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.1&auto=format&fit=crop&w=1000&q=80", features: ["Advanced Mathematics", "Engineering Concepts", "Technical Skills"] } ];
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      title: "Welcome to Aspire College",
      subtitle: "Excellence in Education Since 2005",
      description: "Shaping future leaders through quality education and character building"
    },
    {
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      title: "Quality Education",
      subtitle: "Proven Academic Excellence",
      description: "98% success rate in board examinations"
    },
    {
      image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.1&auto=format&fit=crop&w=2000&q=80",
      title: "Modern Facilities",
      subtitle: "State-of-the-Art Infrastructure",
      description: "Equipped with modern labs, libraries, and sports facilities"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 20000); // ⏳ 20 sec per slide
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetAutoPlay();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    setIsAutoPlaying(false);
    if (slideInterval.current) clearInterval(slideInterval.current);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetAutoPlay();
  };

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToCourses = () => {
    document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              className="absolute inset-0 w-full h-full"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <Image
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/50" />
              
              <div className="absolute inset-0 flex items-center justify-center text-center text-white">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-4xl mx-auto px-4"
                >
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-6 text-blue-200 font-semibold">
                    {slides[currentSlide].subtitle}
                  </p>
                  <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                    {slides[currentSlide].description}
                  </p>

                  {/* 👇 Buttons hidden on mobile */}
                 <div className="flex gap-4 justify-center">
  {/* Explore Programs → Mobile & Desktop dono par */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={scrollToCourses}
    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
               text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg shadow-2xl transition-all"
  >
    Explore Programs
  </motion.button>

  {/* Contact Now → Sirf Desktop par */}
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={scrollToContact}
    className="hidden sm:block border-2 border-white hover:bg-white/10 text-white 
               px-8 py-4 rounded-lg font-semibold backdrop-blur-sm transition-all"
  >
    Contact Now
  </motion.button>
</div>

                </motion.div>
              </div>

              {/* Scroll Down Indicator */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
              >
                <motion.button
                  onClick={scrollToCourses}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <FiArrowDown className="w-8 h-8" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 
                       backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          >
            <FiChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 
                       backdrop-blur-sm rounded-full p-3 transition-all duration-300"
          >
            <FiChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slider Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>



      {/* About Section */}
     <section id="about" className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          About College
        </h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Aspire College is a premier educational institution dedicated to providing 
          top-quality education that empowers students to excel academically and evolve 
          into responsible, capable individuals. Our modern campus and expert faculty 
          create a vibrant learning environment.
        </p>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Our mission is to foster innovation, critical thinking, and holistic development, 
          preparing students for higher education and professional success.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-3 rounded-xl font-semibold shadow-xl transition-all duration-300"
        >
          Contact Now
        </motion.button>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 gap-6"
      >
        {[
          { icon: FiUsers, bg: "bg-blue-100", color: "text-blue-600", number: "2000+", label: "Students Enrolled" },
          { icon: FiAward, bg: "bg-green-100", color: "text-green-600", number: "98%", label: "Success Rate" },
          { icon: FiBook, bg: "bg-purple-100", color: "text-purple-600", number: "15+", label: "Programs" },
          { icon: FiMapPin, bg: "bg-orange-100", color: "text-orange-600", number: "3", label: "Campuses" },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:scale-105 transition-transform duration-300"
            >
              <div className={`w-16 h-16 ${stat.bg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>
    </div>
  </div>
</section>


      {/* Courses Section */}
    <section id="courses" className="py-20 bg-white">
  <div className="container mx-auto px-4">
    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center mb-14"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Our Programs
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Choose from our diverse range of intermediate and bachelor programs
        designed to shape your academic and professional future.
      </p>
    </motion.div>

    {/* Course Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {courses.map((course, index) => (
     <motion.div
  key={course.id}
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: index * 0.1 }}
  viewport={{ once: true }}
  whileHover={{ y: -6 }}
  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group flex flex-col"
>
  {/* Course Image */}
  <div className="relative h-56 overflow-hidden">
    <Image
      src={course.image}
      alt={course.name}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-500"
    />
    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
    <div className="absolute top-4 right-4">
      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
        {course.duration}
      </span>
    </div>
  </div>

  {/* Card Content */}
  <div className="p-6 flex flex-col flex-grow">
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
      {course.name}
    </h3>
    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
      {course.description}
    </p>

    {/* Features */}
    <div className="mb-4">
      <div className="flex flex-wrap gap-2 mb-3">
        {course.features.map((feature, idx) => (
          <span
            key={idx}
            className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
          >
            {feature}
          </span>
        ))}
      </div>
    </div>

    {/* Subjects */}
    <div className="mb-4">
      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
        Subjects:
      </h4>
      <div className="flex flex-wrap gap-1">
        {course.subjects.map((subject, idx) => (
          <span
            key={idx}
            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {subject}
          </span>
        ))}
      </div>
    </div>

    {/* Fee Section */}
    <div className="mb-6">
      <p className="text-lg font-bold text-green-600">
        Fee: {course.fee}
      </p>
      <p className="text-sm text-gray-500">Per semester</p>
    </div>

    {/* Button at bottom */}
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={scrollToContact}
      className="mt-auto w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3.5 rounded-xl font-semibold text-base transition-all duration-300 shadow-md hover:shadow-xl"
    >
      Apply Now
    </motion.button>
  </div>
</motion.div>

      ))}
    </div>

    {/* View All Programs CTA */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true }}
      className="text-center mt-16"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={scrollToContact}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
      >
        Start Your Application Today
      </motion.button>
    </motion.div>
  </div>
</section>


      {/* Contact Form Section */}
   <section id="contact" ref={contactFormRef} className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Have questions? We are here to help! Contact us for admissions, programs, or campus life inquiries.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 hover:shadow-2xl transition-shadow duration-300"
        >
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interested Program</label>
              <select className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300">
                <option value="">Select a program</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>{course.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
              <textarea
                rows={4}
                required
                placeholder="Tell us about your inquiry..."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Info Cards */}
          <div className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-5">Contact Information</h3>
            <div className="space-y-4">
              {[
                { icon: FiMapPin, bg: "bg-blue-100", color: "text-blue-600", title: "Main Campus", text: "123 Education Street, Academic Town, City" },
                { icon: FiPhone, bg: "bg-green-100", color: "text-green-600", title: "Phone", text: "+92 300 1234567" },
                { icon: FiMail, bg: "bg-purple-100", color: "text-purple-600", title: "Email", text: "info@aspirecollege.edu.pk" },
                { icon: FiMessageCircle, bg: "bg-orange-100", color: "text-orange-600", title: "WhatsApp", text: "+92 300 1234567" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-gray-600">{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Office Hours */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Office Hours</h3>
            <div className="space-y-2">
              <p><strong>Monday - Friday:</strong> 8:00 AM - 4:00 PM</p>
              <p><strong>Saturday:</strong> 9:00 AM - 1:00 PM</p>
              <p><strong>Sunday:</strong> Closed</p>
            </div>
          </div>

          {/* Quick Admission */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-200 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Admission</h3>
            <p className="text-gray-600 mb-4">
              Ready to join Aspire College? Start your application process today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Apply for Admission
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>


      {/* Footer */}
    <footer className="bg-gray-900 text-white">
  <div className="container mx-auto px-4 py-10 sm:py-12">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* College Info */}
      <div className="lg:col-span-1 text-center sm:text-left">
        <h3 className="text-2xl font-bold mb-4">Aspire College</h3>
        <p className="text-gray-400 mb-6 leading-relaxed text-sm sm:text-base">
          Excellence in education since 2005. Shaping future leaders through
          quality education and character building.
        </p>
        <div className="flex justify-center sm:justify-start space-x-4">
          <a
            href="#"
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
          >
            <FiFacebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors duration-300"
          >
            <FiInstagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
          >
            <FiLinkedin className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Quick Links */}
      <div className="text-center sm:text-left">
        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2">
          {['Home', 'Courses', 'About', 'Admissions', 'Contact'].map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Programs */}
      <div className="text-center sm:text-left">
        <h4 className="text-lg font-semibold mb-4">Programs</h4>
        <ul className="space-y-2">
          {courses.map((course) => (
            <li key={course.id}>
              <a
                href="#courses"
                className="text-gray-400 hover:text-white transition-colors duration-300 text-sm sm:text-base"
              >
                {course.name.split(' (')[0]}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Info */}
      <div className="text-center sm:text-left">
        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <FiPhone className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400 text-sm sm:text-base">+92 300 1234567</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <FiMail className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400 text-sm sm:text-base">info@aspirecollege.edu.pk</span>
          </div>
          <div className="flex items-center justify-center sm:justify-start space-x-3">
            <FiMapPin className="w-5 h-5 text-blue-400" />
            <span className="text-gray-400 text-sm sm:text-base">123 Education Street, City</span>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-gray-800 mt-8 pt-6 text-center">
      <p className="text-gray-400 text-xs sm:text-sm">
        © 2024 Aspire College. All rights reserved. | Designed for Excellence in Education
      </p>
    </div>
  </div>
</footer>

    </div>
  );
};

export default ModernCollegeHome;