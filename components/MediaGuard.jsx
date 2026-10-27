'use client';

import { useEffect } from 'react';

const MEDIA = 'img, video, picture, canvas, figure, [data-media-guard]';

/**
 * Blocks the browser's "Save image / video as…" affordances on all media:
 * right-click context menu, drag-to-desktop, and iOS long-press callout
 * (the latter via CSS in globals.css). Deterrent only, not DRM.
 */
export default function MediaGuard() {
  useEffect(() => {
    const block = (event) => {
      if (event.target instanceof Element && event.target.closest(MEDIA)) {
        event.preventDefault();
      }
    };
    document.addEventListener('contextmenu', block);
    document.addEventListener('dragstart', block);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('dragstart', block);
    };
  }, []);
  return null;
}
