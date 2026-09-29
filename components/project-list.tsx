import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ProjectList({ dark }: { dark: boolean }) {
  return (
    <ul className="mt-16 md:mt-24">
      {projects.map((project) => (
        <li key={project.link}>
          {/* The hover fill runs edge to edge; the row content stays on the grid */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "-mx-6 block px-6 transition-colors duration-300 md:-mx-12 md:px-12",
              dark
                ? "hover:bg-white hover:text-black"
                : "hover:bg-black hover:text-white"
            )}
          >
            <div className="grid grid-cols-1 gap-y-3 border-t border-current py-8 md:grid-cols-4 md:items-baseline">
              <h3 className="text-3xl font-bold tracking-tight md:col-span-2 md:pr-8 md:text-4xl">
                {project.title}
              </h3>
              <p className="text-lg md:pr-8">{project.event}</p>
              <span className="inline-flex items-center text-sm underline md:justify-self-end">
                View Project <ArrowUpRight className="ml-1 h-4 w-4" />
              </span>
            </div>
          </a>
        </li>
      ))}
      <li aria-hidden="true" className="border-t border-current" />
    </ul>
  );
}
