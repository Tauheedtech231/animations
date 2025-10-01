'use client';

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { 
  FiBell, 
  FiUser, 
  FiFileText, 
  FiUpload, 
  FiCreditCard, 
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiXCircle,
  FiEdit,
  FiEye,
  FiArrowRight,
  FiHelpCircle,
  FiCalendar,
  FiBook,
} from 'react-icons/fi';
import Link from 'next/link';
import { jsPDF } from "jspdf";

// Define types
interface Application {
  id: string;
  program: string;
  status: "Submitted" | "In Review" | "Accepted" | "Rejected";
  statusColor: string;
  submittedDate?: string;
  lastUpdated?: string;
  documents?: string[];
}

const Dashboard = () => {
  const {user}=useAuth();

  const STORAGE_KEY = "multistep-form-data"
  useEffect(()=>{
    const storedData = localStorage.getItem(STORAGE_KEY);

if (storedData) {
  const parsedData = JSON.parse(storedData);
  console.log(parsedData.name); // "John"
}
  },[])
const [applications, setApplications] = useState<Application[]>([
  {
    id: "APP2024-001",
    program: "ICS ",
    status: "Submitted",
    statusColor: "bg-yellow-100 text-yellow-800 border border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800",
    submittedDate: "2024-01-15",
    lastUpdated: "2024-01-15",
    documents: ["Transcript", "Character Certificate", "B-Form Copy"]
  },
  {
    id: "APP2024-002",
    program: "F.Sc Pre-Medical",
    status: "In Review",
    statusColor: "bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
    submittedDate: "2024-01-10",
    lastUpdated: "2024-01-18",
    documents: ["Transcript", "CNIC/B-Form", "Passport Size Photos"]
  },
  {
    id: "APP2024-003",
    program: "I.Com ",
    status: "Accepted",
    statusColor: "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800",
    submittedDate: "2024-01-05",
    lastUpdated: "2024-01-20",
    documents: ["Transcript", "Character Certificate", "Domicile"]
  },
]);


  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedApplication, setEditedApplication] = useState<Application | null>(null);

  const handleViewEdit = (application: Application) => {
    setSelectedApplication(application);
    setEditedApplication({ ...application });
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (editedApplication) {
      setApplications(prev => 
        prev.map(app => 
          app.id === editedApplication.id ? editedApplication : app
        )
      );
      setIsEditModalOpen(false);
      setSelectedApplication(null);
      setEditedApplication(null);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedApplication(null);
    setEditedApplication(null);
  };

  const handleInputChange = (field: keyof Application, value: string) => {
    if (editedApplication) {
      setEditedApplication(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 font-sans">
      <div className="flex-1 flex flex-col">
<header className="bg-gradient-to-r from-blue-500 to-blue-700 border border-white/30 dark:border-gray-600/30 sticky top-0 z-50 rounded-3xl shadow-lg mx-4 my-4">
  <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between px-6 py-4 h-16 sm:h-20 text-center sm:text-left">
    {/* Title + Welcome */}
    <div>
      <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
        Student Portal
      </h2>
      <p className="text-xs sm:text-sm text-white/90 dark:text-white/80">
        Welcome back {user?.firstName}
      </p>
    </div>

    {/* Right Section */}
    <div className="hidden sm:flex items-center gap-4">
      {/* Notifications */}
      <button className="relative p-3 rounded-full bg-white/20 border border-white/40 hover:border-white/70 transition-all hover:shadow-lg dark:bg-gray-800/30 dark:border-gray-600/40 dark:hover:border-gray-400">
        <FiBell className="w-5 h-5 text-white" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {/* Profile */}
      <div className="relative">
        <button className="flex items-center gap-3 p-2 rounded-full bg-white/20 border border-white/40 hover:border-white/70 transition-all dark:bg-gray-800/30 dark:border-gray-600/40 dark:hover:border-gray-400">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-300 to-purple-500 rounded-full flex items-center justify-center">
            <FiUser className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-white">{user?.firstName}</p>
            <p className="text-xs text-white/80 dark:text-white/70">Computer Science</p>
          </div>
        </button>
      </div>
    </div>
  </div>
</header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-8 max-w-7xl mx-auto w-full">
          <ApplicationStatus />
          <ApplicationsTable 
            applications={applications} 
            onViewEdit={handleViewEdit} 
          />
          <QuickActionsGrid />
          <GuidanceTips />
        </main>

        {/* Edit/View Modal */}
        {isEditModalOpen && editedApplication && (
          <EditApplicationModal
            application={editedApplication}
            onSave={handleSaveChanges}
            onCancel={handleCancelEdit}
            onInputChange={handleInputChange}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced Application Status Component
const ApplicationStatus = () => {
  const [progress, setProgress] = useState(60);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const progressOffset = circumference - (progress / 100) * circumference;
    setOffset(progressOffset);
  }, [progress, circumference]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 sm:p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Progress Circle */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            <svg className="w-40 h-40 sm:w-48 sm:h-48 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200 dark:text-gray-700"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 block">
                  {progress}%
                </span>
                <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Details */}
        <div className="flex-1 space-y-6 w-full">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Application Progress
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              You have completed <span className="font-semibold">{progress}%</span> of your application. Keep going to finish the remaining steps!
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <Step label="Personal Information" status="completed" />
            <Step label="Academic History" status="completed" />
            <Step label="Documents Upload" status="in-progress" />
            <Step label="Review & Submit" status="pending" />
          </div>

          <Link
            href="/applicant_portal/my_application"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all transform hover:-translate-y-0.5 shadow-lg mt-4 sm:mt-6"
          >
            Continue Application
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

interface StepProps {
  label: string;
  status: "completed" | "in-progress" | "pending";
}

const Step = ({ label, status }: StepProps) => {
  let icon;
  let textColor;

  switch (status) {
    case "completed":
      icon = <FiCheckCircle className="w-5 h-5 text-green-500" />;
      textColor = "text-gray-700 dark:text-gray-300";
      break;
    case "in-progress":
      icon = <FiClock className="w-4 h-4 text-yellow-500" />;
      textColor = "text-yellow-600 dark:text-yellow-500";
      break;
    case "pending":
      icon = <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded"></div>;
      textColor = "text-gray-400 dark:text-gray-500";
      break;
  }

  return (
    <div className="flex items-center justify-between">
      <span className={`text-sm font-medium ${textColor}`}>{label}</span>
      {status === "in-progress" ? (
        <div className="flex items-center gap-2">
          <span className="text-sm text-yellow-600 dark:text-yellow-500">In Progress</span>
          {icon}
        </div>
      ) : (
        icon
      )}
    </div>
  );
};

// Enhanced Applications Table Component
interface ApplicationsTableProps {
  applications: Application[];
  onViewEdit: (application: Application) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ applications, onViewEdit }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Submitted":
        return <FiClock className="w-4 h-4" />;
      case "In Review":
        return <FiAlertCircle className="w-4 h-4" />;
      case "Accepted":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">My Applications</h3>
            <p className="text-gray-600 dark:text-gray-400">Track and manage your applications</p>
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block">
      <table className="w-full">
  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
    <tr>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Application ID</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Program</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Submitted Date</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Actions</th>
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
    {applications.map((app) => (
      <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="px-6 py-4">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{app.id}</div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900 dark:text-gray-100">{app.program}</div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">{app.submittedDate}</div>
        </td>
        <td className="px-6 py-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
            {getStatusIcon(app.status)}
            {app.status}
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewEdit(app)}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
              title="View details"
            >
              <FiEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewEdit(app)}
              className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 dark:text-green-400 dark:hover:text-green-300 dark:hover:bg-green-900/30 rounded-lg transition-colors"
              title="Edit application"
            >
              <FiEdit className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-6">
        {applications.map((app) => (
          <div key={app.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md dark:hover:shadow-gray-700/20 transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{app.id}</div>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${app.statusColor}`}>
                {getStatusIcon(app.status)}
                {app.status}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Program:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{app.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Submitted:</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{app.submittedDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={() => onViewEdit(app)}
                className="flex-1 py-2 text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-center"
              >
                View Details
              </button>
              <button
                onClick={() => onViewEdit(app)}
                className="flex-1 py-2 text-green-600 dark:text-green-400 font-medium rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors text-center"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Edit Application Modal Component
interface EditApplicationModalProps {
  application: Application;
  onSave: () => void;
  onCancel: () => void;
  onInputChange: (field: keyof Application, value: string) => void;
}

const EditApplicationModal: React.FC<EditApplicationModalProps> = ({
  application,
  onSave,
  onCancel,
  onInputChange,
}) => {
  const programOptions = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biomedical Engineering"
  ];

  const statusOptions = [
    { value: "Submitted", label: "Submitted", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300" },
    { value: "In Review", label: "In Review", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300" },
    { value: "Accepted", label: "Accepted", color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" },
    { value: "Rejected", label: "Rejected", color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Application Details</h2>
              <p className="text-blue-100 dark:text-blue-200 mt-1">Manage your application information</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FiXCircle className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Application ID */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiFileText className="w-4 h-4" />
              Application ID
            </label>
            <input
              type="text"
              value={application.id}
              disabled
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
            />
          </div>

          {/* Program Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiBook className="w-4 h-4" />
              Program
            </label>
            <select
              value={application.program}
              onChange={(e) => onInputChange('program', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 transition-all"
            >
              {programOptions.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </div>

          {/* Status Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FiAlertCircle className="w-4 h-4" />
              Status
            </label>
            <select
              value={application.status}
              onChange={(e) => onInputChange('status', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-600 transition-all"
            >
              {statusOptions.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Documents Section */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              <FiUpload className="w-4 h-4" />
              Required Documents
            </label>
            <div className="space-y-3">
              {application.documents?.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <FiFileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{doc}</span>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-full border border-green-200 dark:border-green-800">
                    Uploaded
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Timeline */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h4 className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              <FiCalendar className="w-4 h-4" />
              Application Timeline
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Submitted Date:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{application.submittedDate}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Last Updated:</span>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{application.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="flex-1 px-6 py-3 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium shadow-lg flex items-center justify-center gap-2"
          >
            <FiCheckCircle className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Quick Actions Grid Component
const QuickActionsGrid = () => {
  const { user } = useAuth();
  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File | null;
  }>({
    bForm: null,
    feeVoucher: null,
    admissionLetter: null,
  });

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploadedFiles((prev) => ({ ...prev, [docType]: file }));
    }
  };

  // Handle Fee Challan Download
  const handleDownloadChallan = () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Fee Payment Challan", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${user.firstName} ${user.lastName}`, 20, 40);
    doc.text(`Email: ${user.email}`, 20, 50);
    doc.text(`Role: ${user.role}`, 20, 60);
    doc.text("Program: Computer Science", 20, 70);
    doc.text("Amount: $500", 20, 80);
    doc.text("Due Date: 30-Sep-2025", 20, 90);
    doc.save(`Fee_Challan_${user.firstName}_${user.lastName}.pdf`);
  };

  const quickActions = [
    {
      icon: <FiUpload className="w-6 h-6" />,
      title: "Upload Documents",
      description: "Submit required documents",
      color: "from-blue-500 to-blue-600",
      items: [
        { label: "B-Form", key: "bForm", icon: <FiFileText className="w-4 h-4" /> },
        { label: "Fee Voucher", key: "feeVoucher", icon: <FiCreditCard className="w-4 h-4" /> },
        { label: "Admission Letter", key: "admissionLetter", icon: <FiBook className="w-4 h-4" /> },
      ],
    },
    {
      icon: <FiCreditCard className="w-6 h-6" />,
      title: "Fee Payment",
      description: "Manage your payments",
      color: "from-green-500 to-green-600",
      actions: [
        { label: "Pay Online", action: () =>  window.location.href = "/applicant_portal/fee_mange" },
        { label: "Download Challan", action: handleDownloadChallan },
      ],
    },
  ];

  // Render file preview
  const renderFilePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    if (file.type.startsWith("image/")) {
      return <img src={url} alt={file.name} className="w-24 h-24 object-cover rounded-lg" />;
    } else if (file.type === "application/pdf") {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">
          {file.name} (PDF)
        </a>
      );
    } else {
      return <span className="text-gray-700 dark:text-gray-300">{file.name}</span>;
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {quickActions.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${section.color}`}>{section.icon}</div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{section.description}</p>
            </div>
          </div>

          {section.items && (
            <div className="space-y-4 mb-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col gap-2">
                  <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer transition-all hover:shadow-md dark:hover:shadow-gray-700/20">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">{item.icon}</div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">{item.label}</span>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, item.key)}
                    />
                    <FiUpload className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                  </label>

                  {/* Show uploaded file preview with option to replace */}
                  {uploadedFiles[item.key] && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                      {renderFilePreview(uploadedFiles[item.key]!)}
                      <button
                        className="ml-auto px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={() =>
                          setUploadedFiles((prev) => ({ ...prev, [item.key]: null }))
                        }
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {section.actions && (
            <div className="flex flex-col sm:flex-row gap-3">
              {section.actions.map((action, actionIndex) => (
                <button
                  key={actionIndex}
                  onClick={action.action}
                  className={`flex-1 py-3 px-4 font-medium rounded-xl transition-all transform hover:-translate-y-0.5 ${
                    actionIndex === 0
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Enhanced Guidance Tips Component
const GuidanceTips = () => {
  const tips = [
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMfxlZBwE5WC69G-ABNQG2t40VDcXhnhot7PiNoNxR7UhI5cB1EdqB6d5tj2GKi1trIQkNyEHbUwwIqfhxpRecQNanqJ2Rbw1Bq6QkyCR_1I6PVL0D-mVWNhQL8tf0fRiCQ8vZzbiyxH6YV7PtS4U4w_itZbklbeza1gwX58gsHBIUvdviDp3SrfLznKMgOwHfcnt10jbV3ds1KyXVaSYK9Jyf3u7-Go4fQyOC8TyL7ZtDghlQPtTNesrmqITR7IT026xTBPQeJM8",
      title: "Complete Your Application",
      description: "Ensure all sections are filled accurately to avoid delays.",
      icon: <FiCheckCircle className="w-6 h-6" />
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC-2KRiyNcjZqWlvgPmEEQmPYFR5fthFYJyrsFoeLJxB0L58uEoE95Ot08gRf5BARV1laN8jIuAnWb3oAWzSo9aoerGCdBgUlCbJ3d6xyrxEeXmdlGduYxpdTbFzDWo8e6OtCXeG9Y2vQ_Gl7l8L05KR3m4e4Ip80rwaVHOwvoH4KvIJIo8lwncxp-WgNyg8QvoNQRFhfOZ1wK5ZRLamX9cMAoOkINHsKBz-QUWnlgJFu1uiaMXj7u-CrNbpcKYRDkGQlwk7aDonZg",
      title: "Prepare for Interviews",
      description: "Practice common questions and showcase your achievements.",
      icon: <FiHelpCircle className="w-6 h-6" />
    },
    {
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3g9zNqIbxQsjEOZHtbDS_NDSh3YuvS5ZVIHIQvk8QhenSHj6PIEqM5D1cbAQ5oER1SZu5U68FMqTJcNrPZ1ZzRd_LpllLhBNLDMBY1MZf51YNYEm5FBq7bL-TpC_O_tmzt5n4Pc4hc-PdxSRvjSYD-_W1xkatZQMY1A_9wA9OfWkmkeWUtvu6RER1_x3Q6RlklF9d_f7udhhQtNgkRExVUsspx1oCOKr-QnJ6rkxKcxUQbEAqoyPXzYc-mJ1xp8dSmsF1Q7R7owk",
      title: "Stay Updated",
      description: "Regularly check your application status and notifications.",
      icon: <FiBell className="w-6 h-6" />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Guidance & Support</h3>
          <p className="text-gray-600 dark:text-gray-400">Helpful tips to complete your application successfully</p>
        </div>
        
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tips.map((tip, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/20 transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={tip.image}
                alt={tip.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-lg">
                {tip.icon}
              </div>
            </div>
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{tip.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{tip.description}</p>
             <Link href="/applicant_portal/guidance"> <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium flex items-center gap-2 transition-colors">
                Learn More
                <FiArrowRight className="w-4 h-4" />
              </button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;