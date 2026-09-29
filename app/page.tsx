"use client";

import { useEffect, useRef, useState } from "react";
import type React from "react";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { ExperienceList } from "@/components/experience-list";
import { HeroStatement } from "@/components/hero-statement";
import { ProjectList } from "@/components/project-list";
import { SectionHeader } from "@/components/section-header";
import { SiteNav } from "@/components/site-nav";
import { sections } from "@/lib/content";
import { cn } from "@/lib/utils";

function useInView(
  ref: React.RefObject<HTMLElement | null>,
  rootMargin: string
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin }
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

export default function Home() {
  const experienceRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // Go dark while the experience section crosses the middle of the
  // viewport, whatever the section's height or the screen size.
  const isDarkTheme = useInView(experienceRef, "-45% 0px -45% 0px");
  // Contact is always black, so darken the nav once it slides underneath.
  const contactUnderNav = useInView(contactRef, "0px 0px -90% 0px");

  const themedSection = cn(
    "px-6 py-32 transition-colors duration-500 md:px-12",
    isDarkTheme ? "bg-black text-white" : "bg-white text-black"
  );

  return (
    <main className="min-h-screen bg-white">
      <SiteNav dark={isDarkTheme || contactUnderNav} />
      <HeroStatement />

      <section id={sections.about.id} className={themedSection}>
        <About />
      </section>

      <section
        id={sections.experience.id}
        ref={experienceRef}
        // Mid-roll, the edge-to-edge cube faces bulge past the screen sides
        className={cn(themedSection, "overflow-x-clip")}
      >
        <SectionHeader
          number={sections.experience.number}
          title={sections.experience.label}
        />
        <ExperienceList dark={isDarkTheme} />
      </section>

      <section id={sections.projects.id} className={themedSection}>
        <SectionHeader
          number={sections.projects.number}
          title={sections.projects.label}
        />
        <ProjectList dark={isDarkTheme} />
      </section>

      <section
        id={sections.contact.id}
        ref={contactRef}
        className="bg-black px-6 pb-8 pt-32 text-white md:px-12"
      >
        <Contact />
      </section>
    </main>
  );
}
