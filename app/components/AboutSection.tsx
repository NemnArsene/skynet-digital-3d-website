"use client";

import React from "react";
import Image from "next/image";
import { IconCheck, IconBuilding, IconUsers, IconGlobe, IconSparkles } from "./Icons";
import SectionTitleSlide from "./SectionTitleSlide";

export default function AboutSection() {
  const steps = [
    {
      num: "01",
      title: "Immersion & Cadrage",
      desc: "Nous analysons votre écosystème, vos défis métier et formalisons un cahier des charges rigoureux pour éliminer toute ambiguïté.",
    },
    {
      num: "02",
      title: "Direction Artistique & 3D",
      desc: "Nos designers conçoivent des identités graphiques captivantes, des interfaces immersives et des rendus 3D qui marquent les esprits.",
    },
    {
      num: "03",
      title: "Ingénierie & Intégration IA",
      desc: "Développement robuste en Next.js, architectures cloud résilientes et injection d'intelligence artificielle pour automatiser vos processus.",
    },
    {
      num: "04",
      title: "Déploiement & Amplification",
      desc: "Mise en production sécurisée, formation de vos équipes et activation social media pour faire décoller votre audience immédiatement.",
    },
  ];

  const stats = [
    { value: "250+", label: "Projets Réalisés", sub: "Sur mesure & livrés" },
    { value: "120+", label: "Clients Partenaires", sub: "PME & Grandes marques" },
    { value: "15+", label: "Pays Touchés", sub: "Afrique, Europe, Amérique" },
    { value: "99.4%", label: "Satisfaction Client", sub: "Recommandation active" },
  ];

  return (
    <section id="agence" className="relative w-full bg-[#fbfbfd] text-[#0f172a] overflow-hidden border-t border-slate-200 selection:bg-[#b13257]/20 selection:text-[#0f172a]">
      {/* Anchor duplicate for old bookmarks */}
      <span id="apropos" className="sr-only">À Propos</span>

      {/* ======================================================== */}
      {/* 1. CINEMATIC TITLE SLIDE (Diaporama plein écran)          */}
      {/* ======================================================== */}
      <SectionTitleSlide
        sectionNum="04"
        sectionLabel="L'AGENCE &amp; MÉTHODE"
        watermark="04 / L'AGENCE"
        headline={
          <>
            L&apos;alliance de la créativité audacieuse <br />
            <span className="font-light italic bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] bg-clip-text text-transparent">
              et de l&apos;ingénierie de précision.
            </span>
          </>
        }
        subtitle="SKYNET DIGITAL est une agence créative et technologique de référence. Nous accompagnons les leaders visionnaires pour transformer leurs idées en écosystèmes digitaux influents."
        accentColor="#3b82f6"
        glowPosition="left"
      />

      {/* ======================================================== */}
      {/* 2. CINEMATIC CONTENT ARRIVAL (Stats, Values & Roadmap)    */}
      {/* ======================================================== */}
      <div className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Stats Grid en Cartes Blanches */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((s, i) => (
            <div
              key={i}
              className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:shadow-[0_15px_40px_rgba(15,23,42,0.1)] transition-all duration-300"
            >
              <span className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0f172a] mb-1">
                {s.value}
              </span>
              <span className="font-heading text-sm sm:text-base font-bold text-[#0f172a] mb-0.5">
                {s.label}
              </span>
              <span className="text-xs text-[#64748b] font-mono">
                {s.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Middle Banner: Pourquoi choisir Skynet Digital */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">
          {/* Left Column: Official Graphic */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-md rounded-[32px] overflow-hidden border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.1)] group">
              <Image
                src="/flyers/Pourquoi choisir skynet.png"
                alt="Pourquoi choisir Skynet Digital"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-[#ff6b35] font-bold uppercase">
                  CONFIANCE &amp; EXCELLENCE
                </span>
                <span className="font-heading text-lg font-bold text-white">
                  Des standards internationaux d&apos;exécution
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Values & Commitments */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#b13257] uppercase">
                NOTRE PHILOSOPHIE
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f172a] leading-tight">
                Nous ne créons pas seulement du contenu, nous bâtissons des avantages compétitifs durables.
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Chaque ligne de code, chaque image 3D et chaque stratégie de communication que nous déployons est pensée pour un seul objectif : positionner votre marque en leader incontesté de son marché.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#b13257]/15 text-[#b13257] flex items-center justify-center font-bold text-sm">
                  ⚡
                </div>
                <h4 className="font-heading text-sm font-bold text-[#0f172a]">Vitesse &amp; Réactivité</h4>
                <p className="text-xs text-[#64748b]">
                  Des cycles de livraison courts et itératifs pour tester et déployer plus rapidement que le marché.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#78377e]/15 text-[#78377e] flex items-center justify-center font-bold text-sm">
                  🎯
                </div>
                <h4 className="font-heading text-sm font-bold text-[#0f172a]">Précision Stratégique</h4>
                <p className="text-xs text-[#64748b]">
                  Pas de superflu : chaque fonctionnalité est mesurée et orientée vers l&apos;impact commercial.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3341ab]/15 text-[#3341ab] flex items-center justify-center font-bold text-sm">
                  🤖
                </div>
                <h4 className="font-heading text-sm font-bold text-[#0f172a]">IA Native</h4>
                <p className="text-xs text-[#64748b]">
                  L&apos;intelligence artificielle intégrée à chaque étape pour diviser les coûts et multiplier la qualité par 10.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  🤝
                </div>
                <h4 className="font-heading text-sm font-bold text-[#0f172a]">Accompagnement 24/7</h4>
                <p className="text-xs text-[#64748b]">
                  Un interlocuteur dédié et joignable directement par téléphone et WhatsApp pour piloter vos priorités.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Steps Methodology */}
        <div className="rounded-[32px] bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_15px_50px_rgba(15,23,42,0.06)]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#64748b] uppercase">
              NOTRE MÉTHODOLOGIE DE TRAVAIL
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0f172a] mt-1">
              De votre idée à l&apos;impact en 4 étapes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="flex flex-col gap-3 relative">
                <span className="font-mono text-3xl font-extrabold text-[#b13257]">
                  {st.num}
                </span>
                <h4 className="font-heading text-base font-bold text-[#0f172a]">
                  {st.title}
                </h4>
                <p className="text-xs text-[#64748b] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
