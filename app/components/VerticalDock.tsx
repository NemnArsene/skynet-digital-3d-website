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
  IconFacebook,
  IconWhatsapp,
} from "./Icons";

interface VerticalDockProps {
  onOpenShowreel?: () => void;
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
      className="hidden lg:flex flex-col items-center justify-between py-4 px-2 rounded-full bg-white/90 backdrop-blur-2xl border border-[#0f172a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.14)] w-[64px] h-full z-30 shrink-0 select-none"
    >
      {/* 1. Groupe Navigation Supérieur */}
      <div className="flex flex-col items-center gap-2 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? "bg-[#0f172a] text-white shadow-md scale-105"
                  : "text-[#475569] hover:text-[#0f172a] hover:bg-[#0f172a]/5"
              }`}
              aria-label={item.label}
            >
              <Icon className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />

              {/* Info-bulle flottante au-dessus */}
              <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0f172a] text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Centre & Bas : Profil Officiel Skynet & Réseaux Sociaux */}
      <div className="flex flex-col items-center gap-2.5 pt-3 border-t border-slate-200/60 w-full">
        {/* Logo Ruban 3D Skynet Digital avec pastille active */}
        <div className="relative group">
          <div className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-[#b13257] via-[#78377e] to-[#3341ab] shadow-[0_0_15px_rgba(177,50,87,0.35)] cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden bg-white relative p-0.5 flex items-center justify-center">
              <Image
                src="/brand/logo-s-ribbon.png"
                alt="Skynet Digital"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
          <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0f172a] text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            Skynet Digital · Agence Créative
          </span>
        </div>

        {/* Facebook Link */}
        <div className="relative group">
          <a
            href="https://facebook.com/skynetdigital.isroot.in"
            target="_blank"
            rel="noopener noreferrer"
            title="Page Facebook Skynet Digital"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1877f2] bg-[#1877f2]/10 hover:bg-[#1877f2] hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Facebook Skynet Digital"
          >
            <IconFacebook className="w-4 h-4" />
          </a>
          <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0f172a] text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            Facebook · Skynet Digital
          </span>
        </div>

        {/* WhatsApp Link */}
        <div className="relative group">
          <a
            href="https://wa.me/23764175399"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp direct Skynet Digital"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#25d366] bg-[#25d366]/10 hover:bg-[#25d366] hover:text-white transition-all duration-300 shadow-sm"
            aria-label="WhatsApp Skynet Digital"
          >
            <IconWhatsapp className="w-4 h-4" />
          </a>
          <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0f172a] text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            WhatsApp Direct (+237 641 753 99)
          </span>
        </div>
      </div>
    </aside>
  );
}
