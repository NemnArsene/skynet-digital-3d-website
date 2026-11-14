"use client";

import React, { createContext, useContext } from "react";

export interface HeroScrollContextType {
  scrollProgress: number;
  frameIndex: number;
  totalFrames: number;
}

export const HeroScrollContext = createContext<HeroScrollContextType>({
  scrollProgress: 0,
  frameIndex: 0,
  totalFrames: 240,
});

export const useHeroScroll = () => useContext(HeroScrollContext);

