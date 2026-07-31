# Portfolio — Full Stack Developer

A production-ready personal portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4 and Framer Motion. Dark-first design with a full light theme, motion on every interaction, and all content driven from a single data layer.

## Getting started

Requires **Node.js 20.9 or newer** (Next.js 16's minimum).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint (flat config)
npm run typecheck  # tsc --noEmit
```

## Replacing the placeholder content

Every piece of copy lives under `src/data/`. Nothing is hard-coded in components.

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Name, role, email, location, availability, socials, stats, hero intro, typewriter phrases |
| `src/data/skills.ts` | Skill categories, individual skills and their depth (`core` / `strong` / `working`) |
| `src/data/projects.ts` | Projects, filter categories, GitHub and demo links |
| `src/data/experience.ts` | Timeline roles, achievements and stacks |
| `src/data/credentials.ts` | Degree, certifications and achievements shown in the About section |

Types for all of it are in `src/types/index.ts`, so a mistake in the data shows up as a type error rather than a broken layout.

Before deploying, check these:

1. **Your photo** — the hero card renders `siteConfig.photo`. Drop an image into `public/` and set the field to its path:

   ```ts
   photo: "/profile.jpg" as string | null,
   ```

   While it is `null` the card shows a styled monogram placeholder with an "Add your photo" hint, so the layout is identical either way. A portrait crop around 4:5 works best; it is rendered through `next/image` with `priority`, so it is optimised and preloaded for LCP.

2. **`siteConfig.url`** — used for canonical URLs, Open Graph tags, `sitemap.xml` and `robots.txt`. Currently a placeholder domain.
3. **`public/resume.pdf`** — the hero's "Download CV" button points at `siteConfig.resumeUrl`. Drop your PDF in `public/`, or change the field to an external link. The `public/` folder ships empty, so that link 404s until you add the file.
4. **Social URLs** — `socialLinks` in `src/data/site.ts`. The LinkedIn and GitHub handles are guessed from the CV; confirm both resolve.
5. **Project links and years** — `src/data/projects.ts` ships with `links: {}` for every project, so the cards render without link affordances. Add `github` / `demo` URLs where they exist. The `year` values are inferred from your employment dates and are worth checking.

## Contact form

Submissions go through a server action (`src/app/actions/contact.ts`) and are validated with the same Zod schema on both sides of the wire.

Set `CONTACT_WEBHOOK_URL` in `.env.local` to forward submissions as JSON to Resend, Formspree, an n8n workflow, or your own endpoint. Without it, submissions are validated and logged to the server console — see `.env.example`.

## Architecture

```
src/
├─ app/
│  ├─ actions/contact.ts     server action for form submissions
│  ├─ layout.tsx             fonts, metadata, theme provider, chrome
│  ├─ page.tsx               section composition
│  ├─ globals.css            design tokens + Tailwind v4 theme
│  ├─ icon.tsx               generated favicon
│  ├─ opengraph-image.tsx    generated 1200×630 social card
│  ├─ sitemap.ts / robots.ts
│  └─ not-found.tsx
├─ components/
│  ├─ layout/                navbar, footer, theme provider & toggle
│  ├─ sections/              hero, about, skills, projects, experience, contact
│  └─ ui/                    button, badge, field, reveal, spotlight-card,
│                            magnetic, section-heading, ambient background…
├─ data/                     all site content
├─ hooks/                    active section, scroll state, body-scroll lock,
│                            typewriter, count-up, mounted
├─ lib/                      cn helper, shared motion language, zod schemas
└─ types/                    shared domain types
```

### Design system

Colours, shadows and radii are CSS custom properties in `src/app/globals.css`, mapped into Tailwind through `@theme inline`. Changing `--accent` there re-tints the entire site — buttons, glows, borders, spotlights and the scroll progress bar all read from it. Light and dark are two token sets over identical component code.

### Motion

`src/lib/motion.ts` holds the shared easing curves, spring configs and variants. Components import from it rather than declaring their own timings, which is what keeps transitions feeling like one system. `prefers-reduced-motion` is honoured globally in CSS and again per-component via `useReducedMotion`, so nothing decorative animates for users who opt out.

### shadcn/ui

`components.json` is configured, so `npx shadcn@latest add <component>` drops new primitives into `src/components/ui` against the existing token names.

## Accessibility

Skip link, semantic landmarks, labelled sections, visible focus rings, `aria-current` on the active nav item, live regions on the project filter and clipboard copy, full keyboard support in the mobile menu (Escape closes, body scroll locks), and form errors wired through `aria-invalid` / `aria-describedby`.

## Deploying

Push to a Git remote and import the repository on Vercel — no configuration needed. Set `CONTACT_WEBHOOK_URL` in the project's environment variables if you want form delivery.
