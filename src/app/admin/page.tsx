"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiBarChart2,
  FiSettings,
  FiBell,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
  FiMenu,
  FiX,
  FiUser,
  FiLogOut,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiPlus
} from "react-icons/fi";

// ---------- Sidebar Component ----------
interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const menuItems: SidebarItem[] = [
    { icon: <FiHome size={20} />, label: "Dashboard", href: "/admin", active: true },
    { icon: <FiUsers size={20} />, label: "Applicants", href: "/admin/applicants", badge: 24 },
    { icon: <FiBook size={20} />, label: "Programs", href: "/admin/programs" },
    { icon: <FiBarChart2 size={20} />, label: "Analytics", href: "/admin/analytics" },
    { icon: <FiSettings size={20} />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-80 transform transition-all duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col bg-white border-r border-gray-200 shadow-lg
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EC</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">EduConnect</h1>
                <p className="text-sm text-gray-500">Admin Portal</p>
              </div>
            </div>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              <FiX size={20} className="text-gray-600" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <FiUser size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@educonnect.com</p>
              </div>
              <FiChevronDown size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${item.active 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <div className={`
                  transition-colors
                  ${item.active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}
                `}>
                  {item.icon}
                </div>
                <span className="font-medium flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[24px] text-center">
                    {item.badge}
                  </span>
                )}
                {item.active && (
                  <div className="w-1 h-6 bg-blue-600 rounded-full absolute right-4"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full transition-colors">
              <FiLogOut size={20} className="text-gray-400" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

// ---------- Header Component ----------
interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-4">
          <button 
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={onMenuToggle}
          >
            <FiMenu size={20} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Applicant Management</h1>
            <p className="text-sm text-gray-500">Review and manage applications</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <div className="relative">
              <FiSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search applicants..."
                className="pl-10 pr-4 py-2.5 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <FiBell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
              <FiUser size={16} className="text-white" />
            </div>
            <FiChevronDown size={16} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
};

// ---------- Stats Cards Component ----------
const StatsCards = () => {
  const stats = [
    {
      title: "Total Applicants",
      value: "2,847",
      change: "+12.4%",
      trend: "up",
      icon: <FiUsers size={24} />,
      color: "blue"
    },
    {
      title: "Pending Review",
      value: "156",
      change: "+5.2%",
      trend: "up",
      icon: <FiClock size={24} />,
      color: "yellow"
    },
    {
      title: "Approved",
      value: "1,892",
      change: "+8.1%",
      trend: "up",
      icon: <FiCheckCircle size={24} />,
      color: "green"
    },
    {
      title: "Rejected",
      value: "432",
      change: "-2.3%",
      trend: "down",
      icon: <FiXCircle size={24} />,
      color: "red"
    }
  ];

  const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200"
      },
      yellow: {
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200"
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200"
      },
      red: {
        bg: "bg-red-50",
        text: "text-red-600",
        border: "border-red-200"
      }
    };
    return colors[color as keyof typeof colors][type as keyof (typeof colors)[keyof typeof colors]];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last week
              </div>
            </div>
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color, 'bg')} ${getColorClasses(stat.color, 'border')}`}>
              <div className={getColorClasses(stat.color, 'text')}>
                {stat.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ---------- Quick Actions Component ----------
const QuickActions = () => {
  const actions = [
    {
      icon: <FiPlus size={20} />,
      label: "Add New Program",
      description: "Create a new academic program",
      color: "blue"
    },
    {
      icon: <FiDownload size={20} />,
      label: "Export Data",
      description: "Download applicant reports",
      color: "green"
    },
    {
      icon: <FiUsers size={20} />,
      label: "Manage Users",
      description: "Admin user management",
      color: "purple"
    },
    {
      icon: <FiSettings size={20} />,
      label: "System Settings",
      description: "Configure application settings",
      color: "gray"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-500 hover:bg-blue-600",
      green: "bg-green-500 hover:bg-green-600",
      purple: "bg-purple-500 hover:bg-purple-600",
      gray: "bg-gray-500 hover:bg-gray-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`p-4 rounded-lg text-white text-left transition-all hover:shadow-md ${getColorClasses(action.color)}`}
          >
            <div className="mb-3">{action.icon}</div>
            <p className="font-semibold mb-1">{action.label}</p>
            <p className="text-white/80 text-sm">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// ---------- Admin Page ----------
interface Applicant {
  id: string;
  name: string;
  email: string;
  program: string;
  status: "Pending" | "Approved" | "Rejected";
  appliedDate: string;
  score: number;
}

const applicantsData: Applicant[] = [
  { id: "APP001", name: "Sarah Johnson", email: "sarah.j@example.com", program: "Computer Science", status: "Pending", appliedDate: "2024-01-15", score: 87 },
  { id: "APP002", name: "Michael Chen", email: "michael.c@example.com", program: "Business Administration", status: "Approved", appliedDate: "2024-01-14", score: 92 },
  { id: "APP003", name: "Emily Davis", email: "emily.d@example.com", program: "Engineering", status: "Rejected", appliedDate: "2024-01-13", score: 76 },
  { id: "APP004", name: "James Wilson", email: "james.w@example.com", program: "Psychology", status: "Pending", appliedDate: "2024-01-12", score: 88 },
  { id: "APP005", name: "Lisa Martinez", email: "lisa.m@example.com", program: "Biology", status: "Approved", appliedDate: "2024-01-11", score: 94 },
  { id: "APP006", name: "David Kim", email: "david.k@example.com", program: "Computer Science", status: "Pending", appliedDate: "2024-01-10", score: 81 },
  { id: "APP007", name: "Rachel Brown", email: "rachel.b@example.com", program: "Business Administration", status: "Approved", appliedDate: "2024-01-09", score: 89 },
];

export default function AdminDashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [programFilter, setProgramFilter] = useState("All Programs");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter applicants
  const filteredApplicants = useMemo(() => {
    return applicantsData.filter((applicant) => {
      const matchesProgram =
        programFilter === "All Programs" || applicant.program === programFilter;
      const matchesStatus =
        statusFilter === "All Statuses" || applicant.status === statusFilter;
      const matchesSearch = 
        searchTerm === "" || 
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesProgram && matchesStatus && matchesSearch;
    });
  }, [programFilter, statusFilter, searchTerm]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border border-yellow-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <FiCheckCircle size={14} className="text-green-600" />;
      case "Rejected":
        return <FiXCircle size={14} className="text-red-600" />;
      default:
        return <FiClock size={14} className="text-yellow-600" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-900">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      
      <div className="flex-1 flex flex-col lg:ml-0 min-w-0">
        <Header onMenuToggle={() => setMobileOpen(!mobileOpen)} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards */}
            <StatsCards />

            {/* Quick Actions */}
            <QuickActions />

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Applicant List</h2>
                  <p className="text-gray-600">Manage and review all applications</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Mobile Search */}
                  <div className="lg:hidden relative">
                    <FiSearch size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search applicants..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>

                  <select
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                  >
                    <option>All Programs</option>
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Engineering</option>
                    <option>Psychology</option>
                    <option>Biology</option>
                  </select>
                  
                  <select
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option>All Statuses</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>

                  <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 justify-center">
                    <FiFilter size={16} />
                    Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Applicants Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Applications ({filteredApplicants.length})
                  </h3>
                  <button className="px-4 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors font-medium flex items-center gap-2">
                    <FiDownload size={16} />
                    Export CSV
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Program
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Applied
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredApplicants.map((applicant) => (
                      <tr key={applicant.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                              <FiUser size={16} className="text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {applicant.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {applicant.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{applicant.program}</div>
                          <div className="text-xs text-gray-500">{applicant.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {applicant.appliedDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-blue-700 h-2 rounded-full" 
                                style={{ width: `${applicant.score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {applicant.score}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                            {getStatusIcon(applicant.status)}
                            {applicant.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button 
                              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View details"
                            >
                              <FiEye size={16} />
                            </button>
                            <button 
                              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit application"
                            >
                              <FiEdit size={16} />
                            </button>
                            <button 
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete application"
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredApplicants.length}</span> of{' '}
                    <span className="font-medium">{filteredApplicants.length}</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1">
                      Previous
                    </button>
                    <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                      1
                    </button>
                    <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1">
                      Next
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}