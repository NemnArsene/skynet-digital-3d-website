"use client";

import React, { useState, useEffect, useRef } from "react";

interface SiteLoaderProps {
  onLoaded?: () => void;
}

export default function SiteLoader({ onLoaded }: SiteLoaderProps) {
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Timeout de sécurité adapté à la durée complète de la vidéo 4K (~4.5s)
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsDone(true);
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("skynet:loaded"));
        }
        if (onLoaded) onLoaded();
      }, 500);
    }, 4500);

    return () => {
      clearTimeout(timer);
    };
  }, [onLoaded]);

  // Synchronisation fidèle de la barre de progression sur la lecture réelle de la vidéo
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.duration && video.duration > 0) {
      const currentPct = Math.min(100, Math.round((video.currentTime / video.duration) * 100));
      setProgress(currentPct);
    }
  };

  const handleVideoEnded = () => {
    setProgress(100);
    setTimeout(() => {
      setIsDone(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("skynet:loaded"));
      }
      if (onLoaded) onLoaded();
    }, 450);
  };

  const handleSkip = () => {
    setProgress(100);
    setIsDone(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("skynet:loaded"));
    }
    if (onLoaded) onLoaded();
  };

  if (isDone) return null;

  return (
    <div
      role="status"
      aria-label="Chargement plein écran 4K Skynet Digital"
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-700 isolate ${
        progress >= 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Vidéo 4K (3840x2160) Plein Écran */}
      <video
        ref={videoRef}
        src="/frames/laoding/Animated_letter_S_logo_bouncing_4k.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Vignette d'ambiance cinématique très subtile */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-10" />

      {/* Bouton Passer en haut à droite */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 px-4 py-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/80 hover:text-white border border-white/20 text-xs font-mono tracking-widest uppercase transition-all duration-300 z-20 shadow-lg"
      >
        Passer l&apos;intro →
      </button>

      {/* Barre de progression synchronisée sur la vidéo & Signature en bas */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2.5 w-72 text-center pointer-events-none">
        <div className="w-full h-1 rounded-full bg-white/20 backdrop-blur-md overflow-hidden shadow-sm">
          <div
            className="h-full bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] transition-all duration-100 ease-linear rounded-full shadow-[0_0_12px_#b13257]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between w-full text-[10px] font-mono tracking-widest text-white/70 uppercase">
          <span>SKYNET DIGITAL · 4K</span>
          <span className="font-bold tabular-nums text-white">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
