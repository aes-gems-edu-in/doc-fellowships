import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

type LenisWindow = Window & {
  __lenis?: Lenis;
};

export default function LenisSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    (window as LenisWindow).__lenis = lenis;

    let frameId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };
    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      if ((window as LenisWindow).__lenis === lenis) {
        delete (window as LenisWindow).__lenis;
      }
    };
  }, []);

  return null;
}

export function scrollToTop(immediate = true) {
  const lenis = (window as LenisWindow).__lenis;
  if (lenis) {
    lenis.scrollTo(0, { immediate });
    return;
  }
  window.scrollTo(0, 0);
}
