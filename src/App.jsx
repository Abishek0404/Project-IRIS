import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import { Hero } from './components/ui/hero-1';
import CardFanCarousel from './components/CardFanCarousel';
// import Showreel from './components/Showreel'; // Temporarily hidden — no showreel content yet
import PortfolioGrid from './components/PortfolioGrid';
import Testimonials from './components/Testimonials';
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
          ctaLabel="View Longform Works"
          ctaHref="#work"
          secondaryCtaLabel="Explore Reels"
          secondaryCtaHref="#reels-fan"
        />
        <CardFanCarousel />
        <PortfolioGrid />
        <Testimonials />
        {/* <Showreel /> */}
        <SkillsTools />
        <AboutMe />
        <Contact />
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
