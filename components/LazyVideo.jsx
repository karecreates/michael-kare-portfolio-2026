'use client';

import { useEffect, useRef, useState } from 'react';
import { playInline, releaseInline } from '@/lib/inlineVideo';

/**
 * Muted, looping, inline video that only fetches its file once it is close to
 * the viewport, plays while on screen, and pauses when scrolled away so
 * off-screen decoding never competes with the page's animations.
 *
 * `eager` loads immediately (for above-the-fold media). `startAt` seeks to a
 * time (in seconds) before the first play and on every loop.
 */
export default function LazyVideo({
  src,
  className,
  poster,
  eager = false,
  startAt = 0,
  loop = true,
  rootMargin = '60% 0px',
  'aria-label': ariaLabel,
  ...rest
}) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(eager);

  useEffect(() => {
    if (armed) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setArmed(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [armed, rootMargin]);

  useEffect(() => {
    const node = ref.current;
    if (!node || !armed) return undefined;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let onScreen = false;

    const seek = () => {
      if (startAt > 0 && Math.abs(node.currentTime - startAt) > 0.5 && node.currentTime < startAt) {
        node.currentTime = startAt;
      }
    };
    const play = () => {
      if (!onScreen || motion.matches) return;
      seek();
      playInline(node).catch(() => {});
    };
    const pause = () => {
      releaseInline(node);
      if (!node.paused) node.pause();
    };
    const onEnded = () => {
      if (!loop) return;
      node.currentTime = startAt;
      play();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        onScreen = entries.some((entry) => entry.isIntersecting);
        if (onScreen) play();
        else pause();
      },
      { threshold: 0.05 },
    );
    observer.observe(node);
    node.addEventListener('loadedmetadata', seek);
    node.addEventListener('loadeddata', play);
    node.addEventListener('ended', onEnded);
    motion.addEventListener('change', play);

    return () => {
      observer.disconnect();
      node.removeEventListener('loadedmetadata', seek);
      node.removeEventListener('loadeddata', play);
      node.removeEventListener('ended', onEnded);
      motion.removeEventListener('change', play);
      pause();
    };
  }, [armed, loop, startAt]);

  // The native `loop` attribute restarts at 0, so clips with a start offset
  // loop through the `ended` handler instead.
  const nativeLoop = loop && !(startAt > 0);

  return (
    <video
      ref={ref}
      className={className}
      src={armed ? src : undefined}
      poster={poster}
      muted
      loop={nativeLoop}
      playsInline
      webkit-playsinline="true"
      autoPlay
      preload={eager ? 'auto' : 'metadata'}
      controlsList="nodownload noremoteplayback"
      disablePictureInPicture
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
