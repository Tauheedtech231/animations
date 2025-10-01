"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Default links
  const defaultLinks = [
    { href: "/", label: "Home" },
    { href: "/applicant_portal", label: "Applicant Portal" },
  ];

  // Extra applicant portal links
  const applicantLinks = [
    { href: "/applicant_portal", label: "Dashboard" },
    { href: "/applicant_portal/my_application", label: "My Applications" },
    { href: "/applicant_portal/fee_mange", label: "Fee Payment" },
    { href: "/applicant_portal/notification_page", label: "Notifications" },
    { href: "/applicant_portal/result_page", label: "Results" },
  ];

  // Decide navLinks based on current path
  const navLinks = pathname.startsWith("/applicant_portal")
    ? [...defaultLinks, ...applicantLinks]
    : defaultLinks;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0d1117]/70 shadow-md transition-all border-b border-gray-200/20 dark:border-gray-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 relative">
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2907/2907250.png"
                alt="Online School Logo"
                width={40}
                height={40}
                priority
              />
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600">
              School
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              // Use label+href+idx as key to guarantee uniqueness
              const key = `${link.label}-${link.href}-${idx}`;
              return (
                <Link
                  key={key}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-blue-600 transition-all duration-500 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <button
                onClick={logout}
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:from-red-600 hover:to-pink-600 transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-transform transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign_up"
                  className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-md hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition"
              aria-expanded={isMenuOpen}
            >
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-[#0d1117] shadow-inner overflow-hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: -10 },
                visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
              }}
              className="pt-3 pb-6 space-y-2 px-4 sm:px-6"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-blue-600"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {isAuthenticated && user ? (
                <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:from-red-600 hover:to-pink-600 transition-transform transform hover:scale-105"
                  >
                    Logout
                  </button>
                </motion.div>
              ) : (
                <>
                  <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <Link
                      href="/auth/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 transition"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <Link
                      href="/auth/sign_up"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-105"
                    >
                      Sign Up
                    </Link>
                  </motion.div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
