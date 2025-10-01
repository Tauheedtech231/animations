"use client";

import { useState, useEffect } from "react";


import { HiOutlineDocumentText } from "react-icons/hi";

// Updated Types
interface PersonalInfo {
  fullName: string;
  cnic: string;
  dob: string;
  gender: string;
  address: string;
}

interface AcademicInfo {
  academicLevel: string;
  obtainedMarks: string;
  totalMarks: string;
  percentage: string;
  institute: string;
  board: string;
  passingYear: string;
  marksheet: string | null;
}

interface CourseSelection {
  program: string;
  specialization: string;
  mode: string;
  duration: string;
  startDate: string;
  courseDoc: string | null;
}

interface Documents {
  cnicFile: string | null;
  academicFiles: string[];
  feeFile: string | null;
  paymentProof: string | null;
}

interface FeeDetails {
  originalFee: number;
  scholarshipPercentage: number;
  scholarshipAmount: number;
  finalFee: number;
  applicationId: string;
}

interface FormDataState {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  documents: Documents;
  feeDetails: FeeDetails | null;
}

interface FormErrors {
  personalInfo: Partial<PersonalInfo>;
  academicInfo: Partial<AcademicInfo>;
  courseSelection: Partial<CourseSelection>;
  documents: Partial<{ cnicFile: string }>;
}

// Course Fees Configuration
const courseFees: { [key: string]: number } = {
  "ICS": 80000,
  "FSc Pre-Medical": 90000,
  "FSc Pre-Engineering": 95000,
  "I.Com": 75000,
  "FA General Science": 70000,
  "FA Arts": 65000,
  "F.A IT": 85000,
  "B.Com": 120000,
  "BA": 110000,
};

// Scholarship Rules Configuration
interface ScholarshipRule {
  minPercentage: number;
  maxPercentage: number;
  scholarship: number;
  description: string;
  color: string;
  bgColor: string;
}

const scholarshipRules: ScholarshipRule[] = [
  {
    minPercentage: 80,
    maxPercentage: 100,
    scholarship: 50,
    description: "Excellent! You qualify for our highest scholarship tier.",
    color: "text-green-600",
    bgColor: "bg-green-50 border-green-200"
  },
  {
    minPercentage: 70,
    maxPercentage: 79.99,
    scholarship: 30,
    description: "Great! You qualify for a substantial scholarship.",
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-200"
  },
  {
    minPercentage: 60,
    maxPercentage: 69.99,
    scholarship: 15,
    description: "Good! You qualify for a partial scholarship.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 border-yellow-200"
  },
  {
    minPercentage: 0,
    maxPercentage: 59.99,
    scholarship: 0,
    description: "Keep working hard! You can apply for other financial aid options.",
    color: "text-gray-600",
    bgColor: "bg-gray-50 border-gray-200"
  }
];

// Validation functions
const validatePersonalInfo = (data: PersonalInfo): Partial<PersonalInfo> => {
  const errors: Partial<PersonalInfo> = {};
  if (!data.fullName.trim()) errors.fullName = "Full name is required";
  if (data.cnic && !/^\d{5}-\d{7}-\d{1}$/.test(data.cnic)) {
    errors.cnic = "CNIC format should be XXXXX-XXXXXXX-X";
  }
  if (data.dob && new Date(data.dob) > new Date()) {
    errors.dob = "Date of birth cannot be in the future";
  }
  return errors;
};

const validateAcademicInfo = (data: AcademicInfo): Partial<AcademicInfo> => {
  const errors: Partial<AcademicInfo> = {};
  if (!data.academicLevel) errors.academicLevel = "Academic level is required";
  if (data.obtainedMarks && parseFloat(data.obtainedMarks) < 0) {
    errors.obtainedMarks = "Obtained marks cannot be negative";
  }
  if (data.totalMarks && parseFloat(data.totalMarks) <= 0) {
    errors.totalMarks = "Total marks must be positive";
  }
  if (data.obtainedMarks && data.totalMarks && parseFloat(data.obtainedMarks) > parseFloat(data.totalMarks)) {
    errors.obtainedMarks = "Obtained marks cannot exceed total marks";
  }
  return errors;
};

const validateCourseSelection = (data: CourseSelection): Partial<CourseSelection> => {
  const errors: Partial<CourseSelection> = {};
  if (!data.program) errors.program = "Program selection is required";
  if (data.startDate && new Date(data.startDate) < new Date()) {
    errors.startDate = "Start date cannot be in the past";
  }
  return errors;
};

const validateDocuments = (data: Documents): Partial<{ cnicFile: string }> => {
  const errors: Partial<{ cnicFile: string }> = {};
  if (!data.cnicFile) errors.cnicFile = "CNIC copy is required";
  return errors;
};

// Scholarship Calculator Function
const calculateScholarship = (percentage: number): ScholarshipRule => {
  const rule = scholarshipRules.find(
    rule => percentage >= rule.minPercentage && percentage <= rule.maxPercentage
  );
  return rule || scholarshipRules[scholarshipRules.length - 1];
};

// Generate Application ID
const generateApplicationId = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `APP-${timestamp}-${random}`;
};

