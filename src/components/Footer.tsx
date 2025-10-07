'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Instagram', icon: '📱' },
    { name: 'Facebook', icon: '📘' },
    { name: 'Pinterest', icon: '📌' },
    { name: 'LinkedIn', icon: '💼' },
  ]

  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-12 transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-full"></div>
              <span className="font-playfair text-2xl font-bold">Antra</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Creating timeless architectural masterpieces that blend innovation with elegance. 
              Transforming spaces and lives through exceptional design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="#"
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center hover:bg-gold dark:hover:bg-gold transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-xl font-bold mb-4">Services</h4>
            <ul className="space-y-2">
              {['Architectural Design', 'Interior Design', 'Project Management', 'Consultation'].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-gold dark:hover:text-gold transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-300 dark:border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
            © {currentYear} Antra Architecture. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-gold dark:hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold dark:hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold dark:hover:text-gold transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
