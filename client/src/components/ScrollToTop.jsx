import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jab bhi route (pathname) change hoga, window top par chali jayegi
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // Yeh component UI mein kuch bhi render nahi karega
};

export default ScrollToTop;