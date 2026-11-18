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
  IconPhone,
} from "./Icons";

interface VerticalDockProps {
  onOpenShowreel?: () => void;
}

export default function VerticalDock({ onOpenShowreel }: VerticalDockProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const navItems = [
    { id: "home", label: "Accueil Skynet", targetId: "", icon: IconHome },
    { id: "services", label: "Nos 7 Expertises", targetId: "services", icon: IconGrid },
    { id: "creations", label: "Réalisations & Portfolio", targetId: "realisations", icon: IconLayers },
    { id: "formations", label: "Formations en IA", targetId: "formations", icon: IconHeart },
    { id: "contact", label: "Échanger avec un expert", targetId: "contact", icon: IconMessage },
  ];

  const handleNavClick = (id: string, targetId: string) => {
    setActiveTab(id);
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

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
              onClick={() => handleNavClick(item.id, item.targetId)}
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

      {/* 2. Centre & Bas : Appel Direct 620121674 & Réseaux Sociaux */}
      <div className="flex flex-col items-center gap-2.5 pt-3 border-t border-slate-200/60 w-full">
        {/* Remplacement du logo S par l'icône téléphone pour appel direct 620121674 */}
        <div className="relative group">
          <a
            href="tel:620121674"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-[0_0_16px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 relative group/btn"
            aria-label="Appeler le 620 12 16 74"
            title="Appeler le 620 12 16 74"
          >
            <IconPhone className="w-4 h-4 animate-pulse text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-300 border-2 border-white shadow-sm" />
          </a>
          <span className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#0f172a] text-white shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50">
            Appel direct · 620 12 16 74
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
