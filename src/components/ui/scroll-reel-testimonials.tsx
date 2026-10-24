"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ----------------------------------------------------------------
 * ScrollReelTestimonials
 *
 * Counter-rotating scroll reel + per-character text rise.
 * The middle column is a vertical reel of featured portraits that
 * translates by one "pitch" per step; the outer columns counter-
 * rotate in the opposite direction. Text animates character-by-character
 * with a stagger; the old block exits smoothly before the new
 * characters rise in sequence.
 * ---------------------------------------------------------------- */

export interface ScrollReelTestimonial {
  /** The quote text */
  quote: string;
  /** Author name shown below the quote */
  author: string;
  /** Portrait or avatar image URL for the featured tile */
  image: string;
  /** Optional alt text for the portrait */
  alt?: string;
  /** Optional role or subtitle (e.g. "Video Client") */
  role?: string;
}

export interface ScrollReelTestimonialsProps {
  /** Testimonials to cycle through */
  testimonials: ScrollReelTestimonial[];
  /** Per-character stagger in ms (default 6) */
  charStaggerMs?: number;
  /** Extra classes for the outer container */
  className?: string;
}

/* Geometry — middle column pitch between portrait centers:
 * 3 * (cell 121.33px + gap 8px) = 388px */
const CELL = 121.33;
const GAP = 8;
const STEP = 3 * (CELL + GAP);

const EXIT_MS = 240; // old text removed / new text mounted
const SLIDE_MS = 800; // column slide duration + interaction lock

const EASE_INOUT = "cubic-bezier(0.65,0,0.35,1)";

const QUOTE_CLASSES =
  "m-0 text-xl font-medium leading-[1.4] tracking-[-0.015em] text-white/95 sm:text-[23px] text-balance";
const AUTHOR_CLASSES =
  "m-0 text-base font-semibold tracking-tight text-white sm:text-lg";

const FEATURED_SHADOW =
  "0 1.008px 0.705px -0.563px rgba(0,0,0,0.5), 0 2.389px 1.672px -1.125px rgba(0,0,0,0.45), 0 4.357px 3.05px -1.688px rgba(0,0,0,0.4), 0 7.244px 5.07px -2.25px rgba(0,0,0,0.35), 0 11.698px 8.188px -2.813px rgba(0,0,0,0.3), 0 19.148px 13.404px -3.375px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(0,0,0,0.7)";

/* Blurred placeholder cell */
function Cell() {
  return (
    <div
      aria-hidden="true"
      className="shrink-0 rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-white/[0.01] blur-[0.5px] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
      style={{ width: CELL, height: CELL }}
    />
  );
}

