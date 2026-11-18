"use client";

import React, { useState } from "react";
import {
  IconHome,
  IconGrid,
  IconLayers,
  IconWhatsapp,
  IconMessage,
} from "./Icons";

interface MobileBottomNavProps {
  onOpenProjectInput?: () => void;
  onOpenExpertises?: () => void;
}

export default function MobileBottomNav({
  onOpenProjectInput,
  onOpenExpertises,
}: MobileBottomNavProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === "contact" && onOpenProjectInput) {
      onOpenProjectInput();
    } else if (tabId === "services" && onOpenExpertises) {
      onOpenExpertises();
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 lg:hidden w-[calc(100%-2rem)] max-w-sm pointer-events-auto">
      <nav
        aria-label="Menu mobile"
        className="relative bg-white/95 backdrop-blur-2xl border border-[#0f172a]/10 rounded-full px-3 py-2 shadow-[0_20px_40px_rgba(0,0,0,0.2)] flex items-center justify-between gap-1"
      >
        {/* Accueil */}
        <button
          onClick={() => handleTabClick("home")}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 ${
            activeTab === "home"
              ? "bg-[#0f172a] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0f172a]"
          }`}
          aria-label="Accueil"
        >
          <IconHome className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">Accueil</span>
        </button>

        {/* Services */}
        <button
          onClick={() => handleTabClick("services")}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 ${
            activeTab === "services"
              ? "bg-[#0f172a] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0f172a]"
          }`}
          aria-label="Services"
        >
          <IconGrid className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">Services</span>
        </button>

        {/* Réalisations */}
        <button
          onClick={() => handleTabClick("creations")}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all duration-200 ${
            activeTab === "creations"
              ? "bg-[#0f172a] text-white shadow-sm"
              : "text-[#475569] hover:text-[#0f172a]"
          }`}
          aria-label="Réalisations"
        >
          <IconLayers className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">Projets</span>
        </button>

        {/* WhatsApp Direct */}
        <a
          href="https://wa.me/23764175399"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-3 rounded-full text-[#25d366] hover:bg-[#25d366]/10 transition-colors"
          aria-label="WhatsApp"
        >
          <IconWhatsapp className="w-4 h-4" />
          <span className="text-[9px] font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Contact CTA */}
        <button
          onClick={() => handleTabClick("contact")}
          className={`flex flex-col items-center justify-center py-1 px-3.5 rounded-full transition-all duration-200 ${
            activeTab === "contact"
              ? "bg-gradient-to-r from-[#b13257] to-[#78377e] text-white shadow-md"
              : "bg-[#b13257]/10 text-[#b13257] hover:bg-[#b13257]/20"
          }`}
          aria-label="Contact"
        >
          <IconMessage className="w-4 h-4" />
          <span className="text-[9px] font-bold mt-0.5">Contact</span>
        </button>
      </nav>
    </div>
  );
}
