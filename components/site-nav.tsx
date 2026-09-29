import { navItems, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteNav({ dark }: { dark: boolean }) {
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 w-full px-6 py-6 transition-colors duration-500 md:px-12 md:py-8",
        dark ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      <div className="grid grid-cols-2 items-start md:grid-cols-4">
        <a href="#top" className="text-lg font-bold md:text-xl">
          {site.name}
          <sup className="ml-1 text-xs">TM</sup>
        </a>
        {/* Two links per column, filling columns 3 and 4 on desktop */}
        <ul className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-y-1 text-sm md:col-span-2 md:col-start-3 md:text-base">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="hover:underline">
                <span className="mr-2 hidden text-xs tabular-nums opacity-50 md:inline">
                  {item.number}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
