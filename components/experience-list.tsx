"use client";

import { useEffect, useRef, useState } from "react";
import { experience, type Experience } from "@/lib/content";
import { cn } from "@/lib/utils";

// Rules touching a flipped row hide, so its full-width face has clean edges
const hideWhenAboveRowFlips = "[@media(hover:hover)]:[li:hover+li>&]:border-transparent";

export function ExperienceList({ dark }: { dark: boolean }) {
  return (
    <ul className="mt-16 md:mt-24">
      {experience.map((item) => (
        <ExperienceRow
          key={`${item.company}-${item.period}`}
          item={item}
          dark={dark}
        />
      ))}
      <li aria-hidden="true">
        <div className={cn("border-t border-current", hideWhenAboveRowFlips)} />
      </li>
    </ul>
  );
}

function RowContent({ item }: { item: Experience }) {
  return (
    <div className="grid grid-cols-1 gap-y-4 py-8 md:grid-cols-4">
      <div className="md:col-span-2 md:pr-8">
        <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
        <p className="mt-1 text-lg">{item.company}</p>
      </div>
      <p className="md:pr-8">{item.description}</p>
      <p className="text-sm opacity-60 md:text-right">{item.period}</p>
    </div>
  );
}

// Each row is a cube: on hover it rolls upward to reveal the same row in
// inverted colors on its bottom face.
function ExperienceRow({ item, dark }: { item: Experience; dark: boolean }) {
  const frontRef = useRef<HTMLDivElement>(null);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    const front = frontRef.current;
    if (!front) return;

    // A cube is as deep as it is tall, so it turns around a centre that sits
    // half the row's height behind the screen.
    const observer = new ResizeObserver(() =>
      setDepth(front.offsetHeight / 2)
    );
    observer.observe(front);

    return () => observer.disconnect();
  }, []);

  return (
    <li className="group relative -mx-6 [perspective:1200px] hover:z-10 md:-mx-12">
      {/* The rule stays on the grid; the faces below run edge to edge */}
      <div
        aria-hidden="true"
        className={cn(
          "mx-6 border-t border-current md:mx-12",
          "[@media(hover:hover)]:group-hover:border-transparent",
          hideWhenAboveRowFlips
        )}
      />
      <div
        className={cn(
          "relative [transform-style:preserve-3d]",
          // Explicit properties: tailwindcss-animate makes duration-[…]/ease-[…] ambiguous
          "[transition:transform_200ms_cubic-bezier(0.65,0,0.35,1)] motion-reduce:[transition:none]",
          "[@media(hover:hover)]:group-hover:[transform:rotateX(90deg)]"
        )}
        style={{ transformOrigin: `50% 50% ${-depth}px` }}
      >
        <div
          ref={frontRef}
          className={cn(
            "px-6 transition-colors duration-500 [backface-visibility:hidden] md:px-12",
            dark ? "bg-black" : "bg-white"
          )}
        >
          <RowContent item={item} />
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-full h-full origin-top px-6 [backface-visibility:hidden] [transform:rotateX(-90deg)] md:px-12",
            dark ? "bg-white text-black" : "bg-black text-white"
          )}
        >
          <RowContent item={item} />
        </div>
      </div>
    </li>
  );
}
