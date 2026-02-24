"use client"

import { CATEGORIES, type AppCategory } from "@/lib/appfeed-data"
import { Sparkles, Flame, Bot, Compass } from "lucide-react"

interface CategoryBarProps {
  selected: AppCategory | "all" | "trending" | "ai-created" | "featured"
  onSelect: (category: AppCategory | "all" | "trending" | "ai-created" | "featured") => void
}

export function CategoryBar({ selected, onSelect }: CategoryBarProps) {
  const specialFilters = [
    { id: "all" as const, label: "Discover", icon: <Compass className="w-3.5 h-3.5" /> },
    { id: "trending" as const, label: "Trending", icon: <Flame className="w-3.5 h-3.5" /> },
    { id: "featured" as const, label: "Featured", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "ai-created" as const, label: "AI-Made", icon: <Bot className="w-3.5 h-3.5" /> },
  ]

  return (
    <div className="sticky top-16 z-30 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-hide">
          {/* Special filters */}
          {specialFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onSelect(filter.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  selected === filter.id
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
            >
              {filter.icon}
              {filter.label}
            </button>
          ))}

          {/* Divider */}
          <div className="shrink-0 w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-1" />

          {/* Category filters */}
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all
                ${
                  selected === cat.id
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
