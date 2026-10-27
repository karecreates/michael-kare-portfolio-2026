'use client';

import { useEffect, useRef, useState } from 'react';
import GalleryMedia from './GalleryMedia';
import styles from './CaseStudyGallery.module.css';

/**
 * Row of phone screens. On wide layouts the screens sit side by side; when
 * the row has to scroll (phones), it becomes a centred snap carousel with
 * pagination dots so the reader can tell how many screens there are.
 */
export default function PhoneRow({ images, label }) {
  const rowRef = useRef(null);
  const [active, setActive] = useState(0);
  const [scrolls, setScrolls] = useState(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return undefined;

    const measure = () => {
      setScrolls(row.scrollWidth - row.clientWidth > 8);
    };
    const onScroll = () => {
      const slides = [...row.children];
      if (!slides.length) return;
      const centre = row.scrollLeft + row.clientWidth / 2;
      let best = 0;
      let bestDistance = Infinity;
      slides.forEach((slide, index) => {
        const slideCentre = slide.offsetLeft + slide.offsetWidth / 2;
        const distance = Math.abs(slideCentre - centre);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = index;
        }
      });
      setActive(best);
    };

    measure();
    onScroll();
    const observer = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    observer.observe(row);
    row.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      row.removeEventListener('scroll', onScroll);
    };
  }, [images.length]);

  const goTo = (index) => {
    const row = rowRef.current;
    const slide = row?.children[index];
    if (!row || !slide) return;
    row.scrollTo({
      left: slide.offsetLeft - (row.clientWidth - slide.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.phonesWrap}>
      <div
        ref={rowRef}
        className={styles.phonesRow}
        role="group"
        aria-label={label}
      >
        {images.map((image) => (
          <figure key={image.src} className={styles.phone}>
            <GalleryMedia asset={image} />
          </figure>
        ))}
      </div>
      {scrolls && images.length > 1 ? (
        <div className={styles.phoneDots} role="tablist" aria-label={`${label} pages`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Screen ${index + 1} of ${images.length}`}
              className={`${styles.phoneDot} ${index === active ? styles.phoneDotActive : ''}`}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
