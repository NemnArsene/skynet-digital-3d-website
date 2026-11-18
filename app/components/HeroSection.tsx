"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import HeroCanvas from "./HeroCanvas";
import { useHeroScroll } from "./HeroScrollContext";
import FeaturedCreationCard from "./FeaturedCreationCard";
import StatsCard from "./StatsCard";
import QuickPromptCard from "./QuickPromptCard";
import ShowreelModal from "./ShowreelModal";
import PromptModal from "./PromptModal";
import ServicesShowcase from "./ServicesShowcase";
import ExpertisesHeroSlide from "./ExpertisesHeroSlide";
import VerticalDock from "./VerticalDock";
import MobileBottomNav from "./MobileBottomNav";
import { IconSearch, IconArrowRight, IconPlay, IconClose } from "./Icons";

interface HeroSectionProps {
  frames?: string[];
}

function HeroContent() {
  const { scrollProgress } = useHeroScroll();

  const [isIntroReady, setIsIntroReady] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [selectedPromptItem, setSelectedPromptItem] = useState<any>(null);
  const [activeNav, setActiveNav] = useState("expertises");
  const [activeNavTab, setActiveNavTab] = useState("services");
  const [isSlideOpen, setIsSlideOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCtaAnimating, setIsCtaAnimating] = useState(false);

  useEffect(() => {
    const handleLoaded = () => {
      setIsIntroReady(true);
    };
    window.addEventListener("skynet:loaded", handleLoaded);

    // Timeout de secours au cas où le loader a été écourté ou préchargé
    const timer = setTimeout(() => {
      setIsIntroReady(true);
    }, 4600);

    return () => {
      window.removeEventListener("skynet:loaded", handleLoaded);
      clearTimeout(timer);
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navLinks = [
    { id: "expertises", label: "Expertises", targetId: "services" },
    { id: "realisations", label: "Réalisations", targetId: "realisations" },
    { id: "formations", label: "Formations IA", targetId: "formations" },
    { id: "agence", label: "L'Agence", targetId: "agence" },
    { id: "contact", label: "Contact & Devis", targetId: "contact" },
  ];

  const handleNavClick = (id: string, targetId: string) => {
    setActiveNav(id);
    setActiveNavTab(targetId);
    if (!targetId || targetId === "home") {
      setIsSlideOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsSlideOpen(true);
      const targetScroll = window.innerHeight * 3.2;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  // CTA Click handler with smooth color-slide animation before navigation
  const triggerCtaAction = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setIsCtaAnimating(true);
    showToast("Connexion au formulaire de cadrage...");
    setTimeout(() => {
      setIsCtaAnimating(false);
      setActiveNav("contact");
      setActiveNavTab("contact");
      setIsSlideOpen(true);
      const targetScroll = window.innerHeight * 3.2;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }, 380);
  };

  // Opacity transitions based on scroll progression
  // Phase 1: Initial Hero Text fades out as camera approaches doorway (between 0.08 and 0.25)
  const heroTextOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.08) / 0.17));
  const isHeroTextVisible = heroTextOpacity > 0;

  // Phase 1: Bottom Cards fade out between 0.05 and 0.22 so the gallery floor is clean
  const bottomCardsOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.05) / 0.17));
  const areBottomCardsVisible = bottomCardsOpacity > 0;

  return (
    <section className="relative w-full h-full flex flex-col justify-between py-4 sm:py-5 px-3 sm:px-6 lg:px-12 xl:px-16 selection:bg-[#b13257]/40 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0f172a] border border-white/20 text-white text-xs shadow-2xl animate-in slide-in-from-top-4">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Atmospheric Ambient Glows (Subtle, Light Premium) */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[650px] h-[650px] bg-gradient-to-tr from-[#78377e]/12 via-[#b13257]/6 to-transparent rounded-full blur-[140px] -z-10 animate-pulse-subtle" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 w-[750px] h-[750px] bg-gradient-to-bl from-[#3341ab]/10 via-[#78377e]/8 to-transparent rounded-full blur-[160px] -z-10" />

      {/* ======================================================== */}
      {/* 1. TOP NAVIGATION BAR (High Contrast, Refined Glass)     */}
      {/* ======================================================== */}
      <header
        className={`w-full flex items-center justify-between gap-3 z-40 pb-3 sm:pb-4 transition-all duration-700 ease-out ${isIntroReady ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0 pointer-events-none"
          }`}
      >
        {/* Left: Brand Identity with official 3D S Ribbon Logo */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#b13257] via-[#78377e] to-[#3341ab] p-[2px] shadow-[0_0_20px_rgba(177,50,87,0.35)]">
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
            <span className="font-heading text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#0f172a] flex items-center gap-1.5">
              SKYNET DIGITAL
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#0f172a]/10 text-[#0f172a] font-bold">
                AGENCE
              </span>
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[#475569] uppercase font-semibold truncate max-w-[170px] sm:max-w-none">
              Donnez vie à vos idées.
            </span>
          </div>
        </div>

        {/* Center: Floating Pill Navigation Bar (Desktop & Tablet) */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-1 bg-white/90 backdrop-blur-xl border border-[#0f172a]/10 rounded-full p-1.5 shadow-md"
        >
          {navLinks.map((link) => {
            const isActive = activeNav === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id, link.targetId)}
                className={`px-3.5 lg:px-5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${isActive
                    ? "bg-[#0f172a] text-white shadow-sm"
                    : "text-[#334155] hover:text-[#0f172a] hover:bg-[#0f172a]/5"
                  }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Search & Primary Animated CTA */}
        <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Bouton Recherche */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Rechercher sur le site"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-xl border border-[#0f172a]/10 flex items-center justify-center text-[#334155] hover:text-[#0f172a] hover:bg-white transition-all shadow-sm"
          >
            {isSearchOpen ? <IconClose className="w-3.5 h-3.5" /> : <IconSearch className="w-4 h-4" />}
          </button>

          {/* Tiroir de recherche contextuel sans collision avec le bouton CTA */}
          {isSearchOpen && (
            <div className="absolute right-0 top-12 mt-2 w-72 sm:w-80 bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)] z-50 animate-in fade-in zoom-in-95 duration-150">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast(`Recherche : "${searchQuery}"`);
                  setIsSearchOpen(false);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un service, projet..."
                  autoFocus
                  className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-[#b13257]"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-[#0f172a] text-white text-xs font-semibold hover:bg-[#b13257] transition-colors"
                >
                  OK
                </button>
              </form>
            </div>
          )}

          {/* Primary CTA avec animation de glissement de couleur (Caché sur mobile pour alléger l'en-tête) */}
          <button
            onClick={triggerCtaAction}
            className="hidden sm:inline-flex group relative items-center gap-2 sm:gap-3 pl-4 sm:pl-5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] text-white font-semibold text-xs sm:text-sm"
          >
            {/* Calque de glissement de couleur officiel de gauche vers la droite */}
            <span
              className={`absolute inset-0 bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] transition-transform duration-400 ease-out pointer-events-none ${isCtaAnimating
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
            />

            <span className="relative z-10 tracking-tight whitespace-nowrap">
              Parlons de votre projet
            </span>
            <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-x-0.5">
              <IconArrowRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-black" />
            </div>
          </button>
        </div>
      </header>

      {/* Navigation Latérale (Vertical Dock) - FIXE sur la GAUCHE */}
      <div
        className={`hidden lg:block absolute left-3 sm:left-6 lg:left-8 xl:left-12 top-[100px] xl:top-[110px] bottom-[30px] z-50 pointer-events-auto transition-all duration-700 delay-150 ease-out ${
          isIntroReady ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0 pointer-events-none"
        }`}
      >
        <VerticalDock
          activeSectionId={activeNavTab}
          onSelectSection={(secId) => {
            setActiveNav(secId === "services" ? "expertises" : secId);
            setActiveNavTab(secId);
            if (secId === "home") {
              setIsSlideOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
              setIsSlideOpen(true);
              const targetScroll = window.innerHeight * 3.2;
              window.scrollTo({ top: targetScroll, behavior: "smooth" });
            }
          }}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. MAIN HERO BODY                                        */}
      {/* Positionné directement à côté du dock latéral            */}
      {/* ======================================================== */}
      <div className="relative flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 z-20 my-auto py-2 lg:pl-20 xl:pl-24">
        {/* Hero Text */}
        <div
          className={`max-w-xl xl:max-w-2xl flex flex-col justify-center transition-all duration-300 ${!isHeroTextVisible ? "pointer-events-none" : ""
            }`}
          style={{
            opacity: heroTextOpacity,
            transform: `translate3d(0, ${scrollProgress * -50}px, 0)`,
          }}
        >
          {/* Badge officiel - Vient de la GAUCHE */}
          <div
            className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#0f172a]/10 backdrop-blur-md mb-4 sm:mb-5 w-fit shadow-sm transition-all duration-700 delay-100 ease-out ${isIntroReady ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
              }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#b13257] shadow-[0_0_8px_#b13257]" />
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.16em] uppercase text-[#0f172a] font-heading">
              AGENCE DIGITALE &amp; CRÉATIVE
            </span>
          </div>

          {/* Titre fort - Vient du BAS */}
          <h1
            className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-[#0f172a] leading-[1.1] mb-4 sm:mb-5 drop-shadow-sm transition-all duration-800 delay-200 ease-out ${isIntroReady ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
              }`}
          >
            Nous transformons vos idées <br />
            <span className="font-light italic bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] bg-clip-text text-transparent drop-shadow-sm">
              en expériences digitales.
            </span>
          </h1>

          {/* Description concise officielle - Vient du BAS */}
          <p
            className={`text-sm sm:text-base md:text-lg text-[#334155] font-normal leading-relaxed max-w-xl mb-6 sm:mb-7 transition-all duration-800 delay-300 ease-out ${isIntroReady ? "translate-y-0 opacity-100" : "translate-y-14 opacity-0"
              }`}
          >
            De la conception à la réalisation, nous donnons vie à vos projets
            grâce à la créativité, la technologie et une vision stratégique.
          </p>

          {/* Boutons d'action CTA - Viennent du BAS */}
          <div
            className={`flex flex-wrap items-center gap-3.5 sm:gap-5 transition-all duration-800 delay-400 ease-out ${isIntroReady ? "translate-y-0 opacity-100 scale-100" : "translate-y-12 opacity-0 scale-95"
              }`}
          >
            {/* Primary CTA avec glissement de couleur */}
            <button
              onClick={triggerCtaAction}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full overflow-hidden shadow-xl transition-all duration-300 hover:scale-[1.03] bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] text-white font-semibold text-xs sm:text-sm md:text-base"
            >
              {/* Slide overlay */}
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] transition-transform duration-400 ease-out pointer-events-none ${isCtaAnimating
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
              />
              <span className="relative z-10">Parlons de votre projet</span>
              <IconArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA: Découvrir nos services (High-contrast glass) */}
            <button
              onClick={() => setIsShowreelOpen(true)}
              className="group inline-flex items-center gap-2.5 sm:gap-3 text-[#0f172a] hover:text-[#b13257] transition-colors"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 border border-[#0f172a]/15 flex items-center justify-center group-hover:scale-110 group-hover:border-[#b13257]/40 transition-all shadow-md backdrop-blur-md">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0f172a]/10 group-hover:bg-[#b13257] flex items-center justify-center transition-colors">
                  <IconPlay className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#0f172a] group-hover:text-white fill-current ml-0.5" />
                </div>
              </div>
              <span className="text-xs sm:text-sm md:text-base font-semibold tracking-tight">
                Découvrir nos services
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Piliers de l'agence - Vient de la DROITE */}
        <div
          className={`hidden lg:flex flex-col items-start gap-4 pl-8 border-l-2 border-[#b13257]/30 my-auto py-2 ml-auto shrink-0 transition-all duration-800 delay-300 ease-out ${isIntroReady ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            } ${!isHeroTextVisible ? "pointer-events-none" : ""}`}
          style={{ opacity: isIntroReady ? heroTextOpacity : 0 }}
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
      {/* 3. BOTTOM CARDS (Phase 1) - Vient du BAS                 */}
      {/* 12 Colonnes : Card 1 (5 cols), Card 2 (4 cols), Card 3 (3 cols élargie de 50%) */}
      {/* ======================================================== */}
      <footer
        className={`w-full pt-2 sm:pt-3 z-20 transition-all duration-900 delay-500 ease-out pb-20 lg:pb-12 flex justify-center ${isIntroReady ? "translate-y-0 opacity-100" : "translate-y-28 opacity-0"
          } ${!areBottomCardsVisible ? "pointer-events-none hidden" : ""}`}
        style={{
          opacity: isIntroReady ? bottomCardsOpacity : 0,
          transform: `translate3d(0, ${scrollProgress * 40}px, 0)`,
        }}
      >
        {/* Cartes alignées sur la ligne du bas (items-end), réparties sur 12 colonnes avec Card 3 élargie à 3 colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 items-end w-full max-w-[1240px] mx-auto px-2 sm:px-4">
          {/* Carte 1: Projet à la une (5 colonnes) */}
          <div className="lg:col-span-5 flex">
            <FeaturedCreationCard
              onInspectPrompt={(item) => setSelectedPromptItem(item)}
            />
          </div>

          {/* Carte 2: Métriques clés Skynet Digital (4 colonnes, hauteur 70% de la 1ère carte) */}
          <div className="lg:col-span-4 flex items-end">
            <StatsCard />
          </div>

          {/* Carte 3: Démarrer un projet rapide (3 colonnes — élargie de 50% !) */}
          <div className="lg:col-span-3 flex items-end md:col-span-2 lg:col-span-3">
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

      {/* ======================================================== */}
      {/* 5. SLIDE BLANC AVEC TITRE NOIR TURQUOISE "NOS EXPERTISES" */}
      {/* Menu au survol & Lazy Loading de tout le reste du site     */}
      {/* ======================================================== */}
      <ExpertisesHeroSlide
        progress={scrollProgress}
        isOpen={isSlideOpen}
        onRequestQuote={(serviceTitle) => {
          showToast(`Demande de devis pour : "${serviceTitle}"`);
        }}
        onBackToHero={() => {
          setIsSlideOpen(false);
          setActiveNav("home");
          setActiveNavTab("home");
          window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" });
        }}
        activeNavTab={activeNavTab}
        onSelectNavTab={(tabId) => {
          setActiveNavTab(tabId);
          setActiveNav(tabId);
        }}
      />

      {/* Barre de navigation mobile flottante façon App */}
      <MobileBottomNav
        onOpenProjectInput={() => {
          const input = document.getElementById("project-input-hero");
          if (input) input.focus();
        }}
        onOpenExpertises={() => setIsShowreelOpen(true)}
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
