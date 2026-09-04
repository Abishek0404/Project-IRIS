import { motion, useReducedMotion } from 'motion/react';
import { Play } from '@phosphor-icons/react';

export default function Hero() {
  const reduce = useReducedMotion();

  const handleShowreel = (e) => {
    e.preventDefault();
    const target = document.querySelector('#showreel');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContact = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--color-text-muted) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-text-muted) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 site-container w-full pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Name tag */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-[var(--radius-pill)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] mb-8"
          >
            <span
              className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse"
              aria-hidden="true"
            />
            <span
              className="text-xs text-[var(--color-text-secondary)] tracking-wide"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              Available for projects
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-balance mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            I craft visuals that
            <br />
            <span className="text-[var(--color-accent)]">tell stories</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-[50ch] mb-10 text-pretty"
          >
            Video editor and motion designer specializing in short-form content,
            motion graphics, and YouTube productions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#showreel"
              onClick={handleShowreel}
              className="btn-press group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-[var(--radius-pill)] bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_30px_var(--color-accent-glow)]"
            >
              <Play size={18} weight="fill" aria-hidden="true" />
              Watch Showreel
            </a>
            <a
              href="#contact"
              onClick={handleContact}
              className="btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-[var(--radius-pill)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-medium text-sm transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-[10px] text-[var(--color-text-muted)] tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[var(--color-text-muted)] to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
