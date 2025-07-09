"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function SortSelect() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const sort = params.get("sort") ?? "date_desc";

  const handleChange = (value: string) => {
    const usp = new URLSearchParams(params.toString());
    usp.set("sort", value);
    router.push(`${pathname}?${usp.toString()}`);
  };

  return (
    <select
      value={sort}
      onChange={(e) => handleChange(e.target.value)}
      className="rounded-md border bg-background px-3 py-2 text-sm"
    >
      <option value="date_desc">Newest</option>
      <option value="date_asc">Oldest</option>
      <option value="title_asc">Title A→Z</option>
    </select>
  );
}