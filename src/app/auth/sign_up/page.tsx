"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "teacher" | "parent" | "admin";
}

interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  form?: string;
}

const SignUp: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
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
      case "password":
        if (!value) fieldErrors.password = "Password is required";
        else if (value.length < 6) fieldErrors.password = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (value !== formData.password) fieldErrors.confirmPassword = "Passwords do not match";
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

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const newUser = { ...formData };
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9-cWa2lhsPUWnE7C8_qaJ5vL_FqCa2QKYiMzbaW61sXStY8NSj0o-5h4mlY9-NCfshbJGlC4qJouyrbdwOdiadCD_2lbGDLnc1mXvlty4HtPQsy8gm1SNRC9irZUkWp0Yk442gWoR9Lw0CBPCuieZz5spThk5ODksYEDm_mhe_96Hzm8-CHmevE_nrtpeUFy8oD8ejYy06Wnwgkv2rvIeduDHKIl__QwtRtEcer5sdxrmHdQjvbr3E4eKtTj-5YwFgfOHsO4kSM" // Use your Next.js public folder image
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
                  <InputField
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    error={errors.firstName}
                  />
                  <InputField
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    error={errors.lastName}
                  />
                </div>

                <InputField
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  error={errors.email}
                />

                <InputField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  error={errors.password}
                />

                <InputField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  error={errors.confirmPassword}
                />

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="showPassword"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="accent-blue-600"
                  />
                  <label htmlFor="showPassword" className="text-sm text-muted-light dark:text-muted-dark">
                    Show Password
                  </label>
                </div>

                {/* Role Selector with icon and info */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4Z"/></svg>
                  </span>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full bg-input-light dark:bg-input-dark border border-border-light dark:border-border-dark rounded-full px-12 py-3.5 focus:ring-2 focus:ring-primary/50 focus:border-primary transition appearance-none pl-12"
                  >
                    <option value="student">Student (default)</option>
                   
                    <option value="admin">Administrator</option>
                  </select>
                  <p className="text-xs text-muted-light dark:text-muted-dark mt-1 ml-1">
                    Most users should select <span className="font-semibold text-blue-600">Student</span>. <span className="font-semibold text-red-600">Administrator</span> is for school admins only.
                  </p>
                </div>

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
