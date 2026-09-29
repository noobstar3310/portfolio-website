"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Count timing when everything has already loaded. The per-frame easing
// trails by ~0.2s, so the counter reaches 100 at about 2s.
const COUNT_DURATION = 1800;
// Pause at 100 plus the slide-up, before the loader is removed
const EXIT_DURATION = 1000;

// Fired on window when the loader starts lifting off the page
export const LOADER_REVEAL_EVENT = "loader:reveal";

// false while content should wait hidden behind the loader, true once the
// loader starts lifting (plus `delay` ms). Server HTML, reduced motion and
// pages without a loader are always true, so content is never stuck hidden.
export function useLoaderReveal(delay = 0) {
  const [revealed, setRevealed] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!document.getElementById("loader")) return;

    let timer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      timer = setTimeout(() => setRevealed(true), delay);
    };
    setRevealed(false);
    window.addEventListener(LOADER_REVEAL_EVENT, reveal, { once: true });

    return () => {
      window.removeEventListener(LOADER_REVEAL_EVENT, reveal);
      clearTimeout(timer);
    };
  }, [delay]);

  return revealed;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function whenPageLoaded() {
  const load =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) =>
          window.addEventListener("load", () => resolve(), { once: true })
        );
  return Promise.all([load, document.fonts.ready]);
}

// Full-screen counter shown until fonts and images have loaded. It is in the
// server HTML, so nothing flashes first; scrolling is locked in globals.css
// while #loader exists.
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "leaving" | "done">(
    "loading"
  );

  useEffect(() => {
    // Always reveal the site from the top
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    let loaded = false;
    whenPageLoaded().then(() => {
      loaded = true;
    });

    const start = performance.now();
    let value = 0;
    let frame = 0;

    const tick = (now: number) => {
      const timed =
        100 * easeOutCubic(Math.min((now - start) / COUNT_DURATION, 1));
      // Hold at 90 until the page has really finished loading
      const target = Math.min(timed, loaded ? 100 : 90);
      value += (target - value) * 0.2;
      // Easing only approaches the target, so snap once it's close
      if (target - value < 0.5) value = target;

      setProgress(Math.floor(value));
      if (value < 100) frame = requestAnimationFrame(tick);
      else setPhase("leaving");
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (phase !== "leaving") return;
    window.dispatchEvent(new Event(LOADER_REVEAL_EVENT));
    const timer = setTimeout(() => setPhase("done"), EXIT_DURATION);
    return () => clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      id="loader"
      role="progressbar"
      aria-label="Loading"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className={cn(
        "fixed inset-0 z-[100] flex flex-col justify-between bg-white px-6 py-6 text-black md:px-12 md:py-8",
        // Explicit properties: tailwindcss-animate makes duration-[…]/ease-[…] ambiguous
        "transition-[transform,opacity] delay-200 [transition-duration:800ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] motion-reduce:[transition-duration:300ms]",
        phase === "leaving" &&
          "-translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0"
      )}
    >
      <p className="text-lg font-bold md:text-xl">
        {site.name}
        <sup className="ml-1 text-xs">TM</sup>
      </p>
      <p className="text-[28vw] font-bold leading-[0.8] tracking-tighter tabular-nums md:text-[22vw]">
        {String(progress).padStart(3, "0")}
      </p>
    </div>
  );
}
