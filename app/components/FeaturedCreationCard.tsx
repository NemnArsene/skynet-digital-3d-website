"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight, IconArrowRight } from "./Icons";

const FEATURED_ITEMS = [
  {
    id: "01",
    tag: "PROJET À LA UNE",
    title: "Campagne Vidéo & Motion 3D",
    subtitle: "Production publicitaire cinématique, modélisation 3D et expérience visuelle de marque captivante.",
    image: "/flyers/processed/video-marketing.webp",
    prompt: "Direction artistique haut de gamme, modélisation et animation 3D cinématique pour spot de marque digital.",
    seed: "SKYNET-3D-2026",
    model: "Motion & 3D Studio",
    creator: "Équipe Skynet Digital",
  },
  {
    id: "02",
    tag: "BRANDING & DESIGN",
    title: "Identité & Charte Graphique",
    subtitle: "Création complète de marques mémorables, typographies sur-mesure et univers visuel distinctif.",
    image: "/flyers/processed/charte-graphique.webp",
    prompt: "Architecture de marque premium, logo en ruban numérique et charte graphique interactive globale.",
    seed: "BRAND-IDENTITY-02",
    model: "Brand Design Core",
    creator: "Studio Créatif Skynet",
  },
  {
    id: "03",
    tag: "EXPÉRIENCE DIGITALE",
    title: "Plateforme Web & 3D Interactive",
    subtitle: "Sites internet haute performance, animations GSAP et interfaces ergonomiques Next.js.",
    image: "/images/portfolio/product-design.webp",
    prompt: "Développement full-stack Next.js, animations interactives 60fps et expérience utilisateur moderne.",
    seed: "WEB-STACK-16",
    model: "Creative Tech Lab",
    creator: "Développeurs Skynet",
  },
];

interface FeaturedCreationCardProps {
  onInspectPrompt: (item: (typeof FEATURED_ITEMS)[0]) => void;
}

export default function FeaturedCreationCard({ onInspectPrompt }: FeaturedCreationCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = FEATURED_ITEMS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? FEATURED_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === FEATURED_ITEMS.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative glass-card rounded-[26px] p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 border border-white/12 shadow-[0_20px_60px_rgba(0,0,0,0.65)] hover:border-white/20 transition-all duration-300 w-full">
      {/* Vignette Visuelle */}
      <div
        className="relative w-full md:w-36 h-36 rounded-[20px] overflow-hidden shrink-0 group bg-[#110e1c]"
        style={{ position: "relative" }}
      >
        <Image
          src={current.image}
          alt={current.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 150px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Badge sur l'image */}
        <span className="absolute top-2 left-2 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/90 border border-white/15">
          {current.tag}
        </span>

        {/* Avatars créateurs / équipe Skynet */}
        <div className="absolute bottom-2 left-2 flex items-center -space-x-1.5">
          <div className="w-5 h-5 rounded-full ring-1 ring-white/60 bg-gradient-to-tr from-[#b13257] to-[#78377e] flex items-center justify-center text-[9px] font-bold text-white">
            S
          </div>
          <div className="w-5 h-5 rounded-full ring-1 ring-white/60 bg-gradient-to-tr from-[#3341ab] to-[#78377e] flex items-center justify-center text-[9px] font-bold text-white">
            D
          </div>
          <div className="w-5 h-5 rounded-full ring-1 ring-white/60 bg-[#161226] text-[8px] font-bold text-white/80 flex items-center justify-center">
            +
          </div>
        </div>
      </div>

      {/* Contenu & Détails */}
      <div className="flex-1 flex flex-col justify-between w-full h-full min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate font-heading">
              {current.title}
            </h3>
            <span className="text-xs font-mono text-white/50 tracking-wider">
              {current.id} / 0{FEATURED_ITEMS.length}
            </span>
          </div>

          <p className="text-xs text-white/65 line-clamp-2 leading-relaxed mb-3">
            {current.subtitle}
          </p>

          <button
            onClick={() => onInspectPrompt(current)}
            className="group/link inline-flex items-center gap-1.5 text-xs font-medium text-white/90 hover:text-white transition-colors"
          >
            <span>Découvrir la réalisation</span>
            <IconArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 text-[#ff814c]" />
          </button>
        </div>

        {/* Contrôles de pagination */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          {/* Indicateurs de progression */}
          <div className="flex items-center gap-1.5">
            {FEATURED_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-6 bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Aller à la diapositive ${i + 1}`}
              />
            ))}
          </div>

          {/* Flèches Suivant / Précédent */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
              aria-label="Projet précédent"
            >
              <IconChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all"
              aria-label="Projet suivant"
            >
              <IconChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
