import { motion, useReducedMotion } from 'motion/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const TOOLS = [
  {
    name: 'Premiere Pro',
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" style={{ borderRadius: '6px' }}>
        <rect width="32" height="32" rx="7" fill="#00005b" />
        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="#9999ff" strokeWidth="1.5" />
        <text x="16" y="21.5" fill="#9999ff" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="-0.5px">Pr</text>
      </svg>
    ),
  },
  {
    name: 'After Effects',
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" style={{ borderRadius: '6px' }}>
        <rect width="32" height="32" rx="7" fill="#00005b" />
        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="#d291ff" strokeWidth="1.5" />
        <text x="16" y="21.5" fill="#d291ff" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="-0.5px">Ae</text>
      </svg>
    ),
  },
  {
    name: 'DaVinci Resolve',
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
        <path d="M16 4C19.5 4 22 6.5 22 10C22 13 19.5 15.5 16 15.5C12.5 15.5 10 13 10 10C10 6.5 12.5 4 16 4Z" fill="#ff4d4f" />
        <path d="M24 16C26.5 18 27.5 21 26 24C24.5 27 21 27.5 18.5 25.5C16 23.5 16 20 18 17.5C19.5 16 22 15 24 16Z" fill="#1890ff" />
        <path d="M8 16C10 15 12.5 16 14 17.5C16 20 16 23.5 13.5 25.5C11 27.5 7.5 27 6 24C4.5 21 5.5 18 8 16Z" fill="#fa8c16" />
        <circle cx="16" cy="16" r="3.5" fill="#ffffff" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: 'CapCut',
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none">
        <path d="M4 9h11l13 7h-11L4 9z" fill="#ffffff" />
        <path d="M4 23h11l13-7h-11L4 23z" fill="#ffffff" opacity="0.9" />
      </svg>
    ),
  },
  {
    name: 'Photoshop',
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" style={{ borderRadius: '6px' }}>
        <rect width="32" height="32" rx="7" fill="#001e36" />
        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="#31a8ff" strokeWidth="1.5" />
        <text x="16" y="21.5" fill="#31a8ff" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="-0.5px">Ps</text>
      </svg>
    ),
  },
  {
    name: 'Illustrator',
    icon: (
      <svg viewBox="0 0 32 32" width="30" height="30" fill="none" style={{ borderRadius: '6px' }}>
        <rect width="32" height="32" rx="7" fill="#330000" />
        <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="6.25" stroke="#ff9a00" strokeWidth="1.5" />
        <text x="16" y="21.5" fill="#ff9a00" fontSize="13.5" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif" textAnchor="middle" letterSpacing="-0.5px">Ai</text>
      </svg>
    ),
  },
  {
    name: 'Figma',
    icon: (
      <svg viewBox="0 0 38 57" width="20" height="30" fill="none">
        <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
  },
  {
    name: 'Cinema 4D',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#ffffff" opacity="0.9">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.422 0 9.818 4.396 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818-5.422 0-9.818-4.396-9.818-9.818 0-5.422 4.396-9.818 9.818-9.818zm.29 4.364c-3.15 0-5.636 2.486-5.636 5.636s2.486 5.636 5.636 5.636c2.25 0 4.195-1.309 5.09-3.218l-1.89-.91c-.545 1.164-1.745 1.946-3.2 1.946-1.927 0-3.454-1.527-3.454-3.454s1.527-3.455 3.454-3.455c1.455 0 2.655.782 3.2 1.946l1.89-.91c-.895-1.909-2.84-3.218-5.09-3.218z"/>
      </svg>
    ),
  },
];

const SKILLS = [
  'Video Editing',
  'Motion Graphics',
  'Color Grading',
  'Sound Design',
  'Visual Effects',
  'Typography',
  'Compositing',
  'Storyboarding',
];

export default function SkillsTools() {
  const reduce = useReducedMotion();
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  return (
    <section
      id="skills"
      className="section-spacing"
      style={{
        position: 'relative',
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
      aria-label="Skills and tools"
    >
      <div className="site-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem' }}>
          {/* Skills column */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
              }}
            >
              What I Do
            </h2>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {SKILLS.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-card)',
                    fontSize: '0.875rem',
                    color: 'var(--color-text-secondary)',
                    transition: 'all 200ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={canHover ? (e) => {
                    e.currentTarget.style.borderColor = 'var(--color-text-muted)';
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  } : undefined}
                  onMouseLeave={canHover ? (e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-text-secondary)';
                  } : undefined}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Tools column */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '2rem',
              }}
            >
              Tools I Use
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '0.75rem',
              }}
            >
              {TOOLS.map((tool, index) => (
                <motion.div
                  key={tool.name}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    padding: '1.25rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-bg-card)',
                    transition: 'all 200ms ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={canHover ? (e) => {
                    e.currentTarget.style.borderColor = 'var(--color-text-muted)';
                    e.currentTarget.style.background = 'var(--color-bg-card-hover)';
                  } : undefined}
                  onMouseLeave={canHover ? (e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.background = 'var(--color-bg-card)';
                  } : undefined}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      transition: 'transform 200ms ease',
                    }}
                  >
                    {tool.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--color-text-secondary)',
                      fontFamily: 'var(--font-mono)',
                      textAlign: 'center',
                    }}
                  >
                    {tool.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
