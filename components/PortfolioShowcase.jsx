'use client';

import { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DISCIPLINES } from '@/data/portfolioShowcase';
import FadeLines from '@/components/FadeLines';
import { playInline, releaseInline } from '@/lib/inlineVideo';
import styles from './PortfolioShowcase.module.css';

// Scroll distance for one panel transition, as a fraction of the pinned viewport height.
const STEP = 0.85;
// Pinned steps before the first panel: one for the blue wipe over the heading,
// one for the first tab rising from the bottom.
const INTRO_STEPS = 2;
// Extra pinned scroll after the last panel so it holds briefly before releasing.
const TAIL = 0.3;
// How far a panel is allowed to be off the timeline before its video pauses.
const VIDEO_ACTIVE_RANGE = 0.75;
// Previous title stays readable; its thumbnail scales the rest of the way to 0.
const PREV_TITLE_SCALE = 0.62;

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

// The light-mode wordmark stays black on white. A white copy is clipped to
// the same circle as the blue wipe, so letters turn white as the edge
// reaches them instead of waiting for the whole word to flip.
function syncHeaderWipe(wipeEl, wipeK) {
  const logo = document.querySelector('[data-header-logo-invert]');
  if (!logo) return;
  if (!wipeEl || wipeK <= 0) {
    logo.style.clipPath = 'circle(0px at 0px 0px)';
    return;
  }
  const wipeBox = wipeEl.getBoundingClientRect();
  const pct = easeInOut(wipeK) * 160;
  const radius =
    (pct / 100) * (Math.hypot(wipeBox.width, wipeBox.height) / Math.SQRT2) + 28;
  const logoBox = logo.getBoundingClientRect();
  const cx = wipeBox.left - logoBox.left;
  const cy = wipeBox.top + wipeBox.height * 0.5 - logoBox.top;
  logo.style.clipPath = `circle(${radius.toFixed(2)}px at ${cx.toFixed(2)}px ${cy.toFixed(2)}px)`;
}
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

