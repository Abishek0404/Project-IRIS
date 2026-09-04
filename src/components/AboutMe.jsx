import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { CountingNumber } from './ui/CountingNumber';
import { TiltWrapper } from './ui/TiltWrapper';

export default function AboutMe() {
  const reduce = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="about"
      className="section-spacing"
      style={{ position: 'relative' }}
      aria-label="About Iris"
    >
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: isMobile ? '2.5rem' : '4rem', alignItems: 'center' }}>
          {/* Image side */}
          <TiltWrapper
            initial={reduce ? false : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', width: '100%', maxWidth: '440px', margin: '0 auto' }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                border: '1px solid var(--color-border)',
                background: 'linear-gradient(145deg, #161616 0%, #0a0a0a 100%)',
              }}
            >
              {/* Subtle ambient lighting */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `
                    radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%),
                    radial-gradient(ellipse at 70% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)
                  `,
                }}
              />

              <img
                src="/phm.jpg"
                alt="Iris - Video Editor"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  zIndex: 1,
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              style={{
                position: 'absolute',
                bottom: '-1rem',
                right: '-1rem',
                padding: '0.85rem 1.4rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-bg-elevated)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                }}
                className="tabular-nums"
              >
                50+
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                Projects delivered
              </div>
            </div>
          </TiltWrapper>

          {/* Text side */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '1.75rem',
              }}
            >
              About Me
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                maxWidth: '60ch',
              }}
            >
              <p>
                I'm Iris, a video editor and motion designer who turns raw footage
                into stories people remember. My work spans short-form content for social
                platforms, polished motion graphics, and engaging YouTube productions.
              </p>
              <p>
                I believe great editing is invisible. The right cut, the right timing,
                the right sound design — they guide the viewer without them ever noticing.
                That attention to invisible detail is what separates good edits from
                great ones.
              </p>
              <p>
                Whether it's a 15-second reel or a 20-minute documentary, I bring
                the same level of craft and intentionality. Every frame earns its place.
              </p>
            </div>

            {/* Quick stats row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', marginTop: '2.5rem' }}>
              {[
                { label: 'Years Editing', num: 3, suffix: '+' },
                { label: 'Clients Served', num: 20, suffix: '+' },
                { label: 'Content Views', num: 1, suffix: 'M+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color: 'var(--color-text-primary)',
                    }}
                    className="tabular-nums"
                  >
                    <CountingNumber value={stat.num} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-text-muted)',
                      marginTop: '0.25rem',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
