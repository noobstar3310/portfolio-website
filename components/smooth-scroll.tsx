"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Site-wide momentum scrolling. Anchor links (nav, "Get in touch") glide too.
export function SmoothScroll() {
  useEffect(() => {
    // Keep native scrolling for visitors who ask for less motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // autoToggle pauses Lenis while the page overflow is locked (loader)
    const lenis = new Lenis({ autoRaf: true, anchors: true, autoToggle: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
