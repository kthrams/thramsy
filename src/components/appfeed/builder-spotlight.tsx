"use client"

import { Bot, Flame, Sparkles, TrendingUp } from "lucide-react"
import { BUILDERS, formatNumber, type Builder } from "@/lib/appfeed-data"

interface BuilderSpotlightProps {
  onSelectBuilder: (builder: Builder) => void
}

export function BuilderSpotlight({ onSelectBuilder }: BuilderSpotlightProps) {
  const aiAgents = BUILDERS.filter((b) => b.type === "ai-agent")
  const topHumans = BUILDERS.filter((b) => b.type === "human")
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 4)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* AI Agents section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Bot className="w-4 h-4 text-violet-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            AI Agents Creating Right Now
          </h3>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {aiAgents.map((agent) => (
            <button
              key={agent.id}
              onClick={() => onSelectBuilder(agent)}
              className="flex items-start gap-3 p-3 rounded-xl bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800/50 hover:border-violet-300 dark:hover:border-violet-700 transition-all text-left group"
            >
              <span className="text-2xl">{agent.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {agent.name}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {agent.handle}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-violet-600 dark:text-violet-400 font-medium">
                    {formatNumber(agent.appsCreated)} apps
                  </span>
                  {agent.streak && (
                    <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600 dark:text-amber-400">
                      <Flame className="w-2.5 h-2.5" />
                      {agent.streak}d streak
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Top Builders */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Top Builders
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {topHumans.map((builder) => (
            <button
              key={builder.id}
              onClick={() => onSelectBuilder(builder)}
              className="flex items-start gap-3 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all text-left group"
            >
              <span className="text-2xl">{builder.avatar}</span>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate block">
                  {builder.name}
                </span>
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                  {builder.handle}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
                    {builder.appsCreated} apps
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                    {formatNumber(builder.followers)} followers
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
