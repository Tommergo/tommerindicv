/**
 * Hands a photo's on-screen position from a polaroid to the project page it opens,
 * so the page can fly the same photo from the card into its hero frame.
 */
type Flight = { src: string; rect: { top: number; left: number; width: number; height: number }; at: number };

let pending: Flight | null = null;

export const launchFlight = (img: HTMLImageElement | null) => {
  if (!img) return;
  const r = img.getBoundingClientRect();
  pending = { src: img.currentSrc || img.src, rect: { top: r.top, left: r.left, width: r.width, height: r.height }, at: Date.now() };
};

/** Returns the pending flight for this image (once), if it was launched in the last couple of seconds. */
export const takeFlight = (src: string): Flight | null => {
  const f = pending;
  pending = null;
  if (!f || Date.now() - f.at > 2500) return null;
  const a = new URL(f.src, location.href).pathname;
  const b = new URL(src, location.href).pathname;
  return a === b ? f : null;
};