/* Featured portrait tile with refined sheen overlay */
function Featured({ src, alt }: { src: string; alt?: string }) {
  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/20"
      style={{
        width: CELL,
        height: CELL,
        boxShadow: FEATURED_SHADOW,
        isolation: "isolate",
      }}
    >
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center select-none"
        style={{
          borderRadius: "inherit",
        }}
      />
      {/* subtle diagonal gradient sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] mix-blend-overlay opacity-30"
        style={{
          background:
            "linear-gradient(220deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)",
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}

/* Per-character split. Spaces live between word spans as plain text
 * nodes so natural line-wrapping is preserved. Each char rises in
 * with an inline animation-delay; while the block is exiting, the
 * char animation is removed so in-flight rises are killed. */
function Chars({
  text,
  startIndex,
  staggerMs,
}: {
  text: string;
  startIndex: number;
  staggerMs: number;
}) {
  let idx = startIndex;
  const words = text.split(" ");
  return (
    <>
      {words.map((word, wi) => {
        const wordSpan = (
          <span key={wi} className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, ci) => {
              const delay = idx * staggerMs;
              idx++;
              return (
                <span
                  key={ci}
                  className="scroll-reel-char"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
        if (wi < words.length - 1) idx++;
        return (
          <React.Fragment key={wi}>
            {wordSpan}
            {wi < words.length - 1 ? " " : null}
          </React.Fragment>
        );
      })}
    </>
  );
}

export function ScrollReelTestimonials({
  testimonials,
  charStaggerMs = 6,
  className,
}: ScrollReelTestimonialsProps) {
  /* Navigation state vs display state are kept separate so the
   * exiting block and the entering block never render together. */
  const [index, setIndex] = React.useState(0);
  const [displayIndex, setDisplayIndex] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const animating = React.useRef(false);
  const timeouts = React.useRef<ReturnType<typeof setTimeout>[]>([]);
  const touchStartX = React.useRef<number | null>(null);

  const count = testimonials.length;

  React.useEffect(() => {
    /* Enable column transitions only after first paint so the reel
     * appears at its starting offset without an initial slide-in. */
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
    return () => {
      cancelAnimationFrame(raf);
      timeouts.current.forEach(clearTimeout);
    };
  }, []);

  const paginate = React.useCallback(
    (dir: 1 | -1) => {
      if (animating.current) return;
      const next = index + dir;
      if (next < 0 || next >= count) return;
      animating.current = true;

      setIndex(next);
      setExiting(true);

      timeouts.current.push(
        setTimeout(() => {
          setDisplayIndex(next);
          setExiting(false);
        }, EXIT_MS)
      );
      timeouts.current.push(
        setTimeout(() => {
          animating.current = false;
        }, SLIDE_MS)
      );
    },
    [index, count]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      paginate(1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      paginate(-1);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
    touchStartX.current = null;
  };

  /* Middle column: 3 leading cells, then featured + 2 cells between
   * each testimonial, then 3 trailing cells. */
  const middleItems = React.useMemo(() => {
    const items: Array<{ type: "cell" } | { type: "featured"; i: number }> = [];
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    testimonials.forEach((_, i) => {
      items.push({ type: "featured", i });
      if (i < count - 1) {
        items.push({ type: "cell" }, { type: "cell" });
      }
    });
    for (let i = 0; i < 3; i++) items.push({ type: "cell" });
    return items;
  }, [testimonials, count]);

  const sideCellCount = 4 + 2 * count;
  const centerIdx = (count - 1) / 2;
  const middleY = (centerIdx - index) * STEP;
  const sideY = -middleY;

  const colStyle = (y: number): React.CSSProperties => ({
    transform: `translateY(${y}px)`,
    transition: mounted ? `transform ${SLIDE_MS}ms ${EASE_INOUT}` : "none",
  });

  const current = testimonials[displayIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={cn(
        "relative flex w-full max-w-[960px] flex-col items-stretch gap-2.5 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] outline-none focus-visible:ring-2 focus-visible:ring-white/40 md:min-h-[350px] md:flex-row",
        className
      )}
    >
      {/* Reel section with bidirectional edge fading */}
      <div
        aria-hidden="true"
        className="relative h-60 w-full shrink-0 self-stretch overflow-hidden md:h-auto md:w-[380px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center gap-2">
          {/* Left column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>

          {/* Middle column (features active portrait centered) */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(middleY)}
          >
            {middleItems.map((item, i) =>
              item.type === "featured" ? (
                <Featured
                  key={i}
                  src={testimonials[item.i].image}
                  alt={testimonials[item.i].alt}
                />
              ) : (
                <Cell key={i} />
              )
            )}
          </div>

          {/* Right column */}
          <div
            className="flex shrink-0 flex-col gap-2 will-change-transform motion-reduce:[transition:none!important]"
            style={colStyle(sideY)}
          >
            {Array.from({ length: sideCellCount }).map((_, i) => (
              <Cell key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="flex min-w-0 flex-1 flex-col justify-between self-stretch p-6 md:p-8 md:pl-6">
        {/* Center stage: quote mark + text + author/role vertically centered in the card */}
        <div className="flex flex-1 flex-col justify-center gap-3.5 my-auto">
          <svg
            className="block h-9 w-9 text-white/20 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M4.58 17.32C3.55 16.23 3 15 3 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18zm10 0C13.55 16.23 13 15 13 13.01c0-3.5 2.46-6.64 6.03-8.19l.9 1.38c-3.34 1.8-4 4.15-4.25 5.62.54-.28 1.24-.38 1.93-.31 1.8.17 3.23 1.65 3.23 3.49a3.5 3.5 0 0 1-3.5 3.5c-1.07 0-2.1-.49-2.75-1.18z" />
          </svg>

          {/* Text stage */}
          <div
            className="relative w-full max-w-[460px] overflow-hidden"
            aria-live="polite"
          >
            {/* Invisible in-flow copy sizes the stage to the current
              * quote at any viewport width, so wrapped text never clips. */}
            <div
              aria-hidden="true"
              className="invisible flex flex-col gap-3"
            >
              <p className={QUOTE_CLASSES}>{current.quote}</p>
              <div className="flex flex-col gap-0.5">
                <p className={AUTHOR_CLASSES}>{current.author}</p>
                {current.role && (
                  <p className="m-0 text-xs md:text-sm text-zinc-400 font-normal">
                    {current.role}
                  </p>
                )}
              </div>
            </div>

            <div
              key={displayIndex}
              className={cn(
                "absolute inset-x-0 top-0 flex flex-col gap-3 will-change-[transform,opacity]",
                exiting && "scroll-reel-exit"
              )}
            >
              <p className={QUOTE_CLASSES}>
                <Chars
                  text={current.quote}
                  startIndex={0}
                  staggerMs={charStaggerMs}
                />
              </p>
              <div className="flex flex-col gap-0.5">
                <p className={AUTHOR_CLASSES}>
                  <Chars
                    text={current.author}
                    startIndex={current.quote.length + 6}
                    staggerMs={charStaggerMs}
                  />
                </p>
                {current.role && (
                  <p className="m-0 text-xs md:text-sm text-zinc-400 font-normal">
                    <Chars
                      text={current.role}
                      startIndex={current.quote.length + current.author.length + 10}
                      staggerMs={charStaggerMs}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls row with counter and tactile arrow buttons */}
        <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] pt-3.5">
          <span className="font-mono text-xs tabular-nums text-zinc-500">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => paginate(-1)}
              disabled={index === 0}
              aria-label="Previous testimonial"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/[0.04] p-0 text-white transition-[opacity,transform,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:enabled:bg-white/10 hover:enabled:scale-[1.08] active:enabled:scale-[0.92] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <svg
                className="h-3.5 w-3.5 opacity-80"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7.5 2.5 3.5 6l4 3.5" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => paginate(1)}
              disabled={index === count - 1}
              aria-label="Next testimonial"
              className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/20 bg-white/[0.04] p-0 text-white transition-[opacity,transform,background-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:enabled:bg-white/10 hover:enabled:scale-[1.08] active:enabled:scale-[0.92] disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <svg
                className="h-3.5 w-3.5 opacity-80"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m4.5 2.5 4 3.5-4 3.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollReelTestimonials;
