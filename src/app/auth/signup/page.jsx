"use client";

import { useState, useEffect } from "react"; // useEffect যোগ করুন
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
  Label,
  RadioGroup,
  Radio,
} from "@heroui/react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (field) => (valueOrEvent) => {
    const val =
      valueOrEvent && valueOrEvent.target
        ? valueOrEvent.target.value
        : valueOrEvent;

    setFormData((prev) => ({ ...prev, [field]: val }));
    setError("");
    setSuccess("");
  };

  // RadioGroup এর জন্য আলাদা হ্যান্ডলার
  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const { name, email, password } = formData;

    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter (A-Z).");
      return false;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number (0-9).");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const { error: authError } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (authError) {
        setError(authError.message || "Sign up failed. Please try again.");
        return;
      }

      setSuccess("Account created successfully! Redirecting...");
      setFormData({ name: "", email: "", password: "", role: "seeker" });

      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err) {
      console.error("Sign up error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black text-white">
      <div className="w-full max-w-md">
        <div className="!bg-zinc-950 rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.8)] border border-zinc-800 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">
              Create an Account
            </h1>
            <p className="text-sm text-zinc-400 mt-2">
              Enter your details below to get started
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 mb-5 px-4 py-3 rounded-xl bg-red-950/50 border border-red-800/80 text-red-400 text-sm">
              <FiAlertCircle className="mt-0.5 shrink-0" size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-start gap-2 mb-5 px-4 py-3 rounded-xl bg-green-950/50 border border-green-800/80 text-green-400 text-sm">
              <FiCheckCircle className="mt-0.5 shrink-0" size={16} />
              <span>{success}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-zinc-300">Name</Label>
              <div className="!bg-zinc-900 rounded-xl border border-zinc-800 focus-within:!border-blue-500 flex items-center transition-colors">
                <span className="text-zinc-500 pl-3">
                  <FiUser size={16} />
                </span>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  disabled={loading}
                  className="w-full text-white placeholder:text-zinc-500 bg-transparent px-3 py-2.5 outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-zinc-300">Email</Label>
              <div className="!bg-zinc-900 rounded-xl border border-zinc-800 focus-within:!border-blue-500 flex items-center transition-colors">
                <span className="text-zinc-500 pl-3">
                  <FiMail size={16} />
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  disabled={loading}
                  className="w-full text-white placeholder:text-zinc-500 bg-transparent px-3 py-2.5 outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-zinc-300">Password</Label>
              <div className="!bg-zinc-900 rounded-xl border border-zinc-800 focus-within:!border-blue-500 flex items-center transition-colors">
                <span className="text-zinc-500 pl-3">
                  <FiLock size={16} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={formData.password}
                  onChange={handleChange("password")}
                  disabled={loading}
                  className="w-full text-white placeholder:text-zinc-500 bg-transparent px-3 py-2.5 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-zinc-500 hover:text-zinc-300 focus:outline-none pr-3 transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Role Selection - FIXED */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-4">
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="role"
      value="seeker"
      checked={formData.role === "seeker"}
      onChange={(e) => handleRoleChange(e.target.value)}
      disabled={loading}
      className="w-4 h-4"
    />
    Job Seeker
  </label>
  <label className="flex items-center gap-2">
    <input
      type="radio"
      name="role"
      value="recruiter"
      checked={formData.role === "recruiter"}
      onChange={(e) => handleRoleChange(e.target.value)}
      disabled={loading}
      className="w-4 h-4"
    />
    Recruiter
  </label>
</div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              isDisabled={loading}
              className="w-full !bg-blue-600 hover:!bg-blue-500 text-white font-medium mt-2 shadow-[0_2px_12px_rgba(37,99,235,0.4)] justify-center py-3 rounded-lg border-none transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="text-center mt-6 pt-6 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-400 font-medium hover:underline hover:text-blue-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}