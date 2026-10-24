"use client"

import { ArrowRight, Play } from "lucide-react"
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { InkSpillButton } from './InkSpillButton'

interface HeroProps {
  eyebrow?: string
  title: string
  subtitle: string
  ctaLabel?: string
  ctaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
}

export function Hero({
  eyebrow = "Available for Projects",
  title,
  subtitle,
  ctaLabel = "View Longform Works",
  ctaHref = "#work",
  secondaryCtaLabel = "Let's Talk",
  secondaryCtaHref = "#contact",
}: HeroProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '130px',
        paddingBottom: '80px',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        overflow: 'hidden',
        background: '#000000',
      }}
    >
      {/* Grid Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage: `
            linear-gradient(to right, #2a2a2a 1px, transparent 1px),
            linear-gradient(to bottom, #2a2a2a 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 50%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, #000 50%, transparent 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Radial Glow Arch — full width */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: isMobile ? '-40px' : '-100px',
          width: isMobile ? 'max(600px, 110vw)' : 'max(1400px, 110vw)',
          height: isMobile ? '220px' : '450px',
          transform: 'translateX(-50%)',
          borderRadius: '100%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 55%, transparent 80%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 -20px 60px rgba(255, 255, 255, 0.04)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Refined Eyebrow Badge */}
        {eyebrow && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.45rem 1.1rem',
              marginBottom: '2rem',
              borderRadius: '9999px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: '#22c55e',
                boxShadow: '0 0 8px #22c55e',
                display: 'inline-block',
                animation: 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
              }}
            />
            <span
              style={{
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: '#d1d5db',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </span>
          </div>
        )}

        {/* Title */}
        <h1
          className="gradient-text"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.04em',
            marginBottom: '1.5rem',
            textWrap: 'balance',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            color: '#9ca3af',
            maxWidth: '640px',
            marginBottom: '2.5rem',
            textWrap: 'pretty',
          }}
        >
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            zIndex: 20,
          }}
        >
          {ctaLabel && (
            <InkSpillButton href={ctaHref}>
              {ctaLabel}
            </InkSpillButton>
          )}

          {secondaryCtaLabel && (
            <a
              href={secondaryCtaHref}
              className="btn-press"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.85rem 1.75rem',
                borderRadius: '9999px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontWeight: 500,
                fontSize: '0.95rem',
                textDecoration: 'none',
                backdropFilter: 'blur(10px)',
                transition: 'all 200ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
            >
              {secondaryCtaLabel}
              <ArrowRight size={16} />
            </a>
          )}
        </div>

        {/* Testimonials link in Hero */}
        <div style={{ marginTop: '2rem' }}>
          <a
            href="#testimonials"
            className="btn-press"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              color: '#9ca3af',
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#9ca3af';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
            }}
          >
            <span style={{ color: '#22c55e', fontSize: '0.75rem' }}>★</span>
            <span>Client Reviews</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
            <span style={{ color: '#e5e7eb' }}>Read Testimonials ↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
