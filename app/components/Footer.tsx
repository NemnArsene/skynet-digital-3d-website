"use client";

import React from "react";
import Image from "next/image";
import { IconPhone, IconWhatsapp, IconFacebook, IconArrowRight } from "./Icons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const services = [
    "Analyse et gestion de projets digitaux",
    "Élaboration de cahiers des charges",
    "Montage vidéo et production audiovisuelle",
    "Création de sites web sur mesure",
    "Développement d'applications web et mobiles",
    "Formations en Intelligence Artificielle",
    "Gestion des communautés & Social Media",
  ];

  return (
    <footer className="relative w-full bg-[#050408] text-white border-t border-white/[0.08] overflow-hidden pt-16 pb-28 lg:pb-16 px-4 sm:px-6 lg:px-12 xl:px-16">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#78377e]/10 via-[#b13257]/5 to-transparent blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#b13257] via-[#78377e] to-[#3341ab] p-[2px] shadow-[0_0_20px_rgba(177,50,87,0.35)]">
                <div className="w-full h-full rounded-[14px] bg-white overflow-hidden flex items-center justify-center p-1">
                  <Image
                    src="/brand/logo-s-ribbon.png"
                    alt="Logo Skynet Digital"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-heading text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  SKYNET DIGITAL
                  <span className="text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 rounded bg-white/10 text-white/80 font-bold">
                    AGENCE
                  </span>
                </span>
                <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase font-semibold">
                  Donnez vie à vos idées.
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
              Agence créative et technologique de référence. Nous combinons vision stratégique, design 3D de prestige et intelligence artificielle pour concevoir des expériences digitales d&apos;impact.
            </p>

            {/* Direct Phone & Social Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:620121674"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all text-xs font-bold"
                aria-label="Appeler le 620 12 16 74"
              >
                <IconPhone className="w-3.5 h-3.5" />
                <span>620 12 16 74</span>
              </a>

              <a
                href="https://wa.me/23764175399"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366] hover:text-black transition-all text-xs font-semibold"
                aria-label="WhatsApp"
              >
                <IconWhatsapp className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <a
                href="https://facebook.com/skynetdigital.isroot.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1877f2]/10 border border-[#1877f2]/30 text-[#1877f2] hover:bg-[#1877f2] hover:text-white transition-all text-xs font-semibold"
                aria-label="Facebook"
              >
                <IconFacebook className="w-3.5 h-3.5" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Services Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-heading text-sm font-bold tracking-wider uppercase text-white/90">
              Nos 7 Pôles d&apos;Activité
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              {services.map((srv, i) => (
                <li key={i}>
                  <a
                    href="#services"
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="text-white/30 group-hover:text-[#b13257] font-mono text-[10px]">
                      0{i + 1}
                    </span>
                    <span>{srv}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Hubs Column (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <span className="font-heading text-sm font-bold tracking-wider uppercase text-white/90">
              Navigation Rapide
            </span>
            <ul className="flex flex-col gap-2.5 text-xs text-white/60">
              <li>
                <button onClick={scrollToTop} className="hover:text-white transition-colors text-left">
                  Haut de page (Accueil)
                </button>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Nos Expertises
                </a>
              </li>
              <li>
                <a href="#realisations" className="hover:text-white transition-colors">
                  Réalisations &amp; Portfolio
                </a>
              </li>
              <li>
                <a href="#formations" className="hover:text-white transition-colors">
                  Formations en IA
                </a>
              </li>
              <li>
                <a href="#agence" className="hover:text-white transition-colors">
                  04. L&apos;Agence &amp; Méthode
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact &amp; Devis
                </a>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-1 text-[11px] text-white/50">
              <span>Bureaux : Douala (Cameroun) &amp; Paris (France)</span>
              <span>Disponibilité 6j/7 — Support direct</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>
            © 2026 SKYNET DIGITAL. Tous droits réservés. Agence Digitale &amp; Créative.
          </span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <span>Retour en haut</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
              ↑
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
