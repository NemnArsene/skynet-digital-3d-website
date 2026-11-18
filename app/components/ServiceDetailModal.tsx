"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconClose, IconCheck, IconArrowRight } from "./Icons";

export interface ServiceItem {
  id: number;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  features: string[];
  badgeColor: string;
  position: { left: string; top: string };
  iconName: string;
}

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequestQuote: (serviceTitle: string) => void;
}

export default function ServiceDetailModal({
  service,
  onClose,
  onRequestQuote,
}: ServiceDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (service) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [service, onClose]);

  if (!service || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 pointer-events-auto cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-3xl bg-[#0f121d] border border-white/20 p-6 sm:p-8 text-white shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col gap-6 animate-in zoom-in-95 duration-200 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#b13257]/30 via-[#78377e]/20 to-transparent blur-2xl pointer-events-none rounded-t-3xl" />

        {/* Header */}
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#b13257] to-[#78377e] text-white shadow-md">
              SERVICE {service.number}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/60">
              {service.category}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
            aria-label="Fermer la fenêtre"
          >
            <IconClose className="w-4 h-4" />
          </button>
        </div>

        {/* Title & Description */}
        <div className="relative flex flex-col gap-3">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            {service.title}
          </h3>
          <p className="text-sm sm:text-base text-white/80 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Features / Capabilities */}
        <div className="relative flex flex-col gap-3 pt-2 border-t border-white/10">
          <span className="text-xs font-mono uppercase tracking-wider text-white/50">
            Ce que comprend notre expertise :
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/90"
              >
                <div className="w-5 h-5 rounded-md bg-[#b13257]/30 text-[#ff6b35] flex items-center justify-center shrink-0">
                  <IconCheck className="w-3 h-3 text-white" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-5 py-2.5 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/15 border border-white/10 transition-all cursor-pointer active:scale-95"
          >
            Fermer
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRequestQuote(service.title);
              onClose();
            }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ff6b35] via-[#b13257] to-[#78377e] text-white text-xs sm:text-sm font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-transform cursor-pointer"
          >
            <span>Demander un devis pour ce service</span>
            <IconArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

