// components/Contact.tsx
'use client'
import { useRef, useEffect, useState } from 'react'
import { gsap } from '../lib/gsap'
import { ScrollTrigger } from '../lib/gsap'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: 'Residential',
    message: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
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

    // Form animation
    gsap.fromTo(formRef.current,
      { 
        x: -50, 
        opacity: 0,
        scale: 0.95
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Info animation
    gsap.fromTo(infoRef.current,
      { 
        x: 50, 
        opacity: 0,
        scale: 0.95
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Floating elements animation
    gsap.to('.floating-element', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          projectType: 'Residential',
          message: '',
          budget: '',
          timeline: ''
        })
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const projectTypes = [
    { value: 'Residential', label: '🏠 Residential', description: 'Homes, Apartments, Villas' },
    { value: 'Commercial', label: '🏢 Commercial', description: 'Offices, Retail, Restaurants' },
    { value: 'Interior Design', label: '🎨 Interior Design', description: 'Full Interior Solutions' },
    { value: 'Renovation', label: '🔨 Renovation', description: 'Space Transformation' },
    { value: 'Consultation', label: '💡 Consultation', description: 'Expert Advice' }
  ]

  const budgets = [
    { value: '', label: 'Select Budget Range' },
    { value: 'under-25k', label: 'Under $25,000' },
    { value: '25k-50k', label: '$25,000 - $50,000' },
    { value: '50k-100k', label: '$50,000 - $100,000' },
    { value: '100k-250k', label: '$100,000 - $250,000' },
    { value: 'over-250k', label: 'Over $250,000' }
  ]

  const timelines = [
    { value: '', label: 'Select Timeline' },
    { value: 'immediate', label: '🚀 Immediate (1-3 months)' },
    { value: 'flexible', label: '⏱️ Flexible (3-6 months)' },
    { value: 'planning', label: '📅 Planning (6-12 months)' },
    { value: 'future', label: '🔮 Future (12+ months)' }
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 bg-white dark:bg-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 left-10 w-4 h-4 bg-amber-400 rounded-full opacity-60 floating-element"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-amber-300 rounded-full opacity-40 floating-element" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-3 h-3 bg-amber-500 rounded-full opacity-50 floating-element" style={{ animationDelay: '2s' }}></div>

      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 via-white to-gray-100/30 dark:from-gray-800/20 dark:via-gray-900 dark:to-black/20"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6">
            Start Your <span className="text-amber-500">Project</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your space? Let create something extraordinary together. Get in touch for a personalized consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div ref={formRef} className="bg-white dark:bg-gray-800 rounded-3xl p-8 lg:p-10 shadow-2xl border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="john@example.com"
                />
              </div>

              {/* Project Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type.value }))}
                      className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                        formData.projectType === type.value
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300'
                          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-amber-300'
                      }`}
                    >
                      <div className="text-sm font-medium">{type.label.split(' ')[0]}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{type.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Project Budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {budgets.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timeline
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    {timelines.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                  placeholder="Tell us about your vision, requirements, and any specific ideas you have..."
                />
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  The more details you provide, the better we can understand your needs.
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 font-medium rounded-xl transition-all duration-500 transform hover:scale-105 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Start Your Project Journey'
                )}
              </button>

              {/* Status Message */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-300 text-center">
                   Thank you! We have received your message and will contact you within 24 hours.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-center">
                  ❌ Something went wrong. Please try again or contact us directly.
                </div>
              )}

              <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Your information is secure and will never be shared.
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-amber-100 dark:border-amber-900/30">
              <h3 className="text-2xl font-light text-gray-900 dark:text-white mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group cursor-pointer hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors duration-300">
                    <span className="text-lg">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Visit Our Studio</h4>
                    <p className="text-gray-600 dark:text-gray-300">123 Design Street, Creative District<br />New York, NY 10001</p>
                    <button className="text-amber-500 text-sm font-medium mt-2 hover:text-amber-600 transition-colors">
                      Get Directions →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group cursor-pointer hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors duration-300">
                    <span className="text-lg">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Call Us Directly</h4>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                    <button className="text-amber-500 text-sm font-medium mt-2 hover:text-amber-600 transition-colors">
                      Call Now →
                    </button>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group cursor-pointer hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white group-hover:bg-amber-600 transition-colors duration-300">
                    <span className="text-lg">✉️</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Email Us</h4>
                    <p className="text-gray-600 dark:text-gray-300">hello@antra.com</p>
                    <button className="text-amber-500 text-sm font-medium mt-2 hover:text-amber-600 transition-colors">
                      Send Email →
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
              <h4 className="text-xl font-light text-gray-900 dark:text-white mb-4">Business Hours</h4>
              <div className="space-y-3">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
                  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
                  { day: 'Sunday', hours: 'Closed' }
                ].map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                    <span className="text-gray-600 dark:text-gray-400">{schedule.day}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-amber-500 rounded-3xl p-8 text-white">
              <h4 className="text-xl font-light mb-3">Quick Response Guarantee</h4>
              <p className="text-amber-100 mb-4">
                We respond to all inquiries within 2 hours during business days. Your project is important to us.
              </p>
              <div className="flex items-center space-x-2 text-amber-200">
             
                <span className="text-sm">24/7 Emergency Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx global>{`
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        /* Smooth focus transitions */
        input, textarea, select {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Custom scrollbar */
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        
        textarea::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb {
          background: #f59e0b;
          border-radius: 3px;
        }
        
        textarea::-webkit-scrollbar-thumb:hover {
          background: #d97706;
        }
      `}</style>
    </section>
  )
}