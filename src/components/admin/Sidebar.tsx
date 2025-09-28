// components/admin/Sidebar.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar = () => {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      name: "Applicants",
      href: "/admin/applicants",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      ),
    },
    {
      name: "Programs",
      href: "/admin/programs",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 7l-10 5 10 5 10-5-10-5z"/>
        </svg>
      ),
    },
    {
      name: "Approvals",
      href: "/admin/approvals",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 16.17l-3.88-3.88a.996.996 0 1 0-1.41 1.41l4.59 4.59a.996.996 0 0 0 1.41 0l9.59-9.59a.996.996 0 1 0-1.41-1.41L9 16.17z"/>
        </svg>
      ),
    },
    {
      name: "Notifications",
      href: "/admin/notifications",
      icon: (
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 22c1.1 0 1.99-.9 1.99-2H10c0 1.1.89 2 2 2zm6-6V9c0-3.07-1.63-5.64-4.5-6.32V2h-3v.68C7.64 3.36 6 5.92 6 9v7l-2 2v1h16v-1l-2-2z"/>
        </svg>
      ),
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between shadow-lg border-r border-gray-200 dark:border-gray-700">
      {/* User Info */}
      <div>
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {currentUser
              ? currentUser.firstName.charAt(0) + currentUser.lastName.charAt(0)
              : "A"}
          </div>
          <h1 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
            {currentUser
              ? `${currentUser.firstName} ${currentUser.lastName}`
              : "Admin User"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {currentUser?.role || "Admin"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white shadow-inner"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Logout */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition"
          onClick={() => {
            localStorage.removeItem("currentUser");
            window.location.href = "/auth/login";
          }}
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
