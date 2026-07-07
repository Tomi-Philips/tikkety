"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { Search, Loader2 } from "lucide-react";

export default function EventsFilterBar({
  initialSearch = "",
  initialCategory = "All",
  categories = []
}: {
  initialSearch?: string;
  initialCategory?: string;
  categories: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [isPending, startTransition] = useTransition();

  const updateFilters = (newSearch: string, newCat: string) => {
    const params = new URLSearchParams();
    if (newSearch) {
      params.set("q", newSearch);
    }
    if (newCat && newCat !== "All") {
      params.set("category", newCat);
    }
    
    startTransition(() => {
      router.push(`/events?${params.toString()}`);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(search, activeCategory);
  };

  return (
    <div className="space-y-6">
      {/* Search Input Form */}
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl blur opacity-25 group-focus-within:opacity-40 transition-all duration-300" />
          <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
            <div className="pl-4 text-zinc-400">
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin text-indigo-500" />
              ) : (
                <Search className="w-5 h-5 text-zinc-400 group-focus-within:text-indigo-500 transition-colors" />
              )}
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for tech events, music festivals, business seminars..."
              className="w-full px-3 py-4 text-sm bg-transparent border-0 outline-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
            />
            <button
              type="submit"
              className="mr-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-semibold hover:shadow-md hover:from-violet-700 hover:to-indigo-700 transition-all cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                updateFilters(search, cat);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isActive
                  ? "bg-zinc-900 border-zinc-900 text-white dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 shadow-sm"
                  : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:bg-zinc-850 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
