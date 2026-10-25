import { motion, useReducedMotion } from 'motion/react';

const SHOWREEL_EMBED_URL = 'https://drive.google.com/file/d/1aTv78k_an1ZiQ5Z0YzTcff0N72Y2lSdc/preview';

export default function Showreel() {
  const reduce = useReducedMotion();

  return (
    <section
      id="showreel"
      className="section-spacing"
      style={{ position: 'relative' }}
      aria-label="Showreel"
    >
      <div className="site-container">
        {/* Section header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3rem' }}
        >
          <h2
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}
          >
            The Showreel
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '50ch' }}>
            A curated selection of my best work across short-form, motion graphics,
            and narrative storytelling.
          </p>
        </motion.div>

        {/* Video embed */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-card)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 255, 255, 0.03)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
            <iframe
              src={SHOWREEL_EMBED_URL}
              title="Iris Showreel — Video Editing and Motion Design Portfolio"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
