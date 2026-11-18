"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconChevronLeft, IconChevronRight, IconArrowRight } from "./Icons";

export const FEATURED_ITEMS = [
  {
    id: "01",
    tag: "PLATEFORME & SAAS",
    title: "Maquette SaaS Multi-Appareils",
    subtitle: "Conception d'une suite logicielle moderne, responsive et fluide sur desktop, tablette et smartphone.",
    image: "/flyers/Maquette SaaS Skynet Digital sur appareils.png",
    prompt: "Conception UI/UX d'un tableau de bord SaaS professionnel multi-écrans avec analytics en temps réel et interface moderne.",
    seed: "SKYNET-SAAS-01",
    model: "SaaS & Web Engineering",
    creator: "Équipe Dev Skynet",
  },
  {
    id: "02",
    tag: "3D & PACKAGING",
    title: "Transformation Produit & Rendu 3D",
    subtitle: "Modélisation 3D photoréaliste et mise en valeur commerciale d'un jus d'orange naturel haut de gamme.",
    image: "/images/Transformation d’un jus d’orange naturel-2.png",
    prompt: "Direction artistique packaging, modélisation 3D cinématique avec texturing avancé et éclairage de studio publicitaire.",
    seed: "SKYNET-3D-ORANGE",
    model: "3D & Motion Studio",
    creator: "Studio 3D Skynet",
  },
  {
    id: "03",
    tag: "COMMUNITY MANAGEMENT",
    title: "Gestion des Communautés & Réseaux",
    subtitle: "Animation stratégique de vos communautés, création de contenus engageants et croissance de votre audience.",
    image: "/flyers/Jeune femme multitâche au bureau.png",
    prompt: "Stratégie éditoriale omnicanale, modération active, gestion de communautés et campagnes d'engagement pour maximiser la notoriété.",
    seed: "SKYNET-COMMUNITY-03",
    model: "Social & Community Lab",
    creator: "Équipe Community Skynet",
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
    <div className="relative bg-white/90 backdrop-blur-2xl rounded-[28px] p-3.5 sm:p-4 flex flex-col sm:flex-row items-center gap-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 w-full min-h-[158px]">
      {/* Vignette Visuelle Compacte */}
      <div
        className="relative w-full sm:w-28 sm:h-28 md:w-32 md:h-32 h-36 rounded-2xl overflow-hidden shrink-0 group bg-[#110e1c] shadow-md"
        style={{ position: "relative" }}
      >
        <Image
          src={current.image}
          alt={current.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 130px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Badge sur l'image */}
        <span className="absolute top-1.5 left-1.5 text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white/95">
          {current.tag}
        </span>

        {/* Avatars créateurs / équipe Skynet */}
        <div className="absolute bottom-1.5 left-1.5 flex items-center -space-x-1">
          <div className="w-4 h-4 rounded-full ring-1 ring-white/70 bg-gradient-to-tr from-[#b13257] to-[#78377e] flex items-center justify-center text-[8px] font-bold text-white">
            S
          </div>
          <div className="w-4 h-4 rounded-full ring-1 ring-white/70 bg-gradient-to-tr from-[#3341ab] to-[#78377e] flex items-center justify-center text-[8px] font-bold text-white">
            D
          </div>
          <div className="w-4 h-4 rounded-full ring-1 ring-white/70 bg-[#0f172a] text-[7px] font-bold text-white/80 flex items-center justify-center">
            +
          </div>
        </div>
      </div>

      {/* Contenu & Détails */}
      <div className="flex-1 flex flex-col justify-between w-full min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="text-sm sm:text-base font-bold text-[#0f172a] tracking-tight truncate font-heading">
              {current.title}
            </h3>
            <span className="text-[11px] font-mono text-[#64748b] tracking-wider shrink-0 font-medium">
              {current.id} / 0{FEATURED_ITEMS.length}
            </span>
          </div>

          <p className="text-[11px] sm:text-xs text-[#475569] line-clamp-2 leading-relaxed mb-2">
            {current.subtitle}
          </p>

          <button
            onClick={() => onInspectPrompt(current)}
            className="group/link inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#0f172a] hover:text-[#b13257] transition-colors"
          >
            <span>Découvrir la réalisation</span>
            <IconArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1 text-[#b13257]" />
          </button>
        </div>

        {/* Contrôles de pagination */}
        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
          {/* Indicateurs de progression */}
          <div className="flex items-center gap-1">
            {FEATURED_ITEMS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "w-5 bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab]"
                    : "w-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Aller au projet ${i + 1}`}
              />
            ))}
          </div>

          {/* Flèches Suivant / Précédent */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#1e293b] transition-all"
              aria-label="Projet précédent"
            >
              <IconChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={handleNext}
              className="w-6 h-6 rounded-full bg-[#0f172a] hover:bg-[#b13257] text-white flex items-center justify-center transition-all shadow-sm"
              aria-label="Projet suivant"
            >
              <IconChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
