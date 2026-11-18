"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  IconChart,
  IconFileText,
  IconVideo,
  IconGlobe,
  IconSmartphone,
  IconBot,
  IconShare,
  IconArrowRight,
  IconCheck,
  IconPhone,
  IconSparkles,
  IconLayers,
  IconBuilding,
  IconMessage,
} from "./Icons";
import { AGENCY_SERVICES } from "./ServicesSection";

// ========================================================
// Lazy Loading de tout le reste du site à l'intérieur du Hero
// ========================================================
const LazyPortfolio = dynamic(() => import("./PortfolioSection"), {
  loading: () => (
    <div className="w-full py-16 flex items-center justify-center text-slate-400 font-mono text-xs">
      Chargement du Portfolio...
    </div>
  ),
  ssr: false,
});

const LazyTraining = dynamic(() => import("./TrainingSection"), {
  loading: () => (
    <div className="w-full py-16 flex items-center justify-center text-slate-400 font-mono text-xs">
      Chargement des Formations IA...
    </div>
  ),
  ssr: false,
});

const LazyAbout = dynamic(() => import("./AboutSection"), {
  loading: () => (
    <div className="w-full py-16 flex items-center justify-center text-slate-400 font-mono text-xs">
      Chargement de L'Agence...
    </div>
  ),
  ssr: false,
});

const LazyContact = dynamic(() => import("./ContactSection"), {
  loading: () => (
    <div className="w-full py-16 flex items-center justify-center text-slate-400 font-mono text-xs">
      Chargement du formulaire de contact...
    </div>
  ),
  ssr: false,
});

const LazyFooter = dynamic(() => import("./Footer"), {
  loading: () => null,
  ssr: false,
});

interface ExpertisesHeroSlideProps {
  progress: number;
  isOpen?: boolean;
  onRequestQuote: (serviceTitle: string) => void;
  onBackToHero?: () => void;
  activeNavTab?: string;
  onSelectNavTab?: (tabId: string) => void;
}

