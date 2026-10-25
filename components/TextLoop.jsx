'use client';

import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './TextLoop.css';

const VIEW_W = 1200;
const VIEW_H = 520;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const EDGE_PAD = 6;

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
      return `M -320 ${CY} L ${VIEW_W + 320} ${CY}`;
    case 'wave':
    default: {
      const a = Math.min(c * 2.2, room * 2);
      return `M -320 ${CY} Q -160 ${CY - a} 0 ${CY} T 320 ${CY} T 640 ${CY} T 960 ${CY} T 1280 ${CY} T ${VIEW_W + 320} ${CY}`;
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
  const svgRef = useRef(null);

  const [metrics, setMetrics] = useState({
    length: 0,
    advance: 0,
    copies: 2,
    center: 0,
    textWidth: 0,
    reps: 1,
    flow: false,
  });
  const [narrow, setNarrow] = useState(false);

  const rawId = useId();
  const pathId = `text-loop-${rawId.replace(/:/g, '')}`;

  const drawnCurve = narrow ? Math.min(curviness, 18) : curviness;
  const drawnRibbon = narrow ? Math.round(ribbonWidth * 0.72) : ribbonWidth;
  const d = useMemo(
    () => path || buildPath(shape, drawnCurve, drawnRibbon),
    [path, shape, drawnCurve, drawnRibbon],
  );

  const unit = useMemo(() => {
    const base = uppercase ? String(text).toUpperCase() : String(text);
    const gap = separator ? `\u00A0${separator}\u00A0` : '\u00A0\u00A0\u00A0';
    return `${base}${gap}`;
  }, [text, separator, uppercase]);

  const drawnSize = narrow ? Math.round(fontSize * 0.62) : fontSize;
  const textStyle = useMemo(
    () => ({
      fontSize: `${drawnSize}px`,
      fontWeight,
      letterSpacing: `${letterSpacing}px`,
    }),
    [drawnSize, fontWeight, letterSpacing],
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const read = () => setNarrow(root.clientWidth < 760);
    read();
    const observer = new ResizeObserver(read);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const pathEl = pathRef.current;
    const measureEl = measureRef.current;
    if (!pathEl || !measureEl) return undefined;

    let cancelled = false;

    const measure = () => {
      if (cancelled) return;
      let length = 0;
      let unitWidth = 0;
      try {
        length = pathEl.getTotalLength();
        unitWidth = measureEl.getComputedTextLength();
      } catch {
        return;
      }
      if (!length) return;

      const reps = narrow ? 1 : Math.max(1, unitWidth > 0 ? Math.floor(length / unitWidth) : 1);
      const textWidth = unitWidth * reps;
      const advance = narrow ? textWidth * 1.14 : textWidth || length;
      const copies = narrow ? Math.max(2, Math.ceil(length / advance) + 1) : 2;
      let center = length / 2;
      let low = 0;
      let high = length;
      for (let step = 0; step < 18; step += 1) {
        const mid = (low + high) / 2;
        if (pathEl.getPointAtLength(mid).x < CX) low = mid;
        else high = mid;
      }
      center = (low + high) / 2;
      setMetrics((prev) =>
        prev.length === length &&
        prev.advance === advance &&
        prev.copies === copies &&
        prev.flow === narrow
          ? prev
          : { length, advance, copies, center, textWidth, reps, flow: narrow },
      );
    };

    measure();
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => {
      cancelled = true;
    };
  }, [d, unit, drawnSize, fontWeight, letterSpacing, narrow]);

  useEffect(() => {
    const { length, advance, center, textWidth, flow } = metrics;
    const nodes = svgRef.current
      ? [...svgRef.current.querySelectorAll('textPath')]
      : [];
    if (!nodes.length || !length || !advance) return undefined;

    const base = center - advance / 2;
    const apply = (offset) => {
      if (!flow) {
        const wrapped = ((offset % advance) + advance) % advance;
        nodes.forEach((node, index) => {
          node.parentNode.setAttribute('visibility', 'visible');
          node.setAttribute('startOffset', String(base + wrapped - index * advance));
        });
        return;
      }
      nodes.forEach((node, index) => {
        const raw = base + offset + index * advance;
        const pos = ((raw % length) + length) % length;
        const overflows = textWidth > 0 && pos + textWidth > length - 4;
        node.parentNode.setAttribute('visibility', overflows ? 'hidden' : 'visible');
        node.setAttribute('startOffset', String(overflows ? 0 : pos));
      });
    };

    apply(0);

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || speed <= 0) return undefined;

    const state = { offset: 0 };
    const tween = gsap.to(state, {
      offset: direction === 'reverse' ? -advance : advance,
      duration: advance / speed,
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
  }, [metrics, speed, direction, pauseOnHover]);

  return (
    <div ref={rootRef} className={`text-loop ${className}`.trim()} style={style}>
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
          strokeWidth={ribbon ? drawnRibbon : 0}
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

        {Array.from({ length: metrics.copies }, (_, index) => (
          <text
            key={index}
            className="text-loop-text"
            style={textStyle}
            fill={color}
            dominantBaseline="central"
            aria-hidden="true"
          >
            <textPath href={`#${pathId}`} startOffset={0}>
              {metrics.flow ? unit : unit.repeat(metrics.reps)}
            </textPath>
          </text>
        ))}
      </svg>
    </div>
  );
};

export default TextLoop;
