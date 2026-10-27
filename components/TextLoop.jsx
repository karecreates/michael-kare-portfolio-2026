'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './TextLoop.css';

const VIEW_W = 1200;
const VIEW_H = 520;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 6;
// Open shapes start this far left of the viewBox. WebKit hides a <textPath>
// whose startOffset is negative, so every copy must begin on the path; the
// lead-in gives the first copy room to start off-screen instead.
const LEAD_X = 2240;
// DM Sans cap height is ~0.7em; half of it puts the optical centre of
// uppercase type on the path.
const CAP_CENTER = 0.35;

const buildPath = (shape, curviness, ribbonWidth) => {
  const c = Math.max(0, curviness);
  const room = Math.max(20, CY - Math.max(0, ribbonWidth) / 2 - EDGE_PAD);

  switch (shape) {
    case 'circle': {
      const r = Math.min(90 + c * 0.95, room);
      return `M ${CX - r} ${CY} A ${r} ${r} 0 1 1 ${CX + r} ${CY} A ${r} ${r} 0 1 1 ${CX - r} ${CY} Z`;
    }
    case 'infinity': {
      const r = 150 + c * 1.4;
      const h = Math.min(60 + c * 0.95, room);
      return [
        `M ${CX} ${CY}`,
        `C ${CX + r * 0.55} ${CY - h} ${CX + r} ${CY - h} ${CX + r} ${CY}`,
        `C ${CX + r} ${CY + h} ${CX + r * 0.55} ${CY + h} ${CX} ${CY}`,
        `C ${CX - r * 0.55} ${CY - h} ${CX - r} ${CY - h} ${CX - r} ${CY}`,
        `C ${CX - r} ${CY + h} ${CX - r * 0.55} ${CY + h} ${CX} ${CY}`,
        'Z',
      ].join(' ');
    }
    case 'arch': {
      const rise = Math.min(120 + c * 1.1, room * 2);
      return `M 120 ${CY + rise / 2} Q ${CX} ${CY - rise * 1.5} ${VIEW_W - 120} ${CY + rise / 2}`;
    }
    case 'line':
      return `M ${-LEAD_X} ${CY} L ${VIEW_W + 320} ${CY}`;
    case 'wave':
    default: {
      const a = Math.min(c * 2.2, room * 2);
      // Half-waves are 320 wide; the lead-in is a whole number of them so the
      // crest/trough phase inside the viewBox is unchanged.
      const parts = [`M ${-LEAD_X} ${CY} Q ${-LEAD_X + 160} ${CY - a} ${-LEAD_X + 320} ${CY}`];
      let x = -LEAD_X + 640;
      for (; x <= 1280; x += 320) {
        parts.push(`T ${x} ${CY}`);
      }
      parts.push(`T ${VIEW_W + 320} ${CY}`);
      return parts.join(' ');
    }
  }
};

