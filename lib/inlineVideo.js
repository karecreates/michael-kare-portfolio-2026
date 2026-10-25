const pending = new Set();
let listening = false;

function arm(video) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', 'true');
}

function visible(video) {
  const box = video.getBoundingClientRect();
  return box.width > 0 && box.bottom > 0 && box.top < window.innerHeight;
}

function onGesture() {
  const queued = [...pending];
  pending.clear();
  window.removeEventListener('pointerdown', onGesture, true);
  window.removeEventListener('keydown', onGesture);
  listening = false;
  queued.forEach((video) => {
    if (!video.isConnected || !visible(video)) return;
    arm(video);
    video.play().catch(() => {});
  });
}

function listen() {
  if (listening || typeof window === 'undefined') return;
  listening = true;
  window.addEventListener('pointerdown', onGesture, true);
  window.addEventListener('keydown', onGesture);
}

export function playInline(video) {
  if (!video) return Promise.resolve();
  arm(video);
  const attempt = video.play();
  if (!attempt || typeof attempt.catch !== 'function') return Promise.resolve();
  return attempt.catch((error) => {
    if (video.isConnected) {
      pending.add(video);
      listen();
    }
    return Promise.reject(error);
  });
}

export function releaseInline(video) {
  if (!video) return;
  pending.delete(video);
}
