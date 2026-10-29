'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import SideRays from './SideRays';
import CreativeInfiniteGallery from './CreativeInfiniteGallery';
import PortfolioShowcase from './PortfolioShowcase';
import FeaturedWorks from './FeaturedWorks';
import SpaceSection from './SpaceSection';
import SiteBackdrop from './SiteBackdrop';
import { HERO_REPLAY_EVENT } from './Header';
import { HOME_FEATURED_WORKS } from '@/data/featuredWorks';
import { Typewriter } from '@/components/ui/typewriter';
import FadeLines from '@/components/FadeLines';
import styles from './EditorialHome.module.css';

const HERO_ROTATE = [
  'all things creative',
  'design',
  'development',
  'A.I. engineering',
  'branding',
  'marketing',
];

const STACK_LOGOS = [
  { src: '/editorial/logos/stack_1.svg', alt: 'HTML' },
  { src: '/editorial/logos/stack_2.svg', alt: 'Figma' },
  { src: '/editorial/logos/stack_3.svg', alt: 'CSS' },
  {
    src: '/editorial/logos/stack_4.svg',
    lightSrc: '/editorial/logos/stack_4%20(black).svg',
    alt: 'Next.js',
  },
  { src: '/editorial/logos/stack_5.svg', alt: 'Adobe' },
  { src: '/editorial/logos/stack_6.svg', alt: 'Photoshop' },
  { src: '/editorial/logos/stack_7.svg', alt: 'JavaScript' },
  { src: '/editorial/logos/stack_8.svg', alt: 'React' },
  {
    src: '/editorial/logos/stack_9.svg',
    lightSrc: '/editorial/logos/stack_9%20(black).svg',
    alt: 'GitHub',
  },
];
// Listen once to device preferences. Motion values drive scrolling without React rerenders.
function useQuietMotion() {
  const reduced = useReducedMotion();
  const [compact, setCompact] = useState(true);
  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return {
    quiet: reduced || compact,
    reduced: Boolean(reduced),
    compact,
  };
}

