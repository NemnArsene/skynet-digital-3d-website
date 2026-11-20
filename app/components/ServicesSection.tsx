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
  IconCheck,
  IconSparkles,
} from "./Icons";
import SectionTitleSlide from "./SectionTitleSlide";

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
}

export const AGENCY_SERVICES = [
  {
    id: 1,
    num: "01",
    title: "Analyse et gestion de projets digitaux",
    subtitle: "Stratégie & Pilotage Agile",
    description:
      "Nous auditons, structurons et pilotons vos projets numériques pour maximiser leur efficience opérationnelle et leur retour sur investissement.",
    deliverables: [
      "Audit stratégique & benchmark concurrentiel",
      "Gouvernance en méthodologie Agile / Scrum",
      "Gestion rigoureuse des délais, risques et budgets",
      "Tableaux de bord KPIs & reporting en temps réel",
    ],
    tag: "Conseil & Direction de Projet",
    icon: IconChart,
    gradient: "from-[#b13257] to-[#78377e]",
  },
  {
    id: 2,
    num: "02",
    title: "Élaboration de cahiers des charges",
    subtitle: "Cadrage & Spécifications",
    description:
      "La clé d'un projet réussi réside dans la précision de son cadrage. Nous traduisons vos ambitions métier en spécifications techniques irréprochables.",
    deliverables: [
      "Spécifications fonctionnelles et techniques détaillées",
      "Cartographie des parcours utilisateurs (UX mapping)",
      "Architecture logicielle & modélisation des données",
      "Planning prévisionnel de recette & critères de succès",
    ],
    tag: "Ingénierie & Cadrage",
    icon: IconFileText,
    gradient: "from-[#78377e] to-[#3341ab]",
  },
  {
    id: 3,
    num: "03",
    title: "Montage vidéo et production audiovisuelle",
    subtitle: "Storytelling & Motion Design",
    description:
      "Donnez une dimension cinématographique à votre marque grâce à nos productions vidéos haute définition, animations 3D et post-production sonore.",
    deliverables: [
      "Films corporate, institutionnels et interviews pro",
      "Motion design 2D / 3D & effets visuels (VFX)",
      "Étalonnage cinématique & sound design immersif",
      "Formats optimisés pour les réseaux sociaux et campagnes",
    ],
    tag: "Création Visuelle & 3D",
    icon: IconVideo,
    gradient: "from-[#ff6b35] to-[#b13257]",
  },
  {
    id: 4,
    num: "04",
    title: "Création de sites web sur mesure",
    subtitle: "Next.js, Vitrines & E-commerce",
    description:
      "Nous concevons des plateformes web ultra-rapides, élégantes et sécurisées, conçues pour captiver vos visiteurs et maximiser vos conversions.",
    deliverables: [
      "Design UI/UX responsive sur mesure & mobile-first",
      "Développement Next.js / React haute performance",
      "Optimisation SEO technique et vitesse de chargement",
      "Back-office sur mesure & intégration CMS autonome",
    ],
    tag: "Développement Web",
    icon: IconGlobe,
    gradient: "from-[#3341ab] to-[#78377e]",
  },
  {
    id: 5,
    num: "05",
    title: "Développement d'applications web et mobiles",
    subtitle: "Ingénierie Logicielle & SaaS",
    description:
      "Des applications cross-platform performantes (iOS, Android, Web) taillées pour scaler et offrir une expérience utilisateur fluide et intuitive.",
    deliverables: [
      "Applications mobiles iOS & Android (React Native)",
      "Plateformes Web SaaS & dashboards interactifs",
      "APIs robustes, architecture Cloud & micro-services",
      "Sécurité des données & intégration passerelles de paiement",
    ],
    tag: "Solutions logicielles",
    icon: IconSmartphone,
    gradient: "from-[#b13257] via-[#78377e] to-[#3341ab]",
  },
  {
    id: 6,
    num: "06",
    title: "Formations en Intelligence Artificielle & Digital",
    subtitle: "Masterclasses & Productivité IA",
    description:
      "Montez en compétences ou formez vos équipes aux outils d'IA générative et d'automatisation pour décupler votre productivité de 300%.",
    deliverables: [
      "Masterclasses IA générative (ChatGPT, Claude, Midjourney)",
      "Automatisation de workflows métiers (Make, n8n)",
      "Stratégies de prompting avancé & cas pratiques",
      "Supports de cours exclusifs & attestation de formation",
    ],
    tag: "Pôle Formation & IA",
    icon: IconBot,
    gradient: "from-[#78377e] to-[#ff6b35]",
  },
  {
    id: 7,
    num: "07",
    title: "Gestion des communautés & Réseaux Sociaux",
    subtitle: "Community Management & Notoriété",
    description:
      "Développez une présence digitale influente. Nous créons des contenus engageants et fédérons une communauté fidèle autour de vos produits.",
    deliverables: [
      "Calendrier éditorial & stratégie de contenu multi-canal",
      "Création de visuels percutants, stories et carrousels",
      "Modération proactive & animation de votre communauté",
      "Campagnes sponsorisées ciblées (Facebook, Instagram, LinkedIn)",
    ],
    tag: "Social Media & Influence",
    icon: IconShare,
    gradient: "from-[#b13257] to-[#ff6b35]",
  },
];

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTabId, setActiveTabId] = useState<number>(1);

  const activeService = AGENCY_SERVICES.find((s) => s.id === activeTabId) || AGENCY_SERVICES[0];

  const handleQuoteClick = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    } else {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="services" className="relative w-full bg-white text-[#0f172a] overflow-hidden selection:bg-[#b13257]/20 selection:text-[#0f172a]">

      {/* ======================================================== */}
      {/* 1. CINEMATIC TITLE SLIDE (Diaporama plein écran)          */}
      {/* ======================================================== */}
      <SectionTitleSlide
        sectionNum="01"
        sectionLabel="PÔLES D'EXCELLENCE"
        watermark="01 / EXPERTISES"
        headline={
          <>
            L&apos;ingénierie créative &amp; technologique <br />
            <span className="font-light italic bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] bg-clip-text text-transparent">
              au service de votre vision.
            </span>
          </>
        }
        subtitle="7 expertises intégrées pour cadrer, prototyper, produire et déployer vos projets digitaux avec les standards internationaux les plus exigeants."
        accentColor="#b13257"
        glowPosition="left"
      />

      {/* ======================================================== */}
      {/* 2. CINEMATIC CONTENT ARRIVAL (Parallax & Éléments interactifs) */}
      {/* ======================================================== */}
      <div className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto">

        {/* Strip des 7 Pôles (Boutons interactifs haute lisibilité) */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {AGENCY_SERVICES.map((service) => {
            const Icon = service.icon;
            const isActive = activeTabId === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTabId(service.id)}
                className={`group shrink-0 inline-flex items-center gap-2.5 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 border cursor-pointer ${isActive
                  ? "bg-[#0f172a] text-white border-[#0f172a] shadow-[0_10px_25px_rgba(15,23,42,0.25)] scale-105"
                  : "bg-slate-100 hover:bg-slate-200/80 text-[#334155] hover:text-[#0f172a] border-slate-200"
                  }`}
              >
                <span className={`font-mono text-xs font-bold ${isActive ? "text-[#f3c1d4]" : "text-[#64748b]"}`}>
                  {service.num}
                </span>
                <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="whitespace-nowrap">{service.title.split(" ")[0]} {service.title.split(" ")[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Grand Spotlight Card sur le service sélectionné (Fond Blanc & Éléments Parallax) */}
        <div className="relative rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 shadow-[0_25px_70px_rgba(15,23,42,0.08)] mb-20 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Colonne Gauche : Description détaillée & Livrables */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#b13257] to-[#78377e] text-white shadow-sm">
                  PÔLE {activeService.num} / 07
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-[#64748b] font-semibold">
                  {activeService.tag}
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#0f172a] leading-tight">
                {activeService.title}
              </h3>

              <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
                {activeService.description}
              </p>

              {/* Checklist des Livrables clés */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200">
                <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] font-bold">
                  Livrables &amp; Méthodologie Skynet :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-[#1e293b] font-medium"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#b13257]/15 text-[#b13257] flex items-center justify-center shrink-0 mt-0.5">
                        <IconCheck className="w-3.5 h-3.5 text-[#b13257]" />
                      </div>
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutons d'Action Directe */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => handleQuoteClick(activeService.title)}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] text-white text-xs sm:text-sm font-semibold shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Demander un devis pour ce pôle</span>
                  <IconArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:620121674"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs sm:text-sm font-semibold text-[#0f172a] transition-colors"
                >
                  <span>Appel direct : 620 12 16 74</span>
                </a>
              </div>
            </div>

            {/* Colonne Droite : Visuel 3D et pastille d'engagement */}
            <div className="lg:col-span-5 flex flex-col justify-center items-center">
              <div className="relative w-full aspect-square max-w-sm rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100/60 border border-slate-200 p-8 flex flex-col items-center justify-center text-center shadow-lg group">
                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${activeService.gradient} flex items-center justify-center text-white shadow-2xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {React.createElement(activeService.icon, { className: "w-12 h-12 text-white" })}
                </div>

                <span className="font-heading text-xl font-bold text-[#0f172a] mb-1">
                  {activeService.subtitle}
                </span>

                <span className="text-xs text-[#64748b] font-mono uppercase tracking-widest mb-6">
                  Engagement Qualité &amp; Résultat
                </span>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Disponible immédiatement</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Grille Parallaxe des 7 Services en Cartes Blanches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {AGENCY_SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onClick={() => setActiveTabId(s.id)}
                className="group relative rounded-[26px] bg-white hover:bg-slate-50/80 border border-slate-200/90 hover:border-slate-300 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.1)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-[#64748b] group-hover:text-[#b13257] transition-colors">
                      {s.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#b13257] flex items-center justify-center text-[#0f172a] group-hover:text-white transition-colors shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="font-heading text-lg font-bold text-[#0f172a] mb-2 leading-snug">
                    {s.title}
                  </h4>

                  <p className="text-xs text-[#64748b] line-clamp-2 leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#0f172a] font-semibold group-hover:text-[#b13257] transition-colors">
                  <span>En savoir plus</span>
                  <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
