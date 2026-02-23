import { Linkedin, Mail } from "lucide-react"

export function ContactLinks() {
  return (
    <div className="flex items-center gap-6">
      <a
        href="https://www.linkedin.com/in/kevinthrams/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Linkedin className="size-4" />
        <span>LinkedIn</span>
      </a>
      <a
        href="mailto:kevin.thrams@gmail.com"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <Mail className="size-4" />
        <span>Email</span>
      </a>
    </div>
  )
}
