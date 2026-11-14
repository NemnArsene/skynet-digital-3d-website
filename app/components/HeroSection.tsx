"use client";

import React, { useState } from "react";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { useHeroScroll } from "./HeroScrollContext";
import VerticalDock from "./VerticalDock";
import FeaturedCreationCard from "./FeaturedCreationCard";
import StatsCard from "./StatsCard";
import QuickPromptCard from "./QuickPromptCard";
import ShowreelModal from "./ShowreelModal";
import PromptModal from "./PromptModal";
import ServicesShowcase from "./ServicesShowcase";
import { IconSearch, IconArrowRight, IconPlay } from "./Icons";

interface HeroSectionProps {
  frames?: string[];
}

function HeroContent() {
  const { scrollProgress } = useHeroScroll();

  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [selectedPromptItem, setSelectedPromptItem] = useState<any>(null);
  const [activeNav, setActiveNav] = useState("expertises");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navLinks = [
    { id: "expertises", label: "Expertises" },
    { id: "realisations", label: "Réalisations" },
    { id: "formations", label: "Formations" },
    { id: "apropos", label: "À propos" },
    { id: "contact", label: "Contact" },
  ];

  // Opacity transitions based on scroll progression
  // Phase 1: Initial Hero Text fades out as camera approaches doorway (between 0.08 and 0.25)
  const heroTextOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.08) / 0.17));
  const isHeroTextVisible = heroTextOpacity > 0;

  // Phase 1: Bottom Cards fade out between 0.05 and 0.22 so the gallery floor is clean
  const bottomCardsOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.05) / 0.17));
  const areBottomCardsVisible = bottomCardsOpacity > 0;

  return (
    <section className="relative w-full h-full flex flex-col justify-between py-5 px-4 sm:px-8 lg:px-12 xl:px-16 selection:bg-[#b13257]/40 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0f121d] border border-white/20 text-white text-xs shadow-2xl animate-in slide-in-from-top-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Atmospheric Ambient Glows (Subtle, Light Premium) */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[750px] h-[750px] bg-gradient-to-tr from-[#78377e]/15 via-[#b13257]/8 to-transparent rounded-full blur-[160px] -z-10 animate-pulse-subtle" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[850px] h-[850px] bg-gradient-to-bl from-[#3341ab]/12 via-[#78377e]/10 to-transparent rounded-full blur-[180px] -z-10" />

      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR (High Contrast, Refined Glass)     */}
      {/* ======================================================== */}
      <header className="w-full flex items-center justify-between gap-4 z-40 pb-4">
        {/* Left: Brand Identity with official 3D S Ribbon Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#b13257] via-[#78377e] to-[#3341ab] p-[2px] shadow-[0_0_25px_rgba(177,50,87,0.35)]">
            <div className="w-full h-full rounded-[14px] bg-white overflow-hidden flex items-center justify-center p-1 shadow-inner">
              <Image
                src="/brand/logo-s-ribbon.png"
                alt="Skynet Digital Logo"
                width={40}
                height={40}
                priority
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="font-heading text-base sm:text-lg font-bold tracking-tight text-[#0f172a] flex items-center gap-1.5">
              SKYNET DIGITAL
              <span className="text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#0f172a]/10 text-[#0f172a] font-bold">
                AGENCE
              </span>
            </span>
            <span className="text-[10px] tracking-[0.22em] text-[#475569] uppercase font-semibold">
              Donnez vie à vos idées.
            </span>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Bar */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-1 bg-white/85 backdrop-blur-xl border border-[#0f172a]/10 rounded-full p-1.5 shadow-lg"
        >
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveNav(link.id)}
                className={`px-4 sm:px-6 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-[#0f172a] text-white shadow-md"
                    : "text-[#334155] hover:text-[#0f172a] hover:bg-[#0f172a]/5"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search & Primary CTA */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => showToast("Recherche dans nos réalisations...")}
            aria-label="Rechercher"
            className="w-10 h-10 rounded-full bg-white/85 backdrop-blur-xl border border-[#0f172a]/10 flex items-center justify-center text-[#334155] hover:text-[#0f172a] hover:bg-white transition-all shadow-md"
          >
            <IconSearch className="w-4 h-4" />
          </button>

          {/* Primary CTA: Parlons de votre projet */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              showToast("Prise de contact Skynet Digital initiée...");
              const input = document.getElementById("project-input-hero");
              if (input) input.focus();
            }}
            className="group relative inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full cta-gradient-bg glow-cta text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:scale-[1.02] shadow-xl"
          >
            <span className="tracking-tight">Parlons de votre projet</span>
            <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
              <IconArrowRight className="w-3.5 h-3.5 text-black" />
            </div>
          </a>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. MAIN HERO BODY                                        */}
      {/* Positioned directly next to the lateral navigation dock  */}
      {/* ======================================================== */}
      <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 z-20 my-auto py-2">
        
        {/* Left Side: Lateral Dock + Hero Text side by side */}
        <div className="flex items-center gap-6 lg:gap-8 xl:gap-10 w-full lg:w-auto">
          {/* Navigation Latérale (Vertical Dock) */}
          <div className="hidden lg:block shrink-0">
            <VerticalDock onOpenShowreel={() => setIsShowreelOpen(true)} />
          </div>

          {/* Hero Text: Directement à côté de la navigation latérale */}
          <div
            className={`max-w-xl xl:max-w-2xl flex flex-col justify-center transition-all duration-300 ${
              !isHeroTextVisible ? "pointer-events-none" : ""
            }`}
            style={{
              opacity: heroTextOpacity,
              transform: `translate3d(0, ${scrollProgress * -50}px, 0)`,
            }}
          >
            {/* Badge officiel (Dark glass pill with magenta pulse) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-[#0f172a]/15 backdrop-blur-md mb-5 w-fit shadow-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b13257] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b13257] shadow-[0_0_8px_#b13257]" />
              </span>
              <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#0f172a] font-heading">
                AGENCE DIGITALE &amp; CRÉATIVE
              </span>
            </div>

            {/* Titre fort avec contraste et gradient officiel */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#0f172a] leading-[1.08] mb-5 drop-shadow-sm">
              Nous transformons vos idées <br />
              <span className="font-light italic bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] bg-clip-text text-transparent drop-shadow-sm">
                en expériences digitales.
              </span>
            </h1>

            {/* Description concise officielle (Slate-700 haute lisibilité) */}
            <p className="text-base sm:text-lg text-[#334155] font-normal leading-relaxed max-w-xl mb-7">
              De la conception à la réalisation, nous donnons vie à vos projets
              grâce à la créativité, la technologie et une vision stratégique.
            </p>

            {/* Boutons d'action CTA */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Primary CTA */}
              <button
                onClick={() => {
                  showToast("Ouverture de l'espace projet...");
                  const input = document.getElementById("project-input-hero");
                  if (input) input.focus();
                }}
                className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full cta-gradient-bg glow-cta text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.03] shadow-xl"
              >
                <span>Parlons de votre projet</span>
                <IconArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Découvrir nos services (High-contrast glass) */}
              <button
                onClick={() => setIsShowreelOpen(true)}
                className="group inline-flex items-center gap-3 text-[#0f172a] hover:text-[#b13257] transition-colors"
              >
                <div className="w-11 h-11 rounded-full bg-white/90 border border-[#0f172a]/15 flex items-center justify-center group-hover:scale-110 group-hover:border-[#b13257]/40 transition-all shadow-md backdrop-blur-md">
                  <div className="w-7 h-7 rounded-full bg-[#0f172a]/10 group-hover:bg-[#b13257] flex items-center justify-center transition-colors">
                    <IconPlay className="w-3 h-3 text-[#0f172a] group-hover:text-white fill-current ml-0.5" />
                  </div>
                </div>
                <span className="text-sm sm:text-base font-semibold tracking-tight">
                  Découvrir nos services
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Piliers de l'agence poussés à l'extrême droite */}
        <div
          className={`hidden lg:flex flex-col items-start gap-4 pl-8 border-l-2 border-[#b13257]/30 my-auto py-2 ml-auto shrink-0 transition-opacity duration-300 ${
            !isHeroTextVisible ? "pointer-events-none" : ""
          }`}
          style={{ opacity: heroTextOpacity }}
        >
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#1e293b] font-bold hover:text-[#b13257] transition-colors cursor-default">
            CRÉATIVITÉ DIGITALE
          </span>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#1e293b] font-bold hover:text-[#b13257] transition-colors cursor-default">
            TECHNOLOGIE DE POINTE
          </span>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#1e293b] font-bold hover:text-[#b13257] transition-colors cursor-default">
            STRATÉGIE DE MARQUE
          </span>
          <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#1e293b] font-bold hover:text-[#b13257] transition-colors cursor-default">
            IMPACT MESURABLE
          </span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM CARDS (Phase 1)                                */}
      {/* Fades out as user scrolls toward the gallery             */}
      {/* ======================================================== */}
      <footer
        className={`w-full pt-3 z-20 transition-all duration-300 ${
          !areBottomCardsVisible ? "pointer-events-none hidden" : ""
        }`}
        style={{
          opacity: bottomCardsOpacity,
          transform: `translate3d(0, ${scrollProgress * 40}px, 0)`,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          {/* Carte 1: Projet à la une (5 cols) */}
          <div className="lg:col-span-5 flex">
            <FeaturedCreationCard
              onInspectPrompt={(item) => setSelectedPromptItem(item)}
            />
          </div>

          {/* Carte 2: Métriques clés Skynet Digital (4 cols) */}
          <div className="lg:col-span-4 flex">
            <StatsCard />
          </div>

          {/* Carte 3: Démarrer un projet rapide (3 cols) */}
          <div className="lg:col-span-3 flex">
            <QuickPromptCard
              onGenerate={(prompt) => {
                showToast(`Demande reçue : "${prompt.slice(0, 28)}..."`);
              }}
            />
          </div>
        </div>
      </footer>

      {/* ======================================================== */}
      {/* 4. SERVICES SHOWCASE (Phase 2: Inside 3D Gallery)        */}
      {/* Displays the 7 services above each 3D pedestal exhibit   */}
      {/* ======================================================== */}
      <ServicesShowcase
        progress={scrollProgress}
        onRequestQuote={(serviceTitle) => {
          showToast(`Demande de devis pour : "${serviceTitle}"`);
        }}
      />

      {/* Modales Interactives */}
      <ShowreelModal
        isOpen={isShowreelOpen}
        onClose={() => setIsShowreelOpen(false)}
      />
      <PromptModal
        item={selectedPromptItem}
        onClose={() => setSelectedPromptItem(null)}
      />
    </section>
  );
}

export default function HeroSection({ frames = [] }: HeroSectionProps) {
  return (
    <HeroCanvas frames={frames.length > 0 ? frames : ["/frames/hero/hero-frame-001.webp"]}>
      <HeroContent />
    </HeroCanvas>
  );
}
