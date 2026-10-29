'use client';

import { useEffect, useRef } from 'react';
import { renderGalleryBlock } from './GalleryBlocks';
import styles from './CaseStudyGallery.module.css';

const REVEAL_TYPES = new Set([
  'image',
  'fullWidth',
  'imageGrid',
  'twoColumn',
  'asymmetricGrid',
  'bento',
  'video',
  'identityDetail',
  'tallScreenshot',
  'editorialSpread',
  'fullBleedMedia',
  'asymmetricMedia',
  'pairedMedia',
  'editorialDetail',
  'closingSpread',
  'scrollableScreenshot',
  'phoneShowcase',
]);

export default function CaseStudyGallery({ gallery = [] }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const blocks = Array.from(root.querySelectorAll('[data-cs-reveal]'));
    if (!blocks.length) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio ?? 0;
          if (ratio >= 0.22) entry.target.classList.add(styles.revealVisible);
          else if (ratio <= 0.04) entry.target.classList.remove(styles.revealVisible);
        });
      },
      { threshold: [0, 0.04, 0.22, 0.6] },
    );

    blocks.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [gallery]);

  return (
    <div ref={rootRef} className={styles.gallery}>
      {gallery.map((block, index) => {
        const canReveal = index > 0 && REVEAL_TYPES.has(block.type);
        return (
          <div
            key={`${block.type}-${index}`}
            className={`${styles.block} ${styles[`space_${block.spaceBefore || 'media'}`]} ${
              canReveal ? styles.reveal : ''
            }`}
            data-cs-reveal={canReveal ? '' : undefined}
          >
            {renderGalleryBlock(block, index)}
          </div>
        );
      })}
    </div>
  );
}
