'use client';

import Image from 'next/image';
import styles from './TechStackOrbit.module.css';

// Replace or reorder logos here anytime.
// Each object needs: unique name + local public path.
const DEFAULT_LOGOS = [
  {
    name: 'Figma',
    src: '/placeholders/Michael_Portfolio_Images/logos/figma.svg'
  },
  {
    name: 'Framer',
    src: '/placeholders/Michael_Portfolio_Images/logos/framer_logo_icon_147284.svg'
  },
  {
    name: 'React',
    src: '/placeholders/Michael_Portfolio_Images/logos/react-1-logo.svg'
  },
  {
    name: 'Next.js',
    src: '/placeholders/Michael_Portfolio_Images/logos/nextjs.svg'
  },
  {
    name: 'JavaScript',
    src: '/placeholders/Michael_Portfolio_Images/logos/javascript-r.svg'
  },
  {
    name: 'CSS',
    src: '/placeholders/Michael_Portfolio_Images/logos/css-icon.svg'
  },
  {
    name: 'HTML',
    src: '/placeholders/Michael_Portfolio_Images/logos/html-icon.svg'
  },
  {
    name: 'Shopify',
    src: '/placeholders/Michael_Portfolio_Images/logos/shopify.svg'
  },
  {
    name: 'Adobe Illustrator',
    src: '/placeholders/Michael_Portfolio_Images/logos/adobeillustrator_logo_icon_147325.svg'
  },
  {
    name: 'Adobe Photoshop',
    src: '/placeholders/Michael_Portfolio_Images/logos/adobephotoshop_logo_icon_147324.svg'
  }
];

export default function TechStackOrbit({ logos = DEFAULT_LOGOS }) {
  const safeLogos = logos.length > 0 ? logos : DEFAULT_LOGOS;

  return (
    <section id="tech-stack" className={styles.section} aria-label="Tech stack">
      <div className={styles.inner}>
        <div className={styles.orbit} style={{ '--logo-count': safeLogos.length }}>
          <div className={styles.centerText} aria-hidden="true">
            <span>TECH</span>
            <span>STACK</span>
          </div>
          <div className={styles.orbitSpinner}>
            {safeLogos.map((logo, index) => (
              <div
                // Keep spacing even by deriving each slot from logo count + index.
                style={{
                  '--index': index,
                  '--base-angle': `${(360 / safeLogos.length) * index}deg`
                }}
                className={styles.orbitTrack}
                key={logo.name}
              >
                <div className={styles.logoCard}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={48}
                    height={48}
                    className={styles.logoImage}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
