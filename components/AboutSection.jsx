'use client';

import { useMemo, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import styles from './AboutSection.module.css';

const INITIAL_LINE_OPACITY = 0.25;
const WORD_SPLIT_REGEX = /\S+\s*/g;

function getLineOpacity(index, totalLines, progress) {
  if (totalLines <= 0) return 1;
  const revealWindow = 1 / totalLines;
  const start = index * revealWindow * 0.9;
  const end = start + revealWindow * 1.1;
  const normalized = Math.max(0, Math.min(1, (progress - start) / (end - start)));
  return INITIAL_LINE_OPACITY + normalized * (1 - INITIAL_LINE_OPACITY);
}

export default function AboutSection({ data }) {
  const title = data.title ?? 'About Me';
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const paragraphWords = useMemo(
    () =>
      data.paragraphs.map((paragraph) => {
        const matches = paragraph.match(WORD_SPLIT_REGEX);
        return matches ?? [paragraph];
      }),
    [data.paragraphs]
  );
  const totalWords = useMemo(
    () => paragraphWords.reduce((sum, words) => sum + words.length, 0),
    [paragraphWords]
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 82%', 'end 32%']
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setScrollProgress(latest);
  });

  let wordIndex = 0;

  return (
    <div ref={sectionRef} className={styles.about}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.bio}>
        {paragraphWords.map((words, paragraphIndex) => (
          <p key={`${paragraphIndex}-${words[0] ?? 'word'}`} className={styles.paragraph}>
            {words.map((word) => {
              const currentIndex = wordIndex++;
              const opacity = getLineOpacity(currentIndex, totalWords, scrollProgress);
              const translateY = (1 - opacity) * 12;
              return (
                <span
                  key={`${paragraphIndex}-${currentIndex}`}
                  className={styles.revealLine}
                  style={{ opacity, transform: `translate3d(0, ${translateY}px, 0)` }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        ))}
      </div>

      <div className={styles.contact}>
        <a className={styles.email} href={`mailto:${data.email}`}>
          {data.email}
        </a>
        <p className={styles.location}>{data.location}</p>
      </div>

      <nav className={styles.socials} aria-label="Social links">
        {data.socials.map((social) => (
          <a key={social.label} href={social.href} className={styles.social}>
            {social.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
