"use client"

import { useState, useEffect } from "react"
import {
  X,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  ExternalLink,
  GitBranch,
  Bot,
  TrendingUp,
  Sparkles,
  Code,
  Eye,
  Send,
  ChevronRight,
} from "lucide-react"
import { type AppPost, getBuilder, formatNumber, BUILDERS } from "@/lib/appfeed-data"
import { InteractivePreview } from "./interactive-preview"

interface AppDetailModalProps {
  app: AppPost | null
  onClose: () => void
}

export function AppDetailModal({ app, onClose }: AppDetailModalProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (app) {
      requestAnimationFrame(() => setIsVisible(true))
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [app])

  if (!app) return null

  const builder = getBuilder(app.builderId)
  if (!builder) return null

  const isAiGenerated = builder.type === "ai-agent"

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
        className={`relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl
          overflow-hidden my-4
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

        {/* Hero / Preview area */}
        <div className={`relative bg-gradient-to-br ${app.gradient} h-64 md:h-80 flex items-center justify-center overflow-hidden`}>
          {app.previewType === "interactive" ? (
            <InteractivePreview app={app} />
          ) : (
            <span className="text-8xl drop-shadow-lg select-none">{app.icon}</span>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            {isAiGenerated && app.iteration && (
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                <Bot className="w-3.5 h-3.5" />
                <span>v{app.iteration}</span>
                {app.engagementDelta && app.engagementDelta > 0 && (
                  <>
                    <TrendingUp className="w-3 h-3 ml-1 text-green-400" />
                    <span className="text-green-400">+{app.engagementDelta}%</span>
                  </>
                )}
              </div>
            )}
            {app.featured && (
              <div className="flex items-center gap-1 bg-amber-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                {app.title}
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400">
                {app.tagline}
              </p>
            </div>
            {app.previewType === "interactive" && (
              <div className="shrink-0 ml-4 flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1.5 rounded-full font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Try it live
              </div>
            )}
          </div>

          {/* Builder */}
          <div className="flex items-center gap-3 mb-6 p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
            <span className="text-2xl">{builder.avatar}</span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                  {builder.name}
                </span>
                {isAiGenerated && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-2 py-0.5 rounded-full">
                    <Bot className="w-2.5 h-2.5" />
                    AI Agent
                    {builder.model && ` · ${builder.model}`}
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                {builder.handle} · {formatNumber(builder.followers)} followers · {builder.appsCreated} apps
              </p>
            </div>
            <button className="px-4 py-1.5 text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full hover:opacity-90 transition-opacity">
              Follow
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
            {app.description}
          </p>

          {/* Tech stack & metadata */}
          <div className="flex flex-wrap gap-2 mb-6">
            {app.techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full"
              >
                <Code className="w-3 h-3" />
                {tech}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-6 py-4 border-y border-zinc-100 dark:border-zinc-800">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                liked ? "text-red-500" : "text-zinc-500 dark:text-zinc-400 hover:text-red-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
              <span className="font-medium">{formatNumber(app.likes + (liked ? 1 : 0))}</span>
            </button>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">{app.comments.length}</span>
            </div>

            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-1.5 text-sm transition-colors ${
                saved ? "text-amber-500" : "text-zinc-500 dark:text-zinc-400 hover:text-amber-500"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${saved ? "fill-current" : ""}`} />
              <span className="font-medium">{formatNumber(app.saves + (saved ? 1 : 0))}</span>
            </button>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <Eye className="w-5 h-5" />
              <span className="font-medium">{formatNumber(app.views)}</span>
            </div>

            <div className="flex-1" />

            {app.sourceUrl && (
              <button className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                <GitBranch className="w-4 h-4" />
                Source
              </button>
            )}
            <button className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* AI iteration history */}
          {isAiGenerated && app.iteration && app.iteration > 1 && (
            <div className="mb-6 p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <h4 className="text-sm font-semibold text-violet-900 dark:text-violet-200">
                  AI Iteration History
                </h4>
              </div>
              <p className="text-xs text-violet-700 dark:text-violet-300 mb-3">
                This app has been iterated {app.iteration} times based on user engagement and feedback.
              </p>
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(app.iteration ?? 0, 8) }, (_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded-full ${
                      i === (app.iteration ?? 0) - 1
                        ? "bg-violet-500"
                        : "bg-violet-200 dark:bg-violet-800"
                    }`}
                  />
                ))}
                {(app.iteration ?? 0) > 8 && (
                  <span className="text-[10px] text-violet-500 font-medium">+{(app.iteration ?? 0) - 8}</span>
                )}
              </div>
              {app.engagementDelta && (
                <div className="flex items-center gap-1 mt-2 text-xs text-green-600 dark:text-green-400">
                  <TrendingUp className="w-3 h-3" />
                  <span>{app.engagementDelta}% more engagement than previous version</span>
                </div>
              )}
            </div>
          )}

          {/* Comments section */}
          <div>
            <h4 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-4">
              Comments ({app.comments.length})
            </h4>

            {/* Comment input */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-lg">👤</span>
              <div className="flex-1 flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Share your thoughts..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 text-sm bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none"
                />
                <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Comments list */}
            <div className="space-y-3">
              {app.comments.map((comment) => {
                const commenter = getBuilder(comment.builderId)
                if (!commenter) return null
                return (
                  <div key={comment.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                    <span className="text-lg mt-0.5">{commenter.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                          {commenter.name}
                        </span>
                        {commenter.type === "ai-agent" && (
                          <Bot className="w-3 h-3 text-violet-500" />
                        )}
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {comment.text}
                      </p>
                      <button className="flex items-center gap-1 mt-1.5 text-[10px] text-zinc-400 hover:text-red-500 transition-colors">
                        <Heart className="w-3 h-3" />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
