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
 * Cinematic full-screen "slide" title card that appears between sections.
 *
 * Architecture:
 *  - A 200vh tall scroll container gives the scroll room for the animation.
 *  - Inside, a `sticky top-0 h-screen` div stays pinned while the user scrolls.
 *  - A `localProgress` (0→1) is computed from how far the user has scrolled
 *    through the 200vh container.
 *  - 0–0.45: Title slides IN (opacity 0→1, translateY 60px→0).
 *  - 0.45–0.55: Title stays fully visible.
 *  - 0.55–1: Title slides OUT (opacity 1→0, translateY 0→-60px, scale 0.96).
 *  - Fully reversible on scroll back up.
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
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        setLocalProgress(0);
        return;
      }

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setLocalProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Compute transforms from localProgress ──
  // Phase 1: Entrance (0 → 0.4) — fade in + slide up
  // Phase 2: Hold (0.4 → 0.6) — fully visible
  // Phase 3: Exit (0.6 → 1.0) — fade out + slide up + slight scale down

  let opacity: number;
  let translateY: number;
  let scale: number;

  if (localProgress <= 0.4) {
    // Entrance
    const t = localProgress / 0.4; // 0→1
    opacity = t;
    translateY = 60 * (1 - t); // 60px → 0px
    scale = 0.97 + 0.03 * t; // 0.97 → 1
  } else if (localProgress <= 0.6) {
    // Hold
    opacity = 1;
    translateY = 0;
    scale = 1;
  } else {
    // Exit
    const t = (localProgress - 0.6) / 0.4; // 0→1
    opacity = 1 - t;
    translateY = -60 * t; // 0 → -60px
    scale = 1 - 0.04 * t; // 1 → 0.96
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "200vh" }}
    >
      {/* Sticky viewport-height slide */}
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-b from-[#f8fafc] via-white to-white">
        
        {/* Massive Watermark Parallax Background */}
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-black text-[18vw] text-slate-900/[0.03] tracking-tighter whitespace-nowrap"
          style={{
            opacity: opacity * 0.5,
            transform: `translate(-50%, -50%) scale(${0.9 + 0.1 * (localProgress <= 0.5 ? localProgress / 0.5 : 1 - (localProgress - 0.5) / 0.5)})`,
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
            backgroundImage: glowPosition === "left"
              ? `linear-gradient(to top right, ${accentColor}0d, #78377e0d, transparent)`
              : `linear-gradient(to bottom left, #78377e0d, #3341ab0d, transparent)`,
          }}
        />

        {/* Animated Content */}
        <div
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-12 will-change-transform"
          style={{
            opacity,
            transform: `translateY(${translateY}px) scale(${scale})`,
            transition: "none", // Pure scroll-driven, no CSS transitions
          }}
        >
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
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#64748b] bg-slate-100/80 px-4 py-2 rounded-full border border-slate-200">
            <span>Continuez pour découvrir</span>
            <span className="animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
