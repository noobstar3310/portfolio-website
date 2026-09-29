import { ArrowUpRight } from "lucide-react";
import { contact, sections, site } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";

export function Contact() {
  return (
    <>
      <SectionHeader number={sections.contact.number} title={contact.heading} />

      <div className="mt-16 grid grid-cols-1 md:mt-24 md:grid-cols-4">
        <p className="text-xl md:col-span-3 md:col-start-2 md:text-2xl">
          {contact.intro}
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-y-6 border-t border-current pt-8 md:mt-24 md:grid-cols-2">
        <a
          href={`mailto:${contact.email}`}
          className="inline-flex items-center text-2xl font-bold hover:underline md:text-4xl"
        >
          {contact.email}
          <ArrowUpRight className="ml-2 h-6 w-6 shrink-0" />
        </a>
        <a
          href={contact.phone.href}
          className="inline-flex items-center text-2xl font-bold hover:underline md:text-4xl"
        >
          {contact.phone.display}
          <ArrowUpRight className="ml-2 h-6 w-6 shrink-0" />
        </a>
      </div>

      <p className="mt-32 border-t border-current pt-6 text-xs uppercase tracking-widest opacity-60">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </>
  );
}
