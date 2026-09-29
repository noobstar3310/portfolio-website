"use client";

import { useId, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { stack } from "@/lib/content";
import { stackIcons } from "@/lib/stack-icons";
import { cn } from "@/lib/utils";

type StackItem = (typeof stack)[number];

// Each logo gets a slot 1/12 of the visible width (at least 6rem), so one set of
// 13 always spans more than the view: the band never runs empty and a logo's
// copy only scrolls in after the original has left.
const SLOT_WIDTH = "max(6rem, calc(100cqw / 12))";
// Popup width in px (w-56), and the minimum gap it keeps from the band's edges
const POPUP_WIDTH = 224;
const EDGE_GAP = 12;

function Logo({ name }: { name: string }) {
  const icon = stackIcons[name];
  if (!icon) return null;

  return (
    <svg
      viewBox={icon.viewBox}
      aria-hidden="true"
      className="h-10 w-10 shrink-0 fill-current"
    >
      <path d={icon.path} fillRule={icon.evenOdd ? "evenodd" : undefined} />
    </svg>
  );
}

interface Popup {
  item: StackItem;
  // Popup centre and the logo's top edge, relative to the band
  x: number;
  y: number;
  // How far the pointer sits from the popup's centre, to keep aiming at the logo
  arrowOffset: number;
}

// Tech stack as a slow right-to-left logo marquee on a soft grey band that
// runs edge to edge. Hovering, focusing or tapping a logo pauses the marquee
// and shows what the tool is used for; reduced motion shows a still row.
export function TechStack() {
  const bandRef = useRef<HTMLDivElement>(null);
  const popupId = useId();
  const [popup, setPopup] = useState<Popup | null>(null);
  const [open, setOpen] = useState(false);

  const show = (item: StackItem, target: HTMLElement) => {
    const band = bandRef.current;
    if (!band) return;
    const bandRect = band.getBoundingClientRect();
    const logoRect = target.getBoundingClientRect();
    const centre = logoRect.left + logoRect.width / 2 - bandRect.left;
    // Keep the popup inside the band horizontally
    const half = POPUP_WIDTH / 2 + EDGE_GAP;
    const x = Math.min(Math.max(centre, half), bandRect.width - half);
    setPopup({ item, x, y: logoRect.top - bandRect.top, arrowOffset: centre - x });
    setOpen(true);
  };
  const hide = () => setOpen(false);

  // Keyboard focus can land on a logo the marquee has carried out of view. The
  // strip is overflow: clip, so the browser can't scroll it; instead, move the
  // marquee's own animation so the logo sits in the middle of the band.
  const bringIntoView = (target: HTMLElement) => {
    const track = target.closest<HTMLElement>(".marquee-track");
    const view = track?.parentElement;
    const animation = track?.getAnimations()[0];
    // No animation with reduced motion, where every logo is already visible
    if (!track || !view || !animation) return;

    const viewRect = view.getBoundingClientRect();
    const logoRect = target.getBoundingClientRect();
    if (logoRect.left >= viewRect.left && logoRect.right <= viewRect.right) return;

    const setWidth = track.scrollWidth / 2;
    const duration = Number(animation.effect?.getComputedTiming().duration);
    const current = Number(animation.currentTime) % duration;
    // Pixels the track must move right; the track moves left over time, so go back
    const shift =
      viewRect.left + viewRect.width / 2 - (logoRect.left + logoRect.width / 2);
    // Stay within this loop rather than wrapping: wrapping would centre the
    // logo's twin in the other copy and push the focused one out of view. At
    // the ends the logo stops short of the centre but is still on screen.
    const time = current - (shift / setWidth) * duration;
    animation.currentTime = Math.min(Math.max(time, 0), duration - 1);
  };

  // Mouse shows on hover; touch relies on the tap focusing the button instead,
  // since a touch "leave" fires right after the tap
  const onPointerEnter = (item: StackItem) => (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") show(item, event.currentTarget);
  };
  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse") hide();
  };

  return (
    <div
      ref={bandRef}
      className="marquee group/marquee relative -mx-6 flex flex-col gap-5 bg-neutral-100 px-6 py-8 md:-mx-12 md:flex-row md:items-center md:gap-10 md:px-12"
    >
      <p className="shrink-0 text-xs font-medium uppercase tracking-widest">
        Proficient in
      </p>

      {/* The logos fade out at both edges instead of being cut off; the fade
          drops while a logo has focus, so one at the edge is still clear */}
      <div className="min-w-0 flex-1 overflow-clip [container-type:inline-size] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] group-has-[:focus-visible]/marquee:[mask-image:none] motion-reduce:[mask-image:none]">
        <div className="marquee-track flex w-max motion-reduce:w-full">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              // The second copy only exists to make the loop seamless
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-center motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-6 [&[aria-hidden]]:motion-reduce:hidden"
            >
              {stack.map((item) => (
                <li
                  key={item.name}
                  className="flex shrink-0 justify-center motion-reduce:!w-auto"
                  style={{ width: SLOT_WIDTH }}
                >
                  <button
                    type="button"
                    aria-label={item.name}
                    aria-describedby={
                      open && popup?.item.name === item.name ? popupId : undefined
                    }
                    // Keyboard users tab through the first copy only
                    tabIndex={copy === 0 ? 0 : -1}
                    onPointerEnter={onPointerEnter(item)}
                    onPointerLeave={onPointerLeave}
                    onFocus={(event) => {
                      bringIntoView(event.currentTarget);
                      show(item, event.currentTarget);
                    }}
                    onBlur={hide}
                    className="cursor-default p-1 outline-none focus-visible:ring-1 focus-visible:ring-black"
                  >
                    <Logo name={item.name} />
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* Drawn outside the clipped logo strip so it can rise above the band */}
      <div
        id={popupId}
        role="tooltip"
        // Closed popups keep their last text; hide it from screen readers
        aria-hidden={!open}
        className={cn(
          "pointer-events-none absolute z-10 w-56 bg-black px-3 py-2.5 text-white transition-opacity duration-150",
          open ? "opacity-100" : "opacity-0"
        )}
        style={{
          left: popup?.x ?? 0,
          top: popup?.y ?? 0,
          transform: "translate(-50%, calc(-100% - 12px))",
        }}
      >
        <p className="text-xs font-medium uppercase tracking-widest">
          {popup?.item.name}
        </p>
        <p className="mt-1 text-sm leading-snug text-white/70">
          {popup?.item.use}
        </p>
        <span
          aria-hidden="true"
          className="absolute top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-black"
          style={{ left: `calc(50% + ${popup?.arrowOffset ?? 0}px)` }}
        />
      </div>
    </div>
  );
}