export default function ExpertisesHeroSlide({
  progress,
  isOpen = false,
  onRequestQuote,
  onBackToHero,
  activeNavTab = "expertises",
  onSelectNavTab,
}: ExpertisesHeroSlideProps) {
  const [activeServiceId, setActiveServiceId] = useState<number>(1);
  const [activeSiteSection, setActiveSiteSection] = useState<string>("services");

  // Visibilité basée sur le scroll après la fin du Frame 2 (progress >= 0.64) ou ouverture forcée
  const isVisible = isOpen || progress >= 0.64;

  // Transition d'opacité et d'animation de glissement
  const opacity = isOpen
    ? 1
    : Math.max(0, Math.min(1, (progress - 0.64) / 0.10));

  const activeService =
    AGENCY_SERVICES.find((s) => s.id === activeServiceId) || AGENCY_SERVICES[0];

  if (!isVisible || opacity <= 0) return null;

  return (
    <div
      className={`fixed lg:absolute left-2 sm:left-4 lg:left-24 xl:left-28 right-2 sm:right-4 lg:right-8 xl:right-12 top-[74px] bottom-3 z-40 rounded-[28px] sm:rounded-[32px] bg-white text-[#0f172a] border border-slate-200/90 shadow-[0_25px_80px_rgba(0,0,0,0.55)] overflow-hidden flex flex-col transition-all duration-500 ease-out will-change-transform ${
        isVisible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        opacity,
        transform: `translate3d(0, ${(1 - opacity) * 40}px, 0)`,
      }}
    >
      {/* ======================================================== */}
      {/* 1. TOP STAGE BAR : Onglets du site (Sous Lazy Loading)     */}
      {/* ======================================================== */}
      <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200/80 z-20">
        <div className="flex items-center gap-2">
          {onBackToHero && (
            <button
              type="button"
              onClick={onBackToHero}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#0f172a] hover:text-white border border-slate-200 text-xs font-semibold text-[#0f172a] transition-colors cursor-pointer shadow-sm"
              title="Revenir à l'animation 3D du Hero"
            >
              <span>←</span>
              <span className="hidden sm:inline">Showroom 3D</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d9488]/10 text-[#0f766e] text-[11px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488] shadow-[0_0_6px_#0d9488]" />
            <span>SKYNET DIGITAL STUDIO</span>
          </div>
        </div>

        {/* Onglets rapides vers les autres modules du site */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: "services", label: "01. Expertises", icon: IconSparkles },
            { id: "realisations", label: "02. Portfolio", icon: IconLayers },
            { id: "formations", label: "03. Formations IA", icon: IconBot },
            { id: "agence", label: "04. L'Agence", icon: IconBuilding },
            { id: "contact", label: "05. Devis", icon: IconMessage },
          ].map((tab) => {
            const isTabActive = activeSiteSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSiteSection(tab.id);
                  if (onSelectNavTab) onSelectNavTab(tab.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isTabActive
                    ? "bg-[#0f172a] text-white shadow-sm"
                    : "text-[#64748b] hover:text-[#0f172a] hover:bg-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CONTENU DU SLIDE (SCROLLABLE & INTERACTIF)            */}
      {/* ======================================================== */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth selection:bg-[#0d9488]/20 selection:text-[#0f172a] p-4 sm:p-6 lg:p-8">
        
        {/* VUE 1 : SLIDE BLANC AVEC TITRE NOIR TURQUOISE "NOS EXPERTISES" */}
        {activeSiteSection === "services" && (
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            
            {/* EN-TÊTE DU SLIDE : FOND BLANC AVEC TITRE NOIR TURQUOISE */}
            <div className="flex flex-col items-center text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0d9488]/10 border border-[#0d9488]/25 text-[#0f766e] text-xs font-mono font-bold uppercase tracking-widest mb-3">
                <span className="w-2 h-2 rounded-full bg-[#0d9488] shadow-[0_0_8px_#0d9488]" />
                <span>PÔLES D&apos;EXCELLENCE DIGITALE</span>
              </div>

              {/* Titre Noir Turquoise comme demandé spécifiquement */}
              <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08]">
                NOS{" "}
                <span className="bg-gradient-to-r from-[#0d9488] via-[#06b6d4] to-[#14b8a6] bg-clip-text text-transparent drop-shadow-sm">
                  EXPERTISES
                </span>
              </h2>

              <p className="text-sm sm:text-base text-[#475569] max-w-2xl mt-3 font-normal leading-relaxed">
                Survolez les pôles ci-dessous pour explorer instantanément nos méthodologies et livrables.
              </p>
            </div>

            {/* ======================================================== */}
            {/* MENU PLACÉ AU SURVOL (Hover Menu des 7 Expertises)       */}
            {/* ======================================================== */}
            <div className="w-full flex items-center justify-start md:justify-center gap-1.5 overflow-x-auto pb-3 mb-8 scrollbar-none">
              {AGENCY_SERVICES.map((s) => {
                const isHoveredOrActive = activeServiceId === s.id;
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onMouseEnter={() => setActiveServiceId(s.id)}
                    onClick={() => setActiveServiceId(s.id)}
                    className={`group shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                      isHoveredOrActive
                        ? "bg-[#0f172a] text-white border-[#0f172a] shadow-lg scale-105"
                        : "bg-slate-100/80 hover:bg-slate-200/80 text-[#334155] border-slate-200"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] font-bold ${
                        isHoveredOrActive ? "text-[#2dd4bf]" : "text-[#64748b]"
                      }`}
                    >
                      {s.num}
                    </span>
                    <Icon className="w-3.5 h-3.5" />
                    <span className="whitespace-nowrap">
                      {s.title.split(" ")[0]} {s.title.split(" ")[1]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ======================================================== */}
            {/* SPOTLIGHT DU PÔLE SÉLECTIONNÉ AU SURVOL                  */}
            {/* ======================================================== */}
            <div className="w-full rounded-3xl bg-slate-50/90 border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm mb-12 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Colonne Gauche : Détails, Titre & Livrables */}
                <div className="lg:col-span-8 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#0d9488] to-[#06b6d4] text-white shadow-sm">
                      PÔLE {activeService.num} / 07
                    </span>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#0d9488] font-bold">
                      {activeService.tag}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0f172a] leading-tight">
                    {activeService.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                    {activeService.description}
                  </p>

                  {/* Checklist des Livrables */}
                  <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-200">
                    <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] font-bold">
                      Livrables &amp; Méthodologie Skynet :
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.deliverables.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs sm:text-sm text-[#1e293b] font-medium"
                        >
                          <div className="w-4 h-4 rounded bg-[#0d9488]/15 text-[#0d9488] flex items-center justify-center shrink-0 mt-0.5">
                            <IconCheck className="w-3 h-3 text-[#0d9488]" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Boutons d'Action Rapide */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => onRequestQuote(activeService.title)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0d9488] via-[#0891b2] to-[#0f172a] text-white text-xs sm:text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Demander un devis pour ce pôle</span>
                      <IconArrowRight className="w-4 h-4" />
                    </button>
                    <a
                      href="tel:620121674"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold text-[#0f172a] transition-colors"
                    >
                      <IconPhone className="w-3.5 h-3.5 text-[#0d9488]" />
                      <span>Appel direct : 620 12 16 74</span>
                    </a>
                  </div>
                </div>

                {/* Colonne Droite : Badge Visuel & Garantie */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center">
                  <div className="w-full aspect-square max-w-[280px] rounded-3xl bg-white border border-slate-200 p-6 flex flex-col items-center justify-center text-center shadow-sm">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0d9488] to-[#06b6d4] flex items-center justify-center text-white shadow-xl mb-4">
                      {React.createElement(activeService.icon, { className: "w-10 h-10 text-white" })}
                    </div>

                    <span className="font-heading text-lg font-bold text-[#0f172a] mb-1">
                      {activeService.subtitle}
                    </span>

                    <span className="text-[11px] text-[#64748b] font-mono uppercase tracking-wider mb-4">
                      Standard Qualité International
                    </span>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Équipe disponible immédiatement</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Grille compacte des 7 services */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {AGENCY_SERVICES.map((s) => {
                const Icon = s.icon;
                const isCurrent = activeServiceId === s.id;
                return (
                  <div
                    key={s.id}
                    onMouseEnter={() => setActiveServiceId(s.id)}
                    onClick={() => setActiveServiceId(s.id)}
                    className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                      isCurrent
                        ? "bg-white border-[#0d9488] shadow-md ring-1 ring-[#0d9488]"
                        : "bg-slate-50 hover:bg-white border-slate-200/80"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-[#0d9488]">
                          {s.num}
                        </span>
                        <Icon className="w-4 h-4 text-[#64748b]" />
                      </div>
                      <h4 className="font-heading text-sm font-bold text-[#0f172a] mb-1">
                        {s.title}
                      </h4>
                      <p className="text-xs text-[#64748b] line-clamp-2">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0d9488] font-semibold">
                      <span>Survoler pour activer</span>
                      <IconArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* VUE 2 : PORTFOLIO & RÉALISATIONS 3D (LAZY LOADED) */}
        {activeSiteSection === "realisations" && (
          <div className="max-w-6xl mx-auto">
            <LazyPortfolio />
          </div>
        )}

        {/* VUE 3 : FORMATIONS EN IA (LAZY LOADED) */}
        {activeSiteSection === "formations" && (
          <div className="max-w-6xl mx-auto">
            <LazyTraining />
          </div>
        )}

        {/* VUE 4 : L'AGENCE & MÉTHODOLOGIE (LAZY LOADED) */}
        {activeSiteSection === "agence" && (
          <div className="max-w-6xl mx-auto">
            <LazyAbout />
          </div>
        )}

        {/* VUE 5 : CONTACT & CADRAGE EXPRESS (LAZY LOADED) */}
        {activeSiteSection === "contact" && (
          <div className="max-w-6xl mx-auto">
            <LazyContact />
          </div>
        )}

        {/* FOOTER OFFICIEL DU SITE DANS LE SLIDE */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <LazyFooter />
        </div>

      </div>
    </div>
  );
}
