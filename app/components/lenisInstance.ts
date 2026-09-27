import type Lenis from "lenis";

/*
  The live Lenis instance, for components that need to drive the scroll
  themselves (ScrollToTop). SmoothScroll owns it; this is only a handle.
  A native window.scrollTo would fight Lenis's own smoothing, and
  window.lenis is just version info, not the instance.
*/
let current: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  current = lenis;
}

export function getLenis() {
  return current;
}
