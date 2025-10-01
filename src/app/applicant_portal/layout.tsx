'use client';

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={inter.variable + " font-sans bg-gray-50 dark:bg-[#0d1117] min-h-screen"}>
      {/* Font Icon Link (should be in _app or root layout, but safe here for now) */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=optional"
        rel="stylesheet"
      />

      {/* Main Content Only (no sidebar) */}
      <main className="min-h-screen w-full overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