function scrollWindowTo(top) {
  const lenis = typeof window !== 'undefined' ? window.__lenis : undefined;
  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(top, { duration: 1.1 });
  } else {
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

function PortfolioMedia({ item, index, floatRef, videoRef, isStatic, loadNow }) {
  const label = `${item.title} — ${item.mediaType === 'video' ? 'motion' : 'mockup'}`;
  const start = item.startTime || 0;
  const seekToStart = (event) => {
    const video = event.currentTarget;
    if (start && video.currentTime < start) video.currentTime = start;
  };
  const onEnded = (event) => {
    const video = event.currentTarget;
    video.currentTime = start;
    video.play().catch(() => {});
  };
  return (
    <div className={styles.float} ref={floatRef}>
      {item.mediaType === 'video' ? (
        <video
          ref={videoRef}
          {...(loadNow
            ? { src: item.mediaSrc, poster: item.posterSrc }
            : { 'data-defer-src': item.mediaSrc, 'data-defer-poster': item.posterSrc })}
          muted
          playsInline
          webkit-playsinline="true"
          preload={loadNow ? 'auto' : 'none'}
          disablePictureInPicture
          controls={isStatic || undefined}
          onLoadedMetadata={seekToStart}
          onPlay={seekToStart}
          onEnded={onEnded}
          aria-label={label}
        />
      ) : (
        <img
          {...(loadNow ? { src: item.mediaSrc } : { 'data-defer-src': item.mediaSrc })}
          alt={label}
          width={1920}
          height={1080}
          loading={loadNow && index === 0 ? 'eager' : 'lazy'}
          fetchPriority={loadNow && index === 0 ? 'high' : 'low'}
          decoding="async"
          draggable={false}
        />
      )}
    </div>
  );
}

export default function PortfolioShowcase({
  reduced: reducedProp = false,
  children,
}) {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  const reduced = reducedProp || prefersReduced;
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const introInnerRef = useRef(null);
  const wipeRef = useRef(null);
  const panelRefs = useRef([]);
  const headerRefs = useRef([]);
  const numberRefs = useRef([]);
  const titleRefs = useRef([]);
  const frameRefs = useRef([]);
  const floatRefs = useRef([]);
  const copyRefs = useRef([]);
  const videoRefs = useRef([]);
  const items = PORTFOLIO_DISCIPLINES;
  const count = items.length;
  const [armed, setArmed] = useState(() => new Set([0]));
  const armedRef = useRef(armed);
  armedRef.current = armed;

  useEffect(() => {
    if (reduced) return undefined;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return undefined;

    const metrics = {
      viewport: 0,
      step: 1,
      stickyTop: 0,
      tabH: 118,
      geo: [],
    };
    const lastInert = new Array(count).fill(null);
    const lastPlaying = new Array(count).fill(false);
    let rafId = 0;
    let lastP = -1;

    const measure = () => {
      const css = getComputedStyle(sticky);
      metrics.viewport = sticky.clientHeight;
      metrics.step = metrics.viewport * STEP;
      metrics.stickyTop = parseFloat(css.top) || 0;
      const measuredTab = headerRefs.current.find((node) => node)?.offsetHeight;
      metrics.tabH = measuredTab || 156;
      track.style.height = `${
        (INTRO_STEPS + count - 1) * metrics.step +
        metrics.viewport * (1 + TAIL)
      }px`;
      const boxH = Math.max(metrics.viewport - metrics.tabH, 160);
      const boxW = sticky.clientWidth;
      let mediaH = boxH;
      let mediaW = boxH * (16 / 9);
      if (mediaW > boxW) {
        mediaW = boxW;
        mediaH = boxW * (9 / 16);
      }
      metrics.geo = items.map(() => ({ mediaW, mediaH }));
      metrics.mobile = window.matchMedia('(max-width: 767px)').matches;
      lastP = -1;
    };

    const render = () => {
      rafId = 0;
      const rect = track.getBoundingClientRect();
      const V = metrics.viewport;
      const tabH = metrics.tabH;
      if (!V) return;
      if (rect.bottom < -V || rect.top > V * 3) {
        if (lastP !== -1) {
          lastP = -1;
          syncHeaderWipe(null, 0);
        }
        return;
      }
      const raw = (metrics.stickyTop - rect.top) / metrics.step;
      const p = Math.min(Math.max(raw, 0), INTRO_STEPS + count - 1);
      if (p === lastP) return;
      lastP = p;

      const wipeK = clamp01(p);
      if (wipeK > 0.45) track.setAttribute('data-header-contrast', 'invert');
      else track.removeAttribute('data-header-contrast');
      const wipe = wipeRef.current;
      if (wipe) {
        wipe.style.clipPath = `circle(${(easeInOut(wipeK) * 160).toFixed(2)}% at 0% 50%)`;
      }
      syncHeaderWipe(wipe, wipeK);
      const introInner = introInnerRef.current;
      if (introInner) {
        introInner.style.opacity = 1 - clamp01((wipeK - 0.55) / 0.4);
      }

      const timeline = p - INTRO_STEPS;

      for (let i = 0; i < count; i += 1) {
        const panel = panelRefs.current[i];
        if (!panel) continue;

        let y;
        // Current tab parks at y=0. Its taller header covers the previous tab.
        if (timeline <= i - 1) {
          y = V;
        } else if (timeline < i) {
          y = lerp(V, 0, easeInOut(timeline - (i - 1)));
        } else {
          y = 0;
        }

        panel.style.transform = `translate3d(0, ${y}px, 0)`;
        panel.style.height = `${Math.max(V - y, tabH)}px`;

        const leave = clamp01(timeline - i);
        const rise = clamp01(timeline - (i - 1));
        const geo = metrics.geo[i] || { mediaW: 0, mediaH: 0 };
        const float = floatRefs.current[i];
        if (float && metrics.mobile) {
          float.style.width = '100%';
          float.style.height = '100%';
          float.style.top = '0';
          float.style.bottom = 'auto';
          float.style.transformOrigin = 'center bottom';
          let show = 1;
          if (timeline < i) {
            show = i === 0 ? 1 : easeInOut(clamp01((rise - 0.08) / 0.55));
          } else if (i < count - 1) {
            show = 1 - easeInOut(clamp01(leave / 0.45));
          }
          float.style.transform = `translate3d(0, ${(1 - show) * 42}%, 0)`;
          float.style.opacity = String(show);
        } else if (float) {
          float.style.width = `${geo.mediaW}px`;
          float.style.height = `${geo.mediaH}px`;
          let s = 0;
          let origin = 'top right';
          // Incoming mockup is pinned to the bottom of its tab so it grows
          // from that bottom-left corner. Everything else stays top-aligned.
          const incoming = timeline > i - 1 && timeline < i && i > 0;
          float.style.top = incoming ? 'auto' : '0';
          float.style.bottom = incoming ? '0' : 'auto';
          if (timeline < i) {
            if (i === 0 || timeline <= i - 1) {
              // First tab is already full as it rises. Later tabs stay hidden
              // until their own panel starts up.
              s = i === 0 ? 1 : 0;
            } else {
              // Scale up from the bottom-left corner. By halfway it fills the
              // open tab, and it never slides under the header.
              const bodyH = Math.max(0, V - y - tabH);
              const fit = geo.mediaH > 0 ? Math.min(1, bodyH / geo.mediaH) : 0;
              const grow = Math.min(1, rise / 0.5);
              s = fit * easeInOut(grow);
              origin = 'bottom left';
            }
          } else if (i < count - 1 && timeline <= i + 1) {
            // Previous mockup is pinched between its header rule and the
            // rising tab's top rule, retreating toward the top-right.
            const nextY = lerp(V, 0, easeInOut(leave));
            const gap = Math.max(0, nextY - tabH);
            s = geo.mediaH > 0 ? Math.min(1, gap / geo.mediaH) : 0;
          } else if (timeline <= i + 1) {
            s = 1;
          }
          float.style.transformOrigin = origin;
          float.style.transform = `scale(${s})`;
          float.style.opacity = s > 0.02 ? 1 : 0;
        }

        const isPrevStrip = timeline > i && timeline <= i + 1;
        const typeScale = isPrevStrip
          ? lerp(1, PREV_TITLE_SCALE, easeInOut(leave))
          : 1;
        const typeAlpha = timeline > i + 1 ? 0 : 1;
        const title = titleRefs.current[i];
        if (title) {
          title.style.transform = `scale(${typeScale})`;
          title.style.opacity = typeAlpha;
        }
        const num = numberRefs.current[i];
        if (num) {
          num.style.transform = `scale(${typeScale})`;
          num.style.opacity = typeAlpha;
        }

        const copy = copyRefs.current[i];
        if (copy) {
          const o = clamp01(Math.min(1 - leave, (rise - 0.12) / 0.4));
          copy.style.opacity = o;
          copy.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
        }

        const inert = timeline < i - 1 + 0.02 || timeline > i + 1.02;
        if (lastInert[i] !== inert) {
          lastInert[i] = inert;
          if (inert) panel.setAttribute('inert', '');
          else panel.removeAttribute('inert');
          panel.setAttribute('aria-hidden', inert ? 'true' : 'false');
        }
        const header = headerRefs.current[i];
        if (header) {
          header.setAttribute(
            'aria-current',
            Math.abs(timeline - i) < 0.5 ? 'true' : 'false',
          );
        }

        if (Math.abs(timeline - i) < 1.6 && !armedRef.current.has(i)) {
          const next = new Set(armedRef.current);
          next.add(i);
          armedRef.current = next;
          setArmed(next);
        }

        const video = videoRefs.current[i];
        if (video) {
          const shouldPlay = Math.abs(timeline - i) < VIDEO_ACTIVE_RANGE;
          if (shouldPlay !== lastPlaying[i]) {
            lastPlaying[i] = shouldPlay;
            if (shouldPlay) {
              if (video.preload !== 'auto') video.preload = 'auto';
              playInline(video).catch(() => {});
            } else {
              releaseInline(video);
              video.pause();
            }
          } else if (
            !shouldPlay &&
            Math.abs(timeline - i) < 1.5 &&
            video.preload !== 'auto'
          ) {
            video.preload = 'auto';
          }
        }
      }
    };

    const schedule = () => {
      if (!rafId) rafId = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    const goProgress = (nextP) => {
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const top = trackTop - metrics.stickyTop + nextP * metrics.step;
      const lenis = window.__lenis;
      if (lenis?.scrollTo) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo(0, top);
      lastP = -1;
      render();
    };
    window.__mk = {
      go: goProgress,
      state: () => {
        const rect = track.getBoundingClientRect();
        const raw = (metrics.stickyTop - rect.top) / metrics.step;
        return {
          p: raw,
          timeline: raw - INTRO_STEPS,
          tabH: metrics.tabH,
          viewport: metrics.viewport,
          geo: metrics.geo[0],
        };
      },
    };

    measure();
    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(sticky);
    const settle = window.setTimeout(onResize, 400);
    document.fonts?.ready?.then(onResize).catch(() => {});

    return () => {
      window.clearTimeout(settle);
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (window.__mk) delete window.__mk;
      videoRefs.current.forEach((v) => v && v.pause());
      track.style.height = '';
      if (wipeRef.current) wipeRef.current.style.clipPath = '';
      if (introInnerRef.current) introInnerRef.current.style.opacity = '';
      [panelRefs, floatRefs, titleRefs, numberRefs, copyRefs].forEach((refs) =>
        refs.current.forEach((node) => {
          if (!node) return;
          node.style.transform = '';
          node.style.opacity = '';
          node.style.pointerEvents = '';
          node.style.height = '';
          node.style.width = '';
          node.style.top = '';
          node.style.bottom = '';
        }),
      );
      panelRefs.current.forEach((node) => {
        if (!node) return;
        node.removeAttribute('inert');
        node.removeAttribute('aria-hidden');
      });
    };
  }, [count, items, reduced]);

  const goTo = (index) => {
    if (reduced) {
      panelRefs.current[index]?.scrollIntoView({ block: 'start' });
      return;
    }
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!track || !sticky) return;
    const stickyTop = parseFloat(getComputedStyle(sticky).top) || 0;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const step = sticky.clientHeight * STEP;
    scrollWindowTo(
      Math.round(trackTop - stickyTop + (INTRO_STEPS + index) * step),
    );
  };

  return (
    <div
      ref={trackRef}
      className={`${styles.track} ${reduced ? styles.static : ''}`}
      data-portfolio-showcase=""
    >
      <div ref={stickyRef} className={styles.sticky}>
        <div className={styles.intro}>
          <div ref={introInnerRef} className={styles.introInner}>
            {children}
          </div>
        </div>
        <div ref={wipeRef} className={styles.wipe} aria-hidden="true" />
        {items.map((item, index) => (
          <article
            key={item.id}
            ref={(node) => {
              panelRefs.current[index] = node;
            }}
            className={styles.panel}
            data-header-contrast="invert"
            style={{ zIndex: index + 1 }}
            aria-labelledby={`showcase-${item.id}`}
          >
            <button
              type="button"
              ref={(node) => {
                headerRefs.current[index] = node;
              }}
              className={styles.header}
              onClick={() => goTo(index)}
              aria-label={`Go to ${item.number} ${item.title}`}
            >
              <span
                className={styles.number}
                ref={(node) => {
                  numberRefs.current[index] = node;
                }}
                aria-hidden="true"
              >
                [{item.number}]
              </span>
              <span
                id={`showcase-${item.id}`}
                className={styles.title}
                ref={(node) => {
                  titleRefs.current[index] = node;
                }}
              >
                {item.title}
              </span>
            </button>
            <div className={styles.body}>
              <div
                className={styles.copy}
                ref={(node) => {
                  copyRefs.current[index] = node;
                }}
              >
                <FadeLines
                  className={styles.description}
                  text={item.description}
                  cue="parent"
                />
              </div>
              <div
                className={styles.frame}
                ref={(node) => {
                  frameRefs.current[index] = node;
                }}
              >
                <PortfolioMedia
                  item={item}
                  index={index}
                  isStatic={reduced}
                  loadNow={reduced || armed.has(index)}
                  floatRef={(node) => {
                    floatRefs.current[index] = node;
                  }}
                  videoRef={(node) => {
                    videoRefs.current[index] = node;
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
