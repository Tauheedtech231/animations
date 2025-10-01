"use client";

import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  FiCreditCard,
  FiDownload,
  FiUser,
  FiBook,
  FiCalendar,
  FiShield,
  FiPhone,
  FiHome,
  FiDollarSign,
  FiLock,
  FiAlertCircle,
} from "react-icons/fi";

// Define the application data structure based on your previous form
interface ApplicationData {
  personalInfo: {
    fullName: string;
    cnic: string;
    dob: string;
    gender: string;
    address: string;
  };
  academicInfo: {
    academicLevel: string;
    obtainedMarks: string;
    totalMarks: string;
    percentage: string;
    institute: string;
    board: string;
    passingYear: string;
  };
  courseSelection: {
    program: string;
    specialization: string;
    mode: string;
    duration: string;
    startDate: string;
  };
  feeDetails?: {
    originalFee: number;
    scholarshipPercentage: number;
    scholarshipAmount: number;
    finalFee: number;
    applicationId: string;
  };
  paymentStatus?: "pending" | "paid";
  paymentDate?: string;
}

const FeePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState<"online" | "offline">("online");
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    // Credit Card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    
    // Bank Transfer
    accountNumber: "",
    bankName: "",
    iban: "",
    branch: "",
    
    // JazzCash
    mobileNumber: "",
    cnic: "",
    pin: "",
  });

  // Default fee details (fallback)
  const defaultFeeDetails = {
    tuition: 50000,
    hostel: 10000,
    library: 2000,
    sports: 1500,
    total: 63500,
  };

  // Get fee details from application data or use default
  const feeDetails = applicationData?.feeDetails ? {
    tuition: applicationData.feeDetails.finalFee,
    hostel: 0,
    library: 0,
    sports: 0,
    total: applicationData.feeDetails.finalFee,
  } : defaultFeeDetails;

  const paymentMethods = [
    {
      id: "credit",
      name: "Credit Card",
      icon: <FiCreditCard className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Pay with Visa, MasterCard, or Amex",
      fields: [
        { name: "cardNumber", label: "Card Number", type: "text", placeholder: "1234 5678 9012 3456" },
        { name: "expiryDate", label: "Expiry Date", type: "text", placeholder: "MM/YY" },
        { name: "cvv", label: "CVV", type: "text", placeholder: "123" },
        { name: "cardHolderName", label: "Card Holder Name", type: "text", placeholder: "John Doe" },
      ],
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <FiHome className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Direct bank transfer",
      fields: [
        { name: "accountNumber", label: "Account Number", type: "text", placeholder: "123456789" },
        { name: "bankName", label: "Bank Name", type: "text", placeholder: "Bank Name" },
        { name: "iban", label: "IBAN", type: "text", placeholder: "PK36SCBL0000001123456702" },
        { name: "branch", label: "Branch Code", type: "text", placeholder: "1234" },
      ],
    },
    {
      id: "jazzcash",
      name: "JazzCash",
      icon: <FiPhone className="w-5 h-5 sm:w-6 sm:h-6" />,
      description: "Mobile wallet payment",
      fields: [
        { name: "mobileNumber", label: "Mobile Number", type: "tel", placeholder: "0300 1234567" },
        { name: "cnic", label: "CNIC", type: "text", placeholder: "12345-6789012-3" },
        { name: "pin", label: "PIN", type: "password", placeholder: "****" },
      ],
    },
  ];

  // Fetch application data when applicationId changes
  useEffect(() => {
    if (applicationId) {
      fetchApplicationData(applicationId);
    } else {
      setApplicationData(null);
      setError("");
    }
  }, [applicationId]);

  const fetchApplicationData = (appId: string) => {
    try {
      // Look for application data in localStorage
      const savedFormData = localStorage.getItem("multistep-form-data");
      
      if (savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        
        // Check if the application ID matches
        if (parsedData.feeDetails && parsedData.feeDetails.applicationId === appId) {
          setApplicationData(parsedData);
          setError("");
          
          // Check if already paid
          if (parsedData.paymentStatus === "paid") {
            setError(`Application ${appId} has already been paid on ${parsedData.paymentDate || "a previous date"}`);
          }
        } else {
          setApplicationData(null);
          setError("Application ID not found. Please check the ID and try again.");
        }
      } else {
        setApplicationData(null);
        setError("No application data found in system.");
      }
    } catch (error) {
      setApplicationData(null);
      setError("Error fetching application data. Please try again.");
      console.error("Error fetching application data:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplicationIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicationId(e.target.value.toUpperCase());
  };

  const handleDownloadChallan = () => {
    if (!applicationData) {
      alert("Please enter a valid Application ID first");
      return;
    }

    if (applicationData.paymentStatus === "paid") {
      alert("This application has already been paid. Cannot generate challan.");
      return;
    }

    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let yPosition = margin;

      // Header with background
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, pageWidth, 50, 'F');
      
      // Institution Name
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("EDUCO UNIVERSITY", pageWidth / 2, 20, { align: "center" });
      
      // Title
      doc.setFontSize(16);
      doc.text("FEE PAYMENT CHALLAN", pageWidth / 2, 35, { align: "center" });

      // Reset for content
      doc.setTextColor(0, 0, 0);
      yPosition = 65;

      // Application ID and Date
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Application ID: ${applicationData.feeDetails?.applicationId || applicationId}`, margin, yPosition);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - margin, yPosition, { align: "right" });
      yPosition += 15;

      // Student Information
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("STUDENT INFORMATION", margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${applicationData.personalInfo.fullName}`, margin, yPosition);
      yPosition += 7;
      doc.text(`CNIC: ${applicationData.personalInfo.cnic || 'N/A'}`, margin, yPosition);
      yPosition += 7;
      doc.text(`Program: ${applicationData.courseSelection.program}`, margin, yPosition);
      yPosition += 7;
      doc.text(`Academic Level: ${applicationData.academicInfo.academicLevel}`, margin, yPosition);
      yPosition += 12;

      // Fee Breakdown
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("FEE BREAKDOWN", margin, yPosition);
      yPosition += 10;

      const feeData = applicationData.feeDetails ? [
        { description: "Original Course Fee", amount: applicationData.feeDetails.originalFee },
        { description: `Scholarship (${applicationData.feeDetails.scholarshipPercentage}%)`, amount: -applicationData.feeDetails.scholarshipAmount },
        { description: "FINAL PAYABLE AMOUNT", amount: applicationData.feeDetails.finalFee, isTotal: true }
      ] : [
        { description: "Tuition Fee", amount: defaultFeeDetails.tuition },
        { description: "Hostel Fee", amount: defaultFeeDetails.hostel },
        { description: "Library Fee", amount: defaultFeeDetails.library },
        { description: "Sports Fee", amount: defaultFeeDetails.sports },
        { description: "TOTAL PAYABLE AMOUNT", amount: defaultFeeDetails.total, isTotal: true }
      ];

      feeData.forEach((item, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = margin;
        }

        doc.setFontSize(10);
        if (item.isTotal) {
          doc.setFont("helvetica", "bold");
          doc.setDrawColor(200, 200, 200);
          doc.line(margin, yPosition - 2, pageWidth - margin, yPosition - 2);
          yPosition += 5;
          doc.setFontSize(12);
        } else {
          doc.setFont("helvetica", "normal");
        }

        doc.text(item.description, margin, yPosition);
        
        const amountText = `${item.amount < 0 ? '-' : ''}PKR ${Math.abs(item.amount).toLocaleString()}`;
        doc.text(amountText, pageWidth - margin, yPosition, { align: "right" });
        
        yPosition += item.isTotal ? 10 : 7;
      });

      // Payment Instructions
      yPosition += 5;
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT INSTRUCTIONS", margin, yPosition);
      yPosition += 10;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const instructions = [
        "1. Pay at any HBL, UBL, or MCB branch within 7 days",
        "2. Use Application ID as payment reference",
        `3. Application ID: ${applicationData.feeDetails?.applicationId || applicationId}`,
        "4. Keep receipt for verification",
        "5. Upload payment proof in student portal"
      ];

      instructions.forEach(instruction => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(instruction, margin, yPosition);
        yPosition += 6;
      });

      // Footer
      const footerY = doc.internal.pageSize.getHeight() - 10;
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text("Computer generated challan - No signature required", pageWidth / 2, footerY, { align: "center" });

      // Save PDF
      const fileName = `Fee_Challan_${applicationData.feeDetails?.applicationId || applicationId}.pdf`;
      doc.save(fileName);

    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating challan. Please try again.");
    }
  };

  const handlePayment = () => {
    if (!selectedPaymentType) {
      alert("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      
      // Update payment status in localStorage
      if (applicationData && applicationData.feeDetails) {
        try {
          const updatedData = {
            ...applicationData,
            paymentStatus: "paid" as const,
            paymentDate: new Date().toLocaleDateString()
          };
          localStorage.setItem("multistep-form-data", JSON.stringify(updatedData));
          setApplicationData(updatedData);
        } catch (error) {
          console.error("Error updating payment status:", error);
        }
      }

      alert("Payment processed successfully!");
      setSelectedPaymentType(null);
      setFormData({
        cardNumber: "", expiryDate: "", cvv: "", cardHolderName: "",
        accountNumber: "", bankName: "", iban: "", branch: "",
        mobileNumber: "", cnic: "", pin: "",
      });
    }, 3000);
  };

  const selectedMethod = paymentMethods.find(method => method.id === selectedPaymentType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-1 sm:mb-2">
            Fee Payment Portal
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Secure and convenient fee payment options for EDUCO University students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200/50 dark:border-gray-700/50">
              {/* Toggle */}
              <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
                <button
                  onClick={() => {
                    setPaymentMethod("online");
                    setSelectedPaymentType(null);
                    setApplicationId("");
                    setApplicationData(null);
                    setError("");
                  }}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    paymentMethod === "online"
                      ? "bg-blue-600 text-white shadow-lg border border-blue-200 dark:border-blue-700"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  Online Payment
                </button>
                <button
                  onClick={() => {
                    setPaymentMethod("offline");
                    setSelectedPaymentType(null);
                    setApplicationId("");
                    setApplicationData(null);
                    setError("");
                  }}
                  className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                    paymentMethod === "offline"
                      ? "bg-blue-600 text-white shadow-lg border border-blue-200 dark:border-blue-700"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  }`}
                >
                  Offline Payment
                </button>
              </div>

              {paymentMethod === "online" ? (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Select Payment Method
                  </h3>
                  
                  {/* Payment Method Cards */}
                  <div className="grid gap-3 sm:gap-4">
                    {paymentMethods.map((method) => (
                      <div
                        key={method.id}
                        onClick={() => setSelectedPaymentType(method.id)}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                          selectedPaymentType === method.id
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-500"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors ${
                            selectedPaymentType === method.id
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          }`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                              {method.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                              {method.description}
                            </p>
                          </div>
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPaymentType === method.id
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300 dark:border-gray-600"
                          }`}>
                            {selectedPaymentType === method.id && (
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                            )}
                          </div>
                        </div>

                        {/* Dynamic Form */}
                        {selectedPaymentType === method.id && (
                          <div className="mt-4 pl-0 sm:pl-14">
                            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3 animate-fadeIn">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base flex items-center gap-2">
                                <FiLock className="w-4 h-4 text-green-500" />
                                Secure Payment Details
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {method.fields.map((field) => (
                                  <div
                                    key={field.name}
                                    className={field.name === "cardHolderName" || field.name === "pin" ? "sm:col-span-2" : ""}
                                  >
                                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                      {field.label}
                                    </label>
                                    <input
                                      type={field.type}
                                      name={field.name}
                                      value={formData[field.name as keyof typeof formData]}
                                      onChange={handleInputChange}
                                      placeholder={field.placeholder}
                                      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Payment Button */}
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing || !selectedPaymentType}
                    className={`w-full py-3 sm:py-4 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                      isProcessing || !selectedPaymentType
                        ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-300"
                        : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-xl transform hover:scale-[1.02]"
                    }`}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <FiDollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
                        Pay PKR {feeDetails.total.toLocaleString()}
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    <FiShield className="w-4 h-4 text-green-500" />
                    Your payment is secure and encrypted with SSL technology
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6">
                  {/* Application ID Input */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <FiUser className="w-5 h-5 text-blue-500" />
                      Enter Application ID
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={applicationId}
                        onChange={handleApplicationIdChange}
                        placeholder="Enter your Application ID (e.g., APP-123456-ABC)"
                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 dark:bg-gray-700 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        You can find your Application ID in your application confirmation email or in the student portal.
                      </p>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 animate-fadeIn">
                      <div className="flex items-center gap-3">
                        <FiAlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Application Details */}
                  {applicationData && !error && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 animate-fadeIn">
                      <h4 className="font-semibold text-green-800 dark:text-green-400 text-sm sm:text-base mb-3 flex items-center gap-2">
                        <FiUser className="w-4 h-4" />
                        Application Found
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-green-700 dark:text-green-400">Student:</span>
                          <p className="font-medium text-green-900 dark:text-green-300">{applicationData.personalInfo.fullName}</p>
                        </div>
                        <div>
                          <span className="text-green-700 dark:text-green-400">Program:</span>
                          <p className="font-medium text-green-900 dark:text-green-300">{applicationData.courseSelection.program}</p>
                        </div>
                        <div>
                          <span className="text-green-700 dark:text-green-400">Academic Level:</span>
                          <p className="font-medium text-green-900 dark:text-green-300">{applicationData.academicInfo.academicLevel}</p>
                        </div>
                        {applicationData.feeDetails && (
                          <div>
                            <span className="text-green-700 dark:text-green-400">Scholarship:</span>
                            <p className="font-medium text-green-900 dark:text-green-300">{applicationData.feeDetails.scholarshipPercentage}%</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Download Challan Section */}
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                      <FiDownload className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Download Fee Challan
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                      Download the fee challan and submit it at any designated bank branch along with your payment.
                    </p>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 max-w-md mx-auto">
                      <p className="text-sm text-yellow-800 dark:text-yellow-400 font-medium">
                        📅 Due Date: September 30, 2025
                      </p>
                    </div>
                    <button
                      onClick={handleDownloadChallan}
                      disabled={!applicationData || !!error}
                      className={`w-full max-w-sm mx-auto py-3 sm:py-4 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base ${
                        !applicationData || !!error
                          ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed text-gray-700 dark:text-gray-300"
                          : "bg-green-600 hover:bg-green-700 text-white hover:shadow-xl transform hover:scale-[1.02]"
                      }`}
                    >
                      <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                      Download Challan - PKR {feeDetails.total.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Student Info */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
                <FiUser className="w-4 h-4 text-blue-500" />
                {applicationData ? "Application Information" : "Student Information"}
              </h3>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {applicationData ? 
                      applicationData.personalInfo.fullName.split(' ').map(n => n[0]).join('') : 
                      'JD'
                    }
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500 dark:text-gray-400">Name</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {applicationData ? applicationData.personalInfo.fullName : "John Doe"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiBook className="w-4 h-4 text-blue-400" />
                  <div className="text-sm">
                    <p className="text-gray-500 dark:text-gray-400">Program</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {applicationData ? applicationData.courseSelection.program : "FSC Pre-Engineering"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-4 h-4 text-blue-400" />
                  <div className="text-sm">
                    <p className="text-gray-500 dark:text-gray-400">Academic Level</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {applicationData ? applicationData.academicInfo.academicLevel : "Intermediate"}
                    </p>
                  </div>
                </div>
                {applicationData?.feeDetails && (
                  <div className="flex items-center gap-3">
                    <FiDollarSign className="w-4 h-4 text-green-400" />
                    <div className="text-sm">
                      <p className="text-gray-500 dark:text-gray-400">Scholarship</p>
                      <p className="font-medium text-green-600 dark:text-green-400">
                        {applicationData.feeDetails.scholarshipPercentage}% Approved
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fee Summary */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-green-500" />
                Fee Summary
              </h3>
              <div className="space-y-3 text-sm">
                {applicationData?.feeDetails ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-400">Original Fee</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        PKR {applicationData.feeDetails.originalFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 dark:text-green-400">Scholarship Discount</span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        -PKR {applicationData.feeDetails.scholarshipAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3 flex justify-between items-center font-bold text-base">
                      <span className="text-gray-900 dark:text-gray-100">Final Payable</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        PKR {applicationData.feeDetails.finalFee.toLocaleString()}
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {[
                      { name: "Tuition Fee", amount: feeDetails.tuition },
                      { name: "Hostel Fee", amount: feeDetails.hostel },
                      { name: "Library Fee", amount: feeDetails.library },
                      { name: "Sports Fee", amount: feeDetails.sports },
                    ].map((fee, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">{fee.name}</span>
                        <span className="font-medium text-gray-900 dark:text-gray-100">
                          PKR {fee.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-3 pt-3 flex justify-between items-center font-bold text-base">
                      <span className="text-gray-900 dark:text-gray-100">Total Payable</span>
                      <span className="text-blue-600 dark:text-blue-400">
                        PKR {feeDetails.total.toLocaleString()}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-orange-500" />
                Payment Status
              </h3>
              <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="flex justify-between items-center">
                  <span>Due Date</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">Sep 30, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    applicationData?.paymentStatus === "paid" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                  }`}>
                    {applicationData?.paymentStatus === "paid" ? "✅ Paid" : "⏳ Pending"}
                  </span>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mt-2">
                  <p className="text-xs text-blue-700 dark:text-blue-400 text-center">
                    Complete payment before due date to avoid late fees of PKR 2,000
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FeePayment;