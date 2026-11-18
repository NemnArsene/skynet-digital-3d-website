import { getHeroFrames } from "./lib/getHeroFrames";
import HeroSection from "./components/HeroSection";
import SiteLoader from "./components/SiteLoader";

export default function Home() {
  const frames = getHeroFrames();

  return (
    <main className="w-full bg-[#07060b] text-[#f1f3f9] relative overflow-x-hidden selection:bg-[#0d9488]/30 selection:text-white">
      <SiteLoader />
      <HeroSection frames={frames} />
    </main>
  );
}
