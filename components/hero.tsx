"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { contact, hero, sections } from "@/lib/content";

const roleClass = "block text-[10vw] leading-none";

const TypeAnimation = dynamic(
  () => import("react-type-animation").then((mod) => mod.TypeAnimation),
  {
    ssr: false,
    // Reserve the line so the hero doesn't jump when the animation loads
    loading: () => <span className={roleClass}>&nbsp;</span>,
  }
);

export function Hero() {
  return (
    <section
      id="top"
      className="flex min-h-[70svh] flex-col justify-between bg-white px-6 pb-8 pt-32 text-black md:min-h-screen md:px-12 md:pt-40"
    >
      <h1 className="font-bold tracking-tighter">
        <span className="block text-[15vw] leading-[0.85]">
          {hero.headline}
        </span>
        <TypeAnimation
          sequence={hero.roles.flatMap((role) => [role, 2000])}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          className={roleClass}
        />
      </h1>

      <div className="mt-16 grid grid-cols-2 gap-y-8 border-t border-current pt-6 md:grid-cols-4">
        {hero.details.map((detail) => (
          <div key={detail.label} className="pr-6">
            <p className="text-xs font-medium uppercase tracking-widest">
              {detail.label}
            </p>
            <p className="mt-2 text-sm opacity-60">{detail.value}</p>
          </div>
        ))}
        <ul className="pr-6 text-sm">
          {hero.focus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div>
          <a
            href={`#${sections.contact.id}`}
            className="inline-flex items-center text-sm font-bold hover:underline"
          >
            {contact.heading}
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
