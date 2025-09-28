"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
  FiCreditCard,
  FiDownload,
  FiCheckCircle,
  FiAlertCircle,
  FiCalendar,
  FiUser,
  FiBook,
  FiDollarSign,
  FiShield,
  FiArrowRight,
  FiClock,
  FiMail,
  FiPhone,
  FiHome,
} from "react-icons/fi";

const FeePayment = () => {
  const [paymentMethod, setPaymentMethod] = useState<"online" | "offline">("online");
  const [isProcessing, setIsProcessing] = useState(false);

  const feeDetails = {
    tuition: 50000,
    hostel: 10000,
    library: 2000,
    sports: 1500,
    total: 63500,
  };

  const paymentMethods = [
    { id: "credit", name: "Credit Card", icon: <FiCreditCard className="w-6 h-6" />, description: "Pay with Visa, MasterCard, or Amex" },
    { id: "bank", name: "Bank Transfer", icon: <FiHome className="w-6 h-6" />, description: "Direct bank transfer" },
    { id: "jazzcash", name: "JazzCash", icon: <FiPhone className="w-6 h-6" />, description: "Mobile wallet payment" },
  ];

  const handleDownloadChallan = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("ACME UNIVERSITY - Fee Challan", 105, 20, { align: "center" });
    doc.save("Fee_Challan.pdf");
  };

  const handleOnlinePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment processed successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">Fee Payment </h1>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Secure and convenient fee payment options for ACME University students
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
              {/* Toggle */}
             <div className="flex gap-4 mb-6">
  <button
    onClick={() => setPaymentMethod("online")}
    className={`flex-1 py-2 px-3 sm:py-4 sm:px-6 rounded-xl font-semibold transition-all text-sm sm:text-base ${
      paymentMethod === "online"
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
    }`}
  >
    Online Payment
  </button>
  <button
    onClick={() => setPaymentMethod("offline")}
    className={`flex-1 py-2 px-3 sm:py-4 sm:px-6 rounded-xl font-semibold transition-all text-sm sm:text-base ${
      paymentMethod === "offline"
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-blue-50 text-blue-700 hover:bg-blue-100"
    }`}
  >
    Offline Payment
  </button>
</div>


              {paymentMethod === "online" ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-blue-800">Select Payment Method</h3>
                  <div className="grid gap-4">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className="flex items-center gap-4 p-4 border-2 border-blue-100 rounded-xl hover:border-blue-400 cursor-pointer transition-all"
                      >
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          {method.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-blue-800">{method.name}</p>
                          <p className="text-sm text-blue-600">{method.description}</p>
                        </div>
                        <input type="radio" name="paymentMethod" className="w-5 h-5 text-blue-600" />
                      </label>
                    ))}
                  </div>

                  {/* Payment Form */}
                  <div className="bg-blue-50 rounded-xl p-6 space-y-4">
                    <h4 className="font-semibold text-blue-800">Payment Details</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input className="p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" placeholder="Card Number" />
                      <input className="p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" placeholder="Expiry Date" />
                      <input className="p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" placeholder="CVV" />
                      <input className="p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400" placeholder="Card Holder Name" />
                    </div>
                  </div>

                  <button
                    onClick={handleOnlinePayment}
                    disabled={isProcessing}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    {isProcessing ? "Processing..." : `Pay PKR ${feeDetails.total.toLocaleString()}`}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                    <FiShield className="w-4 h-4 text-green-500" />
                    Your payment is secure and encrypted
                  </div>
                </div>
              ) : (
                <div className="space-y-6 text-center">
                  <FiDownload className="w-16 h-16 text-blue-600 mx-auto" />
                  <h3 className="text-xl font-semibold text-blue-800">Download Fee Challan</h3>
                  <p className="text-blue-600">Submit at any designated bank branch</p>
                  <button
                    onClick={handleDownloadChallan}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    <FiDownload className="w-5 h-5" />
                    Download PKR {feeDetails.total.toLocaleString()}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Student Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Student Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FiUser className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-600">Name</p>
                    <p className="font-medium text-blue-800">John Doe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiBook className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-600">Program</p>
                    <p className="font-medium text-blue-800">Computer Science</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FiCalendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-blue-600">Semester</p>
                    <p className="font-medium text-blue-800">Fall 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Fee Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Fee Summary</h3>
              <div className="space-y-3">
                {[
                  { name: "Tuition Fee", amount: feeDetails.tuition },
                  { name: "Hostel Fee", amount: feeDetails.hostel },
                  { name: "Library Fee", amount: feeDetails.library },
                  { name: "Sports Fee", amount: feeDetails.sports },
                ].map((fee, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span className="text-blue-600">{fee.name}</span>
                    <span className="font-medium text-blue-800">PKR {fee.amount.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t mt-3 pt-3 flex justify-between font-bold text-blue-700">
                  <span>Total Payable</span>
                  <span>PKR {feeDetails.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Payment Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-blue-700">
                  <span>Due Date</span>
                  <span>Sep 30, 2025</span>
                </div>
                <div className="flex justify-between text-blue-700">
                  <span>Status</span>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">Pending</span>
                </div>
                <p className="text-center text-sm text-blue-600 bg-blue-50 rounded-lg p-2">
                  Complete payment before due date to avoid late fees
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeePayment;
