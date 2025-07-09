"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(params.get("search") ?? "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const usp = new URLSearchParams(params.toString());
    if (value) usp.set("search", value);
    else usp.delete("search");
    router.push(`${pathname}?${usp.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search…"
        className="w-52 rounded-md border px-3 py-2 text-sm"
      />
      <button type="submit" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
        Go
      </button>
    </form>
  );
}