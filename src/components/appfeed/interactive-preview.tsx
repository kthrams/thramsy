"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import type { AppPost } from "@/lib/appfeed-data"

interface PreviewProps {
  app: AppPost
}

// =============================================================================
// Interactive Preview — the soul of AppFeed
// =============================================================================
// In production, this would be an iframe to the deployed app (Vercel preview),
// a Stackblitz WebContainer, or a sandboxed embed. For the prototype, we build
// mini functional versions of each app to demonstrate the concept.
// =============================================================================

export function InteractivePreview({ app }: PreviewProps) {
  switch (app.previewComponent) {
    case "MoodRing":
      return <MoodRingPreview />
    case "Breathe":
      return <BreathePreview />
    case "MeetingCost":
      return <MeetingCostPreview />
    case "ColorWars":
      return <ColorWarsPreview />
    case "WallpaperMachine":
      return <WallpaperMachinePreview />
    case "RamenTimer":
      return <RamenTimerPreview />
    default:
      return (
        <span className="text-8xl drop-shadow-lg select-none">{app.icon}</span>
      )
  }
}

// =============================================================================
// Mood Ring — text input changes background color based on sentiment
// =============================================================================

function MoodRingPreview() {
  const [text, setText] = useState("")
  const [hue, setHue] = useState(270) // purple default

  useEffect(() => {
    if (!text) {
      setHue(270)
      return
    }
    const lower = text.toLowerCase()
    const happy = ["happy", "joy", "love", "great", "amazing", "wonderful", "good", "smile", "laugh", "fun", "yes", "!", "😊", "❤️"]
    const sad = ["sad", "cry", "lonely", "hurt", "pain", "miss", "lost", "dark", "gray", "sorry"]
    const angry = ["angry", "hate", "rage", "furious", "mad", "annoyed", "ugh", "damn", "terrible"]
    const calm = ["calm", "peace", "gentle", "quiet", "serene", "breathe", "relax", "soft", "still"]
    const energetic = ["energy", "excited", "pump", "run", "go", "fast", "wild", "party", "dance"]

    let score = 270
    if (happy.some(w => lower.includes(w))) score = 50 // yellow
    if (sad.some(w => lower.includes(w))) score = 220 // blue
    if (angry.some(w => lower.includes(w))) score = 0 // red
    if (calm.some(w => lower.includes(w))) score = 180 // teal
    if (energetic.some(w => lower.includes(w))) score = 30 // orange

    setHue(score)
  }, [text])

  return (
    <div
      className="absolute inset-0 flex items-center justify-center transition-colors duration-700"
      style={{ backgroundColor: `hsl(${hue}, 70%, 60%)` }}
    >
      <div className="w-full max-w-xs px-4">
        <input
          type="text"
          placeholder="Type how you feel..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-full px-4 py-2.5 text-sm outline-none border border-white/30 focus:border-white/60 transition-all text-center"
        />
        {text && (
          <p className="text-white/70 text-[10px] text-center mt-2">
            The background changes based on your mood
          </p>
        )}
      </div>
    </div>
  )
}

// =============================================================================
// Breathe — pulsing breathing guide
// =============================================================================

function BreathePreview() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale")
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1
        if (next < 4) setPhase("inhale")
        else if (next < 7) setPhase("hold")
        else if (next < 11) setPhase("exhale")
        else {
          setPhase("inhale")
          return 0
        }
        return next
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const scale = phase === "inhale" ? "scale-100" : phase === "hold" ? "scale-100" : "scale-50"
  const label = phase === "inhale" ? "Breathe in" : phase === "hold" ? "Hold" : "Breathe out"

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative flex items-center justify-center">
        <div
          className={`w-32 h-32 rounded-full bg-white/30 backdrop-blur-sm border-2 border-white/50
            transition-transform duration-[3000ms] ease-in-out ${scale}`}
        />
        <p className="absolute text-white text-sm font-medium tracking-wide">
          {label}
        </p>
      </div>
    </div>
  )
}

