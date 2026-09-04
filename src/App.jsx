import Navbar from './components/Navbar';
import { Hero } from './components/ui/hero-1';
import CardFanCarousel from './components/CardFanCarousel';
import Showreel from './components/Showreel';
import PortfolioGrid from './components/PortfolioGrid';
import SkillsTools from './components/SkillsTools';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="dark grain-overlay">
      <Navbar />
      <main>
        <Hero
          title="I craft visuals that tell stories"
          subtitle="Video editor and motion designer specializing in short-form content, motion graphics, and YouTube productions."
          eyebrow="Available for Projects"
          ctaLabel="Watch Showreel"
          ctaHref="#showreel"
          secondaryCtaLabel="Explore Reels"
          secondaryCtaHref="#reels-fan"
        />
        <CardFanCarousel />
        <PortfolioGrid />
        <Showreel />
        <SkillsTools />
        <AboutMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
