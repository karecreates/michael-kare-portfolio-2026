'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

/** Fired when the wordmark is clicked on the homepage; the hero replays. */
export const HERO_REPLAY_EVENT = 'mk:hero-replay';

const DEFAULT_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' },
];
const RESUME_PATH =
  '/placeholders/Michael_Portfolio_Images/Michael_Kare_Resume_2026_Web_Optimized_2026.pdf';

function applyStoredTheme() {
  try {
    const stored = localStorage.getItem('theme');
    document.documentElement.dataset.theme = stored === 'light' ? 'light' : 'dark';
  } catch {
    document.documentElement.dataset.theme = 'dark';
  }
}

function ThemeToggle() {
  const toggle = () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage can be blocked; the attribute still switches this visit */
    }
  };

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggle}
      aria-label="Switch color theme"
    >
      <span className={styles.themeTrack} aria-hidden="true">
        <span className={styles.themeKnob} />
      </span>
    </button>
  );
}

export default function Header({ links = DEFAULT_LINKS }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const menuId = useId();
  const menuButton = useRef(null);
  const resumeButton = useRef(null);
  const resumeDialog = useRef(null);

  useLayoutEffect(() => {
    applyStoredTheme();
  }, []);

  useEffect(() => {
    const sync = () => {
      const root = document.documentElement;
      const band = root.querySelector('header')?.getBoundingClientRect().height || 62;
      let ink = '';
      root.querySelectorAll('[data-header-contrast]').forEach((node) => {
        const box = node.getBoundingClientRect();
        if (box.top >= band || box.bottom <= 8) return;
        const mode = node.getAttribute('data-header-contrast');
        if (mode === 'dark') ink = 'dark';
        else if (mode === 'invert' && root.dataset.theme === 'light' && ink !== 'dark') {
          ink = 'light';
        }
      });
      if (ink) root.dataset.headerInk = ink;
      else delete root.dataset.headerInk;
    };
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        sync();
      });
    };
    sync();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const theme = new MutationObserver(schedule);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    const lenis = window.__lenis;
    lenis?.on?.('scroll', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      theme.disconnect();
      lenis?.off?.('scroll', schedule);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (menuOpen) root.dataset.menu = 'open';
    else delete root.dataset.menu;
    if (!menuOpen) return undefined;
    const keydown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    const lenis = window.__lenis;
    lenis?.stop?.();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', keydown);
    window.addEventListener('resize', resize);
    return () => {
      delete root.dataset.menu;
      lenis?.start?.();
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', keydown);
      window.removeEventListener('resize', resize);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!resumeOpen) return;
    const dialog = resumeDialog.current;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [resumeOpen]);

  const followLink = (event, href) => {
    const url = new URL(href, window.location.origin);
    // Cross-page links fall through to <Link> (client-side navigation, no
    // loader); only same-page hashes get the smooth scroll below.
    if (url.pathname !== window.location.pathname || !url.hash) {
      setMenuOpen(false);
      return;
    }
    const target = document.querySelector(url.hash);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    const band = document.querySelector('header')?.getBoundingClientRect().height || 72;
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - band - 16);
    const lenis = window.__lenis;
    if (lenis?.scrollTo) lenis.scrollTo(top, { duration: 1.15 });
    else window.scrollTo({ top, behavior: 'smooth' });
    window.history.pushState(null, '', `${url.pathname}${url.hash}`);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return undefined;
    let timer = 0;
    const go = () => {
      if (document.documentElement.dataset.loading) {
        timer = window.setTimeout(go, 120);
        return;
      }
      const target = document.querySelector(hash);
      if (!target) return;
      const band = document.querySelector('header')?.getBoundingClientRect().height || 72;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - band - 16);
      const lenis = window.__lenis;
      if (lenis?.scrollTo) lenis.scrollTo(top, { immediate: true });
      else window.scrollTo(0, top);
    };
    timer = window.setTimeout(go, 80);
    return () => window.clearTimeout(timer);
  }, []);

  const closeResume = () => {
    setResumeOpen(false);
    if (window.innerWidth <= 900) menuButton.current?.focus();
    else resumeButton.current?.focus();
  };

  // The site loader only belongs to the initial load. On the homepage the
  // wordmark scrolls back up and replays the hero; elsewhere it client-navigates
  // home so the root layout (and the loader) is never remounted.
  const onLogoClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    setMenuOpen(false);
    if (window.location.pathname !== '/') return;
    event.preventDefault();
    if (window.location.hash || window.location.search) window.history.replaceState(null, '', '/');
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    window.dispatchEvent(new CustomEvent(HERO_REPLAY_EVENT));
  };

  return (
    <>
      <Link href="/" className={styles.logo} aria-label="Michael Kare home" onClick={onLogoClick}>
        MICHAELKARE
      </Link>
      <span className={styles.logoInvert} data-header-logo-invert aria-hidden="true">
        MICHAELKARE
      </span>
      <header className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.logoSpacer} aria-hidden="true">
            MICHAELKARE
          </span>
          <div className={styles.navArea}>
            <ThemeToggle />
            <button
              ref={menuButton}
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span className={menuOpen ? styles.barOpen1 : styles.bar} />
                <span className={menuOpen ? styles.barOpen2 : styles.bar} />
                <span className={menuOpen ? styles.barOpen3 : styles.bar} />
              </span>
            </button>
            <nav className={styles.nav} aria-label="Primary navigation">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={styles.link}
                  onClick={(event) => followLink(event, link.href)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                ref={resumeButton}
                type="button"
                className={styles.linkButton}
                onClick={() => setResumeOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={resumeOpen}
                aria-controls="resume-modal"
              >
                Resume
              </button>
            </nav>
          </div>
        </div>
      </header>
      <nav
        id={menuId}
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={menuOpen ? undefined : true}
        inert={!menuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <ul className={styles.mobileList}>
          {links.map((link, index) => (
            <li key={link.label} style={{ '--i': index }}>
              <Link
                href={link.href}
                className={styles.mobileItem}
                onClick={(event) => followLink(event, link.href)}
              >
                <span className={styles.mobileLabel}>{link.label}</span>
              </Link>
            </li>
          ))}
          <li style={{ '--i': links.length }}>
            <button
              type="button"
              className={styles.mobileItem}
              onClick={() => {
                setMenuOpen(false);
                setResumeOpen(true);
              }}
            >
              <span className={styles.mobileLabel}>Resume</span>
            </button>
          </li>
        </ul>
      </nav>
      <dialog
        ref={resumeDialog}
        id="resume-modal"
        aria-label="Michael Kare resume"
        className={styles.resumeModal}
        data-lenis-prevent
        onCancel={(event) => {
          event.preventDefault();
          closeResume();
        }}
      >
        {resumeOpen && (
          <>
            <div className={styles.resumeTopBar}>
              <button
                type="button"
                className={styles.modalButton}
                onClick={closeResume}
                autoFocus
              >
                Close
              </button>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noreferrer"
                className={styles.modalButton}
              >
                Open in new tab
              </a>
              <a href={RESUME_PATH} download className={styles.modalButton}>
                Download
              </a>
            </div>
            <div className={styles.resumeFrameWrap}>
              <iframe
                src={RESUME_PATH}
                title="Michael Kare resume PDF"
                className={styles.resumeFrame}
              />
            </div>
            <p className={styles.resumeHint}>
              You can also download a copy or open the résumé in a new tab.
            </p>
          </>
        )}
      </dialog>
    </>
  );
}
