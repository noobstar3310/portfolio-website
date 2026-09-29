import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProjectList({ dark }: { dark: boolean }) {
  return (
    <ul className="mt-16 grid grid-cols-1 gap-x-12 gap-y-20 md:mt-24 md:grid-cols-2 md:gap-y-24">
      {projects.map((project) => (
        <li key={project.link}>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            {/* Hairline edge so light screenshots don't melt into the page */}
            <div
              className={cn(
                "overflow-hidden rounded-xl ring-1 transition-shadow duration-500",
                dark ? "ring-white/15" : "ring-black/10"
              )}
            >
              <Image
                src={project.image}
                alt={`${project.title} landing page`}
                placeholder="blur"
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            {/* Name on the left, a one-line explainer on the right */}
            <div className="mt-6 grid grid-cols-1 items-start gap-y-3 md:grid-cols-2 md:gap-x-8">
              <h3 className="flex items-center gap-3 text-3xl font-bold tracking-tight md:text-4xl">
                {project.title}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </h3>
              <p className="leading-snug md:text-lg">{project.summary}</p>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}
