import { getHeroFrames } from "./lib/getHeroFrames";
import HeroSection from "./components/HeroSection";
import SiteLoader from "./components/SiteLoader";

export default function Home() {
  const frames = getHeroFrames();

  return (
    <main className="min-h-screen bg-[#07060b] text-[#f1f3f9] relative">
      <SiteLoader />
      <HeroSection frames={frames} />
    </main>
  );
}
