"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconArrowUpRight, IconSparkles, IconLayers, IconPhone, IconWhatsapp } from "./Icons";
import SectionTitleSlide from "./SectionTitleSlide";

interface ProjectItem {
  id: number;
  title: string;
  category: "all" | "web" | "3d" | "social" | "ai";
  categoryLabel: string;
  description: string;
  image: string;
  stats: string;
  tags: string[];
  isFeatured?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 1,
    title: "Plateforme SaaS & Application Multi-Écrans",
    category: "web",
    categoryLabel: "Développement Web & SaaS",
    description:
      "Conception et développement d'une suite SaaS complète avec dashboard analytique en temps réel, accessible sur desktop, tablette et smartphone.",
    image: "/flyers/Maquette SaaS Skynet Digital sur appareils.png",
    stats: "+340% d'efficacité",
    tags: ["Next.js", "React Native", "Tailwind CSS", "Cloud API"],
    isFeatured: true,
  },
  {
    id: 2,
    title: "Visualisation Produit 3D — Jus d'Orange Naturel",
    category: "3d",
    categoryLabel: "3D & Motion Design",
    description:
      "Rendu photoréaliste 3D pour packaging de boisson premium avec simulation de fluide dynamique, éclairage de studio et étiquetage haute fidélité.",
    image: "/images/Transformation d’un jus d’orange naturel-2.png",
    stats: "Rendu 4K Studio",
    tags: ["Blender 3D", "Éclairage Studio", "Packaging", "Motion"],
    isFeatured: true,
  },
  {
    id: 3,
    title: "Gestion des Communautés & Stratégie Social Media",
    category: "social",
    categoryLabel: "Community Management",
    description:
      "Accompagnement d'une marque omnicanale : création quotidienne de contenus viraux, animation des réseaux sociaux et croissance organique d'audience.",
    image: "/flyers/Jeune femme multitâche au bureau.png",
    stats: "+180k abonnés",
    tags: ["Social Media", "Copywriting", "Création Contenu", "Ads"],
  },
  {
    id: 4,
    title: "Restauration Haute Précision par Intelligence Artificielle",
    category: "ai",
    categoryLabel: "Restauration Photo IA",
    description:
      "Restauration de photographies anciennes et dégradées : suppression des rayures, rehaussement des détails faciaux et colorisation historique par IA.",
    image: "/flyers/Restauration photo _ redonnez vie à vos souvenirs.png",
    stats: "100% de fidélité",
    tags: ["IA Générative", "Colorisation", "Retouche Pro", "Patrimoine"],
  },
  {
    id: 5,
    title: "Cosmétique Premium — Beurre de Karité Bio",
    category: "3d",
    categoryLabel: "Branding & 3D Packaging",
    description:
      "Direction artistique et modélisation 3D pour une gamme cosmétique naturelle africaine d'exportation internationale.",
    image: "/images/portfolio/karite-butter.webp",
    stats: "Design Export",
    tags: ["Branding 3D", "Packaging Luxe", "Rendu Photoréaliste"],
  },
  {
    id: 6,
    title: "Création Audio & Chansons Personnalisées",
    category: "ai",
    categoryLabel: "Production Audio & IA",
    description:
      "Production de jingles de marque, chansons personnalisées pour événements corporatifs et sound design sur mesure.",
    image: "/images/Microphone de studio avec suspension antivibrations.png",
    stats: "Studio Pro",
    tags: ["Sound Design", "Audio IA", "Chanson Sur Mesure", "Mixage"],
  },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Tous nos projets" },
    { id: "web", label: "Web & SaaS" },
    { id: "3d", label: "3D & Motion" },
    { id: "social", label: "Community Management" },
    { id: "ai", label: "IA & Restauration" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="realisations" className="relative w-full bg-[#fbfbfd] text-[#0f172a] overflow-hidden border-t border-slate-200 selection:bg-[#b13257]/20 selection:text-[#0f172a]">
      
      {/* ======================================================== */}
      {/* 1. CINEMATIC TITLE SLIDE (Diaporama plein écran)          */}
      {/* ======================================================== */}
      <SectionTitleSlide
        sectionNum="02"
        sectionLabel="PORTFOLIO &amp; 3D"
        watermark="02 / CRÉATIONS"
        headline={
          <>
            Des réalisations conçues pour <br />
            <span className="font-light italic bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] bg-clip-text text-transparent">
              marquer les esprits.
            </span>
          </>
        }
        subtitle="Chaque projet est le fruit d'une convergence entre design avant-gardiste, ingénierie logicielle robuste et modélisation 3D photoréaliste."
        accentColor="#78377e"
        glowPosition="right"
      />

      {/* ======================================================== */}
      {/* 2. CINEMATIC CONTENT ARRIVAL (Parallax Grid & Filters)   */}
      {/* ======================================================== */}
      <div className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Filter Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap border cursor-pointer ${
                  isActive
                    ? "bg-[#0f172a] text-white border-[#0f172a] shadow-lg scale-105"
                    : "bg-white hover:bg-slate-100 text-[#475569] hover:text-[#0f172a] border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid en Cartes Blanches Parallaxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-[30px] bg-white border border-slate-200/90 hover:border-slate-300 overflow-hidden transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:shadow-[0_22px_60px_rgba(15,23,42,0.14)]"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Category Pill Over Image */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/20">
                    {project.categoryLabel}
                  </span>
                </div>

                {/* Badge Stat over image */}
                <div className="absolute bottom-3.5 right-3.5 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-[#b13257] to-[#78377e] text-white shadow-md">
                    {project.stats}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0f172a] group-hover:text-[#b13257] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2.5 py-1 rounded-lg bg-slate-100 text-[#475569] font-mono font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Call to Action for Custom Projects (Fond Blanc/Ardoise) */}
        <div className="rounded-[32px] bg-gradient-to-r from-slate-900 to-[#1e1b2e] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
              Vous avez une idée de projet ambitieux ?
            </h3>
            <p className="text-sm text-white/75 max-w-xl">
              Discutez directement avec nos directeurs artistiques et ingénieurs pour obtenir un devis personnalisé sous 24h.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:620121674"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              <IconPhone className="w-4 h-4" />
              <span>Appeler le 620 12 16 74</span>
            </a>
            <a
              href="https://wa.me/23764175399"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm transition-all"
            >
              <IconWhatsapp className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
