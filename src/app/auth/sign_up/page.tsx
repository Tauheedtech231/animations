"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cnic: string;
  password: string;
  programLevel: "matric" | "intermediate" | "";
  rollNumber?: string;
  passingYear?: string;
  boardName?: string;
  marksObtained?: string;
  totalMarks?: string;
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  cnic?: string;
  password?: string;
  form?: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cnic: "",
    password: "",
    programLevel: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof Errors]) {
      validateField(name, value);
    }
  };

  const validateField = (name: string, value: string) => {
    const fieldErrors: Errors = {};
    switch (name) {
      case "firstName":
        if (!value.trim()) fieldErrors.firstName = "First name is required";
        break;
      case "lastName":
        if (!value.trim()) fieldErrors.lastName = "Last name is required";
        break;
      case "email":
        if (!value.trim()) fieldErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) fieldErrors.email = "Email is invalid";
        break;
      case "phone":
        if (!value.trim()) fieldErrors.phone = "Phone number is required";
        break;
      case "cnic":
        if (!value.trim()) fieldErrors.cnic = "CNIC / B-Form is required";
        break;
      case "password":
        if (!value) fieldErrors.password = "Password is required";
        else if (value.length < 6) fieldErrors.password = "Password must be at least 6 characters";
        break;
    }
    setErrors((prev) => ({ ...prev, ...fieldErrors }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.cnic.trim()) newErrors.cnic = "CNIC / B-Form is required";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const newUser = { ...formData, role: "student" }; // ✅ Always student role
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      setIsLoading(false);
      setSuccessMsg("Account created successfully! Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 2000);
    }, 1000);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark flex flex-col min-h-screen font-display">
      <main className="flex-grow w-full">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Side Illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-primary/5 dark:bg-primary/10 p-12">
            <div className="space-y-6 text-center">
              <h1 className="text-4xl font-black tracking-tight">EduConnect</h1>
              <p className="text-lg text-muted-light dark:text-muted-dark max-w-md mx-auto">
                Your journey to higher education starts here. Let&apos;s get you connected.
              </p>
            </div>
            <div className="mt-12 w-full max-w-md">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9-cWa2lhsPUWnE7C8_qaJ5vL_FqCa2QKYiMzbaW61sXStY8NSj0o-5h4mlY9-NCfshbJGlC4qJouyrbdwOdiadCD_2lbGDLnc1mXvlty4HtPQsy8gm1SNRC9irZUkWp0Yk442gWoR9Lw0CBPCuieZz5spThk5ODksYEDm_mhe_96Hzm8-CHmevE_nrtpeUFy8oD8ejYy06Wnwgkv2rvIeduDHKIl__QwtRtEcer5sdxrmHdQjvbr3E4eKtTj-5YwFgfOHsO4kSM"
                alt="Welcoming illustration of diverse students"
                width={500}
                height={400}
                className="object-contain w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight">Create Your Account</h2>
                <p className="text-muted-light dark:text-muted-dark mt-2">
                  Join EduConnect to start your journey.
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InputField id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="First Name" error={errors.firstName} />
                  <InputField id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Last Name" error={errors.lastName} />
                </div>

                <InputField id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email address" error={errors.email} />
                <InputField id="phone" name="phone" type="text" value={formData.phone} onChange={handleChange} placeholder="Phone number" error={errors.phone} />
                <InputField id="cnic" name="cnic" type="text" value={formData.cnic} onChange={handleChange} placeholder="CNIC / B-Form" error={errors.cnic} />

                <InputField id="password" name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} placeholder="Password" error={errors.password} />

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} className="accent-blue-600" />
                  <label htmlFor="showPassword" className="text-sm text-muted-light dark:text-muted-dark">
                    Show Password
                  </label>
                </div>

                {/* Program Level */}
                <div>
                  <label className="block mb-1 text-sm">Select Program Level</label>
                  <select
                    id="programLevel"
                    name="programLevel"
                    value={formData.programLevel}
                    onChange={handleChange}
                    className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-full px-4 py-3"
                  >
                    <option value="">-- Select --</option>
                    <option value="matric">Matric</option>
                    <option value="intermediate">Intermediate</option>
                  </select>
                </div>

                {/* Dynamic Fields */}
                {formData.programLevel && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <InputField id="rollNumber" name="rollNumber" type="text" value={formData.rollNumber || ""} onChange={handleChange} placeholder="Roll Number" />
                    <InputField id="passingYear" name="passingYear" type="text" value={formData.passingYear || ""} onChange={handleChange} placeholder="Passing Year" />
                    <InputField id="boardName" name="boardName" type="text" value={formData.boardName || ""} onChange={handleChange} placeholder="Board Name" />
                    <InputField id="marksObtained" name="marksObtained" type="text" value={formData.marksObtained || ""} onChange={handleChange} placeholder="Marks Obtained" />
                    <InputField id="totalMarks" name="totalMarks" type="text" value={formData.totalMarks || ""} onChange={handleChange} placeholder="Total Marks" />
                  </div>
                )}

                {errors.form && <p className="text-red-500 text-sm text-center">{errors.form}</p>}
                {successMsg && <p className="text-green-500 text-sm text-center">{successMsg}</p>}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-light dark:text-muted-dark">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:underline font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUp;

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
}

const InputField = ({ id, name, type, value, onChange, placeholder, error }: InputFieldProps) => (
  <div className="relative">
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className={`w-full bg-input-light dark:bg-input-dark border ${
        error ? "border-red-500" : "border-border-light dark:border-border-dark"
      } rounded-full px-4 py-3 focus:ring-2 focus:ring-primary/50 focus:border-primary transition`}
      placeholder={placeholder}
    />
    {error && <p className="text-red-500 text-xs mt-1 ml-2">{error}</p>}
  </div>
);
