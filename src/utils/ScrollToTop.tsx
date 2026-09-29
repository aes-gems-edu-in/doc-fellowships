import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

type LenisWindow = Window & {
  __lenis?: { scrollTo: (value: number, options?: { immediate?: boolean }) => void };
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const lenis = (window as LenisWindow).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);

    const timer = window.setTimeout(() => {
      const nextLenis = (window as LenisWindow).__lenis;
      if (nextLenis) nextLenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }, 50);

    return () => window.clearTimeout(timer);
  }, [pathname, navigationType]);

  return null;
};

export default ScrollToTop;
