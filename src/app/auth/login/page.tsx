"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setErrorMsg("");

  try {
    const users: { email: string; password: string; role: string }[] =
      JSON.parse(localStorage.getItem("users") || "[]");
      console.log("Stored users:", users);

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store current user in localStorage for session tracking
      localStorage.setItem("user", JSON.stringify(user));
      // Role-based redirect
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
      setErrorMsg("Invalid email or password");
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCp9-cWa2lhsPUWnE7C8_qaJ5vL_FqCa2QKYiMzbaW61sXStY8NSj0o-5h4mlY9-NCfshbJGlC4qJouyrbdwOdiadCD_2lbGDLnc1mXvlty4HtPQsy8gm1SNRC9irZUkWp0Yk442gWoR9Lw0CBPCuieZz5spThk5ODksYEDm_mhe_96Hzm8-CHmevE_nrtpeUFy8oD8ejYy06Wnwgkv2rvIeduDHKIl__QwtRtEcer5sdxrmHdQjvbr3E4eKtTj-5YwFgfOHsO4kSM" // Use your Next.js public folder image
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
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                {errorMsg && (
                  <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Login"}
                </button>
              </form>

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
