import { motion, useReducedMotion } from 'motion/react';
import { ScrollReelTestimonials } from './ui/scroll-reel-testimonials';
import { Quotes } from '@phosphor-icons/react';

const TESTIMONIALS = [
  {
    quote: "I loved the pacing and the transitions. I also like how you followed recent trends",
    author: "Noah FitzGerald",
    role: "Founder of Revelation Goalkeeping",
    image: "/testimonials/avatar-noah.png?v=2",
    alt: "Portrait of Noah FitzGerald",
  },
  {
    quote: "i love it!",
    author: "iLoky",
    role: "Padel Content Creator",
    image: "/testimonials/avatar-iloky.png?v=2",
    alt: "Avatar of iLoky",
  },
  {
    quote: "Its good bro, Fireee",
    author: "Ike",
    role: "YouTube Creator, Memes & Comedy",
    image: "/testimonials/avatar-ike.png?v=2",
    alt: "Avatar of Ike",
  },
  {
    quote: "Yoooo sick",
    author: "Serum",
    role: "Music Artist",
    image: "/testimonials/avatar-serum.png?v=2",
    alt: "Avatar of Serum",
  },
];

export default function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="section-spacing"
      style={{
        position: 'relative',
        background: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Client testimonials"
    >
      <div className="site-container">
        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1.15rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              marginBottom: '1.25rem',
            }}
          >
            <Quotes
              size={14}
              weight="fill"
              style={{ color: '#d1d5db', flexShrink: 0, opacity: 0.85 }}
              aria-hidden="true"
            />
            <span
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: '#d1d5db',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              What Clients Say
            </span>
          </div>

          <h2
            className="gradient-text text-balance"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 5vw, 3.25rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Testimonials
          </h2>

          <p
            className="text-pretty"
            style={{
              color: 'var(--color-text-secondary)',
              maxWidth: '480px',
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            Direct feedback from creators, clients, and collaborators.
          </p>
        </motion.div>

        {/* Scroll reel container */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="flex justify-center"
        >
          <ScrollReelTestimonials testimonials={TESTIMONIALS} />
        </motion.div>
      </div>
    </section>
  );
}
