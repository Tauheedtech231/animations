"use client";

import React, { useState } from "react";
import { FiInfo, FiMessageCircle, FiCreditCard, FiCheck, FiPhone } from "react-icons/fi";

interface Notification {
  id: number;
  title: string;
  description: string;
  date: string;
  read: boolean;
  type: "info" | "message" | "payment";
  contact?: string; // optional contact for WhatsApp link
}

const notificationsData: Notification[] = [
  {
    id: 1,
    title: "Application Submitted",
    description: "Your application for Computer Science has been submitted successfully.",
    date: "2025-09-28 10:00 AM",
    read: false,
    type: "info",
  },
  {
    id: 2,
    title: "Fee Payment Reminder",
    description: "Please pay your pending fee for the semester before 30th September.",
    date: "2025-09-27 08:30 AM",
    read: true,
    type: "payment",
  },
  {
    id: 3,
    title: "Interview Scheduled",
    description: "Your interview for Electrical Engineering is scheduled on 1st October.",
    date: "2025-09-26 02:15 PM",
    read: false,
    type: "message",
    contact: "+923001234567", // example WhatsApp number
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <FiInfo className="w-5 h-5 text-blue-500" />;
      case "message":
        return <FiMessageCircle className="w-5 h-5 text-green-500" />;
      case "payment":
        return <FiCreditCard className="w-5 h-5 text-yellow-500" />;
      default:
        return <FiInfo className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          🔔 Notifications
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
              {unreadCount}
            </span>
          )}
        </h2>
        <button
          onClick={markAllAsRead}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-1"
        >
          <FiCheck /> Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            onClick={() => toggleRead(notification.id)}
            className={`flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-2xl border transition-all transform cursor-pointer
              ${
                notification.read
                  ? "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-[1.01]"
                  : "bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-700 hover:shadow-lg hover:scale-[1.02]"
              }`}
          >
            <div className="flex items-start md:items-center gap-3">
              {!notification.read ? (
                <span className="w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse mt-1"></span>
              ) : (
                <span className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full mt-1"></span>
              )}

              <div className="flex items-start md:items-center gap-3">
                <div className="p-2 bg-white rounded-full shadow-md flex items-center justify-center">
                  {getIcon(notification.type)}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{notification.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 md:mt-0">
              <span className="text-xs text-gray-500 dark:text-gray-400">{notification.date}</span>
              {/* WhatsApp button for messages */}
              {notification.type === "message" && notification.contact && (
                <a
                  href={`https://wa.me/${notification.contact}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600 transition-colors"
                >
                  <FiPhone className="w-4 h-4" /> WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
