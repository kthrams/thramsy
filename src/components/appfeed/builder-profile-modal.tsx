"use client"

import { useState, useEffect } from "react"
import {
  X,
  Bot,
  Flame,
  TrendingUp,
  Heart,
  Eye,
  Bookmark,
  Code,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import {
  type Builder,
  getAppsByBuilder,
  formatNumber,
  type AppPost,
} from "@/lib/appfeed-data"

interface BuilderProfileModalProps {
  builder: Builder | null
  onClose: () => void
}

export function BuilderProfileModal({ builder, onClose }: BuilderProfileModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [following, setFollowing] = useState(false)

  useEffect(() => {
    if (builder) {
      requestAnimationFrame(() => setIsVisible(true))
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [builder])

  if (!builder) return null

  const apps = getAppsByBuilder(builder.id)
  const isAi = builder.type === "ai-agent"

  const totalLikes = apps.reduce((sum, a) => sum + a.likes, 0)
  const totalViews = apps.reduce((sum, a) => sum + a.views, 0)
  const totalSaves = apps.reduce((sum, a) => sum + a.saves, 0)

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 overflow-y-auto
        transition-all duration-200
        ${isVisible ? "bg-black/60 backdrop-blur-sm" : "bg-black/0"}`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden my-4
          transition-all duration-300 ease-out
          ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header / Cover */}
        <div
          className={`h-32 ${
            isAi
              ? "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500"
              : "bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-800"
          }`}
        />

        {/* Profile info */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-800 border-4 border-white dark:border-zinc-900 flex items-center justify-center text-4xl shadow-lg">
              {builder.avatar}
            </div>
            <div className="flex-1 mb-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                  {builder.name}
                </h2>
                {isAi && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">
                    <Bot className="w-3 h-3" />
                    AI Agent
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{builder.handle}</p>
            </div>
            <button
              onClick={() => setFollowing(!following)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                following
                  ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                  : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:opacity-90"
              }`}
            >
              {following ? "Following" : "Follow"}
            </button>
          </div>

          <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 leading-relaxed">
            {builder.bio}
          </p>

          {/* AI Agent specific info */}
          {isAi && (
            <div className="mb-4 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800/50">
              <div className="flex items-center gap-4 text-xs">
                {builder.model && (
                  <div className="flex items-center gap-1.5 text-violet-700 dark:text-violet-300">
                    <Bot className="w-3.5 h-3.5" />
                    <span className="font-medium">{builder.model}</span>
                  </div>
                )}
                {builder.streak && (
                  <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <Flame className="w-3.5 h-3.5" />
                    <span className="font-medium">{builder.streak} day streak</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-medium">Creating now</span>
                </div>
              </div>
              <p className="text-[11px] text-violet-600 dark:text-violet-400 mt-2">
                This AI agent continuously generates and iterates on apps based on engagement signals.
                Apps with more likes, saves, and comments get refined and improved automatically.
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { label: "Apps", value: builder.appsCreated, icon: <Code className="w-3.5 h-3.5" /> },
              { label: "Followers", value: builder.followers, icon: <Sparkles className="w-3.5 h-3.5" /> },
              { label: "Total Likes", value: totalLikes, icon: <Heart className="w-3.5 h-3.5" /> },
              { label: "Total Views", value: totalViews, icon: <Eye className="w-3.5 h-3.5" /> },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl"
              >
                <div className="flex items-center justify-center gap-1 text-zinc-400 dark:text-zinc-500 mb-1">
                  {stat.icon}
                </div>
                <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {formatNumber(stat.value)}
                </p>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Their apps */}
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Apps by {builder.name} ({apps.length})
          </h3>
          <div className="space-y-3">
            {apps.map((app) => (
              <div
                key={app.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${app.gradient} flex items-center justify-center shrink-0`}
                >
                  <span className="text-xl">{app.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {app.title}
                    </h4>
                    {app.iteration && (
                      <span className="text-[10px] text-violet-500 font-medium">v{app.iteration}</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{app.tagline}</p>
                </div>
                <div className="shrink-0 flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {formatNumber(app.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="w-3 h-3" />
                    {formatNumber(app.saves)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
