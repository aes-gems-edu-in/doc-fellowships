import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NetworkStatus from "../components/Network";
import { scrollToTop } from "../components/LenisSmoothScroll";

const MainLayout = () => {
  const location = useLocation();

  useEffect(() => {
    scrollToTop(true);
    const timer = window.setTimeout(() => {
      scrollToTop(true);
    }, 50);
    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <>
      <NetworkStatus />
      <Outlet />
    </>
  );
};

export default MainLayout;
