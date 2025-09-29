"use client";

import { useState, useEffect } from "react";

// Types
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
  transcript: string | null; // Store file name instead of File object
}

interface CourseSelection {
  program: string;
  specialization: string;
  mode: string;
  duration: string;
  startDate: string;
  courseDoc: string | null; // Store file name instead of File object
}

interface Documents {
  cnicFile: string | null; // Store file name instead of File object
  academicFiles: string[]; // Store file names instead of File objects
  feeFile: string | null; // Store file name instead of File object
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

// Step Components
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
    <main className="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="w-full max-w-xl sm:max-w-2xl space-y-8">
        {/* Form Card */}
        <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 sm:space-y-8 shadow-lg transition">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-black dark:text-white">
            Personal Information
          </h2>
          <p className="text-sm sm:text-base text-center text-gray-600 dark:text-gray-400">
            Please fill out your personal details carefully.
          </p>

          <form className="space-y-4 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm sm:text-base font-medium text-black dark:text-white mb-1 sm:mb-2"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="full-name"
                value={data.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="e.g. Muhammad Ali Khan"
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              {errors.fullName && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* CNIC */}
            <div>
              <label
                htmlFor="cnic"
                className="block text-sm sm:text-base font-medium text-black dark:text-white mb-1 sm:mb-2"
              >
                National ID Card Number (CNIC)
              </label>
              <input
                type="text"
                id="cnic"
                value={data.cnic}
                onChange={(e) => handleChange("cnic", e.target.value)}
                placeholder="XXXXX-XXXXXXX-X"
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              {errors.cnic && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.cnic}</p>}
            </div>

