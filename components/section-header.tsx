interface SectionHeaderProps {
  number: string;
  title: string;
}

export function SectionHeader({ number, title }: SectionHeaderProps) {
  return (
    <header className="border-t border-current pt-4">
      <p className="text-xs font-medium tabular-nums tracking-widest">
        {number}
      </p>
      <h2 className="mt-4 text-[12vw] font-bold uppercase leading-[0.85] tracking-tighter">
        {title}
      </h2>
    </header>
  );
}
