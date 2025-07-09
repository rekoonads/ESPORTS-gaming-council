"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination({ total, perPage }: { total: number; perPage: number }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const current = Number(params.get("page") ?? 1);
  const last = Math.max(1, Math.ceil(total / perPage));
  if (last === 1) return null;

  function link(page: number) {
    const usp = new URLSearchParams(params.toString());
    usp.set("page", page.toString());
    return `${pathname}?${usp.toString()}`;
  }

  return (
    <nav className="flex gap-2 pt-8">
      <Link
        href={link(Math.max(1, current - 1))}
        className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        aria-disabled={current === 1}
      >
        Prev
      </Link>
      <span className="px-2 text-sm">
        {current} / {last}
      </span>
      <Link
        href={link(Math.min(last, current + 1))}
        className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
        aria-disabled={current === last}
      >
        Next
      </Link>
    </nav>
  );
}