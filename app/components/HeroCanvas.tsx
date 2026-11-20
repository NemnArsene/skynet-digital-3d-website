"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { HeroScrollContext } from "./HeroScrollContext";

interface HeroCanvasProps {
  frames: string[];
  children?: React.ReactNode;
}

export default function HeroCanvas({ frames, children }: HeroCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animation state in refs for maximum performance without triggering React re-renders in RAF
  const currentFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const isLoadedMapRef = useRef<Map<number, boolean>>(new Map());
  const lastDrawnFrameRef = useRef<number>(-1);

  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const totalFrames = Math.max(1, frames.length);

  // Draw a specific frame onto the canvas with cover sizing and high-DPR sharpness
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(totalFrames - 1, Math.round(frameIndex)));
    let imgToDraw = imageCacheRef.current.get(clampedIndex);

    // If target frame isn't loaded yet, find the closest available loaded frame to prevent flicker
    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) {
      let closestDist = Infinity;
      let closestImg: HTMLImageElement | null = null;
      for (const [idx, cachedImg] of imageCacheRef.current.entries()) {
        if (cachedImg && cachedImg.complete && cachedImg.naturalWidth > 0) {
          const dist = Math.abs(idx - clampedIndex);
          if (dist < closestDist) {
            closestDist = dist;
            closestImg = cachedImg;
          }
        }
      }
      imgToDraw = closestImg || imageCacheRef.current.get(0);
    }

    if (!imgToDraw || !imgToDraw.complete || imgToDraw.naturalWidth === 0) return;

    const width = canvas.width;
    const height = canvas.height;

    if (width === 0 || height === 0) return;

    // Cover fit: calculate dimensions to cover canvas while preserving aspect ratio
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;
    const scale = Math.max(width / imgWidth, height / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;
    const offsetX = (width - drawWidth) / 2;
    const offsetY = (height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(imgToDraw, offsetX, offsetY, drawWidth, drawHeight);

    lastDrawnFrameRef.current = clampedIndex;
  }, [totalFrames]);

  // Resize canvas to match container dimensions scaled by DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

    const clientW = rect.width || window.innerWidth;
    const clientH = rect.height || window.innerHeight;

    const targetWidth = Math.round(clientW * dpr);
    const targetHeight = Math.round(clientH * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Immediately redraw with current frame
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Load an image with off-thread decoding when available and store in cache
  const loadImage = useCallback((index: number): Promise<HTMLImageElement> => {
    if (imageCacheRef.current.has(index)) {
      return Promise.resolve(imageCacheRef.current.get(index)!);
    }

    return new Promise((resolve) => {
      const img = new Image();
      img.src = frames[index];

      const onDone = () => {
        imageCacheRef.current.set(index, img);
        isLoadedMapRef.current.set(index, true);
        if (index === 0) {
          setIsFirstFrameLoaded(true);
          drawFrame(0);
        }
        if (Math.round(currentFrameRef.current) === index) {
          drawFrame(index);
        }
        resolve(img);
      };

      img.onload = onDone;
      img.onerror = () => resolve(img);

      if ("decode" in img) {
        img.decode().then(onDone).catch(() => {
          // onload fallback will trigger
        });
      }
    });
  }, [frames, drawFrame]);

  // Progressive preloader: priority for initial frames, then rapid chunked preloading
  useEffect(() => {
    if (frames.length === 0) return;

    let isCancelled = false;

    // Phase 1: Load first frame immediately
    loadImage(0).then(() => {
      if (isCancelled) return;
      resizeCanvas();
      drawFrame(0);

      // Phase 2: Load next immediate batch (frames 1 to 15)
      const initialBatch = Math.min(15, totalFrames);
      const batchPromises: Promise<HTMLImageElement>[] = [];
      for (let i = 1; i < initialBatch; i++) {
        batchPromises.push(loadImage(i));
      }

      Promise.allSettled(batchPromises).then(() => {
        if (isCancelled) return;

        // Phase 3: Rapid background preloading of remaining frames
        let currentIndex = initialBatch;
        const chunkSize = 20;

        const loadNextChunk = () => {
          if (isCancelled || currentIndex >= totalFrames) return;

          const chunkPromises: Promise<HTMLImageElement>[] = [];
          const end = Math.min(currentIndex + chunkSize, totalFrames);
          for (let i = currentIndex; i < end; i++) {
            chunkPromises.push(loadImage(i));
          }

          currentIndex = end;

          Promise.allSettled(chunkPromises).then(() => {
            if (!isCancelled && currentIndex < totalFrames) {
              setTimeout(loadNextChunk, 8);
            }
          });
        };

        loadNextChunk();
      });
    });

    return () => {
      isCancelled = true;
    };
  }, [frames, totalFrames, loadImage, resizeCanvas, drawFrame]);

  // ResizeObserver & window resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);

    window.addEventListener("resize", resizeCanvas, { passive: true });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [resizeCanvas]);

  // Handle scroll progress and update target frame
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;

      if (scrollableDistance <= 0) {
        targetFrameRef.current = 0;
        setScrollProgress(0);
        return;
      }

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setScrollProgress(progress);

      if (prefersReducedMotion) {
        targetFrameRef.current = 0;
        return;
      }

      const newTarget = progress * (totalFrames - 1);
      targetFrameRef.current = newTarget;

      // On-demand priority preloading for immediate frames around current scroll position
      const targetIdx = Math.round(newTarget);
      loadImage(targetIdx);
      for (let i = 1; i <= 6; i++) {
        if (targetIdx + i < totalFrames) loadImage(targetIdx + i);
        if (targetIdx - i >= 0) loadImage(targetIdx - i);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalFrames]);

  // Persistent requestAnimationFrame rendering loop with smooth lerp interpolation
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let isRunning = true;

    const renderLoop = () => {
      if (!isRunning) return;

      if (prefersReducedMotion) {
        drawFrame(0);
        return;
      }

      const current = currentFrameRef.current;
      const target = targetFrameRef.current;
      const diff = target - current;

      // Smooth easing interpolation (lerp) toward target frame
      if (Math.abs(diff) > 0.002) {
        const easeFactor = 0.16; // Responsive and ultra-smooth interpolation speed
        currentFrameRef.current += diff * easeFactor;
        drawFrame(currentFrameRef.current);
      } else if (current !== target) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isRunning = false;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawFrame]);

  return (
    <HeroScrollContext.Provider
      value={{
        scrollProgress,
        frameIndex: Math.round(scrollProgress * (totalFrames - 1)),
        totalFrames,
      }}
    >
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ height: "450vh" }} // 450vh for ultra-smooth 3-phase hero scroll
      >
        {/* Pinned Fixed Viewport Window - Always stays locked to screen with fixed inset-0 */}
        <div className="fixed inset-0 w-full h-screen h-[100dvh] overflow-hidden flex flex-col justify-between isolate z-10">

          {/* Full-screen HTML5 Canvas Background */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 block"
          />

          {/* Ambient Lighting & Luxury Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(120,55,126,0.12),transparent_70%)] pointer-events-none z-[1]" />

          {/* Fallback Poster (shown only while first frame is loading) */}
          {!isFirstFrameLoaded && (
            <div
              className="absolute inset-0 bg-[#07060b] transition-opacity duration-700 pointer-events-none z-[2]"
              style={{ opacity: isFirstFrameLoaded ? 0 : 1 }}
            />
          )}

          {/* Foreground Hero UI Content */}
          <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-auto">
            {children}
          </div>

          {/* Subtle Scroll Progress Indicator (Desktop & Tablette uniquement pour ne pas masquer le menu mobile) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/60 text-[10px] font-mono tracking-widest uppercase transition-opacity duration-500"
            style={{ opacity: scrollProgress > 0.98 ? 0 : 0.85 }}
          >
            <span>DÉFILEZ POUR EXPLORER</span>
            <div className="w-16 h-1 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#b13257] via-[#78377e] to-[#3341ab] transition-all duration-100"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
            <span className="tabular-nums font-semibold text-white/80">{Math.round(scrollProgress * 100)}%</span>
          </div>

        </div>
      </div>
    </HeroScrollContext.Provider>
  );
}
