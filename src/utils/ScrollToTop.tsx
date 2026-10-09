import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import { captureUtmFromUrl } from "./utm";

type LenisWindow = Window & {
  __lenis?: { scrollTo: (value: number, options?: { immediate?: boolean }) => void };
};

const ScrollToTop = () => {
  const { pathname, search } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    captureUtmFromUrl();
  }, [pathname, search]);

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
