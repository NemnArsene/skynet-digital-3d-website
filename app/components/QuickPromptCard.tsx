"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconArrowUpRight, IconSparkles } from "./Icons";

interface QuickPromptCardProps {
  onGenerate: (prompt: string) => void;
}

export default function QuickPromptCard({ onGenerate }: QuickPromptCardProps) {
  const [projectText, setProjectText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectText.trim()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onGenerate(projectText);
      setProjectText("");
    }, 800);
  };

  return (
    <div className="relative bg-white/90 backdrop-blur-2xl border border-[#0f172a]/10 rounded-[24px] p-3 sm:p-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.1)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.15)] flex flex-col justify-between w-full transition-all duration-300">
      {/* Ligne du haut : Logo officiel + Bouton d'action */}
      <div className="flex items-center justify-between mb-2">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[2px] bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] shadow-[0_0_15px_rgba(177,50,87,0.35)]">
          <div
            className="w-full h-full rounded-full overflow-hidden relative bg-white p-0.5 flex items-center justify-center"
            style={{ position: "relative" }}
          >
            <Image
              src="/brand/logo-s-ribbon.png"
              alt="Skynet Digital"
              fill
              sizes="40px"
              className="object-contain p-0.5"
            />
          </div>
        </div>

        <button
          onClick={() => onGenerate(projectText || "Projet 3D & Web")}
          title="Démarrer un projet avec Skynet"
          className="w-8 h-8 rounded-full bg-[#0f172a]/5 hover:bg-[#0f172a] text-[#0f172a] hover:text-white flex items-center justify-center transition-all duration-300 hover:rotate-12 shadow-sm"
        >
          <IconArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Titre & Slogan officiel compact */}
      <div className="mb-2">
        <h3 className="text-xs sm:text-sm font-bold text-[#0f172a] tracking-tight leading-tight font-heading truncate">
          Donnez vie à vos idées.
        </h3>
        <p className="text-[10px] sm:text-[11px] text-[#64748b] mt-0.5 leading-snug line-clamp-1">
          Discutons de vos objectifs dès aujourd’hui.
        </p>
      </div>

      {/* Formulaire de saisie rapide de projet */}
      <form onSubmit={handleSubmit} className="relative mt-0.5">
        <input
          id="project-input-hero"
          type="text"
          value={projectText}
          onChange={(e) => setProjectText(e.target.value)}
          placeholder="Votre projet..."
          className="w-full bg-slate-100/90 border border-slate-200/80 rounded-full py-2 pl-3 pr-8 text-[11px] text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#b13257] focus:ring-1 focus:ring-[#b13257] transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-1 top-1 bottom-1 px-2.5 rounded-full bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] text-white flex items-center justify-center hover:brightness-110 disabled:opacity-60 transition-all text-[11px] font-semibold shadow-md"
          title="Envoyer votre demande"
        >
          {isSubmitting ? (
            <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <IconSparkles className="w-3 h-3" />
          )}
        </button>
      </form>
    </div>
  );
}
