import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { CaretLeft, CaretRight, Play, X, ArrowUpRight } from '@phosphor-icons/react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const REELS = [
  {
    id: 7,
    title: 'Houston Kold Cinematic Style',
    category: 'Cinematic Vlogs / Travel',
    embedUrl: 'https://www.youtube-nocookie.com/embed/7FnDOOFd5e0?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/7FnDOOFd5e0',
    thumbnailUrl: 'https://img.youtube.com/vi/7FnDOOFd5e0/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #1e293b 0%, #0f172a 50%, #000000 100%)',
    tag: 'Cinematic',
    stats: 'Kolder Style',
  },
  {
    id: 6,
    title: 'Animated Meme Explainer',
    category: 'Comedy / Infotainment',
    embedUrl: 'https://www.youtube-nocookie.com/embed/agdH_Sd8ZKw?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/agdH_Sd8ZKw',
    thumbnailUrl: 'https://img.youtube.com/vi/agdH_Sd8ZKw/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #365314 0%, #1a2e05 50%, #09090b 100%)',
    tag: 'Comedy',
    stats: 'Meme Edit',
  },
  {
    id: 3,
    title: 'Brainrot / FL Studio Music Edit',
    category: 'Music Edit / Brainrot',
    embedUrl: 'https://www.youtube-nocookie.com/embed/YhqQOHeNVpk?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/YhqQOHeNVpk',
    thumbnailUrl: 'https://img.youtube.com/vi/YhqQOHeNVpk/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #18181b 0%, #27272a 50%, #09090b 100%)',
    tag: 'FL Studio',
    stats: 'Music Edit',
  },
  {
    id: 2,
    title: 'Ale Galan Mograph Edit',
    category: 'Motion Graphics / Mograph',
    embedUrl: 'https://www.youtube-nocookie.com/embed/wwkVFDEjNqQ?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/wwkVFDEjNqQ',
    thumbnailUrl: 'https://img.youtube.com/vi/wwkVFDEjNqQ/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #312e81 0%, #1e1b4b 50%, #09090b 100%)',
    tag: 'Mograph',
    stats: 'After Effects',
  },
  {
    id: 1,
    title: "Ozmok's Style Looksmaxing",
    category: 'Fast-Paced Rapidfire Edit',
    embedUrl: 'https://www.youtube-nocookie.com/embed/LwSeXQtJO2Q?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/LwSeXQtJO2Q',
    thumbnailUrl: 'https://img.youtube.com/vi/LwSeXQtJO2Q/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
    tag: 'Rapidfire',
    stats: 'Fast Cuts',
  },
  {
    id: 4,
    title: 'Dynamic Sports Highlights',
    category: 'Sports Media',
    embedUrl: 'https://www.youtube-nocookie.com/embed/odCg0-fXPMc?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/odCg0-fXPMc',
    thumbnailUrl: 'https://img.youtube.com/vi/odCg0-fXPMc/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #0c4a6e 0%, #0f172a 50%, #020617 100%)',
    tag: 'Sports',
    stats: 'Speed Ramps',
  },
  {
    id: 5,
    title: 'Retention-Driven Entertainment',
    category: 'YouTube Mainstream / Entertainment',
    embedUrl: 'https://www.youtube-nocookie.com/embed/yUfMjEh7aLU?rel=0&modestbranding=1&playsinline=1',
    youtubeUrl: 'https://youtube.com/shorts/yUfMjEh7aLU',
    thumbnailUrl: 'https://img.youtube.com/vi/yUfMjEh7aLU/maxresdefault.jpg',
    bg: 'linear-gradient(160deg, #7c2d12 0%, #1c1917 50%, #09090b 100%)',
    tag: 'MrBeast',
    stats: 'Retention',
  },
];

const GDRIVE_PORTFOLIO_URL =
  import.meta.env.VITE_GDRIVE_URL ||
  'https://drive.google.com/drive/folders/1486nKomZ5tX3OFVFuctzvVb8KP0ugs6D?usp=drive_link';

function GoogleDriveIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 87.3 78"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ flexShrink: 0 }}
      aria-hidden="true"
    >
      <path
        d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z"
        fill="#0066da"
      />
      <path
        d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z"
        fill="#00ac47"
      />
      <path
        d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z"
        fill="#ea4335"
      />
      <path
        d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z"
        fill="#00832d"
      />
      <path
        d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z"
        fill="#2684fc"
      />
      <path
        d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z"
        fill="#ffba00"
      />
    </svg>
  );
}

export default function CardFanCarousel() {
  const [activeIndex, setActiveIndex] = useState(3);
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const isMobile = useMediaQuery('(max-width: 768px)');
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

  // Mobile horizontal snap slider ref
  const mobileScrollRef = useRef(null);

  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const { scrollLeft } = mobileScrollRef.current;
    const cardStep = 256; // 240px card + 16px gap
    const newIndex = Math.round(scrollLeft / cardStep);
    if (newIndex >= 0 && newIndex < REELS.length && newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollToMobileIndex = (index) => {
    if (!mobileScrollRef.current) {
      setActiveIndex(index);
      return;
    }
    const cardStep = 256;
    mobileScrollRef.current.scrollTo({
      left: index * cardStep,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const handlePrev = () => {
    if (isMobile) {
      const target = activeIndex > 0 ? activeIndex - 1 : REELS.length - 1;
      scrollToMobileIndex(target);
    } else {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : REELS.length - 1));
    }
  };

  const handleNext = () => {
    if (isMobile) {
      const target = activeIndex < REELS.length - 1 ? activeIndex + 1 : 0;
      scrollToMobileIndex(target);
    } else {
      setActiveIndex((prev) => (prev < REELS.length - 1 ? prev + 1 : 0));
    }
  };

  // Touch swipe for Desktop (if touch device on large screen)
  const touchStartRef = useRef({ x: 0, y: 0 });

  const onTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) handleNext();
      else handlePrev();
    }
  };

  // Desktop 3D layout values
  const cardW = 240;
  const cardH = 400;
  const stageH = 500;
  const xSpread = 125;
  const yPow = 14;
  const zSpread = 40;
  const rotStep = 5.5;
  const scaleStep = 0.04;
  const perspectiveVal = '1400px';

  return (
    <section
      id="reels-fan"
      ref={containerRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        background: '#000000',
      }}
      aria-label="Reels Video Fan Carousel"
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="gradient-text"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4.5vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                marginBottom: '0.75rem',
              }}
            >
              Short-Form & Reels
            </h2>
            <p style={{ color: '#9ca3af', maxWidth: '540px', margin: '0 auto', fontSize: '1.05rem', marginBottom: '1.25rem' }}>
              {isMobile ? 'Swipe to browse, tap to watch.' : 'Click any card to bring it to the center, then click to watch.'}
            </p>

            {/* Google Drive Portfolio Button */}
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <a
                href={GDRIVE_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '9999px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 18px rgba(0, 0, 0, 0.35)',
                  transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={canHover ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.35)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                } : undefined}
                onMouseLeave={canHover ? (e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                } : undefined}
                aria-label="View portfolio on Google Drive"
              >
                <GoogleDriveIcon size={19} />
                <span>View Drive Portfolio</span>
                <ArrowUpRight size={14} style={{ opacity: 0.65, marginLeft: '2px' }} weight="bold" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Reels Stage — Mobile Native Snap Slider VS Desktop 3D Fan */}
        {isMobile ? (
          /* Mobile Native Horizontal Snap Slider */
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              padding: '1rem calc(50vw - 120px) 1.5rem calc(50vw - 120px)',
              userSelect: 'none',
              touchAction: 'pan-x',
            }}
          >
            {REELS.map((reel, index) => {
              const isCenter = index === activeIndex;
              return (
                <div
                  key={reel.id}
                  onClick={() => setActiveModalVideo(reel)}
                  style={{
                    flex: '0 0 240px',
                    height: '380px',
                    scrollSnapAlign: 'center',
                    position: 'relative',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    background: reel.bg,
                    border: isCenter
                      ? '2px solid rgba(255, 255, 255, 0.45)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: isCenter
                      ? '0 16px 36px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.08)'
                      : '0 8px 24px rgba(0, 0, 0, 0.6)',
                    willChange: 'transform',
                    transform: isCenter ? 'scale(1)' : 'scale(0.96)',
                    opacity: isCenter ? 1 : 0.75,
                    transition: 'transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 250ms ease, border-color 250ms ease',
                  }}
                >
                  {/* Thumbnail Image */}
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    loading={index <= 1 ? 'eager' : 'lazy'}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0,
                    }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />

                  {/* Darken overlay for text contrast */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.92) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Card Content Layer */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 5,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1.25rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Top Tag & Stats */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '9999px',
                          background: 'rgba(0, 0, 0, 0.75)',
                          color: '#ffffff',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {reel.tag}
                      </span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'rgba(255, 255, 255, 0.75)',
                        }}
                      >
                        {reel.stats}
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div style={{ alignSelf: 'center' }}>
                      <div
                        style={{
                          width: isCenter ? '54px' : '44px',
                          height: isCenter ? '54px' : '44px',
                          borderRadius: '50%',
                          background: isCenter ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.25)',
                          border: isCenter ? 'none' : '1px solid rgba(255, 255, 255, 0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: isCenter ? '0 0 25px rgba(255, 255, 255, 0.3)' : 'none',
                          transition: 'all 200ms ease',
                        }}
                      >
                        <Play
                          size={isCenter ? 22 : 16}
                          weight="fill"
                          color={isCenter ? '#000000' : '#ffffff'}
                          style={{ marginLeft: '2px' }}
                        />
                      </div>
                    </div>

                    {/* Bottom Title */}
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.7rem',
                          color: 'rgba(255, 255, 255, 0.65)',
                          fontFamily: 'var(--font-body)',
                          marginBottom: '0.15rem',
                        }}
                      >
                        {reel.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {reel.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Desktop 3D Fan Carousel Stage */
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={{
              position: 'relative',
              width: '100%',
              height: `${stageH}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              perspective: perspectiveVal,
              userSelect: 'none',
              touchAction: 'pan-y',
            }}
          >
            {REELS.map((reel, index) => {
              const offset = index - activeIndex;
              const absOffset = Math.abs(offset);
              const isCenter = offset === 0;

              const rotateZ = offset * rotStep;
              const translateX = offset * xSpread;
              const translateY = Math.pow(absOffset, 1.8) * yPow;
              const translateZ = -absOffset * zSpread;
              const scale = 1 - absOffset * scaleStep;
              const zIndex = 50 - absOffset * 5;
              const cardOpacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.2);

              return (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, y: 80, rotateZ: 0 }}
                  animate={
                    isInView
                      ? {
                          opacity: cardOpacity,
                          x: translateX,
                          y: translateY,
                          z: translateZ,
                          rotateZ,
                          scale,
                        }
                      : {}
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 26,
                    mass: 0.8,
                  }}
                  whileHover={canHover ? {
                    scale: scale * 1.04,
                    y: translateY - 12,
                    zIndex: 60,
                    opacity: 1,
                    transition: { duration: 0.2 },
                  } : undefined}
                  onClick={() => {
                    if (isCenter) {
                      setActiveModalVideo(reel);
                    } else {
                      setActiveIndex(index);
                    }
                  }}
                  style={{
                    position: 'absolute',
                    width: `${cardW}px`,
                    height: `${cardH}px`,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    zIndex,
                    transformStyle: 'preserve-3d',
                    border: isCenter
                      ? '2px solid rgba(255, 255, 255, 0.45)'
                      : '1px solid rgba(255, 255, 255, 0.12)',
                    boxShadow: isCenter
                      ? '0 25px 50px rgba(0, 0, 0, 0.95), 0 0 35px rgba(255, 255, 255, 0.12)'
                      : '0 15px 35px rgba(0, 0, 0, 0.7)',
                    background: reel.bg,
                  }}
                >
                  {/* Centered Video Thumbnail */}
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    loading="eager"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      zIndex: 0,
                      filter: isCenter ? 'brightness(0.92)' : 'brightness(0.75)',
                      transition: 'filter 300ms ease, transform 300ms ease',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  />

                  {/* Darken overlay so text is readable */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background: `
                        linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.9) 100%)
                      `,
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Card Content Layer */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 5,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      padding: '1.25rem',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Top Tag & Stats */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          padding: '0.2rem 0.55rem',
                          borderRadius: '9999px',
                          background: 'rgba(0, 0, 0, 0.55)',
                          backdropFilter: 'blur(8px)',
                          color: '#ffffff',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {reel.tag}
                      </span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {reel.stats}
                      </span>
                    </div>

                    {/* Center Play Button */}
                    <div style={{ alignSelf: 'center' }}>
                      <div
                        style={{
                          width: isCenter ? '56px' : '44px',
                          height: isCenter ? '56px' : '44px',
                          borderRadius: '50%',
                          background: isCenter ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(12px)',
                          border: isCenter ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: isCenter ? '0 0 25px rgba(255, 255, 255, 0.3)' : 'none',
                          transition: 'all 200ms ease',
                        }}
                      >
                        <Play
                          size={isCenter ? 22 : 16}
                          weight="fill"
                          color={isCenter ? '#000000' : '#ffffff'}
                          style={{ marginLeft: '2px' }}
                        />
                      </div>
                    </div>

                    {/* Bottom Title */}
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '0.7rem',
                          color: 'rgba(255, 255, 255, 0.6)',
                          fontFamily: 'var(--font-body)',
                          marginBottom: '0.15rem',
                        }}
                      >
                        {reel.category}
                      </span>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#ffffff',
                          lineHeight: 1.2,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {reel.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.5rem',
          }}
        >
          <button
            onClick={handlePrev}
            className="btn-press"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={canHover ? (e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            } : undefined}
            onMouseLeave={canHover ? (e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            } : undefined}
            aria-label="Previous Reel"
          >
            <CaretLeft size={20} weight="bold" />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {REELS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => (isMobile ? scrollToMobileIndex(idx) : setActiveIndex(idx))}
                style={{
                  width: idx === activeIndex ? '24px' : '7px',
                  height: '7px',
                  borderRadius: '9999px',
                  background: idx === activeIndex ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="btn-press"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
            onMouseEnter={canHover ? (e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            } : undefined}
            onMouseLeave={canHover ? (e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            } : undefined}
            aria-label="Next Reel"
          >
            <CaretRight size={20} weight="bold" />
          </button>
        </div>
      </div>

      {/* ============================================================
          MODAL — Fixed, explicit height/width, properly contained
          ============================================================ */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModalVideo(null)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              background: 'rgba(0, 0, 0, 0.92)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(360px, calc(100vw - 2rem))',
                height: 'auto',
                aspectRatio: '9 / 16',
                maxHeight: 'calc(100vh - 4rem)',
                maxWidth: 'calc(100vw - 2rem)',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 60px rgba(255, 255, 255, 0.08)',
                background: '#000000',
                flexShrink: 0,
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalVideo(null)}
                className="btn-press"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 30,
                }}
                aria-label="Close video player"
              >
                <X size={18} weight="bold" />
              </button>

              {/* Iframe — absolutely positioned to fill the container */}
              <iframe
                src={activeModalVideo.embedUrl}
                title={activeModalVideo.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />

              {/* Modal Bottom Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem 1.25rem',
                  background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 25,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {activeModalVideo.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{activeModalVideo.category}</p>
                </div>
                <a
                  href={activeModalVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-press"
                  style={{
                    flexShrink: 0,
                    padding: '0.45rem 0.9rem',
                    borderRadius: '9999px',
                    background: '#ffffff',
                    color: '#000000',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    marginLeft: '0.75rem',
                  }}
                >
                  Open <ArrowUpRight size={13} weight="bold" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
