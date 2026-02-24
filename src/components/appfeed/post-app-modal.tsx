"use client"

import { useState, useEffect } from "react"
import {
  X,
  Github,
  Globe,
  Link2,
  Palette,
  Wand2,
  ChevronRight,
  Loader2,
  Check,
  Sparkles,
  Eye,
  Code,
} from "lucide-react"
import { CATEGORIES, type AppCategory } from "@/lib/appfeed-data"

interface PostAppModalProps {
  isOpen: boolean
  onClose: () => void
}

type PostStep = "connect" | "customize" | "preview"

export function PostAppModal({ isOpen, onClose }: PostAppModalProps) {
  const [step, setStep] = useState<PostStep>("connect")
  const [repoUrl, setRepoUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Auto-generated fields (simulating what the abstraction layer would produce)
  const [title, setTitle] = useState("")
  const [tagline, setTagline] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<AppCategory>("fun")
  const [selectedGradient, setSelectedGradient] = useState(0)
  const [selectedIcon, setSelectedIcon] = useState(0)

  const gradients = [
    "from-purple-600 via-pink-500 to-orange-400",
    "from-emerald-600 to-teal-500",
    "from-blue-600 to-cyan-500",
    "from-amber-500 to-orange-600",
    "from-rose-500 to-pink-600",
    "from-indigo-600 via-violet-500 to-fuchsia-500",
    "from-green-500 to-emerald-500",
    "from-slate-700 to-zinc-800",
  ]

  const icons = ["🚀", "⚡", "🎯", "🎨", "🔥", "💡", "🌟", "🎮", "🛠", "📊", "🌍", "🎉"]

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true))
      document.body.style.overflow = "hidden"
    } else {
      setIsVisible(false)
      document.body.style.overflow = ""
      // Reset state when closing
      setStep("connect")
      setRepoUrl("")
      setLiveUrl("")
      setIsAnalyzing(false)
      setAnalyzed(false)
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis of repo/URL
    setTimeout(() => {
      setTitle("My Awesome App")
      setTagline("A delightful tool that solves a real problem")
      setDescription(
        "An intelligent app that uses modern web technologies to deliver a smooth, intuitive experience. Built with care and attention to detail."
      )
      setCategory("productivity")
      setIsAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 200)
  }

  if (!isOpen) return null

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
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800">
          <div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Post an App</h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Share your creation with the community
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5 text-zinc-500" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50">
          {(["connect", "customize", "preview"] as PostStep[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  step === s
                    ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                    : i < ["connect", "customize", "preview"].indexOf(step)
                    ? "bg-green-500 text-white"
                    : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                }`}
              >
                {i < ["connect", "customize", "preview"].indexOf(step) ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-xs font-medium capitalize ${
                  step === s ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"
                }`}
              >
                {s}
              </span>
              {i < 2 && <ChevronRight className="w-4 h-4 text-zinc-300 dark:text-zinc-600" />}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="p-6">
          {/* STEP 1: Connect */}
          {step === "connect" && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                  How does posting work?
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Connect your GitHub repo or paste a live URL. Our AI analyzes your app — readme, code,
                  screenshots — and auto-generates a beautiful card for the feed. You can customize everything
                  before posting.
                </p>
              </div>

              {/* GitHub repo */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <Github className="w-3.5 h-3.5 inline mr-1.5" />
                  GitHub Repository
                </label>
                <input
                  type="text"
                  placeholder="https://github.com/you/your-app"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors placeholder-zinc-400"
                />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider">or</span>
                <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  <Globe className="w-3.5 h-3.5 inline mr-1.5" />
                  Live URL
                </label>
                <input
                  type="text"
                  placeholder="https://your-app.vercel.app"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors placeholder-zinc-400"
                />
              </div>

              {/* What happens box */}
              <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Wand2 className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <h4 className="text-xs font-semibold text-violet-900 dark:text-violet-200">
                    AI Auto-generates your card
                  </h4>
                </div>
                <ul className="space-y-1.5 text-[11px] text-violet-700 dark:text-violet-300">
                  <li className="flex items-center gap-2">
                    <Code className="w-3 h-3 shrink-0" /> Reads your README, package.json, and code
                  </li>
                  <li className="flex items-center gap-2">
                    <Eye className="w-3 h-3 shrink-0" /> Takes live screenshots of your deployed app
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 shrink-0" /> Generates title, tagline, description, and category
                  </li>
                  <li className="flex items-center gap-2">
                    <Palette className="w-3 h-3 shrink-0" /> Picks a color theme matching your app&apos;s vibe
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  handleAnalyze()
                  setStep("customize")
                }}
                disabled={!repoUrl && !liveUrl}
                className="w-full py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Wand2 className="w-4 h-4" />
                Analyze & Generate Card
              </button>
            </div>
          )}

          {/* STEP 2: Customize */}
          {step === "customize" && (
            <div className="space-y-5">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-violet-500 animate-spin mb-4" />
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    Analyzing your app...
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Reading code, taking screenshots, generating card
                  </p>
                </div>
              ) : (
                <>
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      App Name
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors"
                    />
                  </div>

                  {/* Tagline */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl px-4 py-3 text-sm outline-none border border-transparent focus:border-zinc-300 dark:focus:border-zinc-600 transition-colors resize-none"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.slice(0, 8).map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setCategory(cat.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            category === cat.id
                              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          }`}
                        >
                          {cat.icon} {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient picker */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Card Color Theme
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {gradients.map((g, i) => (
                        <button
                          key={g}
                          onClick={() => setSelectedGradient(i)}
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g} transition-all ${
                            selectedGradient === i
                              ? "ring-2 ring-zinc-900 dark:ring-zinc-100 ring-offset-2 scale-110"
                              : "hover:scale-105"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Icon picker */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      Icon
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {icons.map((icon, i) => (
                        <button
                          key={icon}
                          onClick={() => setSelectedIcon(i)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition-all ${
                            selectedIcon === i
                              ? "bg-zinc-900 dark:bg-zinc-100 ring-2 ring-zinc-900 dark:ring-zinc-100 ring-offset-2 scale-110"
                              : "bg-zinc-100 dark:bg-zinc-800 hover:scale-105"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setStep("connect")}
                      className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep("preview")}
                      className="flex-[2] py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview Card
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3: Preview */}
          {step === "preview" && (
            <div className="space-y-5">
              {/* Card preview */}
              <div className="mx-auto max-w-xs">
                <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg">
                  <div
                    className={`h-44 bg-gradient-to-br ${gradients[selectedGradient]} flex items-center justify-center`}
                  >
                    <span className="text-5xl drop-shadow-lg">{icons[selectedIcon]}</span>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">👤</span>
                      <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">You</span>
                    </div>
                    <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-1">
                      {title || "Your App Name"}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-2">
                      {tagline || "Your app tagline"}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                This is how your app will appear in the feed
              </p>

              {/* Interactive preview note */}
              {liveUrl && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/50">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <h4 className="text-xs font-semibold text-green-900 dark:text-green-200">
                      Interactive Preview Enabled
                    </h4>
                  </div>
                  <p className="text-[11px] text-green-700 dark:text-green-300">
                    Users will be able to interact with your app directly in the feed card.
                    We&apos;ll embed your live URL in a sandboxed iframe.
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setStep("customize")}
                  className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleClose}
                  className="flex-[2] py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Post to Feed
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
