# thramsy — Portfolio / Landing Page

## Status
Active. Live at https://thramsy.com

## Stack
Next.js 16 + Tailwind v4 + shadcn/ui (accordion) + Vercel Analytics + Domine serif font

## What this is
Kevin's personal portfolio landing page. Shows bio, project links (expandable accordion cards), and contact info.

## Key decisions
- Design originated in v0, then ported to local Next.js project and deployed via Vercel CLI
- Uses warm color theme from v0 (hsl-based CSS variables in globals.css)
- Accordion-style project cards with expandable descriptions (Radix UI accordion)
- Project structure uses `src/` directory (`@/*` maps to `./src/*`)

## Repo & deploy
- GitHub: `kthrams/thramsy` (main branch)
- Vercel project: `v0-personal-landing-page` (auto-aliases to thramsy.com)
- Deploy: `vercel --prod` from project root

## Projects listed on site
1. Fairway — golf scorecard app → golf-the-fair-way.com
2. Arena — fantasy sports app → fantasy-arena.lovable.app
3. contacts-db — founder/investor CRM → contacts-db.thramsy.com
4. Spenduh — daily expense tracker → spenduh.thramsy.com

## Open items
- None currently
