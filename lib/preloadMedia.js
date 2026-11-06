function isVideoUrl(url) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(url || '');
}

function preloadImage(src) {
  if (!src || typeof window === 'undefined') return;
  const image = new window.Image();
  image.decoding = 'async';
  image.src = src;
  image.decode?.().catch(() => {});
}

function preloadVideo(src) {
  if (!src || typeof window === 'undefined') return;
  // Safari often ignores preload=auto on a detached <video>. Fetching the
  // file into the HTTP cache is what actually makes the first play instant.
  fetch(src, {
    cache: 'force-cache',
    credentials: 'same-origin',
    priority: 'low',
  }).catch(() => {});
}

export function preloadMedia(urls = []) {
  [...new Set(urls.filter(Boolean))].forEach((url) => {
    if (isVideoUrl(url)) preloadVideo(url);
    else preloadImage(url);
  });
}

export function whenPageReady(callback) {
  if (typeof window === 'undefined') return () => {};
  const run = () => {
    window.requestAnimationFrame(callback);
  };
  if (!document.documentElement.hasAttribute('data-loading')) {
    run();
    return () => {};
  }
  const observer = new MutationObserver(() => {
    if (document.documentElement.hasAttribute('data-loading')) return;
    observer.disconnect();
    run();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-loading'],
  });
  return () => observer.disconnect();
}
