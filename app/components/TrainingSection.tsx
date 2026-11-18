"use client";

import React from "react";
import Image from "next/image";
import { IconBot, IconCheck, IconArrowRight, IconSparkles, IconUsers, IconPhone, IconWhatsapp } from "./Icons";
import SectionTitleSlide from "./SectionTitleSlide";

export default function TrainingSection() {
  const modules = [
    {
      num: "01",
      title: "Maîtrise de l'IA Générative en Entreprise",
      level: "Tous niveaux · Pratique intensive",
      description:
        "Apprenez à formuler des prompts stratégiques et à utiliser ChatGPT, Claude et Midjourney pour rédiger des rapports, générer des concepts visuels et accélérer vos processus quotidiens.",
      highlights: [
        "Techniques de prompting avancé (Few-shot, CoT)",
        "Génération d'images professionnelles et chartes visuelles",
        "Synthèse et analyse automatisée de documents volumineux",
        "Cas concrets adaptés à votre secteur d'activité",
      ],
      duration: "3 semaines (20h de pratique)",
    },
    {
      num: "02",
      title: "Automatisation de Workflows & Intégration IA",
      level: "Intermédiaire · Productivité x5",
      description:
        "Connectez vos outils quotidiens (Gmail, Notion, CRM, WhatsApp) avec l'IA pour automatiser la collecte de leads, le support client et la création de devis sans écrire de code complexe.",
      highlights: [
        "Prise en main des plateformes no-code Make & n8n",
        "Connexion d'APIs d'IA générative (Gemini, OpenAI)",
        "Création d'agents d'automatisation pour le service client",
        "Sécurisation des flux de données d'entreprise",
      ],
      duration: "4 semaines (25h de pratique)",
    },
    {
      num: "03",
      title: "Création Vidéo & Motion Design assisté par IA",
      level: "Créatifs & Marketeurs",
      description:
        "Maîtrisez la génération de vidéos cinématiques, la synthèse vocale ultra-réaliste et le montage intelligent pour produire des reels et publicités qui captivent l'attention.",
      highlights: [
        "Génération vidéo (Runway Gen-3, Luma, Pika)",
        "Clonage et synthèse vocale avec ElevenLabs",
        "Montage vidéo assisté et synchronisation labiale",
        "Stratégie de diffusion pour maximiser la portée virale",
      ],
      duration: "2 semaines (15h de pratique)",
    },
  ];

  return (
    <section id="formations" className="relative w-full bg-white text-[#0f172a] overflow-hidden border-t border-slate-200 selection:bg-[#b13257]/20 selection:text-[#0f172a]">
      
      {/* ======================================================== */}
      {/* 1. CINEMATIC TITLE SLIDE (Diaporama plein écran)          */}
      {/* ======================================================== */}
      <SectionTitleSlide
        sectionNum="03"
        sectionLabel="ACADÉMIE DIGITALE &amp; IA"
        watermark="03 / FORMATIONS"
        headline={
          <>
            Dominez l&apos;Intelligence Artificielle <br />
            <span className="font-light italic bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] bg-clip-text text-transparent">
              avant vos concurrents.
            </span>
          </>
        }
        subtitle="Des formations pratiques, concrètes et certifiantes dispensées par les experts de SKYNET DIGITAL. Développez les compétences du futur dès aujourd'hui."
        accentColor="#f59e0b"
        glowPosition="left"
      />

      {/* ======================================================== */}
      {/* 2. CINEMATIC CONTENT ARRIVAL (Parallax Layout)           */}
      {/* ======================================================== */}
      <div className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        {/* Content Layout: Official Flyer Spotlight + 3 Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column: Official Training Flyer Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[32px] overflow-hidden border border-slate-200/90 shadow-[0_25px_60px_rgba(15,23,42,0.12)] group">
              <Image
                src="/flyers/Affiche de formation digitale Skynet.png"
                alt="Affiche officielle de formation digitale Skynet"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white w-fit border border-white/20">
                  SESSION LIMITÉE À 15 PLACES
                </span>
                <span className="font-heading text-xl font-bold text-white leading-snug">
                  Programme Immersion IA &amp; Métiers du Futur
                </span>
                <span className="text-xs text-white/80">
                  Sessions en présentiel &amp; visioconférence interactive
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Training Tracks */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {modules.map((mod) => (
              <div
                key={mod.num}
                className="group relative rounded-[28px] bg-white border border-slate-200/90 hover:border-slate-300 p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] hover:shadow-[0_18px_45px_rgba(15,23,42,0.1)]"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#b13257] to-[#78377e] flex items-center justify-center font-mono text-xs font-bold text-white shadow-md">
                      {mod.num}
                    </span>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0f172a]">
                      {mod.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-slate-100 text-[#475569] self-start sm:self-auto border border-slate-200">
                    {mod.duration}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                  {mod.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-slate-100">
                  {mod.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#1e293b] font-medium">
                      <IconCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Strip & Direct Reservation */}
        <div className="rounded-[32px] bg-gradient-to-r from-slate-900 to-[#1b192e] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-amber-400 text-xs font-mono font-semibold">
              <IconSparkles className="w-4 h-4" />
              <span>CERTIFICATION OFFICIELLE SKYNET DIGITAL</span>
            </div>
            <h4 className="font-heading text-2xl font-bold text-white">
              Prêt à transformer vos compétences ?
            </h4>
            <p className="text-xs sm:text-sm text-white/70 max-w-xl">
              Réservez votre entretien d&apos;orientation gratuit pour choisir le cursus le plus adapté à vos objectifs professionnels.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:620121674"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] text-white font-semibold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
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
              <span>Inscriptions WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
