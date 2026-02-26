# thramsy — Portfolio / Landing Page

## Status
Redirecting. thramsy.com currently auto-forwards to cv.thramsy.com. Portfolio code preserved on `portfolio` branch.

## Stack
Next.js 16 + Tailwind v4 + shadcn/ui (accordion) + Vercel Analytics + Domine serif font

## What this is
Kevin's personal portfolio landing page. Shows bio, project links (expandable accordion cards), and contact info.

## Current state (redirect)
- `next.config.ts` has a catch-all redirect: all paths → https://cv.thramsy.com
- Redirect is `permanent: false` (307) so browsers don't cache it permanently
- Full portfolio site code is preserved on the `portfolio` branch in git

## How to restore the portfolio
1. `git merge portfolio` on main (or `git checkout portfolio -- src/ public/` to cherry-pick files)
2. Remove the `redirects()` block from `next.config.ts`
3. Commit and `vercel --prod`

## Why it's down
Kevin is sending out his CV (cv.thramsy.com) and doesn't want visitors clicking through to thramsy.com and seeing unpolished projects. Will bring it back once projects are more polished.

## Key decisions
- Design originated in v0, then ported to local Next.js project and deployed via Vercel CLI
- Uses warm color theme from v0 (hsl-based CSS variables in globals.css)
- Accordion-style project cards with expandable descriptions (Radix UI accordion)

## Repo & deploy
- GitHub: `kthrams/thramsy` (main branch = redirect, portfolio branch = full site)
- Vercel project: `v0-personal-landing-page` (auto-aliases to thramsy.com)
- Deploy: `vercel --prod` from project root

## Projects listed on portfolio (when restored)
1. Fairway — golf scorecard app → golf-the-fair-way.com
2. Arena — fantasy sports app → fantasy-arena.lovable.app
3. contacts-db — founder/investor CRM → contacts-db.thramsy.com
4. Spenduh — daily expense tracker → spenduh.thramsy.com
