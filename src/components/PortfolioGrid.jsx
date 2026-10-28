import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Play, Clock, Eye, Sparkle } from '@phosphor-icons/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const LONG_FORM_PROJECTS = [
  {
    id: 1,
    title: 'Qoves Studio Style Long-Form Content',
    category: 'Educational / Long-Form',
    runtime: '07:48',
    views: 'Studio Quality',
    description: 'A detailed asset tailored for educational and studio-style long-form video editing production.',
    videoId: 'h0sZh_deEFg',
    thumbnailUrl: 'https://img.youtube.com/vi/h0sZh_deEFg/hqdefault.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/h0sZh_deEFg?rel=0&modestbranding=1&playsinline=1',
    watchLink: 'https://youtu.be/h0sZh_deEFg',
    tags: ['Educational', 'Long-Form', 'Studio'],
    featured: true,
  },
  {
    id: 2,
    title: 'Documentary Pin Board',
    category: 'Documentary / Production',
    runtime: '08:45',
    views: 'Narrative',
    description: 'A visual organization framework designed for structuring narrative elements in a documentary format.',
    videoId: 'A2-hdQWveUc',
    thumbnailUrl: 'https://img.youtube.com/vi/A2-hdQWveUc/hqdefault.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/A2-hdQWveUc?rel=0&modestbranding=1&playsinline=1',
    watchLink: 'https://youtu.be/A2-hdQWveUc',
    tags: ['Documentary', 'Storytelling', 'Production'],
    featured: false,
  },
  {
    id: 3,
    title: 'ON MY EX',
    category: 'Music / Lyric Visual',
    runtime: '03:39',
    views: 'Lyric Visual',
    description: 'A hand-drawn lyric visual set to Juice WRLD, blending illustration with rhythm-synced typography and motion.',
    videoId: 'teObhdsRsDg',
    thumbnailUrl: 'https://img.youtube.com/vi/teObhdsRsDg/hqdefault.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/teObhdsRsDg?rel=0&modestbranding=1&playsinline=1',
    watchLink: 'https://youtu.be/teObhdsRsDg',
    tags: ['Music', 'Lyric Visual', 'Illustration'],
    featured: false,
  },
  {
    id: 4,
    title: 'Top 10 Reptiles and Their Alternatives',
    category: 'Nature / Informational',
    runtime: '19:54',
    views: 'Informational',
    description: 'A structured ranking list detailing prominent reptile types alongside practical alternative suggestions.',
    videoId: 'Guokxi7D7xM',
    thumbnailUrl: 'https://img.youtube.com/vi/Guokxi7D7xM/hqdefault.jpg',
    videoUrl: 'https://www.youtube-nocookie.com/embed/Guokxi7D7xM?rel=0&modestbranding=1&playsinline=1',
    watchLink: 'https://youtu.be/Guokxi7D7xM',
    tags: ['Nature', 'Ranking', 'Informational'],
    featured: false,
  },
];

export default function PortfolioGrid() {
  const reduce = useReducedMotion();
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <section
      id="work"
      className="section-spacing"
      style={{
        position: 'relative',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
      }}
      aria-label="Selected Long-Form Work"
    >
      <div className="site-container">
        {/* Section Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginBottom: '3.5rem',
          }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkle size={16} color="#9ca3af" weight="fill" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: '#9ca3af',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              YouTube & Long-Form Productions
            </span>
          </div>

          <h2
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Selected YouTube Work
          </h2>
          <p
            style={{
              color: 'var(--color-text-secondary)',
              maxWidth: '560px',
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            Long-form edits crafted for maximum retention, narrative flow, and cinematic visual impact.
          </p>
        </motion.div>

        {/* 16:9 Horizontal Video Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 540px), 1fr))',
            gap: '2rem',
          }}
        >
          {LONG_FORM_PROJECTS.map((project, index) => {
            const isPlaying = playingVideoId === project.id;

            return (
              <motion.article
                key={project.id}
                initial={reduce ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                }}
                onMouseEnter={canHover ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                } : undefined}
                onMouseLeave={canHover ? (e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.transform = 'translateY(0)';
                } : undefined}
              >
                {/* 16:9 Widescreen Video Embed / Player Container */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    background: '#0a0a0a',
                    overflow: 'hidden',
                  }}
                >
                  {(!isMobile || playingVideoId === project.id) ? (
                    <iframe
                      src={project.videoUrl}
                      title={project.title}
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
                  ) : (
                    <button
                      onClick={() => setPlayingVideoId(project.id)}
                      aria-label={`Play ${project.title}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#0a0a0a',
                        cursor: 'pointer',
                        padding: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* Video Thumbnail Image */}
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        loading="lazy"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                        }}
                      />

                      {/* Subtle dark tint overlay */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0, 0, 0, 0.4)',
                        }}
                      />

                      {/* Center Play Button Icon */}
                      <div
                        style={{
                          position: 'relative',
                          zIndex: 2,
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.95)',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Play size={24} weight="fill" color="#000000" style={{ marginLeft: '2px' }} />
                      </div>
                    </button>
                  )}

                  {/* Runtime & Views Badge (Top Right) */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      zIndex: 10,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        color: '#ffffff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Clock size={13} /> {project.runtime}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '6px',
                        color: '#9ca3af',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Eye size={13} /> {project.views}
                    </span>
                  </div>
                </div>

                {/* Card Content Information */}
                <div
                  style={{
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    flex: 1,
                    gap: '1rem',
                  }}
                >
                  <div>
                    {/* Category */}
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#9ca3af',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        display: 'block',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        lineHeight: 1.3,
                        color: '#ffffff',
                        marginBottom: '0.75rem',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.9rem',
                        lineHeight: 1.55,
                        color: '#9ca3af',
                        marginBottom: '1rem',
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Footer: Tags + Drive Link */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: '0.7rem',
                            fontFamily: 'var(--font-mono)',
                            padding: '0.2rem 0.55rem',
                            borderRadius: '4px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: '#d1d5db',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* External Link */}
                    <a
                      href={project.watchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        color: '#ffffff',
                        textDecoration: 'none',
                        padding: '0.4rem 0.8rem',
                        borderRadius: '9999px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        transition: 'all 200ms ease',
                      }}
                      onMouseEnter={canHover ? (e) => {
                        e.currentTarget.style.background = '#ffffff';
                        e.currentTarget.style.color = '#000000';
                      } : undefined}
                      onMouseLeave={canHover ? (e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.color = '#ffffff';
                      } : undefined}
                      aria-label={`Watch ${project.title}`}
                    >
                      Watch <ArrowUpRight size={14} weight="bold" />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
