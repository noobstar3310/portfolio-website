"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { useLoaderReveal } from "@/components/loader";
import { TechStack } from "@/components/tech-stack";
import { profile, site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Widest line, "FULL-STACK DEVELOPER", is 11.45em in Inter Bold with
// tracking-tighter (measured). On desktop the headline is sized in
// container-width units so that line plus its indent covers about 76% of
// the grid, like an editorial cover.
const DESKTOP_SIZE = "5.6cqw";
// On phones the lines stack full width with no indent
const MOBILE_SIZE = "8.5cqw";
const INDENT = "12cqw";
const LINE_STAGGER_MS = 110;
// The stack fades up once the four headline lines are on their way
const STACK_DELAY_MS = 4 * LINE_STAGGER_MS + 150;

// Glitch timing: the length matches the CSS animation in globals.css
const GLITCH_MS = 360;
const GLITCH_START_MS = 1500;
const GLITCH_GAP_MIN_MS = 4000;
const GLITCH_GAP_MAX_MS = 9000;

// Now and then, glitch one headline line (never the same one twice in a row).
// Returns the index of the line glitching right now, or null.
function useGlitch(active: boolean, lineCount: number) {
  const [line, setLine] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;
    let last = -1;
    const wait = () =>
      GLITCH_GAP_MIN_MS + Math.random() * (GLITCH_GAP_MAX_MS - GLITCH_GAP_MIN_MS);

    const glitch = () => {
      // Don't burn cycles while the tab is in the background
      if (document.hidden) {
        timer = setTimeout(glitch, 1000);
        return;
      }
      let next = Math.floor(Math.random() * lineCount);
      if (next === last) next = (next + 1) % lineCount;
      last = next;
      setLine(next);
      timer = setTimeout(() => {
        setLine(null);
        timer = setTimeout(glitch, wait());
      }, GLITCH_MS);
    };
    timer = setTimeout(glitch, GLITCH_START_MS);

    return () => {
      clearTimeout(timer);
      setLine(null);
    };
  }, [active, lineCount]);

  return line;
}

// One headline line that slides up from behind its own mask
function Line({
  index,
  revealed,
  text,
  glitching,
  emphasis = false,
  className,
}: {
  index: number;
  revealed: boolean;
  text: string;
  glitching: boolean;
  emphasis?: boolean;
  className?: string;
}) {
  return (
    // Padding keeps parentheses' tails from being clipped by the mask
    <span className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
      <span
        className={cn(
          "block [transition:transform_900ms_cubic-bezier(0.22,1,0.36,1)]",
          !revealed && "translate-y-[110%]",
          className
        )}
        style={{ transitionDelay: `${index * LINE_STAGGER_MS}ms` }}
      >
        {/* data-text feeds the glitch's sliced copies (see globals.css) */}
        <span
          data-text={text}
          className={cn(
            "glitch",
            // One weight heavier than the rest for a quiet emphasis
            emphasis && "font-extrabold",
            glitching && "is-glitching"
          )}
        >
          {text}
        </span>
      </span>
    </span>
  );
}

// Hero: an editorial headline in staggered caps, tech stack band below
export function HeroStatement() {
  // Start the slide-in once the loader has lifted off the bottom of the page
  const revealed = useLoaderReveal(200);
  const lines = [
    { text: site.name },
    // The indented line gives the block its staggered edge
    { text: profile.role, className: "md:pl-[var(--indent)]" },
    { text: "Specializing in" },
    { text: `(${profile.specialty})`, emphasis: true },
  ];
  const glitchingLine = useGlitch(revealed, lines.length);

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col justify-between gap-16 bg-white px-6 pb-16 pt-32 text-black md:px-12 md:pb-20 md:pt-32"
    >
      <div
        // Auto margins centre the headline in the space above the stack band
        className="my-auto [container-type:inline-size]"
        style={
          {
            "--headline-size": MOBILE_SIZE,
            "--headline-size-md": DESKTOP_SIZE,
            "--indent": INDENT,
          } as CSSProperties
        }
      >
        <h1
          aria-label={`${site.name}, ${profile.role.toLowerCase()} specializing in ${profile.specialty.toLowerCase()}`}
          className="font-bold uppercase leading-[0.9] tracking-tighter text-[length:var(--headline-size)] md:whitespace-nowrap md:text-[length:var(--headline-size-md)]"
        >
          {lines.map((line, index) => (
            <Line
              key={line.text}
              index={index}
              revealed={revealed}
              text={line.text}
              glitching={glitchingLine === index}
              emphasis={line.emphasis}
              className={line.className}
            />
          ))}
        </h1>
      </div>

      <div
        className={cn(
          "transition-[opacity,transform] [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          !revealed && "translate-y-6 opacity-0"
        )}
        style={{ transitionDelay: `${STACK_DELAY_MS}ms` }}
      >
        <TechStack />
      </div>

      <span className="absolute bottom-6 right-6 text-xs font-medium uppercase tracking-widest md:bottom-8 md:right-12">
        Scroll
      </span>
    </section>
  );
}
