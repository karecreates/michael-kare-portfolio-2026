'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './FadeLines.module.css';

function signatureOf(groups) {
  return groups.map((group) => group.join('\u0001')).join('\n');
}

function measureLines(root, words) {
  const cs = getComputedStyle(root);
  const width = root.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
  if (width < 8) return null;

  const probe = document.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = [
    'position:fixed',
    'visibility:hidden',
    'pointer-events:none',
    'left:0',
    'top:0',
    `width:${width}px`,
    `font:${cs.font}`,
    `letter-spacing:${cs.letterSpacing}`,
    `word-spacing:${cs.wordSpacing}`,
    `line-height:${cs.lineHeight}`,
    `text-transform:${cs.textTransform}`,
    'white-space:normal',
    'padding:0',
    'margin:0',
  ].join(';');

  const spans = words.map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    probe.appendChild(span);
    probe.appendChild(document.createTextNode(' '));
    return span;
  });

  document.body.appendChild(probe);
  const groups = [];
  let current = [];
  let top = null;
  spans.forEach((span, index) => {
    const y = span.getBoundingClientRect().top;
    if (top === null || Math.abs(y - top) <= 1) {
      current.push(words[index]);
      if (top === null) top = y;
    } else {
      groups.push(current);
      current = [words[index]];
      top = y;
    }
  });
  if (current.length) groups.push(current);
  probe.remove();
  return groups.length ? groups : null;
}

export default function FadeLines({ as: Tag = 'p', className, text, cue = 'view' }) {
  const ref = useRef(null);
  const played = useRef(false);
  const [lines, setLines] = useState(null);
  const [active, setActive] = useState(false);
  const [settled, setSettled] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const words = String(text ?? '').trim().split(/\s+/).filter(Boolean);
  const grouped = lines ?? [words];

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !words.length) return undefined;
    let signature = '';

    const measure = () => {
      const groups = measureLines(root, words);
      if (!groups) return;
      const next = signatureOf(groups);
      if (!next || next === signature) return;
      signature = next;
      if (played.current) setSettled(true);
      setLines(groups);
    };

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(measure, 120);
    };

    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    const fonts = document.fonts?.ready?.then(() => {
      if (!played.current) measure();
    });

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
      fonts?.catch?.(() => {});
    };
  }, [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      played.current = true;
      setSettled(true);
      setActive(true);
      return undefined;
    }

    if (cue === 'load') {
      let cancelled = false;
      const play = () => {
        if (cancelled) return;
        played.current = true;
        setSettled(false);
        setPlayCount((count) => count + 1);
        setActive(true);
      };
      const root = document.documentElement;
      if (!root.hasAttribute('data-loading')) {
        play();
        return () => {
          cancelled = true;
        };
      }
      const observer = new MutationObserver(() => {
        if (root.hasAttribute('data-loading')) return;
        observer.disconnect();
        play();
      });
      observer.observe(root, { attributes: true, attributeFilter: ['data-loading'] });
      return () => {
        cancelled = true;
        observer.disconnect();
      };
    }

    let showing = false;
    const covered = () => {
      let ancestor = node.parentElement;
      while (ancestor && ancestor !== document.body) {
        if (Number(getComputedStyle(ancestor).opacity) < 0.35) return true;
        ancestor = ancestor.parentElement;
      }
      return false;
    };
    const placement = () => {
      const rect = node.getBoundingClientRect();
      const viewH = window.innerHeight || 1;
      const visible = Math.min(rect.bottom, viewH) - Math.max(rect.top, 0);
      const ratio = rect.height > 0 ? visible / rect.height : 0;
      const blocked = covered();
      if (cue === 'parent') {
        return {
          show: ratio >= 0.4 && !blocked,
          hide: blocked || ratio < 0.05,
        };
      }
      return { show: ratio >= 0.45 && !blocked, hide: blocked || ratio < 0.08 };
    };
    const update = () => {
      const { show, hide } = placement();
      if (show && !showing) {
        showing = true;
        played.current = true;
        setSettled(false);
        setPlayCount((count) => count + 1);
        setActive(true);
      } else if (hide && showing) {
        showing = false;
        setActive(false);
      }
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    let attached = window.__lenis;
    attached?.on?.('scroll', update);
    let parentObserver;
    if (cue === 'parent' && node.parentElement) {
      parentObserver = new MutationObserver(update);
      parentObserver.observe(node.parentElement, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }
    const lenisTimer = window.setInterval(() => {
      const next = window.__lenis;
      if (!next || next === attached) return;
      attached?.off?.('scroll', update);
      attached = next;
      attached.on?.('scroll', update);
    }, 300);

    return () => {
      window.clearInterval(lenisTimer);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      attached?.off?.('scroll', update);
      parentObserver?.disconnect();
    };
  }, [cue, text]);

  if (!words.length) return null;

  return (
    <Tag ref={ref} className={className}>
      {grouped.map((line, index) => (
        <span
          data-line=""
          className={`${styles.line} ${active ? (settled ? styles.settled : styles.lineIn) : ''}`}
          style={{ '--i': Math.min(index, 8) }}
          key={`${playCount}-${line[0]}-${index}`}
        >
          {line.map((word, wordIndex) => (
            <span className={styles.word} key={`${word}-${wordIndex}`}>
              {word}
              {wordIndex < line.length - 1 ? ' ' : ''}
            </span>
          ))}
          {index < grouped.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