            {/* Date of Birth & Gender */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm sm:text-base font-medium text-black dark:text-white mb-1 sm:mb-2"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  value={data.dob}
                  onChange={(e) => handleChange("dob", e.target.value)}
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.dob && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.dob}</p>}
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm sm:text-base font-medium text-black dark:text-white mb-1 sm:mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  value={data.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                className="block text-sm sm:text-base font-medium text-black dark:text-white mb-1 sm:mb-2"
              >
                Address
              </label>
              <textarea
                id="address"
                value={data.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                placeholder="e.g. House #123, Street 4, Islamabad"
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-3 sm:px-4 py-2 sm:py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </main>
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
    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="w-full max-w-2xl">
        {/* Form Card */}
        <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-lg transition">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white">
            Academic Information
          </h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Please provide your latest academic details.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Qualification */}
            <div>
              <label
                htmlFor="qualification"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Highest Qualification
              </label>
              <select
                id="qualification"
                value={data.qualification}
                onChange={(e) => handleChange("qualification", e.target.value)}
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Institute / University
              </label>
              <input
                type="text"
                id="institute"
                value={data.institute}
                onChange={(e) => handleChange("institute", e.target.value)}
                placeholder="e.g. COMSATS University Islamabad"
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            {/* Program & Roll Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="program"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Program / Degree
                </label>
                <input
                  type="text"
                  id="program"
                  value={data.program}
                  onChange={(e) => handleChange("program", e.target.value)}
                  placeholder="e.g. BS Computer Science"
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>
              <div>
                <label
                  htmlFor="roll-number"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Roll Number / Reg. No.
                </label>
                <input
                  type="text"
                  id="roll-number"
                  value={data.rollNumber}
                  onChange={(e) => handleChange("rollNumber", e.target.value)}
                  placeholder="e.g. FA20-BCS-073"
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
              </div>
            </div>

            {/* Passing Year & CGPA */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Passing Year
                </label>
                <input
                  type="number"
                  id="year"
                  value={data.passingYear}
                  onChange={(e) => handleChange("passingYear", e.target.value)}
                  placeholder="e.g. 2024"
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.passingYear && <p className="text-red-500 text-sm mt-1">{errors.passingYear}</p>}
              </div>
              <div>
                <label
                  htmlFor="cgpa"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  CGPA / Percentage
                </label>
                <input
                  type="text"
                  id="cgpa"
                  value={data.cgpa}
                  onChange={(e) => handleChange("cgpa", e.target.value)}
                  placeholder="e.g. 3.5 / 80%"
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
                />
                {errors.cgpa && <p className="text-red-500 text-sm mt-1">{errors.cgpa}</p>}
              </div>
            </div>

            {/* Upload Transcript */}
            <div>
              <label
                htmlFor="transcript"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Upload Transcript (Optional)
              </label>
              <input
                type="file"
                id="transcript"
                onChange={(e) => handleFileChange("transcript", e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90 transition"
              />
              {data.transcript && <p className="text-green-600 text-sm mt-2">Selected: {data.transcript}</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
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
    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="w-full max-w-2xl">
        {/* Form Card */}
        <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 space-y-8 shadow-lg transition">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white">
            Course Selection
          </h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
            Choose your preferred program and course details.
          </p>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Program */}
            <div>
              <label
                htmlFor="program"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Preferred Program <span className="text-red-500">*</span>
              </label>
              <select
                id="program"
                value={data.program}
                onChange={(e) => handleChange("program", e.target.value)}
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
              >
                <option value="">Select a program</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Psychology">Psychology</option>
              </select>
              {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program}</p>}
            </div>

            {/* Specialization */}
            <div>
              <label
                htmlFor="specialization"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Specialization (if any)
              </label>
              <input
                type="text"
                id="specialization"
                value={data.specialization}
                onChange={(e) => handleChange("specialization", e.target.value)}
                placeholder="e.g. Artificial Intelligence"
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            {/* Course Mode & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="mode"
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Course Mode
                </label>
                <select
                  id="mode"
                  value={data.mode}
                  onChange={(e) => handleChange("mode", e.target.value)}
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                  className="block text-sm font-medium text-black dark:text-white mb-2"
                >
                  Duration
                </label>
                <select
                  id="duration"
                  value={data.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Preferred Start Date
              </label>
              <input
                type="date"
                id="start-date"
                value={data.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full rounded-lg border border-black/10 dark:border-white/20 bg-transparent px-4 py-3 text-black dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
              {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
            </div>

            {/* Upload Supporting Document */}
            <div>
              <label
                htmlFor="course-doc"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Upload Supporting Document (Optional)
              </label>
              <input
                type="file"
                id="course-doc"
                onChange={(e) => handleFileChange("courseDoc", e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary file:text-white hover:file:bg-primary/90 transition"
              />
              {data.courseDoc && <p className="text-green-600 text-sm mt-2">Selected: {data.courseDoc}</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
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
    <main className="flex flex-1 justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="w-full max-w-2xl space-y-8">
        <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-lg space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-black dark:text-white">
              Upload Documents
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Upload required documents and payment proof if applicable.
            </p>
          </div>

          {/* CNIC / ID Upload */}
          <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <span className="text-sm font-medium text-black dark:text-white mb-2">
                National ID / CNIC Copy <span className="text-red-500">*</span>
              </span>
              <input
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFileChange("cnicFile", e.target.files)}
                className="hidden"
              />
              <span className="text-gray-400 text-sm">
                {data.cnicFile ? data.cnicFile : "Click or drag file here"}
              </span>
            </label>
            {errors.cnicFile && <p className="text-red-500 text-sm mt-2">{errors.cnicFile}</p>}
          </div>

          {/* Academic Certificates Upload */}
          <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <span className="text-sm font-medium text-black dark:text-white mb-2">
                Academic Certificates
              </span>
              <input
                type="file"
                multiple
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFileChange("academicFiles", e.target.files)}
                className="hidden"
              />
              <span className="text-gray-400 text-sm">
                {data.academicFiles.length > 0
                  ? `${data.academicFiles.length} file(s) selected`
                  : "Click or drag files here"}
              </span>
            </label>
            {data.academicFiles.length > 0 && (
              <div className="mt-2 text-xs text-green-600">
                {data.academicFiles.join(", ")}
              </div>
            )}
          </div>

          {/* Fee Payment Screenshot Upload */}
          <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <span className="text-sm font-medium text-black dark:text-white mb-2">
                Fee Payment Screenshot (Optional)
              </span>
              <input
                type="file"
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFileChange("feeFile", e.target.files)}
                className="hidden"
              />
              <span className="text-gray-400 text-sm">
                {data.feeFile ? data.feeFile : "Click or drag file here"}
              </span>
            </label>
          </div>
        </div>
      </div>
    </main>
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
    // Simulate API call
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
    <main className="flex flex-1 justify-center py-10 px-4 sm:px-6 lg:px-8 bg-background-light dark:bg-background-dark min-h-screen font-display">
      <div className="w-full max-w-4xl">
        <div className="bg-white dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center text-black dark:text-white mb-2">
            Review Your Application
          </h2>
          <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-8">
            Please review all information before submitting
          </p>

          <div className="space-y-8">
            {/* Personal Information Review */}
            <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-sm mr-2">1</span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Full Name:</strong> {personalInfo.fullName || "Not provided"}</div>
                <div><strong>CNIC:</strong> {personalInfo.cnic || "Not provided"}</div>
                <div><strong>Date of Birth:</strong> {personalInfo.dob || "Not provided"}</div>
                <div><strong>Gender:</strong> {personalInfo.gender || "Not provided"}</div>
                <div className="md:col-span-2"><strong>Address:</strong> {personalInfo.address || "Not provided"}</div>
              </div>
            </section>

            {/* Academic Information Review */}
            <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-sm mr-2">2</span>
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Qualification:</strong> {academicInfo.qualification || "Not provided"}</div>
                <div><strong>Institute:</strong> {academicInfo.institute || "Not provided"}</div>
                <div><strong>Program:</strong> {academicInfo.program || "Not provided"}</div>
                <div><strong>Roll Number:</strong> {academicInfo.rollNumber || "Not provided"}</div>
                <div><strong>Passing Year:</strong> {academicInfo.passingYear || "Not provided"}</div>
                <div><strong>CGPA/Percentage:</strong> {academicInfo.cgpa || "Not provided"}</div>
                <div><strong>Transcript:</strong> {academicInfo.transcript || "Not uploaded"}</div>
              </div>
            </section>

            {/* Course Selection Review */}
            <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 text-sm mr-2">3</span>
                Course Selection
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>Program:</strong> {courseSelection.program || "Not provided"}</div>
                <div><strong>Specialization:</strong> {courseSelection.specialization || "Not provided"}</div>
                <div><strong>Mode:</strong> {courseSelection.mode || "Not provided"}</div>
                <div><strong>Duration:</strong> {courseSelection.duration || "Not provided"}</div>
                <div><strong>Start Date:</strong> {courseSelection.startDate || "Not provided"}</div>
                <div><strong>Supporting Doc:</strong> {courseSelection.courseDoc || "Not uploaded"}</div>
              </div>
            </section>

            {/* Documents Review */}
            <section className="pb-6">
              <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center">
                <span className="w-6 h-6 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center text-orange-600 dark:text-orange-400 text-sm mr-2">4</span>
                Documents
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>CNIC Copy:</strong> {documents.cnicFile || "Not uploaded"}</div>
                <div><strong>Academic Files:</strong> {documents.academicFiles.length > 0 ? documents.academicFiles.join(", ") : "Not uploaded"}</div>
                <div><strong>Fee Proof:</strong> {documents.feeFile || "Not uploaded"}</div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Main Page
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

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // Clear localStorage on successful submission
    localStorage.removeItem(STORAGE_KEY);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    // Clear localStorage and reset form
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
      <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md text-center">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Application Submitted Successfully!
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Thank you for submitting your application. We will review your information and contact you shortly.
        </p>
        <button 
          onClick={handleResetForm}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          📄 My Application
        </h1>
        <button
          onClick={handleResetForm}
          className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Reset Form
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
          <div
            className="h-2 bg-blue-600 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 text-center">
            <div
              className={`mx-auto w-10 h-10 flex items-center justify-center rounded-full 
                ${
                  index <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                }`}
            >
              {index + 1}
            </div>
            <p
              className={`mt-2 text-xs sm:text-sm ${
                index <= currentStep
                  ? "text-blue-600 font-medium"
                  : "text-gray-500"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6">
        {stepComponents[currentStep]}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          ← Back
        </button>
        
        {currentStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}