import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to the top whenever the route (pathname) changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // or "smooth" if you want animation
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
