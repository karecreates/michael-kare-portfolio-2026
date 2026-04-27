'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import styles from './Header.module.css';

const DEFAULT_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const SCROLL_THRESHOLD = 8;
const RESUME_PATH =
  '/placeholders/Michael_Portfolio_Images/Michael_Kare_Resume_2026_Web_Optimized_2026.pdf';

const MOBILE_MAX = 900;

export default function Header({ links = DEFAULT_LINKS }) {
  const [elevated, setElevated] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const updateFromWindow = () => {
      setElevated(window.scrollY > SCROLL_THRESHOLD);
    };

    const updateFromLenis = (e) => {
      setElevated(e.detail.scroll > SCROLL_THRESHOLD);
    };

    updateFromWindow();
    window.addEventListener('scroll', updateFromWindow, { passive: true });
    window.addEventListener('lenis-scroll', updateFromLenis);
    return () => {
      window.removeEventListener('scroll', updateFromWindow);
      window.removeEventListener('lenis-scroll', updateFromLenis);
    };
  }, []);

  useEffect(() => {
    if (!isResumeOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isResumeOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };

    const onResize = () => {
      if (window.innerWidth > MOBILE_MAX) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((open) => !open);
  };

  const openResume = () => {
    closeMenu();
    setIsResumeOpen(true);
  };

  return (
    <>
      <header
        className={`${styles.header} ${elevated ? styles.headerElevated : ''}`}
      >
        <div className={styles.inner}>
          <a href="/" className={styles.logo} aria-label="Michael Kare home">
            MICHAELKARE
          </a>

          <div className={styles.navArea}>
            <button
              ref={menuButtonRef}
              type="button"
              className={styles.menuToggle}
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={toggleMenu}
            >
              <span className={styles.menuIcon} aria-hidden="true">
                <span className={menuOpen ? styles.barOpen1 : styles.bar} />
                <span className={menuOpen ? styles.barOpen2 : styles.bar} />
                <span className={menuOpen ? styles.barOpen3 : styles.bar} />
              </span>
            </button>

            {menuOpen && (
              <button
                type="button"
                className={styles.menuBackdrop}
                aria-label="Close menu"
                tabIndex={-1}
                onClick={closeMenu}
              />
            )}

            <nav
              id={menuId}
              className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
              aria-label="Primary navigation"
            >
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={styles.link}
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                className={styles.linkButton}
                onClick={openResume}
                aria-haspopup="dialog"
                aria-expanded={isResumeOpen}
                aria-controls="resume-modal"
              >
                Resume
              </button>
            </nav>
          </div>
        </div>
      </header>

      {isResumeOpen && (
        <div
          id="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Michael Kare resume"
          className={styles.resumeModal}
        >
          <div className={styles.resumeTopBar}>
            <button
              type="button"
              className={styles.modalButton}
              onClick={() => setIsResumeOpen(false)}
            >
              Close
            </button>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noreferrer"
              className={styles.modalButton}
            >
              Open in New Tab
            </a>
            <a href={RESUME_PATH} download className={styles.modalButton}>
              Download
            </a>
          </div>
          <div className={styles.resumeFrameWrap}>
            <iframe
              src={RESUME_PATH}
              title="Michael Kare Resume PDF"
              className={styles.resumeFrame}
            />
          </div>
          <p className={styles.resumeHint}>
            If this preview appears blank, use Download or Open in New Tab. The
            current PDF export may not render in all built-in browser viewers.
          </p>
        </div>
      )}
    </>
  );
}