const TextLoop = ({
  text = 'React ✦ Bits',
  shape = 'wave',
  path,
  speed = 90,
  direction = 'forward',
  separator = '✦',
  curviness = 90,
  fontSize = 46,
  fontWeight = 800,
  letterSpacing = 2,
  uppercase = true,
  color = '#ffffff',
  ribbon = true,
  ribbonColor = '#5227FF',
  ribbonWidth = 86,
  pauseOnHover = true,
  className = '',
  style = {},
}) => {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const measureRef = useRef(null);
  const probeRef = useRef(null);
  const svgRef = useRef(null);

  // `unitWidth` comes from getBBox() of an off-path SVG copy of one phrase.
  // WebKit's getComputedTextLength ignores letter-spacing while the glyphs on
  // the path include it, which is what made the copies overlap on iPhone.
  const [metrics, setMetrics] = useState({
    length: 0,
    unitWidth: 0,
    center: 0,
    lead: 0,
  });

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, '')}`;

  const d = useMemo(
    () => path || buildPath(shape, curviness, ribbonWidth),
    [path, shape, curviness, ribbonWidth],
  );

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? `\u00A0${separator}\u00A0` : '\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const textStyle = useMemo(
    () => ({
      fontSize: `${fontSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [fontSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    const probeEl = probeRef.current;
    if (!pathEl || !measureEl || !probeEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getBBox().width;
      } catch {
        return;
      }
      if (!length || !unitWidth) return;

      // Path length at which the curve reaches a given x (x is monotonic for
      // the open shapes; closed shapes just get 0 lead).
      const lengthAtX = (targetX) => {
        let low = 0;
        let high = length;
        for (let step = 0; step < 18; step += 1) {
          const mid = (low + high) / 2;
          if (pathEl.getPointAtLength(mid).x < targetX) low = mid;
          else high = mid;
        }
        return (low + high) / 2;
      };
      const center = lengthAtX(CX);
      const open = !path && (shape === 'wave' || shape === 'line');
      const lead = open ? lengthAtX(-40) : 0;
      setMetrics((prev) =>
        prev.length === length &&
        Math.abs(prev.unitWidth - unitWidth) < 0.5 &&
        prev.center === center &&
        prev.lead === lead
          ? prev
          : { length, unitWidth, center, lead },
      );
    };

    measure();
    // The HTML probe only exists so a font swap re-triggers measurement.
    const observer = new ResizeObserver(measure);
    observer.observe(probeEl);
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [d, unit, fontSize, fontWeight, letterSpacing, path, shape]);

  // Each copy repeats the phrase `reps` times. The repeat span is capped at
  // the off-screen lead-in so the gap before the first copy is never visible.
  const reps = metrics.unitWidth
    ? Math.max(
        1,
        Math.floor((metrics.lead || metrics.length) / metrics.unitWidth),
      )
    : 1;
  const copies = metrics.unitWidth
    ? Math.ceil(metrics.length / (metrics.unitWidth * reps)) + 1
    : 3;

  useEffect(() => {
    const { center, unitWidth } = metrics;
    const nodes = svgRef.current
      ? [...svgRef.current.querySelectorAll('textPath')]
      : [];
    if (!nodes.length || !unitWidth) return undefined;

    const span = unitWidth * reps;

    // One repeat is centred on the viewBox; the first copy starts at the
    // smallest non-negative offset of that series, the rest follow at `span`.
    const base = center - span / 2;
    const apply = (offset) => {
      const first = (((base + offset) % span) + span) % span;
      nodes.forEach((node, index) => {
        node.setAttribute('startOffset', String(first + index * span));
      });
    };

    apply(0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === 'reverse' ? -span : span,
      duration: span / speed,
      ease: 'none',
      repeat: -1,
      onUpdate: () => apply(state.offset),
    });

    const root = rootRef.current;
    const pause = () => tween.pause();
    const resume = () => tween.resume();

    if (pauseOnHover && root) {
      root.addEventListener('pointerenter', pause);
      root.addEventListener('pointerleave', resume);
    }

    return () => {
      tween.kill();
      if (pauseOnHover && root) {
        root.removeEventListener('pointerenter', pause);
        root.removeEventListener('pointerleave', resume);
      }
    };
  }, [metrics, reps, copies, speed, direction, pauseOnHover]);

  const loopText = unit.repeat(reps);

  return (
    <div ref={rootRef} className={`text-loop ${className}`.trim()} style={style}>
      <span
        ref={probeRef}
        className="text-loop-probe"
        style={textStyle}
        aria-hidden="true"
      >
        {unit}
      </span>
      <svg
        ref={svgRef}
        className="text-loop-svg"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={text}
      >
        <path
          ref={pathRef}
          id={pathId}
          d={d}
          fill="none"
          stroke={ribbon ? ribbonColor : 'none'}
          strokeWidth={ribbon ? ribbonWidth : 0}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <text
          ref={measureRef}
          className="text-loop-measure"
          style={textStyle}
          aria-hidden="true"
        >
          {unit}
        </text>

        {Array.from({ length: copies }, (_, index) => (
          <text
            key={index}
            className="text-loop-text"
            style={textStyle}
            fill={color}
            // WebKit ignores dominant-baseline on text-on-a-path (iOS sat the
            // type on the ribbon's centreline). A perpendicular `dy` of half
            // the cap height centres the uppercase glyphs on the ribbon in
            // every engine instead.
            dy={fontSize * CAP_CENTER}
            aria-hidden="true"
          >
            <textPath href={`#${pathId}`} startOffset={0}>
              {loopText}
            </textPath>
          </text>
        ))}
      </svg>
    </div>
  );
};

export default TextLoop;
