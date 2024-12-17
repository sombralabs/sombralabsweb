"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import useStateStore from "@/stores/stateStore";
import Main from "@/components/Main";
import Lenis from "@studio-freight/lenis";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlashLight from "@/components/FlashLight";
import Cursor from "@/components/ui/Cursor";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function App() {
  const [lenis, setLenis] = useState(null);

  const { introDone, setDirection } = useStateStore();

  const initLenis = () => {
    const lenis = new Lenis({
      touchInertiaMultiplier: 1,
      syncTouch: true,
    });

    setLenis(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };

  const destroyLenis = () => {
    if (lenis) {
      lenis.destroy();
      setLenis(null);
    }
  };

  useEffect(initLenis, []);

  // Responsible for setting the direction of the scroll
  const touchStartY = useRef(0);
  const handleWheel = (event) => {
    if (event.deltaY > 0) setDirection(1);
    else setDirection(-1);
  };

  const handleTouchStart = (e) => (touchStartY.current = e.touches[0].clientY);

  const handleTouchMove = (e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchEndY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) setDirection(1);
      else setDirection(-1);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (["Home", "PageUp", "PageDown", "End"].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function isTouchDevice() {
    if (typeof window === "undefined") return false;

    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  return (
    <LenisContext.Provider value={{ lenis, initLenis, destroyLenis }}>
      {!isTouchDevice() && <Cursor />}

      <Navbar lenis={lenis} />
      <Main />
      <FlashLight />
      {introDone && <Footer />}
    </LenisContext.Provider>
  );
}
