"use client";

import React, { useRef, useState, useEffect } from "react";

interface SectionTitleSlideProps {
  /** Section number (e.g. "01") */
  sectionNum: string;
  /** Short section label (e.g. "PÔLES D'EXCELLENCE") */
  sectionLabel: string;
  /** Big watermark text behind the title (e.g. "01 / EXPERTISES") */
  watermark: string;
  /** Main headline — can include JSX */
  headline: React.ReactNode;
  /** Subtitle / tagline below the headline */
  subtitle: string;
  /** Accent color for the dot indicator */
  accentColor?: string;
  /** Accent glow gradient — optional */
  glowPosition?: "left" | "right";
}

/**
 * Slide de présentation cinématique pleine largeur (100vh).
 * Fonctionne comme une diapositive de diaporama :
 * - Reste verrouillé en plein écran au début du défilement
 * - S'estompe et glisse vers le haut ("disparaît comme un slide")
 * - Laisse ensuite place aux éléments interactifs de la section
 * - 100% réversible au défilement en arrière vers le Hero
 */
export default function SectionTitleSlide({
  sectionNum,
  sectionLabel,
  watermark,
  headline,
  subtitle,
  accentColor = "#b13257",
  glowPosition = "left",
}: SectionTitleSlideProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [slideProgress, setSlideProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      if (scrollableDist <= 0) return;

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDist));
      setSlideProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 0.0 à 0.35 : La diapositive reste pleinement visible en plein écran
  // 0.35 à 0.85 : La diapositive s'efface et glisse vers le haut pour révéler les éléments de la section
  let opacity = 1;
  let translateY = 0;
  let scale = 1;

  if (slideProgress > 0.35) {
    const t = Math.min(1, (slideProgress - 0.35) / 0.50);
    opacity = Math.max(0, 1 - t);
    translateY = -70 * t;
    scale = 1 - 0.03 * t;
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "150vh" }}
    >
      {/* Diapositive collante plein écran (100vh) */}
      <div
        className="sticky top-0 w-full h-screen h-[100dvh] flex flex-col justify-center items-center text-center overflow-hidden px-4 sm:px-6 lg:px-12 py-16 sm:py-24 border-b border-slate-200/80 bg-gradient-to-b from-[#f8fafc] via-white to-white select-none isolate"
        style={{
          opacity,
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          pointerEvents: opacity <= 0.05 ? "none" : "auto",
        }}
      >
        {/* Massive Watermark Parallax Background */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[18vw] text-slate-900/[0.03] tracking-tighter whitespace-nowrap will-change-transform -z-0"
          style={{
            transform: `translate(-50%, -50%) scale(${0.96 + slideProgress * 0.08})`,
          }}
        >
          {watermark}
        </span>

        {/* Ambient Subtle Accent Glows */}
        <div
          className={`pointer-events-none absolute w-[500px] h-[500px] rounded-full blur-[140px] -z-10 ${
            glowPosition === "left"
              ? "top-10 left-1/4 bg-gradient-to-tr"
              : "top-10 right-1/4 bg-gradient-to-bl"
          }`}
          style={{
            backgroundImage:
              glowPosition === "left"
                ? `linear-gradient(to top right, ${accentColor}12, #78377e0d, transparent)`
                : `linear-gradient(to bottom left, #78377e12, #3341ab0d, transparent)`,
          }}
        />

        {/* Animated Content */}
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-4">
          {/* Badge Cinématique */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-md mb-6 shadow-sm">
            <span
              className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
              style={{ backgroundColor: accentColor, color: accentColor }}
            />
            <span className="text-xs font-bold tracking-[0.2em] uppercase font-mono text-[#0f172a]">
              SECTION {sectionNum} — {sectionLabel}
            </span>
          </div>

          {/* Grand Titre Cinématique en Noir Profond */}
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0f172a] leading-[1.08] mb-6">
            {headline}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-[#475569] font-normal leading-relaxed max-w-2xl mb-8">
            {subtitle}
          </p>

          {/* Prompt de défilement cinématique */}
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#64748b] bg-slate-100/90 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
            <span>Défilez pour découvrir cette section</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
