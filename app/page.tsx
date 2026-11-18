import { getHeroFrames } from "./lib/getHeroFrames";
import HeroSection from "./components/HeroSection";
import SiteLoader from "./components/SiteLoader";
import ServicesSection from "./components/ServicesSection";
import PortfolioSection from "./components/PortfolioSection";
import TrainingSection from "./components/TrainingSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const frames = getHeroFrames();

  return (
    <main className="min-h-screen bg-[#07060b] text-[#f1f3f9] relative">
      <SiteLoader />
      <HeroSection frames={frames} />
      <ServicesSection />
      <PortfolioSection />
      <TrainingSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
