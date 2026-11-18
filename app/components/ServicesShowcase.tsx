"use client";

import React, { useState } from "react";
import {
  IconChart,
  IconFileText,
  IconVideo,
  IconGlobe,
  IconSmartphone,
  IconBot,
  IconShare,
  IconArrowRight,
  IconSparkles,
} from "./Icons";
import ServiceDetailModal, { ServiceItem } from "./ServiceDetailModal";

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 1,
    number: "01",
    title: "Analyse et gestion de projets digitaux",
    shortTitle: "Analyse & Projets",
    category: "Stratégie & Conseil",
    description:
      "Audit stratégique, pilotage agile et gouvernance de vos projets numériques pour maximiser votre retour sur investissement.",
    features: [
      "Audit & diagnostic digital complet",
      "Pilotage en méthodologie Agile / Scrum",
      "Gestion des délais, risques et budgets",
      "Tableaux de bord & KPIs de performance",
    ],
    badgeColor: "from-[#b13257] to-[#78377e]",
    // Pedestal far left (nodes & charts)
    position: { left: "14%", top: "36%" },
    iconName: "chart",
  },
  {
    id: 2,
    number: "02",
    title: "Élaboration de cahiers des charges",
    shortTitle: "Cahier des charges",
    category: "Cadrage & Spécifications",
    description:
      "Définition rigoureuse des besoins fonctionnels, techniques et organisationnels pour garantir le succès de vos réalisations.",
    features: [
      "Architecture fonctionnelle détaillée",
      "Spécifications techniques d'ingénierie",
      "Parcours utilisateurs (UX mapping)",
      "Planning prévisionnel & livrables",
    ],
    badgeColor: "from-[#78377e] to-[#3341ab]",
    // Pedestal left
    position: { left: "21%", top: "54%" },
    iconName: "file",
  },
  {
    id: 4,
    number: "04",
    title: "Création de sites web",
    shortTitle: "Création Sites Web",
    category: "Développement Web",
    description:
      "Conception de sites vitrines sur mesure, plateformes e-commerce et expériences web immersives optimisées pour le SEO.",
    features: [
      "Design UI/UX responsive sur mesure",
      "Architecture Next.js haute performance",
      "Optimisation SEO & conversion avancée",
      "Administration et CMS intuitif",
    ],
    badgeColor: "from-[#3341ab] to-[#78377e]",
    // Center-left wireframe building pedestal
    position: { left: "33%", top: "34%" },
    iconName: "globe",
  },
  {
    id: 3,
    number: "03",
    title: "Montage vidéo et production audiovisuelle",
    shortTitle: "Montage & Vidéo",
    category: "Production Créative",
    description:
      "Création de contenus vidéos percutants, films d'entreprise, motion design 3D et post-production cinématique.",
    features: [
      "Films corporate & storytelling de marque",
      "Motion design 2D / 3D & effets visuels",
      "Étalonnage couleur & sound design pro",
      "Formats adaptés réseaux sociaux & pubs",
    ],
    badgeColor: "from-[#ff6b35] to-[#b13257]",
    // Center camera lens & film roll pedestal
    position: { left: "46%", top: "44%" },
    iconName: "video",
  },
  {
    id: 5,
    number: "05",
    title: "Développement d'applications web et mobiles",
    shortTitle: "Apps Web & Mobiles",
    category: "Ingénierie Logicielle",
    description:
      "Développement d'applications mobiles natives (iOS/Android) et plateformes SaaS scalables, sécurisées et intuitives.",
    features: [
      "Applications iOS (Swift) & Android (Kotlin/React Native)",
      "Plateformes Web SaaS Cloud scalables",
      "APIs robustes & synchronisation temps réel",
      "Design épuré et expérience utilisateur fluide",
    ],
    badgeColor: "from-[#78377e] to-[#b13257]",
    // Center-right holographic smartphone/tablet displays
    position: { left: "58%", top: "36%" },
    iconName: "phone",
  },
  {
    id: 6,
    number: "06",
    title: "Formation en intelligence artificielle (IA)",
    shortTitle: "Formation en IA",
    category: "Innovation & Avenir",
    description:
      "Programmes de formation pratique en IA générative, prompt engineering et automatisation des processus métier.",
    features: [
      "Masterclass prompt engineering appliqué",
      "Intégration d'outils IA (LLMs, vision, audio)",
      "Automatisation intelligente des workflows",
      "Ateliers pratiques adaptés à vos équipes",
    ],
    badgeColor: "from-[#3341ab] to-[#b13257]",
    // Right cyborg android head pedestal
    position: { left: "72%", top: "32%" },
    iconName: "bot",
  },
  {
    id: 7,
    number: "07",
    title: "Community management et gestion des réseaux sociaux",
    shortTitle: "Community Management",
    category: "Marketing & Réseaux",
    description:
      "Stratégie de communication digitale, création de contenus engageants et animation active de vos communautés sociales.",
    features: [
      "Stratégie éditoriale multi-plateformes",
      "Création de visuels & rédaction engageante",
      "Modération proactive & développement d'audience",
      "Rapports mensuels de performance & ROI",
    ],
    badgeColor: "from-[#ff6b35] to-[#78377e]",
    // Far right connected globe pedestal
    position: { left: "85%", top: "42%" },
    iconName: "share",
  },
];

