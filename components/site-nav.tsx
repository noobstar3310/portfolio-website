import { ArrowUpRight } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Top bar: handle left, slash-separated links centred, resume link right, set
// in the same small uppercase labels as the rest of the site
export function SiteNav({ dark }: { dark: boolean }) {
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 w-full px-6 py-5 text-[10px] font-medium uppercase tracking-wider transition-colors duration-500 md:px-12 md:text-xs md:tracking-widest",
        dark ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* Phones: handle and resume on the first row, links below;
          desktop: one row with the links centred */}
      <div className="grid grid-cols-[1fr_auto] items-start gap-y-1.5 md:grid-cols-[1fr_auto_1fr] md:gap-x-6">
        {/* An ENS name, so it keeps its lowercase */}
        <a href="#top" className="normal-case hover:underline">
          {site.handle}
        </a>
        <ul className="order-last col-span-2 flex flex-wrap md:order-none md:col-span-1 md:justify-center">
          {navItems.map((item, index) => (
            <li key={item.id}>
              {index > 0 && <span className="mx-1 opacity-40 md:mx-1.5">/</span>}
              <a href={`#${item.id}`} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-self-end hover:underline"
        >
          Resume
          <ArrowUpRight className="ml-1 h-3 w-3" />
        </a>
      </div>
    </nav>
  );
}
