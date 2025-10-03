"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import {
  FiFileText,
  FiDownload,
  FiPrinter,
  FiUser,
  FiBook,
  FiDollarSign,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSearch,
} from "react-icons/fi";

// Mock JSON Data for Multiple Students
const studentsData = [
  {
    userId: "ASP2025-001",
    name: "Ali Khan",
    program: "Intermediate in Pre-Engineering",
    session: "Fall 2025",
    startDate: "September 1, 2025",
    duration: "2 Years",
    fees: [
      { item: "Tuition Fee", amount: "PKR 50,000" },
      { item: "Hostel Fee", amount: "PKR 10,000" },
      { item: "Library Fee", amount: "PKR 2,000" },
      { item: "Sports Fee", amount: "PKR 1,500" },
      { item: "Medical Fee", amount: "PKR 1,000" },
    ],
    deadlines: {
      documentSubmission: "August 15, 2025",
      feePayment: "August 25, 2025",
      registration: "August 30, 2025",
      orientation: "September 1, 2025",
    },
  },
  {
    userId: "ASP2025-002",
    name: "Sara Ahmed",
    program: "Intermediate in Computer Science",
    session: "Fall 2025",
    startDate: "September 1, 2025",
    duration: "2 Years",
    fees: [
      { item: "Tuition Fee", amount: "PKR 45,000" },
      { item: "Hostel Fee", amount: "PKR 10,000" },
      { item: "Library Fee", amount: "PKR 2,000" },
      { item: "Computer Lab Fee", amount: "PKR 3,000" },
      { item: "Medical Fee", amount: "PKR 1,000" },
    ],
    deadlines: {
      documentSubmission: "August 15, 2025",
      feePayment: "August 25, 2025",
      registration: "August 30, 2025",
      orientation: "September 1, 2025",
    },
  },
  {
    userId: "ASP2025-003",
    name: "Ahmed Raza",
    program: "Intermediate in Pre-Medical",
    session: "Fall 2025",
    startDate: "September 1, 2025",
    duration: "2 Years",
    fees: [
      { item: "Tuition Fee", amount: "PKR 48,000" },
      { item: "Hostel Fee", amount: "PKR 10,000" },
      { item: "Library Fee", amount: "PKR 2,000" },
      { item: "Lab Fee", amount: "PKR 4,000" },
      { item: "Medical Fee", amount: "PKR 1,000" },
    ],
    deadlines: {
      documentSubmission: "August 15, 2025",
      feePayment: "August 25, 2025",
      registration: "August 30, 2025",
      orientation: "September 1, 2025",
    },
  },
  {
    userId: "ASP2025-004",
    name: "Fatima Noor",
    program: "Intermediate in Commerce",
    session: "Fall 2025",
    startDate: "September 1, 2025",
    duration: "2 Years",
    fees: [
      { item: "Tuition Fee", amount: "PKR 40,000" },
      { item: "Hostel Fee", amount: "PKR 10,000" },
      { item: "Library Fee", amount: "PKR 2,000" },
      { item: "Sports Fee", amount: "PKR 1,500" },
      { item: "Medical Fee", amount: "PKR 1,000" },
    ],
    deadlines: {
      documentSubmission: "August 15, 2025",
      feePayment: "August 25, 2025",
      registration: "August 30, 2025",
      orientation: "September 1, 2025",
    },
  },
];

