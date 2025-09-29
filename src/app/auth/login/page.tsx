"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // 👈 import context

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth(); // 👈 use context
  const [identifier, setIdentifier] = useState(""); // Email or Phone
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); // store dummy OTP
  const [useOtp, setUseOtp] = useState(false); // Toggle mode
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to send dummy OTP
  const handleSendOtp = () => {
    if (!identifier) {
      setErrorMsg("Please enter Email or Phone first.");
      return;
    }
    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    alert(`Your demo OTP is: ${randomOtp}`);
    setErrorMsg("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const users: {
        email: string;
        phone?: string;
        password: string;
        role: string;
        firstName?: string;
        lastName?: string;
      }[] = JSON.parse(localStorage.getItem("users") || "[]");

      let user;

      if (useOtp) {
        user = users.find(
          (u) => u.email === identifier || u.phone === identifier
        );
        if (!otp || otp !== generatedOtp) {
          setErrorMsg("Invalid OTP. Please try again.");
          setIsLoading(false);
          return;
        }
      } else {
        user = users.find(
          (u) =>
            (u.email === identifier || u.phone === identifier) &&
            u.password === password
        );
      }

      if (user) {
        // 👉 context login call
        await login(user.email, user.password);

        // redirect based on role
        switch (user.role) {
          case "student":
            router.push("/applicant_portal");
            break;
          case "teacher":
            router.push("/dashboard/teacher");
            break;
          case "parent":
            router.push("/dashboard/parent");
            break;
          case "admin":
            router.push("/admin");
            break;
          default:
            router.push("/dashboard");
        }
      } else {
        setErrorMsg("Invalid credentials");
      }
    } catch (err) {
      setErrorMsg("An error occurred. Try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen font-sans">
      <main className="flex-grow w-full">
        <div className="grid lg:grid-cols-2 min-h-screen">
          {/* Left Illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-950/30 p-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              EduConnect
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto mt-4">
              Your journey to higher education starts here.
            </p>
            <div className="mt-12 w-full max-w-md relative h-[400px]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9-cWa2lhsPUWnE7C8_qaJ5vL_FqCa2QKYiMzbaW61sXStY8NSj0o-5h4mlY9-NCfshbJGlC4qJouyrbdwOdiadCD_2lbGDLnc1mXvlty4HtPQsy8gm1SNRC9irZUkWp0Yk442gWoR9Lw0CBPCuieZz5spThk5ODksYEDm_mhe_96Hzm8-CHmevE_nrtpeUFy8oD8ejYy06Wnwgkv2rvIeduDHKIl__QwtRtEcer5sdxrmHdQjvbr3E4eKtTj-5YwFgfOHsO4kSM"
                alt="Students illustration"
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Right Login Form */}
          <div className="flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight">
                  Welcome Back 👋
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Sign in to continue your application
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email / Phone */}
                <div>
                  <input
                    type="text"
                    placeholder="Email or Phone"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {/* Password or OTP */}
                {!useOtp ? (
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      Send OTP
                    </button>
                  </div>
                )}

                {errorMsg && (
                  <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading
                    ? "Signing in..."
                    : useOtp
                    ? "Login with OTP"
                    : "Login"}
                </button>
              </form>

              {/* Toggle */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setUseOtp(!useOtp)}
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  {useOtp ? "Login with Password" : "Login with OTP"}
                </button>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don’t have an account?{" "}
                  <Link
                    href="/auth/sign_up"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
