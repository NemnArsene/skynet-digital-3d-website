"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconHome,
  IconGrid,
  IconLayers,
  IconHeart,
  IconMessage,
  IconPlay,
} from "./Icons";

interface VerticalDockProps {
  onOpenShowreel: () => void;
}

export default function VerticalDock({ onOpenShowreel }: VerticalDockProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const navItems = [
    { id: "home", label: "Accueil Skynet", icon: IconHome },
    { id: "services", label: "Nos Expertises", icon: IconGrid },
    { id: "creations", label: "Réalisations & 3D", icon: IconLayers },
    { id: "formations", label: "Formations Digitales", icon: IconHeart },
    { id: "contact", label: "Échanger avec un expert", icon: IconMessage },
  ];

  return (
    <aside
      aria-label="Navigation latérale"
      className="hidden lg:flex flex-col items-center justify-between py-6 px-2.5 rounded-full glass-panel border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-[68px] h-[540px] z-20 shrink-0 self-center backdrop-blur-2xl"
    >
      {/* Groupe de navigation du haut */}
      <div className="flex flex-col items-center gap-3 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={item.label}
              className={`relative group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                  ? "bg-[#161226] text-white border border-white/25 shadow-[0_0_20px_rgba(177,50,87,0.5)]"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
            >
              <Icon className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />

              {/* Info-bulle au survol */}
              <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-md text-xs font-medium bg-[#13111f] text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Profil central / Logo officiel */}
      <div className="relative group my-auto">
        <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-[#b13257] via-[#78377e] to-[#3341ab] shadow-[0_0_20px_rgba(177,50,87,0.45)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-white relative p-0.5 flex items-center justify-center">
            <Image
              src="/brand/logo-s-ribbon.png"
              alt="Skynet Digital"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        {/* Point vert actif */}
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0714] shadow-[0_0_8px_#34d399]" />
        <span className="pointer-events-none absolute left-full ml-3 px-2.5 py-1 rounded-md text-xs font-medium bg-[#13111f] text-white border border-white/15 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-50">
          Skynet Digital · Paris &amp; Douala
        </span>
      </div>

      {/* Déclencheur Showreel en bas */}
      <div className="flex flex-col items-center gap-1.5 w-full">
        <button
          onClick={onOpenShowreel}
          title="Découvrir la vidéo Skynet Digital"
          className="group w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 border border-white/12 flex items-center justify-center text-white transition-all duration-300 hover:scale-105 hover:border-white/30"
        >
          <div className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-[#b13257] flex items-center justify-center transition-colors">
            <IconPlay className="w-3 h-3 text-white fill-white ml-0.5" />
          </div>
        </button>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-white/50 group-hover:text-white/80 transition-colors">
          Showreel
        </span>
      </div>
    </aside>
  );
}