// LocalStorage key
const STORAGE_KEY = "multistep-form-data";

// Initial form data
const initialFormData: FormDataState = {
  personalInfo: {
    fullName: "",
    cnic: "",
    dob: "",
    gender: "",
    address: ""
  },
  academicInfo: {
    academicLevel: "",
    obtainedMarks: "",
    totalMarks: "",
    percentage: "",
    institute: "",
    board: "",
    passingYear: "",
    marksheet: null
  },
  courseSelection: {
    program: "",
    specialization: "",
    mode: "",
    duration: "",
    startDate: "",
    courseDoc: null
  },
  documents: {
    cnicFile: null,
    academicFiles: [],
    feeFile: null,
    paymentProof: null
  },
  feeDetails: null
};

// Enhanced Step Components

function PersonalInfoForm({ 
  data, 
  onChange, 
  errors 
}: { 
  data: PersonalInfo; 
  onChange: (data: PersonalInfo) => void; 
  errors: Partial<PersonalInfo>; 
}) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full">
            <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">1</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Personal Information
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Please fill out your personal details carefully.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="full-name"
              value={data.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="e.g. Muhammad Ali Khan"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="cnic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              National ID Card Number (CNIC)
            </label>
            <input
              type="text"
              id="cnic"
              value={data.cnic}
              onChange={(e) => handleChange("cnic", e.target.value)}
              placeholder="XXXXX-XXXXXXX-X"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.cnic && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.cnic}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={data.dob}
                onChange={(e) => handleChange("dob", e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.dob && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.dob}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Gender
              </label>
              <select
                id="gender"
                value={data.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Address
            </label>
            <textarea
              id="address"
              value={data.address}
              onChange={(e) => handleChange("address", e.target.value)}
              rows={3}
              placeholder="e.g. House #123, Street 4, Islamabad"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
}

function AcademicInfoForm({ 
  data, 
  onChange, 
  errors 
}: { 
  data: AcademicInfo; 
  onChange: (data: AcademicInfo) => void; 
  errors: Partial<AcademicInfo>; 
}) {
  const handleChange = (field: keyof AcademicInfo, value: string) => {
    const updatedData = { ...data, [field]: value };
    
    // Calculate percentage when obtained marks or total marks change
    if ((field === 'obtainedMarks' || field === 'totalMarks') && updatedData.obtainedMarks && updatedData.totalMarks) {
      const obtained = parseFloat(updatedData.obtainedMarks);
      const total = parseFloat(updatedData.totalMarks);
      if (!isNaN(obtained) && !isNaN(total) && total > 0) {
        const percentage = ((obtained / total) * 100).toFixed(2);
        updatedData.percentage = percentage;
      }
    }
    
    onChange(updatedData);
  };

  const handleFileChange = (field: keyof AcademicInfo, file: File | null) => {
    onChange({ 
      ...data, 
      [field]: file ? file.name : null 
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full">
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">2</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Academic Information
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Please provide your academic details for scholarship assessment.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="academic-level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Academic Level <span className="text-red-500">*</span>
            </label>
            <select
              id="academic-level"
              value={data.academicLevel}
              onChange={(e) => handleChange("academicLevel", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select academic level</option>
              <option value="Matric">Matric</option>
              <option value="Intermediate">Intermediate</option>
            </select>
            {errors.academicLevel && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.academicLevel}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="obtained-marks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Obtained Marks
              </label>
              <input
                type="number"
                id="obtained-marks"
                value={data.obtainedMarks}
                onChange={(e) => handleChange("obtainedMarks", e.target.value)}
                placeholder="e.g. 850"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.obtainedMarks && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.obtainedMarks}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="total-marks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Total Marks
              </label>
              <input
                type="number"
                id="total-marks"
                value={data.totalMarks}
                onChange={(e) => handleChange("totalMarks", e.target.value)}
                placeholder="e.g. 1100"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.totalMarks && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.totalMarks}
                </p>
              )}
            </div>
          </div>

          {data.percentage && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <div className="text-center">
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-1">Calculated Percentage</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{data.percentage}%</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="institute" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Institute / School
              </label>
              <input
                type="text"
                id="institute"
                value={data.institute}
                onChange={(e) => handleChange("institute", e.target.value)}
                placeholder="e.g. Islamabad Model College"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="board" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Board
              </label>
              <input
                type="text"
                id="board"
                value={data.board}
                onChange={(e) => handleChange("board", e.target.value)}
                placeholder="e.g. Federal Board"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="passing-year" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Passing Year
            </label>
            <input
              type="number"
              id="passing-year"
              value={data.passingYear}
              onChange={(e) => handleChange("passingYear", e.target.value)}
              placeholder="e.g. 2024"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label htmlFor="marksheet" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Marksheet (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  id="marksheet"
                  onChange={(e) => handleFileChange("marksheet", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
                  <div className="text-gray-500 dark:text-gray-400">
                    {data.marksheet ? (
                      <span className="text-green-600 dark:text-green-400">✓ {data.marksheet}</span>
                    ) : (
                      "Click to upload marksheet"
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function CourseSelectionForm({ 
  data, 
  onChange, 
  errors 
}: { 
  data: CourseSelection; 
  onChange: (data: CourseSelection) => void; 
  errors: Partial<CourseSelection>; 
}) {
  const handleChange = (field: keyof CourseSelection, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileChange = (field: keyof CourseSelection, file: File | null) => {
    onChange({ 
      ...data, 
      [field]: file ? file.name : null 
    });
  };

  const getCourseFee = (program: string): number => {
    return courseFees[program] || 0;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full">
            <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">3</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Course Selection
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Choose your preferred program and course details.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="program" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Program <span className="text-red-500">*</span>
            </label>
            <select
              id="program"
              value={data.program}
              onChange={(e) => handleChange("program", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a program</option>
              <option value="ICS">ICS</option>
              <option value="FSc Pre-Medical">F.Sc Pre-Medical</option>
              <option value="FSc Pre-Engineering">F.Sc Pre-Engineering</option>
              <option value="I.Com">I.Com (Intermediate in Commerce)</option>
              <option value="FA General Science">FA (General Science)</option>
              <option value="FA Arts">FA (Arts / Humanities)</option>
              <option value="F.A IT">FA (Information Technology)</option>
              <option value="B.Com">B.Com (Bachelor of Commerce)</option>
              <option value="BA">BA (Bachelor of Arts)</option>
            </select>
            {errors.program && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.program}
              </p>
            )}
            
            {data.program && courseFees[data.program] && (
              <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <p className="text-green-700 dark:text-green-300 text-sm">
                  <strong>Course Fee:</strong> {courseFees[data.program].toLocaleString()} PKR
                </p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Specialization (if any)
            </label>
            <input
              type="text"
              id="specialization"
              value={data.specialization}
              onChange={(e) => handleChange("specialization", e.target.value)}
              placeholder="e.g. Artificial Intelligence"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Mode
              </label>
              <select
                id="mode"
                value={data.mode}
                onChange={(e) => handleChange("mode", e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select mode</option>
                <option value="On-Campus">On-Campus</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Duration
              </label>
              <select
                id="duration"
                value={data.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="">Select duration</option>
                <option value="6 Months">6 Months</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="4 Years">4 Years</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preferred Start Date
            </label>
            <input
              type="date"
              id="start-date"
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="course-doc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload Supporting Document (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  id="course-doc"
                  onChange={(e) => handleFileChange("courseDoc", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
                  <div className="text-gray-500 dark:text-gray-400">
                    {data.courseDoc ? (
                      <span className="text-green-600 dark:text-green-400">✓ {data.courseDoc}</span>
                    ) : (
                      "Click to upload supporting document"
                    )}
                  </div>
                </div>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ScholarshipCalculator({ 
  academicInfo, 
  courseSelection,
  onBack,
  onCalculate
}: { 
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  onBack: () => void;
  onCalculate: (feeDetails: FeeDetails) => void;
}) {
  const [calculated, setCalculated] = useState(false);
  
  const percentage = parseFloat(academicInfo.percentage) || 0;
  const scholarshipResult = calculateScholarship(percentage);
  const originalFee = courseFees[courseSelection.program] || 0;
  const scholarshipAmount = (originalFee * scholarshipResult.scholarship) / 100;
  const finalFee = originalFee - scholarshipAmount;
  const applicationId = generateApplicationId();

  const handleCalculate = () => {
    const feeDetails: FeeDetails = {
      originalFee,
      scholarshipPercentage: scholarshipResult.scholarship,
      scholarshipAmount,
      finalFee,
      applicationId
    };
    onCalculate(feeDetails);
    setCalculated(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full">
            <span className="text-lg font-semibold text-purple-600 dark:text-purple-400">★</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Scholarship & Fee Calculation
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Based on your academic performance and course selection
            </p>
          </div>
        </div>

        {/* Academic & Course Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Academic Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Level:</span>
                <span className="font-medium">{academicInfo.academicLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Marks:</span>
                <span className="font-medium">{academicInfo.obtainedMarks} / {academicInfo.totalMarks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Percentage:</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">{percentage}%</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Course Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Program:</span>
                <span className="font-medium">{courseSelection.program}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                <span className="font-medium">{courseSelection.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Original Fee:</span>
                <span className="font-medium">{originalFee.toLocaleString()} PKR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarship Result */}
        <div className={`rounded-xl p-6 border-2 ${scholarshipResult.bgColor} ${scholarshipResult.color}`}>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg">
              {scholarshipResult.scholarship === 50 ? (
                <span className="text-2xl">🎓</span>
              ) : scholarshipResult.scholarship === 30 ? (
                <span className="text-2xl">⭐</span>
              ) : scholarshipResult.scholarship === 15 ? (
                <span className="text-2xl">📚</span>
              ) : (
                <span className="text-2xl">💼</span>
              )}
            </div>
            
            <div>
              <h3 className={`text-2xl font-bold ${scholarshipResult.color} mb-2`}>
                {scholarshipResult.scholarship}% Scholarship
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {scholarshipResult.description}
              </p>
            </div>

            {/* Fee Breakdown */}
            <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 mt-4 space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white text-center">
                Fee Breakdown
              </h4>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Original Fee:</span>
                <span className="font-medium">{originalFee.toLocaleString()} PKR</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-green-600 dark:text-green-400">Scholarship ({scholarshipResult.scholarship}%):</span>
                <span className="font-medium text-green-600 dark:text-green-400">-{scholarshipAmount.toLocaleString()} PKR</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Final Fee:</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{finalFee.toLocaleString()} PKR</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarship Rules */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">
            Scholarship Criteria
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {scholarshipRules.map((rule, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  rule.scholarship === scholarshipResult.scholarship 
                    ? 'ring-2 ring-blue-500 scale-105' 
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className={`text-sm font-medium ${rule.color}`}>
                  {rule.minPercentage}% - {rule.maxPercentage}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {rule.scholarship}% Scholarship
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>←</span>
            Edit Course Selection
          </button>
          
          <button
            onClick={handleCalculate}
            disabled={calculated}
            className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
          >
            {calculated ? (
              <>
                <span>✓</span>
                Calculated Successfully
              </>
            ) : (
              <>
                <span>💰</span>
                Calculate & Generate Challan
              </>
            )}
          </button>
        </div>

        {/* Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            * Scholarship is subject to verification of submitted documents and final approval by the scholarship committee.
          </p>
        </div>
      </div>
    </div>
  );
}


import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";


// ... (keep all the existing types, interfaces, and configuration objects same as before)

// Updated FeeChallanModal component with PDF download functionality
function FeeChallanModal({
  isOpen,
  onClose,
  personalInfo,
  academicInfo,
  courseSelection,
  feeDetails,
  onDownload
}: {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  feeDetails: FeeDetails;
  onDownload: () => void;
}) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const generatePDF = () => {
    if (!feeDetails) return;

    setIsGeneratingPDF(true);

    try {
      // Create new PDF document
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Add background color for header
      doc.setFillColor(41, 128, 185);
      doc.rect(0, 0, pageWidth, 60, 'F');

      // Header - Institution Name
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text("Aspire Colleague", pageWidth / 2, 25, { align: "center" });

      // Header - Title
      doc.setFontSize(16);
      doc.text("FEE PAYMENT CHALLAN", pageWidth / 2, 40, { align: "center" });

      // Reset text color for content
      doc.setTextColor(0, 0, 0);
      yPosition = 70;

      // Application ID and Date
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Application ID: ${feeDetails.applicationId}`, margin, yPosition);
      doc.text(`Generated Date: ${new Date().toLocaleDateString()}`, pageWidth - margin, yPosition, { align: "right" });
      yPosition += 15;

      // Student Information Section
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("STUDENT INFORMATION", margin, yPosition);
      yPosition += 8;
      
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Full Name: ${personalInfo.fullName}`, margin, yPosition);
      doc.text(`CNIC: ${personalInfo.cnic || 'N/A'}`, pageWidth / 2, yPosition);
      yPosition += 7;

      doc.text(`Academic Level: ${academicInfo.academicLevel}`, margin, yPosition);
      doc.text(`Gender: ${personalInfo.gender || 'N/A'}`, pageWidth / 2, yPosition);
      yPosition += 7;

      doc.text(`Date of Birth: ${personalInfo.dob || 'N/A'}`, margin, yPosition);
      doc.text(`Percentage: ${academicInfo.percentage}%`, pageWidth / 2, yPosition);
      yPosition += 7;

      const addressLines = doc.splitTextToSize(`Address: ${personalInfo.address || 'Not provided'}`, pageWidth - 2 * margin);
      doc.text(addressLines, margin, yPosition);
      yPosition += addressLines.length * 5 + 5;

      // Course Information Section
      if (yPosition > pageHeight - 80) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("COURSE INFORMATION", margin, yPosition);
      yPosition += 8;
      
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Program: ${courseSelection.program}`, margin, yPosition);
      doc.text(`Duration: ${courseSelection.duration}`, pageWidth / 2, yPosition);
      yPosition += 7;

      doc.text(`Specialization: ${courseSelection.specialization || 'N/A'}`, margin, yPosition);
      doc.text(`Mode: ${courseSelection.mode || 'N/A'}`, pageWidth / 2, yPosition);
      yPosition += 7;

      doc.text(`Start Date: ${courseSelection.startDate || 'N/A'}`, margin, yPosition);
      yPosition += 12;

      // Fee Breakdown Section
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("FEE BREAKDOWN", margin, yPosition);
      yPosition += 8;
      
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // Fee Table Headers
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPosition, pageWidth - 2 * margin, 8, 'F');
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Description", margin + 5, yPosition + 6);
      doc.text("Amount (PKR)", pageWidth - margin - 40, yPosition + 6, { align: "right" });
      yPosition += 12;

      // Fee Items
      doc.setFont("helvetica", "normal");
      
      // Original Fee
      doc.text("Original Course Fee", margin + 5, yPosition + 6);
      doc.text(feeDetails.originalFee.toLocaleString(), pageWidth - margin - 40, yPosition + 6, { align: "right" });
      yPosition += 8;

      // Scholarship
      doc.text(`Scholarship (${feeDetails.scholarshipPercentage}%)`, margin + 5, yPosition + 6);
      doc.text(`-${feeDetails.scholarshipAmount.toLocaleString()}`, pageWidth - margin - 40, yPosition + 6, { align: "right" });
      yPosition += 8;

      // Total Line
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 5;
      
      doc.setFont("helvetica", "bold");
      doc.text("TOTAL PAYABLE AMOUNT", margin + 5, yPosition + 6);
      doc.text(feeDetails.finalFee.toLocaleString(), pageWidth - margin - 40, yPosition + 6, { align: "right" });
      yPosition += 12;

      // Payment Instructions Section
      if (yPosition > pageHeight - 100) {
        doc.addPage();
        yPosition = margin;
      }

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("PAYMENT INSTRUCTIONS", margin, yPosition);
      yPosition += 8;
      
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const instructions = [
        "1. Pay the fee at any HBL, UBL, or MCB branch",
        "2. Use Application ID as reference in payment",
        `3. Application ID: ${feeDetails.applicationId}`,
        "4. Payment must be made within 7 days of challan generation",
        "5. Keep the payment receipt for verification",
        "6. Upload payment proof in the application portal",
        "7. For online payments, use 'Fee Payment' as description"
      ];

      instructions.forEach(instruction => {
        if (yPosition > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(instruction, margin + 5, yPosition);
        yPosition += 6;
      });

      yPosition += 10;

      // Important Notes
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(100, 100, 100);
      const notes = [
        "Note: This challan is computer generated and does not require signature.",
        "Scholarship is subject to verification of academic documents.",
        "For any queries, contact admissions@educouniversity.edu.pk"
      ];

      notes.forEach(note => {
        if (yPosition > pageHeight - 15) {
          doc.addPage();
          yPosition = margin;
        }
        const noteLines = doc.splitTextToSize(note, pageWidth - 2 * margin);
        doc.text(noteLines, margin, yPosition);
        yPosition += noteLines.length * 4 + 2;
      });

      // Footer
      const footerY = pageHeight - 10;
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, footerY, { align: "center" });

      // Save the PDF
      doc.save(`Fee_Challan_${feeDetails.applicationId}.pdf`);
      
      setIsGeneratingPDF(false);
      onDownload(); // Call the parent's onDownload callback

    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsGeneratingPDF(false);
      alert("Error generating PDF. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">Fee Challan</h2>
              <p className="text-blue-100">Application ID: {feeDetails.applicationId}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Student Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Student Information</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Name:</strong> {personalInfo.fullName}</p>
                <p><strong>CNIC:</strong> {personalInfo.cnic}</p>
                <p><strong>Academic Level:</strong> {academicInfo.academicLevel}</p>
                <p><strong>Percentage:</strong> {academicInfo.percentage}%</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Course Information</h3>
              <div className="space-y-1 text-sm">
                <p><strong>Program:</strong> {courseSelection.program}</p>
                <p><strong>Duration:</strong> {courseSelection.duration}</p>
                <p><strong>Mode:</strong> {courseSelection.mode}</p>
                <p><strong>Specialization:</strong> {courseSelection.specialization || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Fee Breakdown</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Original Course Fee:</span>
                <span className="font-medium">{feeDetails.originalFee.toLocaleString()} PKR</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-green-600 dark:text-green-400">
                  Scholarship ({feeDetails.scholarshipPercentage}%):
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  -{feeDetails.scholarshipAmount.toLocaleString()} PKR
                </span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Final Payable Amount:</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {feeDetails.finalFee.toLocaleString()} PKR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Payment Instructions
            </h3>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Pay the fee at any HBL, UBL, or MCB branch</li>
              <li>• Use Application ID as reference: {feeDetails.applicationId}</li>
              <li>• Payment must be made within 7 days</li>
              <li>• Keep the payment receipt for verification</li>
              <li>• Upload payment proof in the next step</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium transition-all duration-200"
            >
              Close
            </button>
            
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {isGeneratingPDF ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <span>📄</span>
                  Download Challan PDF
                </>
              )}
            </button>
          </div>

          {/* PDF Preview Note */}
          <div className="text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              The PDF challan will include all details and can be printed for bank payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentUploadForm({ 
  data, 
  onChange, 
  errors,
  feeDetails
}: { 
  data: Documents; 
  onChange: (data: Documents) => void; 
  errors: Partial<{ cnicFile: string }>;
  feeDetails: FeeDetails | null;
}) {
  const handleFileChange = (field: keyof Documents, files: FileList | File[] | null) => {
    if (!files) {
      onChange({ ...data, [field]: field === 'academicFiles' ? [] : null });
      return;
    }

    if (field === 'academicFiles') {
      const fileArray = Array.from(files as FileList | File[]);
      onChange({ 
        ...data, 
        academicFiles: fileArray.map(file => file.name) 
      });
    } else {
      const file = files[0] as File;
      onChange({ 
        ...data, 
        [field]: file.name 
      });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full">
            <span className="text-lg font-semibold text-orange-600 dark:text-orange-400">4</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Upload Documents
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Upload required documents and payment proof
            </p>
          </div>
        </div>

        {/* Fee Summary */}
        {feeDetails && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Fee Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-blue-700 dark:text-blue-300">Original Fee:</span>
                <p className="font-medium">{feeDetails.originalFee.toLocaleString()} PKR</p>
              </div>
              <div>
                <span className="text-green-600 dark:text-green-400">Scholarship:</span>
                <p className="font-medium">{feeDetails.scholarshipPercentage}%</p>
              </div>
              <div>
                <span className="text-green-600 dark:text-green-400">Discount:</span>
                <p className="font-medium">{feeDetails.scholarshipAmount.toLocaleString()} PKR</p>
              </div>
              <div>
                <span className="text-blue-700 dark:text-blue-300">Final Fee:</span>
                <p className="font-medium text-lg">{feeDetails.finalFee.toLocaleString()} PKR</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* CNIC / ID Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              National ID / CNIC Copy <span className="text-red-500">*</span>
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFileChange("cnicFile", e.target.files)}
                className="hidden"
              />
              <div className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
                data.cnicFile 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                  : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-500 dark:hover:border-blue-400"
              }`}>
                <div className="text-gray-600 dark:text-gray-400">
                  {data.cnicFile ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ {data.cnicFile}</span>
                  ) : (
                    "Click or drag file here"
                  )}
                </div>
              </div>
            </label>
            {errors.cnicFile && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.cnicFile}
              </p>
            )}
          </div>

          {/* Academic Certificates Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Academic Certificates & Marksheet
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                multiple
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFileChange("academicFiles", e.target.files)}
                className="hidden"
              />
              <div className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
                data.academicFiles.length > 0
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                  : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-500 dark:hover:border-blue-400"
              }`}>
                <div className="text-gray-600 dark:text-gray-400">
                  {data.academicFiles.length > 0 ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      ✓ {data.academicFiles.length} file(s) selected
                    </span>
                  ) : (
                    "Click or drag files here"
                  )}
                </div>
              </div>
            </label>
            {data.academicFiles.length > 0 && (
              <div className="mt-3 text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                <strong>Selected files:</strong> {data.academicFiles.join(", ")}
              </div>
            )}
          </div>

          {/* Payment Proof Upload */}
        {/* Payment Proof Upload (Optional now) */}
<div>
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
    Payment Proof (Screenshot/Receipt) <span className="text-gray-400 text-xs">(Optional)</span>
  </label>
  <label className="block cursor-pointer">
    <input
      type="file"
      accept=".jpg,.png,.pdf"
      onChange={(e) => handleFileChange("paymentProof", e.target.files)}
      className="hidden"
    />
    <div
      className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
        data.paymentProof
          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
          : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-500 dark:hover:border-blue-400"
      }`}
    >
      <div className="text-gray-600 dark:text-gray-400">
        {data.paymentProof ? (
          <span className="text-green-600 dark:text-green-400 font-medium">
            ✓ {data.paymentProof}
          </span>
        ) : (
          "Click to upload payment proof (optional)"
        )}
      </div>
    </div>
  </label>
  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
    Upload screenshot or scanned copy of your fee payment receipt (optional)
  </p>
</div>


          {/* Other Documents */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Other Supporting Documents (Optional)
            </label>
            <label className="block cursor-pointer">
              <input
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFileChange("feeFile", e.target.files)}
                className="hidden"
              />
              <div className={`w-full rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-200 ${
                data.feeFile 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                  : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 hover:border-blue-500 dark:hover:border-blue-400"
              }`}>
                <div className="text-gray-600 dark:text-gray-400">
                  {data.feeFile ? (
                    <span className="text-green-600 dark:text-green-400 font-medium">✓ {data.feeFile}</span>
                  ) : (
                    "Click to upload other documents"
                  )}
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}



 function ReviewSubmitForm({
  personalInfo,
  academicInfo,
  courseSelection,
  documents,
  feeDetails,
  onSubmit,
}: {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  documents: Documents;
  feeDetails: FeeDetails | null;
  onSubmit: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeeModal, setShowFeeModal] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    // Removed the "must have payment proof" guard so form can be submitted even without payment proof
    setIsSubmitting(true);

    // simulate network / processing delay (keep or remove as you like)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Submitting application:", {
      personalInfo,
      academicInfo,
      courseSelection,
      documents,
      feeDetails,
    });

    // call parent submit handler (keeps existing behavior)
    try {
      onSubmit();
    } catch (err) {
      console.error("onSubmit error:", err);
    }

    setIsSubmitting(false);

    // show the defaulter popup after submission
    setShowFeeModal(true);
  };

  const handleModalOk = () => {
    setShowFeeModal(false);
    // redirect to applicant portal
    router.push("/applicant_portal");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full">
            <span className="text-lg font-semibold text-green-600 dark:text-green-400">5</span>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Review Your Application
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Please review all information before submitting
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Personal Information Review */}
          <section className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">1</span>
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong className="text-gray-700 dark:text-gray-300">Full Name:</strong> {personalInfo.fullName || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">CNIC:</strong> {personalInfo.cnic || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Date of Birth:</strong> {personalInfo.dob || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Gender:</strong> {personalInfo.gender || "Not provided"}</div>
              <div className="md:col-span-2"><strong className="text-gray-700 dark:text-gray-300">Address:</strong> {personalInfo.address || "Not provided"}</div>
            </div>
          </section>

          {/* Academic Information Review */}
          <section className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">2</span>
              </div>
              Academic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong className="text-gray-700 dark:text-gray-300">Academic Level:</strong> {academicInfo.academicLevel || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Marks:</strong> {academicInfo.obtainedMarks} / {academicInfo.totalMarks}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Percentage:</strong> {academicInfo.percentage}%</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Institute:</strong> {academicInfo.institute || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Board:</strong> {academicInfo.board || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Passing Year:</strong> {academicInfo.passingYear || "Not provided"}</div>
            </div>
          </section>

          {/* Course Selection Review */}
          <section className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">3</span>
              </div>
              Course Selection
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong className="text-gray-700 dark:text-gray-300">Program:</strong> {courseSelection.program || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Specialization:</strong> {courseSelection.specialization || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Mode:</strong> {courseSelection.mode || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Duration:</strong> {courseSelection.duration || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Start Date:</strong> {courseSelection.startDate || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Supporting Doc:</strong> {courseSelection.courseDoc || "Not uploaded"}</div>
            </div>
          </section>

          {/* Fee Details Review */}
          {feeDetails && (
            <section className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400">💰</span>
                </div>
                Fee Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong className="text-gray-700 dark:text-gray-300">Application ID:</strong> {feeDetails.applicationId}</div>
                <div><strong className="text-gray-700 dark:text-gray-300">Original Fee:</strong> {feeDetails.originalFee.toLocaleString()} PKR</div>
                <div><strong className="text-green-600 dark:text-green-400">Scholarship:</strong> {feeDetails.scholarshipPercentage}%</div>
                <div><strong className="text-green-600 dark:text-green-400">Discount Amount:</strong> {feeDetails.scholarshipAmount.toLocaleString()} PKR</div>
                <div className="md:col-span-2">
                  <strong className="text-blue-600 dark:text-blue-400 text-lg">Final Payable Amount:</strong>
                  <span className="text-blue-600 dark:text-blue-400 text-lg font-bold ml-2">
                    {feeDetails.finalFee.toLocaleString()} PKR
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* Documents Review */}
          <section className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 bg-gray-50 dark:bg-gray-700/50">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">4</span>
              </div>
              Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong className="text-gray-700 dark:text-gray-300">CNIC Copy:</strong> {documents.cnicFile || "Not uploaded"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Academic Files:</strong> {documents.academicFiles.length > 0 ? documents.academicFiles.join(", ") : "Not uploaded"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Payment Proof:</strong> {documents.paymentProof || "Not uploaded"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Other Documents:</strong> {documents.feeFile || "Not uploaded"}</div>
            </div>
          </section>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-4 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-xl font-medium transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <span>✓</span>
                  Submit Application
                </>
              )}
            </button>
          </div>

          {/* NOTE: payment proof is no longer required to submit, so the warning block has been removed */}
        </div>
      </div>

      {/* Defaulter / Fee popup modal */}
      {showFeeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowFeeModal(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Payment Pending</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              Your application has been submitted, but we could not find a payment proof. You are currently marked as a <strong>defaulter</strong>. Please pay the required fee and upload the payment screenshot from your Dashboard.
            </p>
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700" onClick={() => setShowFeeModal(false)}>Close</button>
              <button className="px-4 py-2 rounded-md bg-green-600 text-white" onClick={handleModalOk}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Enhanced Main Page Component
export default function MyApplicationsPage() {
  const steps = [
    "Personal Info",
    "Academic Info",
    "Course Selection",
    "Scholarship & Fees",
    "Document Upload",
    "Review & Submit",
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({
    personalInfo: {},
    academicInfo: {},
    courseSelection: {},
    documents: {}
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showFeeChallan, setShowFeeChallan] = useState(false);

  // Load form data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem(STORAGE_KEY);
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error loading form data from localStorage:", error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const progressPercent = ((currentStep + 1) / steps.length) * 100;

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 0: {
        const currentErrors = validatePersonalInfo(formData.personalInfo);
        setErrors(prev => ({ ...prev, personalInfo: currentErrors }));
        return Object.keys(currentErrors).length === 0;
      }
      
      case 1: {
        const currentErrors = validateAcademicInfo(formData.academicInfo);
        setErrors(prev => ({ ...prev, academicInfo: currentErrors }));
        return Object.keys(currentErrors).length === 0;
      }
      
      case 2: {
        const currentErrors = validateCourseSelection(formData.courseSelection);
        setErrors(prev => ({ ...prev, courseSelection: currentErrors }));
        return Object.keys(currentErrors).length === 0;
      }
      
      case 4: {
        const currentErrors = validateDocuments(formData.documents);
        setErrors(prev => ({ ...prev, documents: currentErrors }));
        return Object.keys(currentErrors).length === 0;
      }
      
      default:
        return true;
    }
  };

  const handleStepChange = (newStep: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(newStep);
      setIsAnimating(false);
    }, 300);
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      handleStepChange(Math.min(currentStep + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    handleStepChange(Math.max(currentStep - 1, 0));
  };

  const handleFeeCalculation = (feeDetails: FeeDetails) => {
    setFormData(prev => ({ ...prev, feeDetails }));
    setShowFeeChallan(true);
  };

  const handleDownloadChallan = () => {
    // In a real application, this would generate and download a PDF
    // For now, we'll just show an alert and close the modal
    alert("Challan PDF downloaded successfully!");
    setShowFeeChallan(false);
    handleStepChange(4); // Move to document upload step
  };

  const handleSubmit = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitted(false);
  };

  const handleResetForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsSubmitted(false);
    setShowFeeChallan(false);
    setErrors({
      personalInfo: {},
      academicInfo: {},
      courseSelection: {},
      documents: {}
    });
  };

  const stepComponents = [
    <PersonalInfoForm 
      key="step1" 
      data={formData.personalInfo}
      onChange={(data) => setFormData(prev => ({ ...prev, personalInfo: data }))}
      errors={errors.personalInfo}
    />,
    <AcademicInfoForm 
      key="step2" 
      data={formData.academicInfo}
      onChange={(data) => setFormData(prev => ({ ...prev, academicInfo: data }))}
      errors={errors.academicInfo}
    />,
    <CourseSelectionForm 
      key="step3" 
      data={formData.courseSelection}
      onChange={(data) => setFormData(prev => ({ ...prev, courseSelection: data }))}
      errors={errors.courseSelection}
    />,
    <ScholarshipCalculator 
      key="step4"
      academicInfo={formData.academicInfo}
      courseSelection={formData.courseSelection}
      onBack={() => handleStepChange(2)}
      onCalculate={handleFeeCalculation}
    />,
    <DocumentUploadForm 
      key="step5" 
      data={formData.documents}
      onChange={(data) => setFormData(prev => ({ ...prev, documents: data }))}
      errors={errors.documents}
      feeDetails={formData.feeDetails}
    />,
    <ReviewSubmitForm 
      key="step6" 
      personalInfo={formData.personalInfo}
      academicInfo={formData.academicInfo}
      courseSelection={formData.courseSelection}
      documents={formData.documents}
      feeDetails={formData.feeDetails}
      onSubmit={handleSubmit}
    />,
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl text-green-600 dark:text-green-400">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            Thank you for submitting your application. We have received your payment proof and will contact you shortly for verification.
          </p>
          {formData.feeDetails && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Application ID:</strong> {formData.feeDetails.applicationId}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                <strong>Final Fee:</strong> {formData.feeDetails.finalFee.toLocaleString()} PKR
              </p>
            </div>
          )}
          <button 
            onClick={handleResetForm}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 px-3 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                  <HiOutlineDocumentText className="text-blue-600 dark:text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                My Application
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 text-sm sm:text-base">
                Complete all {steps.length} steps to submit your application
              </p>
            </div>
            <button
              onClick={handleResetForm}
              className="px-3 sm:px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all duration-200 flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
            >
              <span>🔄</span>
              Reset Form
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <div className="flex flex-col sm:flex-row justify-between text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progressPercent)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Stepper */}
          <div className="mt-4 sm:mt-6 overflow-x-auto">
            <div className="flex items-center justify-between relative min-w-[320px] sm:min-w-full">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>

              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center relative z-10 min-w-[40px] sm:min-w-auto">
                  <button
                    onClick={() => handleStepChange(index)}
                    disabled={index > currentStep}
                    className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full font-medium transition-all duration-300 ${
                      index <= currentStep
                        ? "bg-blue-600 text-white shadow-lg scale-110"
                        : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                    } ${index < currentStep ? "hover:scale-105" : ""}`}
                  >
                    {index < currentStep ? "✓" : index + 1}
                  </button>
                  <p
                    className={`mt-1 sm:mt-2 text-[9px] sm:text-xs font-medium text-center max-w-[40px] sm:max-w-none ${
                      index <= currentStep
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className={`transition-all duration-300 transform ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {stepComponents[currentStep]}
        </div>

        {/* Navigation Buttons */}
        {currentStep !== 3 && ( // Hide navigation on scholarship calculator step
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 font-medium disabled:cursor-not-allowed"
            >
              <span>←</span>
              Back
            </button>
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Next
                <span>→</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-5 py-2 sm:px-6 sm:py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>✓</span>
                Submit Application
              </button>
            )}
          </div>
        )}

        {/* Fee Challan Modal */}
         <FeeChallanModal
          isOpen={showFeeChallan}
          onClose={() => setShowFeeChallan(false)}
          personalInfo={formData.personalInfo}
          academicInfo={formData.academicInfo}
          courseSelection={formData.courseSelection}
          feeDetails={formData.feeDetails!}
          onDownload={handleDownloadChallan}
        />
      </div>
    </div>
  );
}