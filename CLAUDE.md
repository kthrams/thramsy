# thramsy — Kevin's Portfolio Site

## Project Identity
This is Kevin Hu-Thrams' **personal portfolio website**. It is NOT a general-purpose app or prototype playground.

- **Repo**: `kthrams/thramsy`
- **URL**: Deployed on Vercel (production branch: `main`)
- **Stack**: Next.js 16, React 19, Tailwind CSS v4, TypeScript

## Project Boundaries

**DO NOT** add new app prototypes, experiments, or side projects to this repo.
Each new project/prototype should get its **own separate GitHub repo** and its own Vercel deployment.

### Sibling Projects (separate repos)
- **AppFeed** → `kthrams/appfeed` — Social media platform where apps are the content

### What belongs here
- Portfolio page (`/`) — bio, projects list, contact links
- Portfolio-specific components (`project-card`, `contact-links`, `ui/accordion`)
- Portfolio assets (profile image, favicons)

### What does NOT belong here
- Standalone app prototypes (AppFeed, Spenduh, etc.)
- Unrelated experiments or demos
- Any feature that deserves its own domain/deployment

## Development Notes
- Uses Domine (serif) as the primary font
- Uses shadcn/ui conventions (CSS variables, `cn()` utility)
- Radix UI for accordion component
- Vercel Analytics enabled
