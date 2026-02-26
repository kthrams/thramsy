# CV/Resume Website Research

Research into the best personal CV/resume websites -- patterns, features, and examples to learn from.

---

## Specific Examples Worth Studying

| Site | What Makes It Stand Out | Layout |
|---|---|---|
| **Brittany Chiang** (brittanychiang.com) | Dark theme, sticky left sidebar with nav + intro, right side scrolls through sections. Subtle hover effects, smooth transitions, clean typography. One of the most-cloned developer portfolios. | Single page, two-column (sidebar + content) |
| **Bruno Simon** (bruno-simon.com) | Full 3D world built with Three.js -- you drive a jeep around to explore portfolio sections. No traditional UI. Won multiple Awwwards. | Fully 3D / game-like |
| **Pascal van Gemert** (pascalvangemert.nl) | Interactive online resume with skill bars, timeline layout, and clear sections. Clean and functional. Open-source on GitHub. | Single page scroll, full-width |
| **Mintboxx** | Minimalist resume with subtle animations. Light touch -- proves you don't need flashy effects to be memorable. | Single page, minimal |
| **Diogo Correia** | Particle effect hero section + animated timeline for experience. Mixes visual punch with structured content. | Single page with hero + timeline |
| **Valerio Pierbattista** | Advanced parallax scrolling -- CV "prints out" as you scroll. Clever metaphor for a resume. | Single page, parallax-driven |
| **Gary Le Masson** | Resume styled as a Google homepage. "I'm Feeling Lucky" button. Creative concept that's immediately memorable. | Novelty concept |
| **Robby Leonardi** | Interactive scrolling resume -- game-like side-scroller where you scroll to explore work history. | Horizontal scroll / game |
| **Sean Halpin** | Floating menu (no scroll-to-top needed), light-to-dark transition as you scroll, typewriter effects. | Single page with progressive reveal |
| **Nitin** (portfolio as VS Code) | Entire portfolio styled like a VS Code editor window. Files = sections, tabs = navigation. Clever for developer audience. | Novelty concept (IDE simulation) |
| **Allison Driscoll** | No header -- just a CTA button that jumps straight to resume content. Ultra-minimal, content-first. | Single page, no header |

---

## Common Sections / Content Structure

Most effective CV sites include these sections (roughly in this order):

1. **Hero / Introduction** -- Name, title/tagline, brief 1-2 sentence positioning. Often includes a photo or illustration.
2. **About** -- Expanded bio, what you do, what you care about. 2-4 short paragraphs.
3. **Experience / Work History** -- Timeline or card-based layout. Company, role, dates, 2-3 bullet accomplishments per role.
4. **Skills** -- Visual skill bars, tag clouds, or grouped categories (languages, tools, frameworks).
5. **Projects / Portfolio** -- Cards or grid with thumbnails, descriptions, links. Best ones show outcomes, not just descriptions.
6. **Education** -- Brief. Degree, institution, year.
7. **Testimonials / Recommendations** (optional) -- Quotes from colleagues or managers.
8. **Contact / CTA** -- Email, social links, and often a contact form. "Let's work together" messaging.

### For Product Managers Specifically

PM portfolios should emphasize:
- 3-5 case studies with clear **Problem > Research > Solution > Impact > Reflection** arcs
- Metrics and measurable outcomes
- Strong visuals (wireframes, flows, dashboards)
- The narrative behind decisions, not just outputs

---

## Layout Patterns

| Pattern | Pros | Cons | Best For |
|---|---|---|---|
| **Single page scroll** | Simple, tells a story top-to-bottom, mobile-friendly | Can feel long, harder to deep-link sections | Most resume sites |
| **Two-column (sidebar + content)** | Sidebar holds nav + key info; right side scrolls. Clean hierarchy. | Sidebar can feel cramped on mobile | Developer portfolios (Brittany Chiang pattern) |
| **Full-width sections** | Each section gets breathing room, feels modern | Can feel generic without strong design | Clean/corporate feel |
| **Multi-page** | Dedicated pages for projects, about, contact | More clicks, harder to skim quickly | Portfolio-heavy sites |
| **Card/grid layout** | Great for showcasing multiple projects visually | Less narrative flow | Design portfolios |
| **Novelty/concept** | Instantly memorable, shows personality | Risky -- can confuse or alienate | Developers, designers showing craft |

**Most common winner:** Single page scroll with clear section breaks, often with a sticky or floating nav.

---

## Interactive Elements That Work Well

| Element | Effect | Complexity |
|---|---|---|
| **Dark/light mode toggle** | Shows polish, respects user preference. Often a sun/moon icon in the header. | Low-medium |
| **Smooth scroll + section highlighting** | Nav links scroll to sections; active section highlights in nav. | Low |
| **Hover effects on cards/links** | Subtle scale, color shift, or underline animation on project cards. | Low |
| **Scroll-triggered reveals** | Content fades/slides in as you scroll down. Progressive disclosure. | Medium |
| **Parallax scrolling** | Background moves slower than foreground. Adds depth. | Medium |
| **Animated timeline** | Work history animates in as you scroll past it. | Medium |
| **Typewriter effect** | Text types out in the hero section. Good for rotating taglines. | Low |
| **Cursor effects** | Custom cursor, trail effects, or interactive backgrounds that respond to mouse. | Medium-high |
| **3D elements** | Three.js scenes, floating objects, etc. | High |
| **PDF download button** | "Download my resume as PDF" -- practical and expected. | Low |

