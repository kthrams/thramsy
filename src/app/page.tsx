import Image from "next/image";
import { Linkedin, Mail, ExternalLink } from "lucide-react";

const projects = [
  {
    name: "FairwayGolf",
    description: "scorecard app",
    url: "https://fairway-bice.vercel.app",
  },
  {
    name: "ArenaFantasy",
    description: "sports app",
    url: "https://fantasy-arena.vercel.app",
  },
  {
    name: "contacts-db",
    description: "Founder/investor CRM",
    url: "https://contacts-db.thramsy.com",
  },
  {
    name: "Spenduh",
    description: "daily expense tracker",
    url: "https://spenduh.vercel.app",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen justify-center bg-white dark:bg-black">
      <main className="w-full max-w-[600px] px-6 py-20">
        {/* Profile */}
        <section className="flex flex-col items-start gap-4">
          <Image
            src="/images/kevin-profile.png"
            alt="Kevin Hu-Thrams"
            width={80}
            height={80}
            className="rounded-full"
            priority
          />
          <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
            Kevin Hu-Thrams
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Originally born &amp; raised in Germany, I moved to the Bay Area in
            2017 to learn and build alongside the best. I&apos;ve been a PM in
            fintech, but currently exploring new business ideas in AI, consumer
            and sports. When I&apos;m not researching, I&apos;m shipping side
            projects to learn what I can&apos;t learn from reading about it.
          </p>
        </section>

        {/* Projects */}
        <section className="mt-16">
          <h2 className="mb-6 text-lg font-semibold text-black dark:text-zinc-50">
            Projects
          </h2>
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <div>
                  <span className="font-semibold text-black dark:text-zinc-50">
                    {project.name}
                  </span>
                  <span className="ml-2 text-sm text-zinc-500 dark:text-zinc-500">
                    {project.description}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-zinc-400 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-16">
          <h2 className="mb-6 text-lg font-semibold text-black dark:text-zinc-50">
            Contact
          </h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/kevinthrams/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="mailto:kevin.thrams@gmail.com"
              className="text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
