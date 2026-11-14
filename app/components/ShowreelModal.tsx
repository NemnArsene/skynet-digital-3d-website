"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { IconClose, IconSparkles, IconPlay } from "./Icons";

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShowreelModal({ isOpen, onClose }: ShowreelModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#0f0c1a] border border-white/20 rounded-[28px] overflow-hidden shadow-[0_25px_90px_rgba(0,0,0,0.9)] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b13257] animate-pulse" />
            <h2 className="text-base font-semibold text-white tracking-tight font-heading">
              SKYNET DIGITAL SHOWREEL // DIRECTION ARTISTIQUE &amp; CRÉATIVE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors"
            aria-label="Fermer la vidéo"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Conteneur Vidéo / Visuel */}
        <div
          className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group"
          style={{ position: "relative" }}
        >
          <Image
            src="/flyers/processed/video-marketing.webp"
            alt="Skynet Digital Showreel"
            fill
            className="object-cover opacity-85 scale-105 group-hover:scale-100 transition-transform duration-1000"
          />

          {/* Dégradés d'ambiance sombres */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30" />

          {/* Pastille centrale Play */}
          <div className="relative z-10 flex flex-col items-center gap-3 text-center p-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#b13257] via-[#78377e] to-[#3341ab] p-1 shadow-[0_0_40px_rgba(177,50,87,0.5)]">
              <div className="w-full h-full rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                <IconPlay className="w-6 h-6 ml-1 text-white fill-white" />
              </div>
            </div>
            <p className="text-base font-semibold text-white tracking-tight font-heading">
              Showreel de l&apos;Agence Skynet Digital
            </p>
            <span className="text-xs text-white/60">
              Direction Artistique · Animation 3D · Vidéos &amp; Motion · Web &amp; Applications
            </span>
          </div>
        </div>

        {/* Pied de la modale */}
        <div className="px-6 py-4 bg-white/[0.03] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-white/90 font-medium">
              <IconSparkles className="w-3.5 h-3.5 text-[#ff814c]" />
              Skynet Digital — Donnez vie à vos idées.
            </span>
            <span>·</span>
            <span>Paris &amp; Douala</span>
          </div>

          <a
            href="#contact"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] text-white font-medium hover:brightness-110 transition-all shadow-md"
          >
            Discuter de votre projet →
          </a>
        </div>
      </div>
    </div>
  );
}
