'use client';

import { Inter } from "next/font/google";
import Sidebar from "@/components/applicant/Sidebar";
import { useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={inter.variable + " font-sans bg-gray-50 dark:bg-[#0d1117] min-h-screen"}>
      {/* Font Icon Link (should be in _app or root layout, but safe here for now) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
        rel="stylesheet"
      />
      <div className="flex h-screen mt-[5px]">
        {/* Mobile Sidebar Overlay */}
        {mobileOpen && (
          <aside className="fixed inset-0 z-50 bg-black/30 lg:hidden" onClick={() => setMobileOpen(false)} />
        )}

        {/* Sidebar */}
        <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setMobileOpen(true)}
          >
            ☰ Menu
          </button>

          {children}
        </main>
      </div>
    </div>
  );
}