function Hero({ data, quiet, reduced }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-9%']);
  const lowerX = useTransform(scrollYProgress, [0, 1], ['0%', '13%']);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.4]);
  const stickyRef = useRef(null);
  const portraitRef = useRef(null);

  // Tell the backdrop where the portrait's bottom gradient starts/ends so the
  // shader fades into the page background at the same place. Uses offset
  // geometry, so scroll-driven transforms on the portrait don't skew it.
  useEffect(() => {
    const sticky = stickyRef.current;
    const portrait = portraitRef.current;
    if (!sticky || !portrait) return undefined;
    const measure = () => {
      let top = 0;
      let el = portrait;
      while (el && el !== sticky) {
        top += el.offsetTop;
        el = el.offsetParent;
      }
      const height = portrait.offsetHeight;
      sticky.style.setProperty('--backdrop-fade-start', `${Math.round(top + height * 0.42)}px`);
      sticky.style.setProperty('--backdrop-fade-end', `${Math.round(top + height * 0.92)}px`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(sticky);
    observer.observe(portrait);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={styles.heroTrack}
      aria-labelledby="hero-title"
    >
      <div ref={stickyRef} className={styles.heroSticky}>
        {!reduced ? <SiteBackdrop /> : null}
        {!reduced ? (
          <div className={styles.heroRays} aria-hidden="true">
            <SideRays
              speed={2.5}
              rayColor1="#EAB308"
              rayColor2="#96c8ff"
              intensity={2}
              spread={2}
              origin="top-right"
              tilt={0}
              saturation={1.5}
              blend={0.75}
              falloff={1.6}
              opacity={1.0}
            />
          </div>
        ) : null}
        <div className={styles.heroMeta}>
          <span>Independent designer & developer</span>
          <span className={styles.heroMetaAside}>
            <span suppressHydrationWarning>
              Marina del Rey, CA
              <br />
              Portfolio / {new Date().getFullYear()}
            </span>
            <span className={styles.heroMetaNote}>
              Design sensibility.
              <br />
              Developer mentality.
            </span>
          </span>
        </div>
        <motion.div
          className={styles.heroComposition}
          style={quiet ? undefined : { y }}
        >
          <h1 id="hero-title" className={styles.name} aria-label="Michael Kare">
            <motion.span aria-hidden="true" style={quiet ? undefined : { x }}>
              MICHAEL
            </motion.span>
            <motion.span
              aria-hidden="true"
              style={quiet ? undefined : { x: lowerX }}
            >
              KARE<span className={styles.namePeriod}>.</span>
            </motion.span>
          </h1>
          <p className={styles.heroLine} aria-live="polite">
            <span className={styles.heroLineLead}>Your one stop shop for</span>
            <span className={styles.heroLineAccent}>
              {reduced ? (
                'all things creative'
              ) : (
                <Typewriter
                  text={HERO_ROTATE}
                  speed={70}
                  waitTime={1600}
                  deleteSpeed={40}
                  cursorChar="_"
                />
              )}
            </span>
          </p>
          <div className={styles.heroCtas}>
            <a href="#contact" className={styles.ctaFill}>
              Contact me
            </a>
            <a href="#work" className={styles.ctaStroke}>
              View projects
            </a>
          </div>
          <motion.figure
            className={styles.portrait}
            style={quiet ? undefined : { scale, opacity }}
          >
            <div ref={portraitRef} className={styles.portraitImage}>
              <Image
                src="/editorial/kare-developer-transparent.png"
                alt="Michael Kare"
                width={1448}
                height={1086}
                sizes="(max-width: 767px) 40vw, 32vw"
                priority
              />
            </div>
            <figcaption>
              Design sensibility.
              <br />
              Developer mentality.
            </figcaption>
          </motion.figure>
        </motion.div>
        <div className={styles.heroBottom}>
          <p>
            Digital experiences.
            <br />
            From first idea to final detail.
          </p>
          <a href="#work" className={styles.scrollLink}>
            Scroll to explore <span aria-hidden="true">↓</span>
          </a>
          <span className={styles.heroEdition}>Design / Code / Motion</span>
        </div>
      </div>
    </section>
  );
}

function LogoMarquee() {
  return (
    <section className={styles.marquee} aria-label="Tools and technologies">
      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {[0, 1].map((copy) => (
            <div className={styles.marqueeSet} key={copy} aria-hidden={copy === 1}>
              {STACK_LOGOS.map((logo) => (
                <div className={styles.marqueeItem} key={`${copy}-${logo.src}`}>
                  <img
                    className={logo.lightSrc ? styles.marqueeOnDark : undefined}
                    src={logo.src}
                    alt={copy === 0 ? logo.alt : ''}
                    loading="lazy"
                    decoding="async"
                  />
                  {logo.lightSrc ? (
                    <img
                      className={styles.marqueeOnLight}
                      src={logo.lightSrc}
                      alt={copy === 0 ? logo.alt : ''}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.marqueeFadeLeft} aria-hidden="true" />
        <div className={styles.marqueeFadeRight} aria-hidden="true" />
      </div>
    </section>
  );
}

function Focus({ items, compact }) {
  const rootRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const orb = orbRef.current;
    if (!root || !orb || compact) return undefined;
    let x = root.clientWidth * 0.72;
    let y = root.clientHeight * 0.5;
    let tx = x;
    let ty = y;
    let frame = 0;
    const tick = () => {
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      orb.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(tick);
    };
    const move = (event) => {
      const box = root.getBoundingClientRect();
      tx = event.clientX - box.left;
      ty = event.clientY - box.top;
    };
    root.addEventListener('pointermove', move, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      root.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
    };
  }, [compact]);

  return (
    <section
      ref={rootRef}
      className={styles.focus}
      aria-labelledby="focus-title"
    >
      <span className={styles.focusKicker}>Focus</span>
      <div className={styles.focusStage}>
        {!compact ? (
          <div ref={orbRef} className={styles.focusOrb} aria-hidden="true" />
        ) : null}
        <div className={styles.focusRow}>
        <FadeLines
          className={styles.focusAside}
          text="Bringing ideas and stories to life through motion, animation, and dynamic visual communication."
        />
        <h2 id="focus-title" className={styles.visuallyHidden}>
          Focus
        </h2>
        <ul className={styles.focusList}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}

function AboutReveal({ data, reduced }) {
  const ref = useRef(null);
  const wordsRef = useRef([]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.35'],
  });

  useEffect(() => {
    if (reduced) return undefined;
    const apply = (progress) => {
      const nodes = wordsRef.current;
      const total = nodes.length;
      nodes.forEach((node, index) => {
        if (!node) return;
        const start = (index / total) * 0.9;
        const lit = Math.min(1, Math.max(0, (progress - start) / 0.1));
        node.style.setProperty('--lit', lit.toFixed(3));
      });
    };
    apply(scrollYProgress.get());
    return scrollYProgress.on('change', apply);
  }, [reduced, scrollYProgress]);

  let wordIndex = 0;

  return (
    <section
      id="profile"
      ref={ref}
      className={styles.about}
      aria-labelledby="profile-title"
    >
      <div className={styles.aboutTop}>
        <h2 id="profile-title" className={styles.aboutTitle}>
          {data.title}
        </h2>
        <div className={styles.aboutCopy}>
          {data.paragraphs.map((paragraph) => (
            <p key={paragraph}>
              {paragraph.split(/(\s+)/).map((token) => {
                if (/^\s+$/.test(token)) return token;
                const index = wordIndex;
                wordIndex += 1;
                return (
                  <span
                    key={`${paragraph}-${index}`}
                    className={styles.aboutWord}
                    ref={(node) => {
                      wordsRef.current[index] = node;
                    }}
                    style={reduced ? { '--lit': 1 } : undefined}
                  >
                    {token}
                  </span>
                );
              })}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.aboutMeta}>
        <div>
          <a href={`mailto:${data.email}`}>{data.email}</a>
          <p>{data.location}</p>
        </div>
        <ul>
          {data.socials.map((social) => (
            <li key={social.label}>
              <a href={social.href}>{social.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Creative({ data }) {
  return (
    <section
      id="creative"
      className={styles.creative}
      aria-labelledby="creative-title"
    >
      <span className={styles.creativeKicker}>{data.sectionLabel}</span>
      <div className={styles.creativeStage}>
        <h2 id="creative-title" className={styles.creativeTitleBehind}>
          {data.headline}
        </h2>
        <div className={styles.creativePhoto}>
          <Image
            src={data.image}
            alt={data.imageAlt}
            width={1536}
            height={1024}
            sizes="(max-width: 767px) 94vw, 1200px"
          />
        </div>
      </div>
    </section>
  );
}

export default function EditorialHome({ data }) {
  const { quiet, reduced, compact } = useQuietMotion();
  // Clicking the wordmark remounts the hero so its intro (typewriter, rays)
  // plays again without touching the site loader.
  const [heroKey, setHeroKey] = useState(0);
  useEffect(() => {
    const replay = () => setHeroKey((key) => key + 1);
    window.addEventListener(HERO_REPLAY_EVENT, replay);
    return () => window.removeEventListener(HERO_REPLAY_EVENT, replay);
  }, []);
  // Every case study stays reachable from the index now that the featured grid
  // has been replaced by the discipline showcase.
  return (
    <div className={`${styles.home} ${quiet ? styles.quiet : ''}`}>
      <Hero key={heroKey} data={data.hero} quiet={quiet} reduced={reduced} />
      <section id="work" className={styles.work} aria-labelledby="work-title">
        <div className={styles.workHeading}>
          <div className={styles.sectionKicker}>
            <span>01 / Selected work</span>
            <Link href="/work">
              Full index <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        {/* Centered heading lives inside the pinned showcase so the blue wipe can sweep over it. */}
        <PortfolioShowcase reduced={reduced}>
          <p className={styles.workServices}>[ services ]</p>
          <h2 id="work-title" className={styles.sectionTitle}>
            Made to
            <br />
            <span>mean something.</span>
          </h2>
          <p className={styles.workIntroCopy}>
            A selection of work across design, development,
            <br />
            branding, and digital experiences.
          </p>
        </PortfolioShowcase>
      </section>
      <FeaturedWorks
        works={HOME_FEATURED_WORKS}
        filters={false}
        cta={{ label: 'View all projects', href: '/work' }}
      />
      <SpaceSection reduced={reduced} />
      <Focus items={data.focusAreas} compact={compact} />
      <LogoMarquee />
      <AboutReveal data={data.about} reduced={reduced} />
      <Creative data={data.creativeWork} />
      <CreativeInfiniteGallery reduced={reduced} />
    </div>
  );
}
