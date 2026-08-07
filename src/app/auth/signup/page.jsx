"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TextField,
  Label,
  InputGroup,
  FieldError,
  Button,
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

  const validateForm = () => {
    const { name, email, password } = formData;

    // 1. Required check
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill in all fields.");
      return false;
    }

    // 2. Email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // 3. Password length check (at least 8 chars)
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    // 4. Password uppercase letter check
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter (A-Z).");
      return false;
    }

    // 5. Password number check
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

    // Run client-side validations
    if (!validateForm()) return;

    setLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message || "Sign up failed. Please try again.");
        return;
      }

      setSuccess("Account created successfully! Redirecting...");
      setFormData({ name: "", email: "", password: "" });

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
            <TextField
              name="name"
              isDisabled={loading}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm text-zinc-300">Name</Label>
              <InputGroup className="!bg-zinc-900 rounded-xl border border-zinc-800 focus-within:!border-blue-500">
                <InputGroup.Prefix className="text-zinc-500 pl-3">
                  <FiUser size={16} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  className="text-white placeholder:text-zinc-500 bg-transparent"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-400" />
            </TextField>

            {/* Email */}
            <TextField
              name="email"
              isDisabled={loading}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm text-zinc-300">Email</Label>
              <InputGroup className="!bg-zinc-900 rounded-xl border border-zinc-800 focus-within:!border-blue-500">
                <InputGroup.Prefix className="text-zinc-500 pl-3">
                  <FiMail size={16} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className="text-white placeholder:text-zinc-500 bg-transparent"
                />
              </InputGroup>
              <FieldError className="text-xs text-red-400" />
            </TextField>

            {/* Password */}
            <TextField
              name="password"
              isDisabled={loading}
              className="flex flex-col gap-1.5"
            >
              <Label className="text-sm text-zinc-300">Password</Label>
              <InputGroup className="!bg-zinc-900 rounded-xl border border-zinc-800 focus-within:!border-blue-500">
                <InputGroup.Prefix className="text-zinc-500 pl-3">
                  <FiLock size={16} />
                </InputGroup.Prefix>
                <InputGroup.Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={formData.password}
                  onChange={handleChange("password")}
                  className="text-white placeholder:text-zinc-500 bg-transparent"
                />
                <InputGroup.Suffix className="pr-3">
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-zinc-500 hover:text-zinc-300 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-red-400" />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading}
              variant="primary"
              className="w-full !bg-blue-600 hover:!bg-blue-500 text-white font-medium mt-2 shadow-[0_2px_12px_rgba(37,99,235,0.4)] justify-center py-3 rounded-lg border-none"
            >
              {loading ? "Processing..." : "Sign Up"}
            </Button>
          </form>

          {/* Back to Sign In */}
          <div className="text-center mt-6 pt-6 border-t border-zinc-800">
            <p className="text-sm text-zinc-400">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-400 font-medium hover:underline"
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