const ResultsPage = () => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [student, setStudent] = useState<typeof studentsData[0] | null>(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate initial data load with first student
  useEffect(() => {
    setStudent(studentsData[0]);
    setSearchId(studentsData[0].userId);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    setError("");
    
    // Simulate API call delay
    setTimeout(() => {
      const foundStudent = studentsData.find(s => s.userId === searchId.trim());
      if (foundStudent) {
        setStudent(foundStudent);
        setError("");
      } else {
        setError("Student ID not found. Please check the ID and try again.");
        setStudent(null);
      }
      setIsLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Admission Letter PDF
  const generateAdmissionLetter = () => {
    if (!student) return;

    const doc = new jsPDF();
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("ASPIRE COLLEGE", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text("OFFICIAL ADMISSION LETTER", 105, 22, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.text("Congratulations!", 20, 45);

    doc.setFontSize(12);
    doc.text(`Dear ${student.name},`, 20, 60);

    const admissionText = [
      `We are pleased to inform you that you have been accepted into the ${student.program}`,
      `program at Aspire College for the ${student.session} semester.`,
      "",
      `Your student ID is: ${student.userId}`,
      `Program: ${student.program}`,
      `Start Date: ${student.startDate}`,
      `Duration: ${student.duration}`,
      "",
      "This letter serves as official confirmation of your admission. Please proceed with",
      "the enrollment process by completing the following steps:",
      "",
      "1. Submit required documents",
      "2. Pay the semester fees",
      "3. Complete course registration",
      "",
      "Welcome to the Aspire College family!",
      "",
      "Sincerely,",
      "Admissions Office",
      "Aspire College",
    ];

    admissionText.forEach((line, index) => {
      doc.text(line, 20, 75 + index * 6);
    });

    return doc;
  };

  // Fee Slip PDF
  const generateFeeSlip = () => {
    if (!student) return;

    const doc = new jsPDF();
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 30, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("ASPIRE COLLEGE", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text("FEE PAYMENT SLIP", 105, 22, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Student Name: ${student.name}`, 20, 45);
    doc.text(`Student ID: ${student.userId}`, 20, 55);
    doc.text(`Program: ${student.program}`, 20, 65);
    doc.text(`Session: ${student.session}`, 20, 75);

    doc.setFontSize(14);
    doc.text("FEE BREAKDOWN", 20, 95);

    student.fees.forEach((fee, index) => {
      doc.text(fee.item, 20, 110 + index * 8);
      doc.text(fee.amount, 150, 110 + index * 8);
    });

    doc.setFont("helvetica", "bold");
    const total =
      student.fees.reduce(
        (sum, fee) => sum + parseInt(fee.amount.replace(/\D/g, "")),
        0
      ) + " PKR";
    doc.text(`TOTAL PAYABLE: ${total}`, 20, 155);
    doc.setFont("helvetica", "normal");

    doc.setFontSize(10);
    doc.text(`Due Date: ${student.deadlines.feePayment}`, 20, 170);
    doc.text("Payment Methods: Online transfer, Bank draft, or Cash", 20, 180);

    return doc;
  };

  const handleDownload = async (docType: string) => {
    if (!student) return;
    
    setDownloading(docType);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    let doc;
    if (docType === "Admission Letter") {
      doc = generateAdmissionLetter();
      doc && doc.save(`${student.userId}_Admission_Letter.pdf`);
    } else if (docType === "Fee Slip") {
      doc = generateFeeSlip();
      doc && doc.save(`${student.userId}_Fee_Slip.pdf`);
    }
    setDownloading(null);
  };

  const handlePrint = () => {
    if (!student) return;
    
    const doc = generateAdmissionLetter();
    doc && doc.autoPrint();
    doc && window.open(doc.output("bloburl"), "_blank");
  };

  const nextSteps = student ? [
    {
      step: 1,
      title: "Document Submission",
      description: "Submit all required documents to the admissions office",
      deadline: student.deadlines.documentSubmission,
    },
    {
      step: 2,
      title: "Fee Payment",
      description: "Pay your semester fees to confirm your seat",
      deadline: student.deadlines.feePayment,
    },
    {
      step: 3,
      title: "Course Registration",
      description: "Register for your courses online",
      deadline: student.deadlines.registration,
    },
    {
      step: 4,
      title: "Orientation",
      description: "Attend the new student orientation program",
      deadline: student.deadlines.orientation,
    },
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-6 px-4 sm:px-6 md:px-8 font-sans text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Search Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-6">
              Find Student Admission Details
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Student ID (e.g., ASP2025-001)"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 transition text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 ml-1">
                  Try: ASP2025-001, ASP2025-002, ASP2025-003, ASP2025-004
                </p>
              </div>
              <button
  onClick={handleSearch}
  disabled={isLoading || !searchId.trim()}
  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
             disabled:from-blue-300 disabled:to-purple-400 dark:from-blue-400 dark:to-purple-500 
             dark:hover:from-blue-500 dark:hover:to-purple-600 text-white font-medium rounded-lg 
             flex items-center justify-center gap-2 transition disabled:cursor-not-allowed min-w-[120px]"
>
  {isLoading ? (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      Searching...
    </div>
  ) : (
    <>
      <FiSearch className="w-4 h-4" />
      Search
    </>
  )}
</button>

            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {!student ? (
          <div className="text-center py-12">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Student Not Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Please enter a valid Student ID to view admission details.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Welcome Section */}
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">
                Welcome to Aspire College, {student.name}! 🎓
              </h1>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl mb-6">
                We are proud to have you join our community of excellence. Your
                academic journey towards success starts here!
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 max-w-3xl mx-auto text-sm sm:text-base transition">
                <div className="grid sm:grid-cols-3 gap-5 text-center">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Program</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {student.program}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Student ID</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {student.userId}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Session</p>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      {student.session}
                    </p>
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  Please check your email for enrollment guidelines and orientation
                  details.
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Admission Documents */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition hover:shadow-xl">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Admission Documents</h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Admission Letter */}
                    <div className="border rounded-2xl p-4 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                          <FiFileText className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Admission Letter</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Official offer letter</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload("Admission Letter")}
                        disabled={downloading === "Admission Letter"}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloading === "Admission Letter" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Downloading...
                          </div>
                        ) : (
                          <>
                            <FiDownload className="w-4 h-4" />
                            Download PDF
                          </>
                        )}
                      </button>
                    </div>

                    {/* Fee Slip */}
                    <div className="border rounded-2xl p-4 hover:border-green-300 dark:hover:border-green-500 hover:shadow-lg transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center">
                          <FiDollarSign className="w-6 h-6 text-green-600 dark:text-green-300" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Fee Payment Slip</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">Semester fee details</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload("Fee Slip")}
                        disabled={downloading === "Fee Slip"}
                        className="w-full py-3 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 text-sm sm:text-base transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloading === "Fee Slip" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Downloading...
                          </div>
                        ) : (
                          <>
                            <FiDownload className="w-4 h-4" />
                            Download PDF
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Admission Card */}
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-2xl border border-blue-200 dark:border-blue-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-xl flex items-center justify-center">
                        <FiUser className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">Admission Card</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Required for campus entry</p>
                      </div>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl flex items-center gap-2 text-sm sm:text-base transition"
                    >
                      <FiPrinter className="w-5 h-5" /> Print Card
                    </button>
                  </div>
                </div>

                {/* Next Steps */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition hover:shadow-xl">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Next Steps to Enrollment
                  </h2>
                  <div className="space-y-4">
                    {nextSteps.map((step) => (
                      <div
                        key={step.step}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-md transition hover:border-blue-300 dark:hover:border-blue-500"
                      >
                        {/* Step number and title */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-semibold text-sm sm:text-base">
                            {step.step}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                              {step.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-1">
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Deadline */}
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-2 sm:mt-0">
                          <FiClock className="w-4 h-4" />
                          Due: {step.deadline}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Important Dates */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition hover:shadow-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Important Dates
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    {[
                      { label: "Document Submission", date: student.deadlines.documentSubmission },
                      { label: "Fee Payment", date: student.deadlines.feePayment },
                      { label: "Classes Start", date: student.startDate },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-200">{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Support */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition hover:shadow-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Need Help?
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900 rounded-xl transition hover:bg-blue-100 dark:hover:bg-blue-800">
                      <FiPhone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Admissions Office</p>
                        <p className="text-gray-600 dark:text-gray-300">+92 300 1234567</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900 rounded-xl transition hover:bg-purple-100 dark:hover:bg-purple-800">
                      <FiMapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Campus Visit</p>
                        <p className="text-gray-600 dark:text-gray-300">Schedule a tour</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-5 sm:p-6 md:p-8 transition hover:shadow-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3 text-sm sm:text-base">
                    <Link
                      href="/applicant_portal/fee_mange"
                      className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 font-medium transition"
                    >
                      <FiDollarSign className="w-5 h-5" />
                      Pay Fees Online
                    </Link>
                    <Link
                      href="/applicant_portal/my_application"
                      className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 font-medium transition"
                    >
                      <FiBook className="w-5 h-5" />
                      Course Registration
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;