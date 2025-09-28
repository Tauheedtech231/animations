"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  console.log("Auth State:", { user, isAuthenticated })

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/courses", label: "Courses" },
    { href: "/about", label: "About" },
    { href: "/applicant_portal", label: "Applicant Portal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 dark:bg-[#0d1117]/80 shadow-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="h-10 w-10 rounded-full bg-[#1172d4] flex items-center justify-center text-white font-bold text-xl transform transition-transform duration-300 group-hover:scale-110">
              N
            </div>
            <span className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-[#1172d4]">
             Champion School
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-[#1172d4]"
                      : "text-gray-500 dark:text-gray-300 hover:text-[#1172d4]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#1172d4] transition-all duration-500 ease-out ${
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
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-[#1172d4] px-3 py-2 text-sm font-medium transition-transform transform hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign_up"
                  className="bg-[#1172d4] text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-transform transform hover:scale-105"
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
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
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
            className="md:hidden bg-white dark:bg-[#0d1117] shadow-inner overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1 px-4 sm:px-6">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1172d4] transition-colors duration-300`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {isAuthenticated && user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600 transition-transform transform hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[#1172d4] transition-transform transform hover:scale-105"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/sign_up"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium bg-[#1172d4] text-white hover:bg-blue-700 transition-transform transform hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
