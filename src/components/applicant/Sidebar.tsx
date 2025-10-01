'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FiHome,
  FiFileText,
  FiCreditCard,
  FiBell,
  FiBarChart2,
} from 'react-icons/fi';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    { icon: <FiHome />, label: 'Dashboard', href: '/applicant_portal' },
    { icon: <FiFileText />, label: 'My Applications', href: '/applicant_portal/my_application' },
    { icon: <FiCreditCard />, label: 'Fee Payment', href: '/applicant_portal/fee_mange' },
    { icon: <FiBell />, label: 'Notifications', href: '/applicant_portal/notification_page' },
    { icon: <FiBarChart2 />, label: 'Results', href: '/applicant_portal/result_page' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-[#0d1117] border-r border-gray-200 dark:border-gray-800 shadow-md">
        <SidebarContent pathname={pathname} menuItems={menuItems} />
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 z-50 bg-white dark:bg-[#0d1117] border-r border-gray-200 dark:border-gray-800 shadow-md transform transition-transform duration-300 lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-gray-700 dark:text-gray-300 text-2xl"
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </button>
        </div>
        <SidebarContent pathname={pathname} menuItems={menuItems} />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

// Sidebar content component
const SidebarContent: React.FC<{
  pathname: string;
  menuItems: SidebarItem[];
}> = ({ pathname, menuItems }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="size-9 flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 text-white shadow-md">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path
              d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
          EduConnect
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