interface ServicesShowcaseProps {
  progress: number;
  onRequestQuote: (serviceTitle: string) => void;
}

export default function ServicesShowcase({
  progress,
  onRequestQuote,
}: ServicesShowcaseProps) {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [hoveredServiceId, setHoveredServiceId] = useState<number | null>(null);
  const [mobileIndex, setMobileIndex] = useState<number>(0);

  // Phase 2: Show gallery pins between 0.22 and 0.66 throughout the 3D gallery walk
  const isVisible = progress >= 0.22 && progress <= 0.66;
  const opacity =
    progress < 0.32
      ? Math.max(0, Math.min(1, (progress - 0.22) / 0.10))
      : progress > 0.58
      ? Math.max(0, Math.min(1, 1 - (progress - 0.58) / 0.08))
      : 1;

  if (!isVisible || opacity <= 0) return null;

  const currentMobileService = SERVICES_DATA[mobileIndex] || SERVICES_DATA[0];

  const renderIcon = (name: string, className = "w-3.5 h-3.5") => {
    switch (name) {
      case "chart":
        return <IconChart className={className} />;
      case "file":
        return <IconFileText className={className} />;
      case "globe":
        return <IconGlobe className={className} />;
      case "video":
        return <IconVideo className={className} />;
      case "phone":
        return <IconSmartphone className={className} />;
      case "bot":
        return <IconBot className={className} />;
      case "share":
        return <IconShare className={className} />;
      default:
        return <IconSparkles className={className} />;
    }
  };

  return (
    <div
      className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between p-4 sm:p-6 lg:p-8 transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top Header Banner: Pôles d'Expertises Skynet Digital */}
      <div className="w-full flex justify-center pt-16 sm:pt-20">
        <div className="pointer-events-auto inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0f121d]/85 backdrop-blur-xl border border-white/20 text-white shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#b13257] shadow-[0_0_8px_#b13257]" />
          <span className="text-xs sm:text-sm font-semibold tracking-wide font-heading">
            NOS EXPERTISES &amp; SERVICES
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-white/70">
            7 PÔLES D&apos;EXCELLENCE
          </span>
        </div>
      </div>

      {/* Mobile Spotlight Card (Rend les services très visibles sur smartphone dans le 2ème frame) */}
      <div className="w-full md:hidden my-auto pointer-events-auto px-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="relative w-full rounded-3xl bg-[#0f121d]/95 backdrop-blur-2xl border border-white/20 p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col gap-3">
          {/* Ambient glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-gradient-to-b from-[#b13257]/30 via-[#78377e]/15 to-transparent blur-xl pointer-events-none rounded-t-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#b13257] to-[#78377e] text-white">
                PÔLE {currentMobileService.number} / 07
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">
                {currentMobileService.category}
              </span>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMobileIndex((prev) => (prev > 0 ? prev - 1 : SERVICES_DATA.length - 1))}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white text-xs cursor-pointer"
                aria-label="Service précédent"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setMobileIndex((prev) => (prev < SERVICES_DATA.length - 1 ? prev + 1 : 0))}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white text-xs cursor-pointer"
                aria-label="Service suivant"
              >
                ›
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 text-white">
              {renderIcon(currentMobileService.iconName, "w-4 h-4")}
            </div>
            <div className="flex flex-col">
              <h3 className="font-heading text-sm font-bold text-white leading-tight">
                {currentMobileService.title}
              </h3>
              <p className="text-[11px] text-white/75 mt-0.5 line-clamp-2 leading-relaxed">
                {currentMobileService.description}
              </p>
            </div>
          </div>

          {/* Quick deliverables preview */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {currentMobileService.features.slice(0, 2).map((feat, idx) => (
              <span key={idx} className="text-[9px] px-2 py-0.5 rounded-lg bg-white/[0.06] border border-white/10 text-white/80">
                ✓ {feat}
              </span>
            ))}
          </div>

          {/* Buttons: Explorer + Devis */}
          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => setActiveService(currentMobileService)}
              className="flex-1 py-1.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-center text-white transition-colors cursor-pointer"
            >
              Détails &amp; Livrables
            </button>
            <button
              type="button"
              onClick={() => onRequestQuote(currentMobileService.title)}
              className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] text-xs font-semibold text-white shadow-md cursor-pointer"
            >
              Devis
            </button>
          </div>
        </div>
      </div>

      {/* Floating 3D Hotspot Pins (Positioned over each pedestal in the 3D gallery) */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {SERVICES_DATA.map((service) => {
          const isHovered = hoveredServiceId === service.id;
          return (
            <div
              key={service.id}
              className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
              style={{
                left: service.position.left,
                top: service.position.top,
                zIndex: isHovered ? 40 : 20,
              }}
              onMouseEnter={() => setHoveredServiceId(service.id)}
              onMouseLeave={() => setHoveredServiceId(null)}
            >
              {/* Stable Base Pin at Exhibit */}
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-[#b13257] shadow-[0_0_10px_#b13257]" />
              </div>

              {/* Connecting Glow Line */}
              <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#b13257] to-transparent mx-auto opacity-75" />

              {/* Floating Service Badge */}
              <button
                onClick={() => setActiveService(service)}
                className={`group relative flex items-center gap-2.5 px-3.5 py-2 rounded-2xl transition-all duration-300 shadow-2xl backdrop-blur-xl ${
                  isHovered
                    ? "bg-[#0f121d] border-2 border-[#b13257] scale-110 shadow-[0_10px_35px_rgba(177,50,87,0.45)]"
                    : "bg-[#0f121d]/90 border border-white/25 hover:border-white/50"
                }`}
              >
                {/* Number Badge */}
                <div
                  className={`w-6 h-6 rounded-lg bg-gradient-to-tr ${service.badgeColor} flex items-center justify-center text-white text-[10px] font-mono font-bold shadow-sm shrink-0`}
                >
                  {service.number}
                </div>

                {/* Service Name & Category */}
                <div className="flex flex-col text-left whitespace-nowrap">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/55">
                    {service.category}
                  </span>
                  <span className="text-xs font-semibold text-white font-heading group-hover:text-white transition-colors">
                    {service.shortTitle}
                  </span>
                </div>

                {/* Chevron icon indicator */}
                <div className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-[#b13257] flex items-center justify-center text-white/70 group-hover:text-white transition-colors ml-1">
                  <IconArrowRight className="w-2.5 h-2.5" />
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Interactive Services Strip / Carousel (Dégagé du menu mobile en bas) */}
      <div className="w-full flex flex-col items-center gap-3 pb-24 sm:pb-8 pointer-events-auto">
        <div className="w-full max-w-5xl rounded-3xl bg-[#0f121d]/90 backdrop-blur-2xl border border-white/20 p-2.5 sm:p-3 shadow-[0_20px_60px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Services Horizontal Scroll / Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1 px-1 scrollbar-none">
            {SERVICES_DATA.map((service, idx) => {
              const isSelected = hoveredServiceId === service.id || mobileIndex === idx;
              return (
                <button
                  key={service.id}
                  onClick={() => {
                    setMobileIndex(idx);
                    setActiveService(service);
                  }}
                  onMouseEnter={() => setHoveredServiceId(service.id)}
                  onMouseLeave={() => setHoveredServiceId(null)}
                  className={`group shrink-0 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-2xl text-xs font-medium transition-all duration-300 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#b13257] to-[#78377e] text-white shadow-lg scale-105"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white border border-white/10"
                  }`}
                >
                  <span className="font-mono text-[10px] opacity-75 font-bold">
                    {service.number}
                  </span>
                  <div className="w-4 h-4 text-white/80 group-hover:text-white">
                    {renderIcon(service.iconName, "w-3.5 h-3.5")}
                  </div>
                  <span className="tracking-tight">{service.shortTitle}</span>
                </button>
              );
            })}
          </div>

          {/* Quick CTA button */}
          <button
            onClick={() => onRequestQuote("Projet Global Skynet Digital")}
            className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] text-white font-semibold text-xs shadow-lg hover:scale-105 transition-transform"
          >
            <span>Démarrer un projet</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeService}
        onClose={() => setActiveService(null)}
        onRequestQuote={onRequestQuote}
      />
    </div>
  );
}

