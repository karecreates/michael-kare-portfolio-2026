'use client';

import { useEffect, useState } from 'react';
import LiquidChrome from './LiquidChrome';
import styles from './SiteBackdrop.module.css';

/**
 * Interactive hero backdrop (React Bits Liquid Chrome). Absolutely fills the
 * hero behind its content at a low opacity; the ink flips with the theme.
 */
export default function SiteBackdrop() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setLight(root.dataset.theme === 'light');
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.layer} aria-hidden="true">
      <LiquidChrome
        color="#ffffff"
        speed={0.2}
        amplitude={0.3}
        detail={4}
        thickness={1}
        interactive
        frequencyX={3}
        frequencyY={3}
        depth={1}
        roughness={0.3}
        exposure={1}
        rippleStrength={1}
        rippleSize={1}
        tilt={1}
        intro
        lightMode={light}
        maxDevicePixelRatio={1.5}
      />
    </div>
  );
}
