"use client";

import React, { useState } from "react";
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
} from "react-icons/fi";

const FeePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState<"online" | "offline">("online");
  const [selectedPaymentType, setSelectedPaymentType] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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

  const feeDetails = {
    tuition: 50000,
    hostel: 10000,
    library: 2000,
    sports: 1500,
    total: 63500,
  };

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDownloadChallan = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("ACME UNIVERSITY - Fee Challan", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Student: John Doe`, 20, 40);
    doc.text(`Program: Computer Science`, 20, 50);
    doc.text(`Semester: Fall 2025`, 20, 60);
    doc.text(`Total Amount: PKR ${feeDetails.total.toLocaleString()}`, 20, 80);
    doc.text("Due Date: Sep 30, 2025", 20, 90);
    doc.save("Fee_Challan.pdf");
  };

  const handlePayment = () => {
    if (!selectedPaymentType) {
      alert("Please select a payment method");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
            Fee Payment Portal
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Secure and convenient fee payment options for ACME University students
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200/50">
              {/* Toggle */}
             <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 bg-gray-100 p-1 rounded-xl">
  <button
    onClick={() => {
      setPaymentMethod("online");
      setSelectedPaymentType(null);
    }}
    className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
      paymentMethod === "online"
        ? "bg-blue-600 text-white shadow-lg border border-blue-200"
        : "text-gray-600 hover:text-gray-800"
    }`}
  >
     Online Payment
  </button>
  <button
    onClick={() => setPaymentMethod("offline")}
    className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
      paymentMethod === "offline"
        ? "bg-blue-600 text-white shadow-lg border border-blue-200"
        : "text-gray-600 hover:text-gray-800"
    }`}
  >
     Offline Payment
  </button>
</div>


              {paymentMethod === "online" ? (
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
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
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : "border-gray-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-colors ${
                            selectedPaymentType === method.id
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 text-blue-600"
                          }`}>
                            {method.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">
                              {method.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {method.description}
                            </p>
                          </div>
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            selectedPaymentType === method.id
                              ? "bg-blue-500 border-blue-500"
                              : "border-gray-300"
                          }`}>
                            {selectedPaymentType === method.id && (
                              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full" />
                            )}
                          </div>
                        </div>

                        {/* Dynamic Form */}
                        {selectedPaymentType === method.id && (
                          <div className="mt-4 pl-0 sm:pl-14">
                            <div className="bg-gray-50 rounded-xl p-4 space-y-3 animate-fadeIn">
                              <h4 className="font-semibold text-gray-900 text-sm sm:text-base flex items-center gap-2">
                                <FiLock className="w-4 h-4 text-green-500" />
                                Secure Payment Details
                              </h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {method.fields.map((field) => (
                                  <div
                                    key={field.name}
                                    className={field.name === "cardHolderName" || field.name === "pin" ? "sm:col-span-2" : ""}
                                  >
                                    <label className="block text-xs font-medium text-gray-700 mb-1">
                                      {field.label}
                                    </label>
                                    <input
                                      type={field.type}
                                      name={field.name}
                                      value={formData[field.name as keyof typeof formData]}
                                      onChange={handleInputChange}
                                      placeholder={field.placeholder}
                                      className="w-full p-3 rounded-lg border border-gray-300 text-gray-900 text-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
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
                        ? "bg-gray-400 cursor-not-allowed text-gray-700"
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

                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                    <FiShield className="w-4 h-4 text-green-500" />
                    Your payment is secure and encrypted with SSL technology
                  </div>
                </div>
              ) : (
                <div className="space-y-4 sm:space-y-6 text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <FiDownload className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Download Fee Challan
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
                    Download the fee challan and submit it at any designated bank branch along with your payment.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 max-w-md mx-auto">
                    <p className="text-sm text-yellow-800 font-medium">
                      📅 Due Date: September 30, 2025
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadChallan}
                    className="w-full max-w-sm mx-auto py-3 sm:py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    <FiDownload className="w-4 h-4 sm:w-5 sm:h-5" />
                    Download Challan - PKR {feeDetails.total.toLocaleString()}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Student Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <FiUser className="w-4 h-4 text-blue-500" />
                Student Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    JD
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">John Doe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiBook className="w-4 h-4 text-blue-400" />
                  <div className="text-sm">
                    <p className="text-gray-500">Program</p>
                    <p className="font-medium text-gray-900">FSC Pre-Engineering</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-4 h-4 text-blue-400" />
                  <div className="text-sm">
                    <p className="text-gray-500">Semester</p>
                    <p className="font-medium text-gray-900">Fall 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCreditCard className="w-4 h-4 text-blue-400" />
                  <div className="text-sm">
                    <p className="text-gray-500">Student ID</p>
                    <p className="font-medium text-gray-900">CS-2023-001</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Summary */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-green-500" />
                Fee Summary
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { name: "Tuition Fee", amount: feeDetails.tuition },
                  { name: "Hostel Fee", amount: feeDetails.hostel },
                  { name: "Library Fee", amount: feeDetails.library },
                  { name: "Sports Fee", amount: feeDetails.sports },
                ].map((fee, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-gray-600">{fee.name}</span>
                    <span className="font-medium text-gray-900">PKR {fee.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 mt-3 pt-3 flex justify-between items-center font-bold text-base">
                  <span className="text-gray-900">Total Payable</span>
                  <span className="text-blue-600">PKR {feeDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200/50 p-4 sm:p-6">
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-orange-500" />
                Payment Status
              </h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between items-center">
                  <span>Due Date</span>
                  <span className="font-medium text-gray-900">Sep 30, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    ⏳ Pending
                  </span>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mt-2">
                  <p className="text-xs text-blue-700 text-center">
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