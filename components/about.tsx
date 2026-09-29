import Image from "next/image";
import { about, portrait, sections } from "@/lib/content";

export function About() {
  return (
    <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:items-center">
      <div className="col-span-2 lg:col-span-3 lg:pr-16">
        <p className="text-xs font-medium uppercase tracking-widest">
          <span className="mr-2 tabular-nums">{sections.about.number}</span>
          {sections.about.label}
        </p>
        <p className="mt-3 text-3xl/[1.3] tracking-tight md:text-4xl/[1.3] 2xl:text-5xl/[1.3]">
          {about}
        </p>
      </div>
      {/* Beside the text on desktop, stacked under it on smaller screens */}
      <div className="relative col-start-2 aspect-square overflow-hidden rounded-xl lg:col-start-4">
        <Image
          src={portrait.image}
          alt={portrait.alt}
          placeholder="blur"
          // Load up front so the loading screen waits for it
          loading="eager"
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
