"use client";

import React from "react";
import { IconBuilding, IconUsers, IconGlobe } from "./Icons";

export default function StatsCard() {
  const stats = [
    {
      icon: IconBuilding,
      value: "250+",
      label: "Projets Réalisés",
    },
    {
      icon: IconUsers,
      value: "120+",
      label: "Clients Satisfaits",
    },
    {
      icon: IconGlobe,
      value: "15+",
      label: "Pays & Régions",
    },
  ];

  return (
    <div className="bg-white/90 backdrop-blur-2xl rounded-[24px] py-2.5 px-3.5 sm:px-4 flex items-center justify-between gap-2.5 sm:gap-4 shadow-[0_12px_35px_rgba(0,0,0,0.1)] w-full transition-all duration-300 hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)] h-[110px]">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className={`flex-1 flex flex-col items-start ${
              idx !== 0 ? "border-l border-slate-200/50 pl-2.5 sm:pl-3.5" : ""
            }`}
          >
            {/* Icône flottante compacte */}
            <div className="text-[#0f172a] hover:text-[#b13257] transition-colors mb-1">
              <Icon className="w-4 h-4 text-[#1e293b]" />
            </div>

            {/* Chiffre clé compact */}
            <div className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#0f172a] font-heading leading-tight">
              {item.value}
            </div>

            {/* Libellé épuré compact */}
            <div className="text-[10px] sm:text-[11px] text-[#64748b] font-medium leading-tight mt-0.5">
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
