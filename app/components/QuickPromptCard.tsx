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
    <div className="relative bg-[#0d0a17]/90 border border-white/15 rounded-[26px] p-4 sm:p-5 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl flex flex-col justify-between w-full transition-all hover:border-white/25">
      {/* Ligne du haut : Logo officiel + Bouton d'action */}
      <div className="flex items-center justify-between mb-3">
        <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] shadow-[0_0_18px_rgba(177,50,87,0.35)]">
          <div
            className="w-full h-full rounded-full overflow-hidden relative bg-white p-0.5 flex items-center justify-center"
            style={{ position: "relative" }}
          >
            <Image
              src="/brand/logo-s-ribbon.png"
              alt="Skynet Digital"
              fill
              sizes="44px"
              className="object-contain p-0.5"
            />
          </div>
        </div>

        <button
          onClick={() => onGenerate(projectText || "Projet 3D & Web")}
          title="Démarrer un projet avec Skynet"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300 hover:rotate-12 shadow-sm"
        >
          <IconArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* Titre & Slogan officiel */}
      <div className="mb-3">
        <h3 className="text-base font-semibold text-white tracking-tight leading-tight font-heading">
          Donnez vie à vos idées.
        </h3>
        <p className="text-xs text-white/65 mt-1 leading-relaxed">
          Un projet digital, 3D ou web ? Discutons de vos objectifs dès aujourd’hui.
        </p>
      </div>

      {/* Formulaire de saisie rapide de projet */}
      <form onSubmit={handleSubmit} className="relative mt-1">
        <input
          id="project-input-hero"
          type="text"
          value={projectText}
          onChange={(e) => setProjectText(e.target.value)}
          placeholder="Décrivez brièvement votre projet..."
          className="w-full bg-white/[0.07] border border-white/12 rounded-full py-2.5 pl-4 pr-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#b13257] focus:ring-1 focus:ring-[#b13257] transition-all"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="absolute right-1 top-1 bottom-1 px-3 rounded-full bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] text-white flex items-center justify-center hover:brightness-110 disabled:opacity-60 transition-all text-xs font-semibold shadow-md"
          title="Envoyer votre demande"
        >
          {isSubmitting ? (
            <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <IconSparkles className="w-3.5 h-3.5" />
          )}
        </button>
      </form>
    </div>
  );
}