**Best ROI for effort:** Dark/light toggle, smooth scroll nav, scroll-triggered reveals, hover effects. These give the most polished feel for the least complexity.

---

## Dark/Light Mode Toggle (Deep Dive)

Since you asked specifically about mode toggles:

### How the best sites implement it
- **CSS custom properties** define color tokens (background, text, accent) under `[data-theme="light"]` and `[data-theme="dark"]`
- Toggle button (usually sun/moon icon) switches a data attribute on the HTML tag
- **localStorage** remembers user's choice across visits
- **System preference detection** via `window.matchMedia('(prefers-color-scheme: dark)')` as fallback
- Smooth transition between modes using CSS transitions on background-color and color

### Sites known for great theme toggles
- Keita Yamada's portfolio -- toggle between light and dark themes
- Josh Comeau (joshwcomeau.com) -- famously polished dark mode toggle with animation
- Many Brittany Chiang clones add this as a first customization

### Key considerations
- Dark mode isn't just inverting colors -- you need to adjust contrast, shadows, image treatments
- Both modes need to meet WCAG contrast requirements
- Toggle should be visible and discoverable (usually top-right of nav)

---

## Tech Stacks Commonly Used

| Stack | When to Use | Examples |
|---|---|---|
| **Next.js + Tailwind CSS + TypeScript** | Most popular modern stack. SSR, fast, great DX. Easy Vercel deploy. | Brittany Chiang, many GitHub templates |
| **React + Styled Components** | Good if you want component-scoped styles | Older developer portfolios |
| **Astro** | Great for static content sites with minimal JS. Fast. | Growing in popularity for portfolios |
| **Framer** | No-code, drag-and-drop, polished animations built in | PM portfolios, non-developers |
| **Webflow** | No-code with more design control than Squarespace | Designers, PMs |
| **Squarespace** | Quickest to launch, limited customization | Simple "get it done" portfolios |
| **HTML/CSS/JS (vanilla)** | Full control, no build step | Pascal van Gemert's resume |
| **Three.js (for 3D)** | When you want to show off creative dev skills | Bruno Simon |

### Open-Source Templates Worth Knowing About
- **tbakerx/react-resume-template** -- React + TypeScript + Next.js + Tailwind. Popular on GitHub.
- **colinhemphill/nextjs-resume** -- Next.js resume with PDF generation built in (uses React-PDF).
- **pascalvgemert/resume** -- Pascal van Gemert's open-source interactive resume.

---

## What Makes a CV Site Memorable (Summary)

1. **Clear positioning in the first 3 seconds** -- Who are you, what do you do, why should I care?
2. **One signature interaction** -- You don't need 10 effects. One well-executed element (a great toggle, a smooth timeline, a clever concept) is enough.
3. **Content quality over visual flash** -- The best sites have sharp, concise writing. Bullet points with outcomes, not job descriptions.
4. **Fast and accessible** -- Loads quickly, works on mobile, readable at all screen sizes.
5. **Personality** -- The site should feel like *you*, not a template. Color choices, tone of writing, what you highlight.
6. **PDF download option** -- Recruiters still want a downloadable resume. Having both web + PDF is the winning combo.

---

## Sources

- [20 Best Resume Website Examples 2026 - Colorlib](https://colorlib.com/wp/resume-websites/)
- [Resume Websites: 25+ Inspiring Examples - SiteBuilderReport](https://www.sitebuilderreport.com/inspiration/resume-websites)
- [25 Web Developer Portfolio Examples - Hostinger](https://www.hostinger.com/tutorials/web-developer-portfolio)
- [27 Inspiring Web Developer Portfolio Examples - Elementor](https://elementor.com/blog/inspiring-web-developer-portfolio-examples/)
- [32 Best Web Developer Portfolios - Magic UI](https://magicui.design/blog/best-web-developer-portfolios)
- [Bruno Simon Portfolio - Awwwards](https://www.awwwards.com/sites/bruno-simon-portfolio)
- [Brittany Chiang - One Page Love](https://onepagelove.com/brittany-chiang)
- [Pascal van Gemert - Interactive Resume](https://www.pascalvangemert.nl/)
- [Creating a Resume Website with Next.js - Colin Hemphill](https://www.colinhemphill.com/blog/creating-a-resume-website-and-pdf-generator-with-nextjs)
- [react-resume-template - GitHub](https://github.com/tbakerx/react-resume-template)
- [nextjs-resume - GitHub](https://github.com/colinhemphill/nextjs-resume)
- [Product Manager Portfolio Guide - HelloPM](https://hellopm.co/product-manager-portfolio-guide/)
- [9 Great PM Portfolio Examples - CareerFoundry](https://careerfoundry.com/en/blog/product-management/product-manager-portfolio/)
- [20 Unique Personal Website Examples - Framer](https://www.framer.com/blog/personal-website-examples/)
- [Awwward-Winning Animation Techniques - Medium](https://medium.com/design-bootcamp/awwward-winning-animation-techniques-for-websites-cb7c6b5a86ff)
- [Dark Mode Guide - CSS-Tricks](https://css-tricks.com/a-complete-guide-to-dark-mode-on-the-web/)
- [Best Light/Dark Mode Toggle - whitep4nth3r](https://whitep4nth3r.com/blog/best-light-dark-mode-theme-toggle-javascript/)
