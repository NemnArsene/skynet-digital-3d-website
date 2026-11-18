"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconHome,
  IconGrid,
  IconLayers,
  IconHeart,
  IconBuilding,
  IconMessage,
  IconPlay,
  IconFacebook,
  IconWhatsapp,
  IconPhone,
  IconArrowRight,
} from "./Icons";

interface VerticalDockProps {
  onOpenShowreel?: () => void;
  activeSectionId?: string;
  onSelectSection?: (sectionId: string) => void;
}

export const DOCK_NAV_ITEMS = [
  {
    id: "home",
    num: "00",
    label: "Accueil Skynet",
    category: "Expérience 3D",
    desc: "Studio immersif, animation de caméra et vision digitale.",
    gradient: "from-[#b13257] to-[#78377e]",
    icon: IconHome,
  },
  {
    id: "services",
    num: "01",
    label: "Expertises & Services",
    category: "Ingénierie & Conseil",
    desc: "7 pôles d'excellence : Web, Mobile, 3D, IA, Cadrage & Stratégie.",
    gradient: "from-[#b13257] to-[#78377e]",
    icon: IconGrid,
  },
  {
    id: "realisations",
    num: "02",
    label: "Réalisations & 3D",
    category: "Portfolio & VFX",
    desc: "Plateformes SaaS, rendus photoréalistes 3D et restauration IA.",
    gradient: "from-[#78377e] to-[#3341ab]",
    icon: IconLayers,
  },
  {
    id: "formations",
    num: "03",
    label: "Formations IA",
    category: "Académie Digitale",
    desc: "Masterclasses IA générative, automatisation Make/n8n & vidéo.",
    gradient: "from-[#ff6b35] to-[#b13257]",
    icon: IconHeart,
  },
  {
    id: "agence",
    num: "04",
    label: "L'Agence Skynet",
    category: "Vision & Méthode",
    desc: "250+ projets livrés, 15+ pays et méthodologie en 4 étapes clés.",
    gradient: "from-[#3341ab] to-[#78377e]",
    icon: IconBuilding,
  },
  {
    id: "contact",
    num: "05",
    label: "Contact & Devis",
    category: "Collaboration",
    desc: "Formulaire de cadrage express & échange direct sous 24h.",
    gradient: "from-emerald-500 to-teal-600",
    icon: IconMessage,
  },
];

export default function VerticalDock({
  onOpenShowreel,
  activeSectionId = "home",
  onSelectSection,
}: VerticalDockProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleNavClick = (id: string) => {
    if (onSelectSection) {
      onSelectSection(id);
    } else {
      if (id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <aside
      aria-label="Navigation latérale principale"
      className="hidden lg:flex flex-col items-center justify-between py-4 px-2 rounded-full bg-white/95 backdrop-blur-2xl border border-[#0f172a]/10 shadow-[0_20px_50px_rgba(0,0,0,0.18)] w-[64px] h-full z-50 shrink-0 select-none"
    >
      {/* 1. Groupe Navigation Supérieur */}
      <div className="flex flex-col items-center gap-2 w-full">
        {DOCK_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSectionId === item.id;
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              className="relative flex items-center justify-center w-full"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <button
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#0f172a] text-white shadow-md scale-105"
                    : "text-[#475569] hover:text-[#0f172a] hover:bg-slate-100"
                }`}
                aria-label={item.label}
              >
                <Icon className="w-[18px] h-[18px] transition-transform group-hover:scale-110" />

                {/* Pastille active */}
                {isActive && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#b13257] border-2 border-white shadow-sm" />
                )}
              </button>

              {/* ======================================================== */}
              {/* LE BON MENU AU SURVOL SELON LA SECTION (Rich Hover Card)  */}
              {/* ======================================================== */}
              {isHovered && (
                <div
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 w-64 p-3.5 rounded-2xl bg-[#0f172a] text-white shadow-[0_20px_50px_rgba(0,0,0,0.45)] border border-white/15 z-[100] animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-2"
                >
                  {/* Badge & Numéro de section */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                      {item.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${item.gradient} text-white shadow-sm`}>
                      {item.num}
                    </span>
                  </div>

                  {/* Titre du menu */}
                  <h4 className="font-heading text-sm font-bold text-white leading-snug">
                    {item.label}
                  </h4>

                  {/* Description précise */}
                  <p className="text-[11px] text-white/70 leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Action au clic */}
                  <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/10 text-[10px] font-mono text-[#f3c1d4]">
                    <span>Cliquer pour explorer</span>
                    <IconArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 2. Centre & Bas : Appel Direct 620121674 & Réseaux Sociaux */}
      <div className="flex flex-col items-center gap-2.5 pt-3 border-t border-slate-200/60 w-full">
        {/* Bouton Téléphone Appel direct : 620 12 16 74 */}
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