// =============================================================================
// Meeting Cost — live dollar counter
// =============================================================================

function MeetingCostPreview() {
  const [cost, setCost] = useState(0)
  const [running, setRunning] = useState(true)
  const attendees = 8
  const avgSalary = 150000 // $150k/year
  const costPerSecond = (avgSalary * attendees) / (52 * 40 * 3600)

  useEffect(() => {
    if (!running) return
    const interval = setInterval(() => {
      setCost((c) => c + costPerSecond * 0.1)
    }, 100)
    return () => clearInterval(interval)
  }, [running, costPerSecond])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      <p className="text-xs text-white/60 mb-1 uppercase tracking-wider">This meeting costs</p>
      <p className="text-4xl font-bold tabular-nums mb-1">
        ${cost.toFixed(2)}
      </p>
      <p className="text-xs text-white/60 mb-3">{attendees} attendees · avg $150k/yr</p>
      <button
        onClick={(e) => {
          e.stopPropagation()
          setRunning(!running)
        }}
        className="px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium hover:bg-white/30 transition-colors border border-white/30"
      >
        {running ? "Pause" : "Resume"}
      </button>
    </div>
  )
}

// =============================================================================
// Color Wars — interactive pixel canvas
// =============================================================================

function ColorWarsPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedColor, setSelectedColor] = useState("#ef4444")
  const colors = ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#f97316"]
  const gridState = useRef<string[][]>([])

  // Initialize grid
  useEffect(() => {
    const size = 30
    if (gridState.current.length === 0) {
      gridState.current = Array.from({ length: size }, () =>
        Array.from({ length: size }, () =>
          colors[Math.floor(Math.random() * colors.length)]
        )
      )
    }
    drawGrid()
  }, [])

  const drawGrid = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const size = 30
    const cellW = canvas.width / size
    const cellH = canvas.height / size
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        ctx.fillStyle = gridState.current[y]?.[x] || "#333"
        ctx.fillRect(x * cellW, y * cellH, cellW, cellH)
      }
    }
  }, [])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.stopPropagation()
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const size = 30
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * size)
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * size)
    if (gridState.current[y] && gridState.current[y][x] !== undefined) {
      // Paint a 3x3 area
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy
          const nx = x + dx
          if (ny >= 0 && ny < size && nx >= 0 && nx < size) {
            gridState.current[ny][nx] = selectedColor
          }
        }
      }
      drawGrid()
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
        onClick={handleCanvasClick}
        className="rounded-lg cursor-crosshair shadow-lg"
      />
      <div className="flex items-center gap-1.5 mt-3">
        {colors.map((c) => (
          <button
            key={c}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedColor(c)
            }}
            className={`w-5 h-5 rounded-full border-2 transition-transform ${
              selectedColor === c ? "border-white scale-125" : "border-white/30"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  )
}

// =============================================================================
// Wallpaper Machine — procedural wallpaper from a seed word
// =============================================================================

function WallpaperMachinePreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [word, setWord] = useState("ocean")

  useEffect(() => {
    generateWallpaper(word)
  }, [word])

  function hashCode(s: string): number {
    let hash = 0
    for (let i = 0; i < s.length; i++) {
      const char = s.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash |= 0
    }
    return Math.abs(hash)
  }

  function generateWallpaper(seed: string) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    const hash = hashCode(seed)

    // Generate a unique gradient + pattern based on hash
    const hue1 = hash % 360
    const hue2 = (hash * 7) % 360
    const hue3 = (hash * 13) % 360

    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, `hsl(${hue1}, 70%, 50%)`)
    grad.addColorStop(0.5, `hsl(${hue2}, 60%, 40%)`)
    grad.addColorStop(1, `hsl(${hue3}, 80%, 30%)`)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // Geometric patterns
    const patternType = hash % 4
    ctx.globalAlpha = 0.15

    if (patternType === 0) {
      // Circles
      for (let i = 0; i < 20; i++) {
        const x = ((hash * (i + 1) * 17) % w)
        const y = ((hash * (i + 1) * 31) % h)
        const r = 10 + ((hash * (i + 1)) % 40)
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `hsl(${(hue1 + i * 20) % 360}, 80%, 70%)`
        ctx.fill()
      }
    } else if (patternType === 1) {
      // Lines
      for (let i = 0; i < 15; i++) {
        ctx.beginPath()
        ctx.moveTo((hash * (i + 1) * 13) % w, 0)
        ctx.lineTo((hash * (i + 1) * 23) % w, h)
        ctx.strokeStyle = `hsl(${(hue2 + i * 25) % 360}, 70%, 60%)`
        ctx.lineWidth = 2 + (i % 4)
        ctx.stroke()
      }
    } else if (patternType === 2) {
      // Triangles
      for (let i = 0; i < 12; i++) {
        const x = (hash * (i + 1) * 19) % w
        const y = (hash * (i + 1) * 29) % h
        const s = 20 + ((hash * (i + 1)) % 50)
        ctx.beginPath()
        ctx.moveTo(x, y - s)
        ctx.lineTo(x - s, y + s)
        ctx.lineTo(x + s, y + s)
        ctx.closePath()
        ctx.fillStyle = `hsl(${(hue3 + i * 30) % 360}, 60%, 60%)`
        ctx.fill()
      }
    } else {
      // Grid dots
      const step = 20
      for (let x = 0; x < w; x += step) {
        for (let y = 0; y < h; y += step) {
          const r = 2 + ((hash + x + y) % 5)
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fillStyle = `hsl(${(hue1 + x + y) % 360}, 60%, 70%)`
          ctx.fill()
        }
      }
    }

    ctx.globalAlpha = 1
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <canvas ref={canvasRef} width={200} height={320} className="rounded-xl shadow-lg" />
      <div className="mt-3 w-full max-w-[200px]">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          placeholder="Type a word..."
          className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-white/60 rounded-full px-3 py-1.5 text-xs outline-none border border-white/30 text-center"
        />
      </div>
    </div>
  )
}

// =============================================================================
// Ramen Timer — noodle firmness selector with countdown
// =============================================================================

function RamenTimerPreview() {
  const levels = [
    { label: "Soft", time: 4, emoji: "🍜" },
    { label: "Medium", time: 3, emoji: "🍝" },
    { label: "Firm", time: 2.5, emoji: "💪" },
    { label: "Al Dente", time: 2, emoji: "🤌" },
  ]
  const [selected, setSelected] = useState(1)
  const [counting, setCounting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (!counting || timeLeft <= 0) {
      if (counting && timeLeft <= 0) setCounting(false)
      return
    }
    const t = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(t)
  }, [counting, timeLeft])

  const startTimer = (e: React.MouseEvent) => {
    e.stopPropagation()
    setTimeLeft(levels[selected].time * 60)
    setCounting(true)
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
      {counting ? (
        <>
          <span className="text-4xl mb-2">{levels[selected].emoji}</span>
          <p className="text-3xl font-bold tabular-nums">{formatTime(timeLeft)}</p>
          <p className="text-xs text-white/60 mt-1">{levels[selected].label} noodles</p>
          {timeLeft === 0 && <p className="text-sm mt-2 animate-bounce">Done! Slurp! 🍜</p>}
        </>
      ) : (
        <>
          <p className="text-xs text-white/60 mb-3 uppercase tracking-wider">Noodle firmness</p>
          <div className="flex gap-2 mb-4">
            {levels.map((level, i) => (
              <button
                key={level.label}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected(i)
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selected === i
                    ? "bg-white text-amber-600"
                    : "bg-white/20 text-white/80 hover:bg-white/30"
                }`}
              >
                {level.emoji} {level.label}
              </button>
            ))}
          </div>
          <button
            onClick={startTimer}
            className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors border border-white/30"
          >
            Start {levels[selected].time} min timer
          </button>
        </>
      )}
    </div>
  )
}
