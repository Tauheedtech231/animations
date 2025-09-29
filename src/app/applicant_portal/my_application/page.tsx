"use client";

import { useState, useEffect } from "react";
import { FiFileText } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";

// Types (unchanged)
interface PersonalInfo {
  fullName: string;
  cnic: string;
  dob: string;
  gender: string;
  address: string;
}

interface AcademicInfo {
  qualification: string;
  institute: string;
  program: string;
  rollNumber: string;
  passingYear: string;
  cgpa: string;
  transcript: string | null;
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
}

interface FormDataState {
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  documents: Documents;
}

interface FormErrors {
  personalInfo: Partial<PersonalInfo>;
  academicInfo: Partial<AcademicInfo>;
  courseSelection: Partial<CourseSelection>;
  documents: Partial<{ cnicFile: string }>;
}

// Validation functions (unchanged)
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
  if (data.passingYear && (parseInt(data.passingYear) < 1950 || parseInt(data.passingYear) > new Date().getFullYear())) {
    errors.passingYear = "Invalid passing year";
  }
  if (data.cgpa && !/^[0-9]+(\.[0-9]+)?%?$/.test(data.cgpa)) {
    errors.cgpa = "Invalid CGPA/Percentage format";
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
    qualification: "",
    institute: "",
    program: "",
    rollNumber: "",
    passingYear: "",
    cgpa: "",
    transcript: null
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
    feeFile: null
  }
};

// Enhanced Step Components with improved responsive design
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
      {/* Enhanced Form Card */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-all duration-300">
        {/* Header with step indicator */}
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
          {/* Full Name */}
          <div>
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
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

          {/* CNIC */}
          <div>
            <label
              htmlFor="cnic"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
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

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
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
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
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

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
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
    onChange({ ...data, [field]: value });
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
              Please provide your latest academic details.
            </p>
          </div>
        </div>

        <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Qualification */}
          <div>
            <label
              htmlFor="qualification"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Highest Qualification
            </label>
            <select
              id="qualification"
              value={data.qualification}
              onChange={(e) => handleChange("qualification", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select qualification</option>
              <option value="Matric / O-Levels">Matric / O-Levels</option>
              <option value="Intermediate / A-Levels">Intermediate / A-Levels</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Institute */}
          <div>
            <label
              htmlFor="institute"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Institute / University
            </label>
            <input
              type="text"
              id="institute"
              value={data.institute}
              onChange={(e) => handleChange("institute", e.target.value)}
              placeholder="e.g. COMSATS University Islamabad"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Program & Roll Number */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="program"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Program / Degree
              </label>
              <input
                type="text"
                id="program"
                value={data.program}
                onChange={(e) => handleChange("program", e.target.value)}
                placeholder="e.g. BS Computer Science"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="roll-number"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Roll Number / Reg. No.
              </label>
              <input
                type="text"
                id="roll-number"
                value={data.rollNumber}
                onChange={(e) => handleChange("rollNumber", e.target.value)}
                placeholder="e.g. FA20-BCS-073"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          {/* Passing Year & CGPA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Passing Year
              </label>
              <input
                type="number"
                id="year"
                value={data.passingYear}
                onChange={(e) => handleChange("passingYear", e.target.value)}
                placeholder="e.g. 2024"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.passingYear && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.passingYear}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="cgpa"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                CGPA / Percentage
              </label>
              <input
                type="text"
                id="cgpa"
                value={data.cgpa}
                onChange={(e) => handleChange("cgpa", e.target.value)}
                placeholder="e.g. 3.5 / 80%"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              {errors.cgpa && (
                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                  <span>⚠</span> {errors.cgpa}
                </p>
              )}
            </div>
          </div>

          {/* Upload Transcript */}
          <div>
            <label
              htmlFor="transcript"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Upload Transcript (Optional)
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer">
                <input
                  type="file"
                  id="transcript"
                  onChange={(e) => handleFileChange("transcript", e.target.files?.[0] || null)}
                  className="hidden"
                />
                <div className="w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-6 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200">
                  <div className="text-gray-500 dark:text-gray-400">
                    {data.transcript ? (
                      <span className="text-green-600 dark:text-green-400">✓ {data.transcript}</span>
                    ) : (
                      "Click to upload transcript"
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
          {/* Program */}
          <div>
            <label
              htmlFor="program"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Preferred Program <span className="text-red-500">*</span>
            </label>
            <select
              id="program"
              value={data.program}
              onChange={(e) => handleChange("program", e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a program</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Psychology">Psychology</option>
            </select>
            {errors.program && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <span>⚠</span> {errors.program}
              </p>
            )}
          </div>

          {/* Specialization */}
          <div>
            <label
              htmlFor="specialization"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
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

          {/* Course Mode & Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="mode"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
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
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
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

          {/* Start Date */}
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
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

          {/* Upload Supporting Document */}
          <div>
            <label
              htmlFor="course-doc"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
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

function DocumentUploadForm({ 
  data, 
  onChange, 
  errors 
}: { 
  data: Documents; 
  onChange: (data: Documents) => void; 
  errors: Partial<{ cnicFile: string }>; 
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
              Upload required documents and payment proof if applicable.
            </p>
          </div>
        </div>

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
              Academic Certificates
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

          {/* Fee Payment Screenshot Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Fee Payment Screenshot (Optional)
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
                    "Click or drag file here"
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
  onSubmit 
}: { 
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  courseSelection: CourseSelection;
  documents: Documents;
  onSubmit: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Submitting application:", {
      personalInfo,
      academicInfo,
      courseSelection,
      documents
    });
    setIsSubmitting(false);
    onSubmit();
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
              <div><strong className="text-gray-700 dark:text-gray-300">Qualification:</strong> {academicInfo.qualification || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Institute:</strong> {academicInfo.institute || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Program:</strong> {academicInfo.program || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Roll Number:</strong> {academicInfo.rollNumber || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Passing Year:</strong> {academicInfo.passingYear || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">CGPA/Percentage:</strong> {academicInfo.cgpa || "Not provided"}</div>
              <div><strong className="text-gray-700 dark:text-gray-300">Transcript:</strong> {academicInfo.transcript || "Not uploaded"}</div>
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
              <div><strong className="text-gray-700 dark:text-gray-300">Fee Proof:</strong> {documents.feeFile || "Not uploaded"}</div>
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
        </div>
      </div>
    </div>
  );
}

// Enhanced Main Page Component
export default function MyApplicationsPage() {
  const steps = [
    "Personal Info",
    "Academic Info",
    "Course Selection",
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
      
      case 3: {
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

  const handleSubmit = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    localStorage.removeItem(STORAGE_KEY);
    setFormData(initialFormData);
    setCurrentStep(0);
    setIsSubmitted(false);
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
    <DocumentUploadForm 
      key="step4" 
      data={formData.documents}
      onChange={(data) => setFormData(prev => ({ ...prev, documents: data }))}
      errors={errors.documents}
    />,
    <ReviewSubmitForm 
      key="step5" 
      personalInfo={formData.personalInfo}
      academicInfo={formData.academicInfo}
      courseSelection={formData.courseSelection}
      documents={formData.documents}
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
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Thank you for submitting your application. We will review your information and contact you shortly.
          </p>
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
    </div>
  </div>
);

}