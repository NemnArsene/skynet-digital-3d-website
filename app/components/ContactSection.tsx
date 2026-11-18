"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  IconPhone,
  IconWhatsapp,
  IconFacebook,
  IconArrowRight,
  IconCheck,
  IconSparkles,
} from "./Icons";
import SectionTitleSlide from "./SectionTitleSlide";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Création de sites web",
    budget: "500 000 - 2 000 000 FCFA",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = [
    "Analyse & Gestion de projets",
    "Élaboration de cahiers des charges",
    "Montage vidéo & Production",
    "Création de sites web",
    "Applications web & mobiles",
    "Formations en IA & Digital",
    "Gestion des communautés",
  ];

  const budgetList = [
    "< 500 000 FCFA",
    "500 000 - 2 000 000 FCFA",
    "2 000 000 - 5 000 000 FCFA",
    "+ 5 000 000 FCFA (Sur mesure)",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="relative w-full bg-white text-[#0f172a] overflow-hidden border-t border-slate-200 selection:bg-[#b13257]/20 selection:text-[#0f172a]">
      
      {/* ======================================================== */}
      {/* 1. CINEMATIC TITLE SLIDE (Diaporama plein écran)          */}
      {/* ======================================================== */}
      <SectionTitleSlide
        sectionNum="05"
        sectionLabel="COLLABORATION &amp; DEVIS"
        watermark="05 / CONTACT"
        headline={
          <>
            Donnons vie à votre vision <br />
            <span className="font-light italic bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] bg-clip-text text-transparent">
              dès aujourd&apos;hui.
            </span>
          </>
        }
        subtitle="Remplissez notre formulaire de cadrage rapide ou joignez-nous directement par téléphone pour échanger avec notre direction technique."
        accentColor="#10b981"
        glowPosition="right"
      />

      {/* ======================================================== */}
      {/* 2. CINEMATIC CONTENT ARRIVAL (Direct Channels & Form)    */}
      {/* ======================================================== */}
      <div className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-12 xl:px-16 max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Call & Agency Contacts */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Direct Call Card */}
            <div className="relative rounded-[32px] bg-gradient-to-br from-emerald-50 via-white to-teal-50/50 border border-emerald-200/90 p-6 sm:p-8 shadow-[0_20px_50px_rgba(16,185,129,0.12)] overflow-hidden group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                  <IconPhone className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
                    LIGNE DIRECTE D&apos;ASSISTANCE
                  </span>
                  <span className="font-heading text-lg font-bold text-[#0f172a]">
                    Appel téléphonique direct
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] mb-6 leading-relaxed">
                Besoin d&apos;une réponse immédiate ou d&apos;un conseil technique urgent ? Appelez notre bureau directement.
              </p>

              <a
                href="tel:620121674"
                className="w-full inline-flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-base sm:text-lg shadow-[0_10px_30px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                <IconPhone className="w-5 h-5" />
                <span>620 12 16 74</span>
              </a>

              <span className="text-[11px] text-[#64748b] text-center block mt-2.5 font-mono">
                Disponible du lundi au samedi de 8h à 19h
              </span>
            </div>

            {/* WhatsApp Direct Card */}
            <div className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <IconWhatsapp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] block font-semibold">
                    WHATSAPP DIRECT
                  </span>
                  <span className="font-heading text-base font-bold text-[#0f172a]">
                    +237 641 753 99
                  </span>
                </div>
              </div>

              <a
                href="https://wa.me/23764175399"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-black font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Discuter
              </a>
            </div>

            {/* Facebook Card */}
            <div className="rounded-[28px] bg-white border border-slate-200/90 p-6 sm:p-7 shadow-[0_8px_30px_rgba(15,23,42,0.04)] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                  <IconFacebook className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#64748b] block font-semibold">
                    COMMUNAUTÉ FACEBOOK
                  </span>
                  <span className="font-heading text-base font-bold text-[#0f172a]">
                    Skynet Digital Official
                  </span>
                </div>
              </div>

              <a
                href="https://facebook.com/skynetdigital.isroot.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-xs shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Rejoindre
              </a>
            </div>

            {/* Offices info */}
            <div className="rounded-[28px] bg-slate-50 border border-slate-200/80 p-6 flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#64748b] uppercase">
                BUREAUX &amp; PRÉSENCE INTERNATIONALE
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-[#0f172a] block">Douala, Cameroun</span>
                  <span className="text-[#64748b]">Hub Afrique Centrale</span>
                </div>
                <div>
                  <span className="font-bold text-[#0f172a] block">Paris, France</span>
                  <span className="text-[#64748b]">Bureau Europe</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Project Brief Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-white border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_60px_rgba(15,23,42,0.08)] relative">
              
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center border border-emerald-200">
                    <IconCheck className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-[#0f172a]">
                    Demande transmise avec succès !
                  </h3>
                  <p className="text-sm text-[#475569] max-w-md">
                    Merci {formData.name || "de votre confiance"}. Notre directeur de clientèle étudie votre projet et vous recontactera sous 24h ouvrées.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-[#0f172a] transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative">
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-[#0f172a] mb-1">
                      Détaillez votre projet
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748b]">
                      Recevez une proposition budgétaire et technique personnalisée sous 24h.
                    </p>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-bold text-[#0f172a]">
                        Votre nom ou entreprise *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Entreprise Horizon SARL"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#b13257] focus:ring-1 focus:ring-[#b13257]"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-bold text-[#0f172a]">
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Ex: 620 12 16 74"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#b13257] focus:ring-1 focus:ring-[#b13257]"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-[#0f172a]">
                      Adresse email professionnelle *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contact@votre-entreprise.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#b13257] focus:ring-1 focus:ring-[#b13257]"
                    />
                  </div>

                  {/* Service selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#0f172a]">
                      Pôle d&apos;expertise concerné *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {servicesList.map((srv) => (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => setFormData({ ...formData, service: srv })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                            formData.service === srv
                              ? "bg-[#0f172a] text-white shadow-sm border-transparent"
                              : "bg-slate-100 text-[#475569] hover:text-[#0f172a] border border-slate-200"
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget selector */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-mono font-bold text-[#0f172a]">
                      Fourchette budgétaire estimée
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetList.map((bg) => (
                        <button
                          type="button"
                          key={bg}
                          onClick={() => setFormData({ ...formData, budget: bg })}
                          className={`p-2.5 rounded-xl text-[11px] font-medium text-center transition-all cursor-pointer ${
                            formData.budget === bg
                              ? "bg-[#0f172a] text-white font-bold shadow-sm"
                              : "bg-slate-100 text-[#475569] hover:text-[#0f172a] border border-slate-200"
                          }`}
                        >
                          {bg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono font-bold text-[#0f172a]">
                      Décrivez brièvement votre besoin ou vos objectifs
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Objectif du projet, délais souhaités, particularités..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-[#0f172a] placeholder-slate-400 focus:outline-none focus:border-[#b13257] focus:ring-1 focus:ring-[#b13257] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-[1.01] active:scale-98 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Transmission en cours..." : "Transmettre ma demande de cadrage"}</span>
                    <IconArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
