import { navItems, site } from "@/lib/content";
import { cn } from "@/lib/utils";

// Top bar: name left, slash-separated links centred, year right, set in the
// same small uppercase labels as the rest of the site
export function SiteNav({ dark }: { dark: boolean }) {
  return (
    <nav
      className={cn(
        "fixed left-0 top-0 z-50 w-full px-6 py-5 text-[10px] font-medium uppercase tracking-wider transition-colors duration-500 md:px-12 md:text-xs md:tracking-widest",
        dark ? "bg-black text-white" : "bg-white text-black"
      )}
    >
      {/* Phones: name above the links; desktop: one row with the links centred */}
      <div className="grid grid-cols-1 items-start gap-y-1.5 md:grid-cols-[1fr_auto_1fr] md:gap-x-6">
        <a href="#top" className="hover:underline">
          {site.name}
        </a>
        <ul className="flex flex-wrap md:justify-center">
          {navItems.map((item, index) => (
            <li key={item.id}>
              {index > 0 && <span className="mx-1 opacity-40 md:mx-1.5">/</span>}
              <a href={`#${item.id}`} className="hover:underline">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <span className="hidden justify-self-end md:block" suppressHydrationWarning>
          ©{new Date().getFullYear()}
        </span>
      </div>
    </nav>
  );
}
