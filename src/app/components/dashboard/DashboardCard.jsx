"use client";

import React from "react";
import { Card } from "@heroui/react";

/**
 * Reusable Dashboard Card Component (HeroUI v3)
 * 
 * @param {Object} props
 * @param {string} props.title - Card header label
 * @param {string | number} props.value - Main display metric
 * @param {React.ElementType} props.icon - React icon component
 */
export default function DashboardCard({ title, value, icon: Icon }) {
  return (
    <Card className="bg-[#1c1c20] border border-zinc-800/80 rounded-2xl p-5 flex flex-col justify-between gap-6 hover:border-zinc-700 transition-all shadow-none">
      {/* Icon Badge */}
      {Icon && (
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-300">
          <Icon className="w-5 h-5" />
        </div>
      )}

      {/* Title & Value */}
      <div className="flex flex-col gap-1">
        <p className="text-xs font-medium text-zinc-400 tracking-wide">
          {title}
        </p>
        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {value}
        </h3>
      </div>
    </Card>
  );
}