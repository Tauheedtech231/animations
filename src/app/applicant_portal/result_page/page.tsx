"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Link from "next/link";
import { 
  FiFileText, 
  FiDownload, 
  FiPrinter, 
  FiCheckCircle, 
  FiArrowRight, 
  FiCalendar,
  FiUser,
  FiBook,
  FiDollarSign,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiStar,
  FiShield
} from "react-icons/fi";

const ResultsPage = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  // Enhanced PDF generation with better formatting
  const generateAdmissionLetter = () => {
    const doc = new jsPDF();
    
    // Header with university branding
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("ACME UNIVERSITY", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text("OFFICIAL ADMISSION LETTER", 105, 22, { align: "center" });

    doc.setTextColor(0, 0, 0);
    
    // Content
    doc.setFontSize(16);
    doc.text("Congratulations!", 20, 45);
    
    doc.setFontSize(12);
    doc.text("Dear John Doe,", 20, 60);
    
    const admissionText = [
      "We are pleased to inform you that you have been accepted into the Computer Science",
      "program at ACME University for the Fall 2025 semester.",
      "",
      "Your student ID is: STU2025-001",
      "Program: Bachelor of Science in Computer Science",
      "Start Date: September 1, 2025",
      "Duration: 4 Years",
      "",
      "This letter serves as official confirmation of your admission. Please proceed with",
      "the enrollment process by completing the following steps:",
      "",
      "1. Submit required documents",
      "2. Pay the semester fees",
      "3. Complete course registration",
      "",
      "Welcome to the ACME University family!",
      "",
      "Sincerely,",
      "Admissions Office",
      "ACME University"
    ];

    admissionText.forEach((line, index) => {
      doc.text(line, 20, 75 + (index * 6));
    });

    return doc;
  };

  const generateFeeSlip = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 30, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.text("ACME UNIVERSITY", 105, 15, { align: "center" });
    doc.setFontSize(10);
    doc.text("FEE PAYMENT SLIP", 105, 22, { align: "center" });

    doc.setTextColor(0, 0, 0);
    
    // Student Info
    doc.setFontSize(12);
    doc.text("Student Name: John Doe", 20, 45);
    doc.text("Student ID: STU2025-001", 20, 55);
    doc.text("Program: Computer Science", 20, 65);
    doc.text("Semester: Fall 2025", 20, 75);

    // Fee Breakdown
    doc.setFontSize(14);
    doc.text("FEE BREAKDOWN", 20, 95);
    
    const fees = [
      { item: "Tuition Fee", amount: "PKR 50,000" },
      { item: "Hostel Fee", amount: "PKR 10,000" },
      { item: "Library Fee", amount: "PKR 2,000" },
      { item: "Sports Fee", amount: "PKR 1,500" },
      { item: "Medical Fee", amount: "PKR 1,000" },
    ];

    fees.forEach((fee, index) => {
      doc.text(fee.item, 20, 110 + (index * 8));
      doc.text(fee.amount, 150, 110 + (index * 8));
    });

    // Total
    doc.setFont("helvetica", "bold"); // set font to Helvetica Bold
doc.text("TOTAL PAYABLE: PKR 64,500", 20, 155);
doc.setFont("helvetica", "normal"); // reset to normal

    // Payment Instructions
    doc.setFontSize(10);
    doc.text("Due Date: August 25, 2025", 20, 170);
    doc.text("Payment Methods: Online transfer, Bank draft, or Cash", 20, 180);

    return doc;
  };

  const handleDownload = async (docType: string) => {
    setDownloading(docType);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    let doc;
    if (docType === "Admission Letter") {
      doc = generateAdmissionLetter();
      doc.save("ACME_University_Admission_Letter.pdf");
    } else if (docType === "Fee Slip") {
      doc = generateFeeSlip();
      doc.save("ACME_University_Fee_Slip.pdf");
    }
    
    setDownloading(null);
  };

  const handlePrint = () => {
    const doc = generateAdmissionLetter();
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  };

  const nextSteps = [
    {
      step: 1,
      title: "Document Submission",
      description: "Submit all required documents to the admissions office",
      deadline: "August 15, 2025",
      status: "pending"
    },
    {
      step: 2,
      title: "Fee Payment",
      description: "Pay your semester fees to confirm your seat",
      deadline: "August 25, 2025",
      status: "pending"
    },
    {
      step: 3,
      title: "Course Registration",
      description: "Register for your courses online",
      deadline: "August 30, 2025",
      status: "upcoming"
    },
    {
      step: 4,
      title: "Orientation",
      description: "Attend the new student orientation program",
      deadline: "September 1, 2025",
      status: "upcoming"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Success Header */}
     <div className="text-center mb-12">
  <div className="flex justify-center mb-6">
    
  </div>
  <h1 className="text-4xl font-bold text-gray-900 mb-4">
    Welcome to ACME University! 🎓
  </h1>
  <p className="text-xl text-gray-600 mb-6">
    We are thrilled to have you join our vibrant community of learners and innovators. Your journey begins now!
  </p>
  <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
    <div className="grid md:grid-cols-3 gap-6 text-center">
      <div>
        <p className="text-sm text-gray-500">Program</p>
        <p className="font-semibold text-gray-900">Bachelor of Science in Computer Science</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Student ID</p>
        <p className="font-semibold text-gray-900">STU2025-001</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Semester</p>
        <p className="font-semibold text-gray-900">Fall 2025</p>
      </div>
    </div>
    <p className="text-sm text-gray-500 mt-4">
      Remember to check your email for the next steps to complete enrollment. We are here to support you every step of the way!
    </p>
  </div>
</div>


        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Documents Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Admission Documents
              </h2>
              <p className="text-gray-600 mb-6">
                Download and print these important documents for your records and next steps.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Admission Letter */}
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-all hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FiFileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Admission Letter</h3>
                      <p className="text-sm text-gray-600">Official offer letter</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload("Admission Letter")}
                    disabled={downloading === "Admission Letter"}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {downloading === "Admission Letter" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <FiDownload className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>

                {/* Fee Slip */}
                <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-green-300 transition-all hover:shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <FiDollarSign className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Fee Payment Slip</h3>
                      <p className="text-sm text-gray-600">Semester fee details</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownload("Fee Slip")}
                    disabled={downloading === "Fee Slip"}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {downloading === "Fee Slip" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <FiDownload className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Print Admission Card */}
              <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FiUser className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Admission Card</h3>
                      <p className="text-sm text-gray-600">
                        Required for campus entry and identification
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
                  >
                    <FiPrinter className="w-4 h-4" />
                    Print Card
                  </button>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Next Steps to Enrollment
              </h2>
              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <div
                    key={step.step}
                    className="flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <FiClock className="w-4 h-4" />
                          Due: {step.deadline}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      step.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {step.status === 'pending' ? 'Action Required' : 'Upcoming'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Dates */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Important Dates
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Document Submission</span>
                  <span className="font-medium text-gray-900">Aug 15, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Fee Payment</span>
                  <span className="font-medium text-gray-900">Aug 25, 2025</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Classes Start</span>
                  <span className="font-medium text-gray-900">Sep 1, 2025</span>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help?
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FiPhone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">Admissions Office</p>
                    <p className="text-sm text-gray-600">+92 300 1234567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <FiMail className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">admissions@acme.edu.pk</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <FiMapPin className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Campus Visit</p>
                    <p className="text-sm text-gray-600">Schedule a tour</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/applicant_portal/fee_mange"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <FiDollarSign className="w-4 h-4" />
                  Pay Fees Online
                </Link>
                <Link
                  href="/applicant_portal/my_application"
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <FiBook className="w-4 h-4" />
                  Course Registration
                </Link>
               
              </div>
            </div>
          </div>
        </div>

     
      </div>
    </div>
  );
};

export default ResultsPage;