// components/Product page/ProductSearchBar.tsx
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ProductSearchBarContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const urlSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(urlSearch);

  // Sync local input if URL changes externally (e.g., clicking "Clear all")
  useEffect(() => {
    setQuery(urlSearch);
  }, [urlSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (query.trim()) {
      params.set("search", query.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full sm:w-auto font-sans"
    >
      <div className="relative flex-1 sm:w-64 md:w-72">
        {/* Magnifying Glass Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search pieces, materials..."
          aria-label="Search products"
          className="w-full h-tap pl-10 pr-8 bg-surface border border-field border-r-0 text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-brand transition-colors"
        />

        {/* Clear Input Button */}
        {query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-ink-subtle hover:text-ink cursor-pointer"
          >
            ✕
          </button>
        )}
      </div>

      {/* Explicit Search Submit Button */}
      <button
        type="submit"
        className="h-tap px-5 bg-brand hover:bg-brand-deep text-on-brand text-xs tracking-button uppercase font-semibold transition-colors cursor-pointer shrink-0"
      >
        Search
      </button>
    </form>
  );
}

export default function ProductSearchBar() {
  return (
    <Suspense
      fallback={
        <div className="w-full sm:w-80 h-tap bg-surface-cream animate-pulse border border-line" />
      }
    >
      <ProductSearchBarContent />
    </Suspense>
  );
}