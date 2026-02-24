"use client"

import { useState } from "react"
import {
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ExternalLink,
  GitBranch,
  Sparkles,
  TrendingUp,
  Bot,
  Code,
  Maximize2,
} from "lucide-react"
import { type AppPost, getBuilder, formatNumber } from "@/lib/appfeed-data"

interface AppCardProps {
  app: AppPost
  onOpen: (app: AppPost) => void
  onFullscreen?: () => void
  size?: "normal" | "large"
}

export function AppCard({ app, onOpen, onFullscreen, size = "normal" }: AppCardProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(app.likes)
  const [saveCount, setSaveCount] = useState(app.saves)
  const builder = getBuilder(app.builderId)

  if (!builder) return null

  const isAiGenerated = builder.type === "ai-agent"

  return (
    <div
      className={`group relative rounded-2xl overflow-hidden cursor-pointer
        bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800
        hover:border-zinc-300 dark:hover:border-zinc-700
        shadow-sm hover:shadow-xl
        transition-all duration-300 ease-out
        hover:-translate-y-1
        ${size === "large" ? "row-span-2" : ""}`}
      onClick={() => onOpen(app)}
    >
      {/* App Preview / Visual Card */}
      <div
        className={`relative bg-gradient-to-br ${app.gradient} ${
          size === "large" ? "h-72" : "h-44"
        } flex items-center justify-center overflow-hidden`}
      >
        {/* Floating icon */}
        <span className={`${size === "large" ? "text-7xl" : "text-5xl"} drop-shadow-lg select-none`}>
          {app.icon}
        </span>

        {/* Iteration badge for AI apps */}
        {isAiGenerated && app.iteration && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            <Bot className="w-3 h-3" />
            <span>v{app.iteration}</span>
            {app.engagementDelta && app.engagementDelta > 0 && (
              <>
                <TrendingUp className="w-3 h-3 ml-1 text-green-400" />
                <span className="text-green-400">+{app.engagementDelta}%</span>
              </>
            )}
          </div>
        )}

        {/* Featured badge */}
        {app.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full font-medium">
            <Sparkles className="w-3 h-3" />
            Featured
          </div>
        )}

        {/* Live preview indicator */}
        {app.previewType === "interactive" && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Interactive
          </div>
        )}

        {/* Hover overlay with fullscreen button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        {onFullscreen && app.previewType === "interactive" && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onFullscreen()
            }}
            className={`absolute ${app.featured ? "top-10" : "top-3"} right-3 p-1.5 rounded-lg bg-black/30 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50`}
            title="View fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Builder info */}
        <div className="flex items-center gap-2 mb-2.5">
          <span className="text-lg">{builder.avatar}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                {builder.name}
              </span>
              {isAiGenerated && (
                <span className="shrink-0 inline-flex items-center gap-0.5 text-[10px] font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-1.5 py-0.5 rounded-full">
                  <Bot className="w-2.5 h-2.5" />
                  AI
                </span>
              )}
            </div>
          </div>
        </div>

        {/* App title & tagline */}
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1 leading-tight">
          {app.title}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-3 line-clamp-2">
          {app.tagline}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {app.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1 text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-full"
            >
              <Code className="w-2.5 h-2.5" />
              {tech}
            </span>
          ))}
          {app.techStack.length > 3 && (
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 px-1 py-0.5">
              +{app.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Engagement bar */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setLiked(!liked)
                setLikeCount(liked ? likeCount - 1 : likeCount + 1)
              }}
              className={`flex items-center gap-1 text-xs transition-colors ${
                liked
                  ? "text-red-500"
                  : "text-zinc-400 dark:text-zinc-500 hover:text-red-500"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
              <span>{formatNumber(likeCount)}</span>
            </button>

            <button
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{app.comments.length}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setSaved(!saved)
                setSaveCount(saved ? saveCount - 1 : saveCount + 1)
              }}
              className={`flex items-center gap-1 text-xs transition-colors ${
                saved
                  ? "text-amber-500"
                  : "text-zinc-400 dark:text-zinc-500 hover:text-amber-500"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
              <span>{formatNumber(saveCount)}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {app.sourceUrl && (
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
            {app.liveUrl && (
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
