# Shariq Mehmood — SEO Portfolio

Personal portfolio for an SEO Specialist, built as a working demonstration of
on-page and technical SEO rather than a résumé in web form.

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · lucide-react

---

## Quick start

```bash
npm install      # install dependencies
npm run dev      # dev server at http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build locally
npm run typecheck
```

Node 18+ required. `npm run build` runs `tsc --noEmit` first, so a type error
fails the build rather than shipping.

---

## Editing content

**All copy lives in one file: `src/data/portfolio.json`.** No component contains
hardcoded content — every component reads through the typed `usePortfolio()`
hook. Edit the JSON, save, done.

The shape is enforced by `src/types/portfolio.ts`. If you add a field there, the
compiler will tell you where it needs handling.

### Where each thing lives

| Section on the page | Key in `portfolio.json` |
|---|---|
| `<title>`, meta description, canonical | `meta` |
| Hero name, tagline, bio, photo, contact | `profile` |
| Hero social pills | `socials` |
| Core Competencies | `competencies` |
| Experience | `experience` |
| Projects | `projects` |
| Education & Certifications | `education`, `certifications` |
| Testimonials | `testimonials` |
| Navbar + footer links | `nav` |

### Common edits

**Reorder projects.** Set `number` (`"01"`–`"05"`) and set `featured: true` on
the one that should lead. The `useProjects()` hook hoists the featured project
to the front, then sorts by `number`. Currently SnuGyz is featured.

**Add a testimonial.** The entire Testimonials section is hidden while
`testimonials` is `[]`. Add one object and the section appears — no component
change needed:

```json
{
  "id": "unique-slug",
  "quote": "…",
  "author": "Name",
  "role": "Title",
  "company": "Company"
}
```

**Hide a social pill.** Remove it from `socials`, or blank its `href` — empty
hrefs are filtered out so an empty pill never renders.

**Add a missing date.** Set `dates` on any `experience` entry. When `dates` is
`""` the monospace pill is hidden entirely rather than rendering blank. Both
SEO Intern roles are currently blank because the résumé does not state dates.

---

## Before you deploy — required change

The site is built against the placeholder domain **`https://shariqmehmood.com`**.
Replace it in **four** places or canonical, OG and schema will point at the wrong
host:

1. `index.html` — `rel="canonical"`, `og:url`, `og:image`, `twitter:image`
2. `src/data/portfolio.json` — `meta.siteUrl`
3. `public/robots.txt` — the `Sitemap:` line
4. `public/sitemap.xml` — the `<loc>` value (and bump `<lastmod>`)

Quick find-and-replace:

```bash
grep -rl "shariqmehmood.com" index.html public src | \
  xargs sed -i 's|shariqmehmood.com|YOURDOMAIN.com|g'
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, GitHub
Pages). No server runtime needed.

---

## SEO implementation notes

- **One `<h1>`** — the hero. Every section below uses `<h2>`, sub-blocks `<h3>`,
  case-study labels `<h4>`. Verified: 1 / 6 / 19 / 10.
- **Schema.org `Person`** JSON-LD rendered in the hero, generated from
  `portfolio.json` so it can never drift from the visible copy. Includes
  `jobTitle`, `knowsAbout`, `alumniOf`, `hasCredential`, `sameAs`.
- **Case-study text stays in the DOM when collapsed.** The accordion animates
  height rather than unmounting, so all five case studies are crawlable without
  interaction. Unmounting would have hidden four of five from crawlers.
- **Self-hosted Kanit** via `@fontsource/kanit`, latin subset only, four weights
  (300/400/500/600) — ~75 kB total, no third-party font request, no
  render-blocking CDN round-trip.
- **No cross-origin images.** Project cards use generated SVG/CSS covers instead
  of remote OG images. Nothing can 404, nothing shifts layout, nothing blocks
  LCP. Each project's real OG URL is preserved in `portfolio.json` under
  `ogImage` for reference if you later self-host real screenshots.
- **No layout shift.** The hero portrait has explicit `width`/`height` plus an
  `aspect-square` container and is preloaded with `fetchpriority="high"` as the
  LCP element. Covers use fixed aspect-ratio boxes.
- **`robots.txt` + `sitemap.xml`** shipped in `public/`, served from the root.
- **Accessibility:** skip link, visible focus rings, `aria-expanded` on the
  accordion and mobile menu, `aria-live` on the email copy confirmation,
  decorative SVG marked `aria-hidden`.
- **`prefers-reduced-motion`** collapses all animation and smooth scrolling.
- **`word-break: normal`** set explicitly on body and prose elements, so no word
  ever breaks mid-token.

### Verification scripts

Two throwaway scripts are included at the project root:

```bash
node audit.mjs   # 35 assertions against dist/ — head tags, OG, crawl files, CSS
node smoke.mjs   # renders the built bundle in jsdom, asserts zero console errors
```

`smoke.mjs` needs `npm install --no-save jsdom`. Both are development aids and
can be deleted without affecting the build.

---

## Project structure

```
public/
  images/          hero portrait (720 + 360) and 1200×630 OG image
  robots.txt  sitemap.xml  favicon.svg
  Shariq-Mehmood-SEO-Specialist-Resume.pdf
src/
  components/      Navbar, HeroSection, AboutSection, CoreCompetenciesSection,
                   ExperienceSection, ProjectsSection, ProjectCard,
                   EducationSection, TestimonialsSection, Footer, SectionHeading
  data/portfolio.json    ← all content
  hooks/usePortfolio.ts  ← typed accessors + Person schema builder
  types/portfolio.ts
  index.css        design tokens, .hero-heading, reduced-motion
  App.tsx  main.tsx
```

`SectionHeading.tsx` is a shared eyebrow + `<h2>` block, added to keep the
heading treatment identical across sections; it is the only component beyond
those specified.

---

## Design tokens

| Token | Value |
|---|---|
| Background | `#0C0C0C` |
| Card surface | `#131313` |
| Hairline border | `rgba(255,255,255,0.08)` |
| Chrome display gradient | `#646973 → #BBCCD7` (180deg) |
| Accent gradient | `#4ADE80 → #14B8A6` |
| Display / body face | Kanit |
| Utility / data face | system monospace stack |

Colours are defined in `tailwind.config.js`; the two gradients are in
`src/index.css` as `.hero-heading` and `.accent-rule` / `.accent-text`.
