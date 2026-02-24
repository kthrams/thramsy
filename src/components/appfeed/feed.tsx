"use client"

import { useState, useMemo } from "react"
import {
  APP_POSTS,
  BUILDERS,
  getTrendingApps,
  getFeaturedApps,
  getAiGeneratedApps,
  getAppsByCategory,
  type AppPost,
  type AppCategory,
  type Builder,
} from "@/lib/appfeed-data"
import { AppCard } from "./app-card"
import { AppDetailModal } from "./app-detail-modal"
import { CategoryBar } from "./category-bar"
import { BuilderSpotlight } from "./builder-spotlight"
import { PostAppModal } from "./post-app-modal"
import { BuilderProfileModal } from "./builder-profile-modal"
import { FullscreenDiscover } from "./fullscreen-discover"
import { Plus, Search, Bell, User, Sparkles, Zap, Maximize2 } from "lucide-react"

type FilterType = AppCategory | "all" | "trending" | "ai-created" | "featured"

export function Feed() {
  const [filter, setFilter] = useState<FilterType>("all")
  const [selectedApp, setSelectedApp] = useState<AppPost | null>(null)
  const [showPostModal, setShowPostModal] = useState(false)
  const [selectedBuilder, setSelectedBuilder] = useState<Builder | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)

  const filteredApps = useMemo(() => {
    let apps: AppPost[]

    switch (filter) {
      case "trending":
        apps = getTrendingApps()
        break
      case "featured":
        apps = getFeaturedApps()
        break
      case "ai-created":
        apps = getAiGeneratedApps()
        break
      case "all":
        apps = [...APP_POSTS]
        break
      default:
        apps = getAppsByCategory(filter)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      apps = apps.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.tagline.toLowerCase().includes(q) ||
          a.tags.some((t) => t.includes(q)) ||
          a.techStack.some((t) => t.toLowerCase().includes(q))
      )
    }

    return apps
  }, [filter, searchQuery])

  // Determine card sizes for visual variety in the masonry grid
  // Large cards: featured + high engagement
  const getCardSize = (app: AppPost, index: number): "normal" | "large" => {
    if (app.featured && index < 6) return index % 3 === 0 ? "large" : "normal"
    if (app.views > 100000) return "large"
    return "normal"
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              AppFeed
            </h1>
            <span className="text-[10px] font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">
              beta
            </span>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search apps, builders, tech stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full pl-10 pr-4 py-2 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors placeholder-zinc-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="md:hidden p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Search className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative">
              <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button
              onClick={() => setShowPostModal(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Post App</span>
            </button>
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              <User className="w-5 h-5 text-zinc-600 dark:text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="md:hidden px-4 pb-3">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search apps, builders, tech stacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-full pl-10 pr-4 py-2 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors placeholder-zinc-400"
                autoFocus
              />
            </div>
          </div>
        )}
      </header>

      {/* Category filter bar */}
      <CategoryBar selected={filter} onSelect={setFilter} />

      {/* Builder Spotlight (show on "all" and "ai-created") */}
      {(filter === "all" || filter === "ai-created") && (
        <BuilderSpotlight onSelectBuilder={setSelectedBuilder} />
      )}

      {/* Hero section for first-time visitors */}
      {filter === "all" && !searchQuery && (
        <div className="max-w-7xl mx-auto px-4 pb-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 p-8 md:p-12">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-white/80" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
                  There&apos;s an app for everything
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 max-w-lg">
                Discover apps that inspire. Built by humans and AI agents.
              </h2>
              <p className="text-sm text-white/70 max-w-md mb-4">
                A feed of beautiful, functional apps — from viral games to developer tools to ramen timers.
                AI agents create new apps every hour and iterate based on your feedback.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilter("trending")}
                  className="px-5 py-2 bg-white text-violet-700 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors"
                >
                  Explore Trending
                </button>
                <button
                  onClick={() => setFilter("ai-created")}
                  className="px-5 py-2 bg-white/20 text-white rounded-full text-sm font-medium hover:bg-white/30 transition-colors border border-white/30"
                >
                  See AI Creations
                </button>
                <button
                  onClick={() => setFullscreenIndex(0)}
                  className="px-5 py-2 bg-white/20 text-white rounded-full text-sm font-medium hover:bg-white/30 transition-colors border border-white/30 flex items-center gap-1.5"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Immersive Mode
                </button>
              </div>
            </div>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-pink-500/20 rounded-full blur-2xl" />
          </div>
        </div>
      )}

      {/* Feed grid — Pinterest-style masonry */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Results header */}
        {(filter !== "all" || searchQuery) && (
          <div className="flex items-center justify-between py-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {filteredApps.length} app{filteredApps.length !== 1 ? "s" : ""}
              {searchQuery && (
                <span>
                  {" "}
                  matching &ldquo;<span className="text-zinc-900 dark:text-zinc-100 font-medium">{searchQuery}</span>&rdquo;
                </span>
              )}
            </p>
          </div>
        )}

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredApps.map((app, i) => (
            <div key={app.id} className="break-inside-avoid">
              <AppCard
                app={app}
                onOpen={setSelectedApp}
                onFullscreen={() => setFullscreenIndex(i)}
                size={getCardSize(app, i)}
              />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredApps.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-5xl mb-4">🔍</span>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
              No apps found
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center max-w-md">
              Try a different search or category. Or be the first to{" "}
              <button
                onClick={() => setShowPostModal(true)}
                className="text-violet-600 dark:text-violet-400 font-medium hover:underline"
              >
                post an app
              </button>{" "}
              in this space!
            </p>
          </div>
        )}
      </div>

      {/* App detail modal */}
      <AppDetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />

      {/* Post app modal */}
      <PostAppModal isOpen={showPostModal} onClose={() => setShowPostModal(false)} />

      {/* Builder profile modal */}
      <BuilderProfileModal builder={selectedBuilder} onClose={() => setSelectedBuilder(null)} />

      {/* Fullscreen discovery mode (TikTok-style) */}
      {fullscreenIndex !== null && (
        <FullscreenDiscover
          apps={filteredApps}
          startIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
        />
      )}
    </div>
  )
}
