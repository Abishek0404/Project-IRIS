import { useState, useEffect } from 'react';
import { List, X } from '@phosphor-icons/react';

const NAV_LINKS = [
  { label: 'Reels', href: '#reels-fan' },
  { label: 'Selected Work', href: '#work' },
  { label: 'About', href: '#about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '68px',
        background: scrolled ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
        transition: 'all 300ms ease',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div
        className="site-container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          className="btn-press"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
          }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          IRIS<span style={{ color: '#ffffff' }}>.</span>
        </a>

        {/* Desktop Nav Links */}
        <div style={{ display: 'none' }} className="md-nav-links">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="link-underline"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '-0.01em',
                color: activeSection === link.href.slice(1) ? '#ffffff' : '#9ca3af',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
            >
              {link.label}
            </a>
          ))}

          {/* Unified Single Action: Let's Work */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-press"
            style={{
              padding: '0.55rem 1.35rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: 600,
              fontFamily: 'var(--font-body)',
              background: '#ffffff',
              color: '#000000',
              textDecoration: 'none',
              transition: 'all 200ms ease',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.15)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Let's Work
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="btn-press mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: '#ffffff',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {mobileOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className="mobile-menu"
        style={{
          position: 'absolute',
          top: '68px',
          left: 0,
          right: 0,
          background: 'rgba(5, 5, 5, 0.96)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          maxHeight: mobileOpen ? '320px' : '0px',
          opacity: mobileOpen ? 1 : 0,
          overflow: 'hidden',
          transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="site-container"
          style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 500,
                color: activeSection === link.href.slice(1) ? '#ffffff' : '#9ca3af',
                textDecoration: 'none',
                transition: 'color 200ms ease',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-press"
            style={{
              marginTop: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.9rem',
              fontWeight: 600,
              background: '#ffffff',
              color: '#000000',
              textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Let's Work
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-nav-links {
            display: flex !important;
            align-items: center;
            gap: 2.25rem;
          }
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
        @media (max-width: 767px) {
          .mobile-menu-btn { display: block !important; }
          .mobile-menu { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
