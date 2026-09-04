import { useRef, useState } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { Play } from 'lucide-react';

export function InkSpillButton({ href, children, ...props }) {
  const ref = useRef(null);
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');
  const [inkStyle, setInkStyle] = useState({ left: 0, top: 0, transform: 'scale(0)', opacity: 0 });

  const handleMouseEnter = (e) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set starting position at cursor without transition
    setInkStyle({
      left: x,
      top: y,
      transform: 'scale(0)',
      opacity: 1,
      transition: 'none'
    });
    
    // Force reflow and start animation
    requestAnimationFrame(() => {
      setInkStyle({
        left: x,
        top: y,
        transform: 'scale(1)',
        opacity: 1,
        transition: 'transform 600ms cubic-bezier(0.25, 1, 0.5, 1)' // fluid and cinematic
      });
    });
  };

  const handleMouseLeave = (e) => {
    if (!canHover || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setInkStyle({
      left: x,
      top: y,
      transform: 'scale(0)',
      opacity: 0,
      transition: 'transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 400ms ease'
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      className="btn-press"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.6rem',
        padding: '0.85rem 1.75rem',
        borderRadius: '9999px',
        background: inkStyle.opacity === 1 ? '#111111' : '#ffffff',
        fontWeight: 600,
        fontSize: '0.95rem',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 25px rgba(255, 255, 255, 0.25)',
        transition: 'background 400ms ease',
      }}
      {...props}
    >
      <span style={{ 
        position: 'relative', 
        zIndex: 10, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.6rem',
        color: inkStyle.opacity === 1 ? '#ffffff' : '#000000',
        transition: 'color 300ms ease'
      }}>
        <Play size={16} fill={inkStyle.opacity === 1 ? "#ffffff" : "#000000"} style={{ transition: 'fill 300ms ease' }} />
        {children}
      </span>
      
      {canHover && (
        <span
          style={{
            position: 'absolute',
            width: '400px', // Large enough to cover the button diagonally
            height: '400px',
            background: '#111111', // Cinematic dark grey
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1,
            marginLeft: '-200px',
            marginTop: '-200px',
            ...inkStyle
          }}
        />
      )}
    </a>
  );
}
