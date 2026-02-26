"use client"

import { ArrowRight } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface Project {
  title: string
  short: string
  full: string
  url?: string
  builtWith?: string
}

const projects: Project[] = [
  {
    title: "Fairway",
    short: "Golf scorecard app",
    full: "A mobile-friendly golf scorecard with real USGA handicap calculations, multiple game modes, and round history. Built to see how far an AI app builder could take a real sports utility.",
    url: "https://www.golf-the-fair-way.com/",
    builtWith: "Lovable",
  },
  {
    title: "Arena",
    short: "Fantasy sports side-betting app",
    full: "A side-betting layer for Sleeper fantasy football leagues — place bets on weekly matchups with friends. Built to explore real-time API integrations and multi-user flows with AI tooling.",
    url: "https://fantasy-arena.lovable.app/",
    builtWith: "Lovable",
  },
  {
    title: "contacts-db",
    short: "Founder/investor CRM",
    full: "A personal CRM that auto-tags founders and investors from LinkedIn imports and suggests introductions between them. My first fully AI-coded app from scratch.",
    url: "https://contacts-db.thramsy.com/",
    builtWith: "Claude Code",
  },
  {
    title: "Spenduh",
    short: "Daily expense tracker",
    full: "A daily expense tracker with spending streaks, calendar heat maps, and analytics. Built to compare AI code generators side-by-side.",
    url: "https://spenduh.thramsy.com/",
    builtWith: "Bolt",
  },
]

export function ProjectCards() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {projects.map((project) => (
        <AccordionItem
          key={project.title}
          value={project.title}
          className="border border-border last:border-b rounded-lg mb-3 last:mb-0 px-5 transition-colors hover:border-muted-foreground/30 cursor-pointer"
        >
          <AccordionTrigger className="hover:no-underline py-4">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-foreground font-medium text-base">
                  {project.title}
                </span>
                {project.builtWith && (
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/70 border border-border rounded-full px-2 py-0.5 font-medium">
                    {project.builtWith}
                  </span>
                )}
              </div>
              <span className="text-muted-foreground text-sm font-normal">
                {project.short}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {project.full}
            </p>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground hover:text-muted-foreground transition-colors"
              >
                View project <ArrowRight className="size-3.5" />
              </a>
            ) : (
              <span className="text-sm text-muted-foreground italic">
                Available upon request
              </span>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
