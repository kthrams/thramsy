import Image from "next/image"
import { ProjectCards } from "@/components/project-card"
import { ContactLinks } from "@/components/contact-links"

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
      {children}
    </h2>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[600px] px-6 py-20 md:py-32">
        {/* Hero / Bio */}
        <section className="mb-12">
          <Image
            src="/images/kevin-profile.png"
            alt="Kevin Hu-Thrams"
            width={80}
            height={80}
            className="rounded-full object-cover mb-6 size-20"
            priority
          />
          <h1 className="text-2xl font-semibold text-foreground mb-5 text-balance">
            Kevin Hu-Thrams
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Originally born &amp; raised in Germany, I moved to the Bay Area in
            2017 to learn and build alongside the best. Historically a Fintech
            PM, I{"'"}m now exploring new business ideas across AI, consumer and
            sports.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed">
            The projects below are experiments I built using AI tools like
            Claude Code, Lovable, and Bolt — from idea to deployed app, with
            zero hand-written code. Each one was a way to stress-test what{"'"}s
            possible when a PM picks up AI as a building tool. Let{"'"}s connect!
          </p>
        </section>

        {/* Projects */}
        <section className="mb-12">
          <SectionLabel>Projects</SectionLabel>
          <ProjectCards />
        </section>

        {/* Contact */}
        <section>
          <SectionLabel>Contact</SectionLabel>
          <ContactLinks />
        </section>
      </div>
    </main>
  )
}
