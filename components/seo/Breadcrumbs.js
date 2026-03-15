import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-white">{item.label}</span>
              ) : (
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              )}
              {!isLast ? <span className="text-slate-500">/</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
