'use client';

import { useEffect, useState } from 'react';
import styles from './Header.module.css';

const DEFAULT_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Profile', href: '/#profile' },
  { label: 'Contact', href: '/#contact' }
];

const SCROLL_THRESHOLD = 8;

export default function Header({ links = DEFAULT_LINKS }) {
  const [elevated, setElevated] = useState(false);

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

  return (
    <header
      className={`${styles.header} ${elevated ? styles.headerElevated : ''}`}
    >
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Michael Kare home">
          MICHAELKARE
        </a>
        <nav className={styles.nav} aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} className={styles.link}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
