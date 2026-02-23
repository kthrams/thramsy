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
}

const projects: Project[] = [
  {
    title: "Fairway",
    short: "Golf scorecard app",
    full: "A mobile-friendly golf scorecard and handicap tracker. Built with React, TypeScript, and Supabase using the Lovable app builder. Designed to be fast and easy to use on the course.",
    url: "https://www.golf-the-fair-way.com/",
  },
  {
    title: "Arena",
    short: "Fantasy sports app",
    full: "A fantasy sports app originally built for football season, now being adapted for basketball. Pulls live data from the Sleeper API and lets you set lineups and track scores in real time.",
    url: "https://fantasy-arena.lovable.app/",
  },
  {
    title: "contacts-db",
    short: "Founder/investor CRM",
    full: "A personal CRM for managing a network of founders and investors, with AI-powered contact tagging built on Claude. Built with Next.js, Supabase, and shadcn/ui — live and in active use.",
    url: "https://contacts-db.thramsy.com/",
  },
  {
    title: "Spenduh",
    short: "Daily expense tracker",
    full: "A simple daily expense tracker for staying on top of spending habits. Built with React, TypeScript, Tailwind, and Supabase.",
    url: "https://spenduh.thramsy.com/",
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
              <span className="text-foreground font-medium text-base">
                {project.title}
              </span>
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
