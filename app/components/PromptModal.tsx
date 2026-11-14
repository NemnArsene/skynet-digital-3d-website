"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconClose, IconSparkles } from "./Icons";

interface PromptModalProps {
  item: {
    id: string;
    tag: string;
    title: string;
    subtitle: string;
    image: string;
    prompt: string;
    seed: string;
    model: string;
    creator: string;
  } | null;
  onClose: () => void;
}

export default function PromptModal({ item, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, onClose]);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(item.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#0f0c1a] border border-white/20 rounded-[28px] overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.9)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-[#b13257]/20 text-[#f3c1d4] border border-[#b13257]/40">
              {item.tag}
            </span>
            <h3 className="text-sm font-semibold text-white tracking-tight font-heading">
              {item.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
            aria-label="Fermer"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Corps */}
        <div className="p-6 space-y-4">
          <div
            className="relative h-52 w-full rounded-2xl overflow-hidden border border-white/10 bg-[#161226]"
            style={{ position: "relative" }}
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-white/75 uppercase tracking-wider font-heading">
                Description de la réalisation
              </label>
              <button
                onClick={handleCopy}
                className="text-xs text-[#f3c1d4] hover:underline font-medium"
              >
                {copied ? "✓ Copié !" : "Copier les détails"}
              </button>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs text-white/90 leading-relaxed">
              {item.prompt}
            </div>
          </div>

          {/* Spécifications du projet */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="text-[10px] text-white/50 uppercase block">Expertise</span>
              <span className="text-xs font-semibold text-white">{item.model}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="text-[10px] text-white/50 uppercase block">Référence</span>
              <span className="text-xs font-semibold font-mono text-white">{item.seed}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="text-[10px] text-white/50 uppercase block">Support</span>
              <span className="text-xs font-semibold text-white">Multi-canal</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/8">
              <span className="text-[10px] text-white/50 uppercase block">Format</span>
              <span className="text-xs font-semibold text-white">Haute Définition</span>
            </div>
          </div>
        </div>

        {/* Pied */}
        <div className="px-6 py-4 bg-white/[0.03] border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-white/60">
            Réalisé par <strong className="text-white">{item.creator}</strong>
          </span>
          <button
            onClick={() => {
              onClose();
              const el = document.getElementById("project-input-hero");
              if (el) {
                (el as HTMLInputElement).value = `Projet similaire à ${item.title}`;
                el.focus();
              }
            }}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] text-white text-xs font-semibold hover:brightness-110 flex items-center gap-1.5 transition-all shadow-md"
          >
            <IconSparkles className="w-3.5 h-3.5" />
            Lancer un projet similaire
          </button>
        </div>
      </div>
    </div>
  );
}
