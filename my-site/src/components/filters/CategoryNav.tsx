"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export interface Category {
  _id: string;
  title: string;
  slug: string;
}

export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get("category");
  const base = pathname.split("?")[0];

  function buildLink(slug?: string) {
    const usp = new URLSearchParams(params.toString());
    if (slug) usp.set("category", slug);
    else usp.delete("category");
    usp.delete("page"); // reset pagination if any
    return `${base}?${usp.toString()}`;
  }

  return (
    <nav className="flex flex-wrap gap-2 py-4 text-sm">
      <Link
        href={buildLink()}
        className={`rounded-full px-3 py-1 ${!active ? "bg-primary text-primary-foreground" : "bg-muted"}`}
      >
        All
      </Link>
      {categories.map((c) => (
        <Link
          key={c._id}
          href={buildLink(c.slug)}
          className={`rounded-full px-3 py-1 ${active === c.slug ? "bg-primary text-primary-foreground" : "bg-muted"}`}
        >
          {c.title}
        </Link>
      ))}
    </nav>
  );
}