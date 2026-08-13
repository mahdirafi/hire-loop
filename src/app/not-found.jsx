"use client";

import React from "react";
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import { FiHome, FiAlertCircle, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 sm:p-6 text-zinc-100">
      <Card className="max-w-md w-full bg-[#18181b] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-6 shadow-2xl">
        
        {/* Animated Badge Icon */}
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 shadow-inner">
          <FiAlertCircle className="w-8 h-8 text-zinc-300 animate-pulse" />
        </div>

        {/* Status & Error Message */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold tracking-widest text-zinc-400 uppercase">
            404 Error
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full pt-2">
            <Button variant="outline" className="bg-white hover:bg-zinc-200 ">
          <Link href={"/"}
            className="w-full  text-zinc-900 font-semibold rounded-xl transition-all flex items-center justify-center gap-2 px-2"
          >
            <FiHome className="w-4 h-4" />
            Back to Home
          </Link>
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="flat"
            className="w-full bg-zinc-800/80 text-zinc-300 font-medium rounded-xl hover:bg-zinc-800 hover:text-white transition-all border border-zinc-700/50 flex items-center justify-center gap-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go Back
          </Button>
        </div>
        
      </Card>
    </main>
  );
}