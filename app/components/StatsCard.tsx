"use client";

import React from "react";
import { IconSparkles, IconZap, IconGlobe } from "./Icons";

export default function StatsCard() {
  const stats = [
    {
      icon: IconSparkles,
      value: "250+",
      label: "Projets Livrés",
      color: "text-[#f3c1d4]",
      iconBg: "bg-[#b13257]/20 border-[#b13257]/30",
    },
    {
      icon: IconZap,
      value: "99.4%",
      label: "Satisfaction Client",
      color: "text-[#c593db]",
      iconBg: "bg-[#78377e]/20 border-[#78377e]/30",
    },
    {
      icon: IconGlobe,
      value: "8+ Ans",
      label: "d'Excellence Digitale",
      color: "text-[#9cb3ff]",
      iconBg: "bg-[#3341ab]/20 border-[#3341ab]/30",
    },
  ];

  return (
    <div className="glass-panel rounded-[26px] p-4 sm:p-5 flex items-center justify-between gap-4 sm:gap-6 border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.65)] backdrop-blur-2xl w-full">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`flex-1 flex flex-col items-start ${
              idx !== 0 ? "border-l border-white/10 pl-3 sm:pl-4" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg ${item.iconBg} border flex items-center justify-center text-white mb-2 shadow-sm`}
            >
              <Icon className="w-3.5 h-3.5 text-white/90" />
            </div>

            <div className={`text-lg sm:text-xl font-bold tracking-tight text-white font-heading`}>
              {item.value}
            </div>

            <div className="text-[11px] sm:text-xs text-white/60 font-medium leading-tight mt-0.5">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
