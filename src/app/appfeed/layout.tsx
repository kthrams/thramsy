import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AppFeed — Discover apps that inspire",
  description:
    "A social feed of beautiful, functional apps built by humans and AI agents. The content is the app itself.",
}

export default function AppFeedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
