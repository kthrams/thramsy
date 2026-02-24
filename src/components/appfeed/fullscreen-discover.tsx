"use client"

import { useState, useEffect, useCallback } from "react"
import {
  X,
  ChevronUp,
  ChevronDown,
  Heart,
  Bookmark,
  Share2,
  MessageCircle,
  Bot,
  TrendingUp,
  Sparkles,
  ExternalLink,
} from "lucide-react"
import { type AppPost, getBuilder, formatNumber } from "@/lib/appfeed-data"
import { InteractivePreview } from "./interactive-preview"

interface FullscreenDiscoverProps {
  apps: AppPost[]
  startIndex: number
  onClose: () => void
}

export function FullscreenDiscover({ apps, startIndex, onClose }: FullscreenDiscoverProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [direction, setDirection] = useState<"up" | "down" | null>(null)

  const app = apps[currentIndex]
  const builder = app ? getBuilder(app.builderId) : null

  const goNext = useCallback(() => {
    if (currentIndex < apps.length - 1) {
      setDirection("up")
      setTimeout(() => {
        setCurrentIndex((i) => i + 1)
        setDirection(null)
      }, 150)
    }
  }, [currentIndex, apps.length])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("down")
      setTimeout(() => {
        setCurrentIndex((i) => i - 1)
        setDirection(null)
      }, 150)
    }
  }, [currentIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") goNext()
      else if (e.key === "ArrowUp" || e.key === "k") goPrev()
      else if (e.key === "Escape") onClose()
      else if (e.key === "l") {
        if (app) setLiked((prev) => ({ ...prev, [app.id]: !prev[app.id] }))
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev, onClose, app])

  // Touch/wheel navigation
  useEffect(() => {
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY
    }
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY
      if (diff > 50) goNext()
      else if (diff < -50) goPrev()
    }
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) goNext()
        else goPrev()
      }
    }

    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
      window.removeEventListener("wheel", handleWheel)
    }
  }, [goNext, goPrev])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (!app || !builder) return null

  const isAiGenerated = builder.type === "ai-agent"
  const isLiked = liked[app.id] || false
  const isSaved = saved[app.id] || false

  return (
    <div className="fixed inset-0 z-[60] bg-black flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Progress indicator */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-white/60 text-xs">
        <span>{currentIndex + 1} / {apps.length}</span>
      </div>

      {/* Navigation arrows */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors disabled:opacity-20"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === apps.length - 1}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors disabled:opacity-20"
        >
          <ChevronDown className="w-5 h-5" />
        </button>
      </div>

      {/* Main content area */}
      <div
        className={`w-full h-full flex flex-col transition-all duration-150 ${
          direction === "up"
            ? "-translate-y-8 opacity-0"
            : direction === "down"
            ? "translate-y-8 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {/* App preview — takes up most of the screen */}
        <div className={`flex-1 relative bg-gradient-to-br ${app.gradient} flex items-center justify-center overflow-hidden`}>
          {app.previewType === "interactive" ? (
            <InteractivePreview app={app} />
          ) : (
            <span className="text-[120px] drop-shadow-2xl select-none">{app.icon}</span>
          )}

          {/* Badges overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {isAiGenerated && app.iteration && (
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
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
            {app.previewType === "interactive" && (
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Interactive — try it!
              </div>
            )}
          </div>
        </div>

        {/* Info bar at bottom */}
        <div className="bg-zinc-900 px-6 py-5">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start gap-4">
              {/* Builder + app info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xl">{builder.avatar}</span>
                  <span className="text-sm font-medium text-white">{builder.name}</span>
                  {isAiGenerated && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-medium bg-violet-500/20 text-violet-300 px-1.5 py-0.5 rounded-full">
                      <Bot className="w-2.5 h-2.5" />
                      AI
                    </span>
                  )}
                  <span className="text-xs text-zinc-500">{builder.handle}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{app.title}</h2>
                <p className="text-sm text-zinc-400 line-clamp-2">{app.tagline}</p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setLiked((prev) => ({ ...prev, [app.id]: !isLiked }))}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isLiked ? "text-red-500" : "text-zinc-400 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
                  <span className="text-[10px]">{formatNumber(app.likes + (isLiked ? 1 : 0))}</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-blue-400 transition-colors">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-[10px]">{app.comments.length}</span>
                </button>

                <button
                  onClick={() => setSaved((prev) => ({ ...prev, [app.id]: !isSaved }))}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    isSaved ? "text-amber-500" : "text-zinc-400 hover:text-amber-500"
                  }`}
                >
                  <Bookmark className={`w-6 h-6 ${isSaved ? "fill-current" : ""}`} />
                  <span className="text-[10px]">{formatNumber(app.saves + (isSaved ? 1 : 0))}</span>
                </button>

                <button className="flex flex-col items-center gap-1 text-zinc-400 hover:text-white transition-colors">
                  <Share2 className="w-6 h-6" />
                  <span className="text-[10px]">{formatNumber(app.shares)}</span>
                </button>
              </div>
            </div>

            {/* Keyboard hints */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-zinc-800">
              <span className="text-[10px] text-zinc-600">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-500 font-mono">↑</kbd>{" "}
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-500 font-mono">↓</kbd> navigate
              </span>
              <span className="text-[10px] text-zinc-600">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-500 font-mono">L</kbd> like
              </span>
              <span className="text-[10px] text-zinc-600">
                <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-500 font-mono">Esc</kbd> close
              </span>
              <span className="text-[10px] text-zinc-600">Swipe to navigate on mobile</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
