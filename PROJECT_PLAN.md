# Portfolio + Blog — Project Plan

## Goal

A personal portfolio website with a blog, hosted on Vercel and managed via Sanity CMS. The blog's defining feature is a **two-module essay format**: a main text body and a side-footnote module. Links in the main text navigate to footnotes; both modules support text, images (PNG/GIF), and external links. New essays are authored as repeatable CMS documents — no code changes per post.

## Stack

- **Next.js (App Router)** — React Server Components, static rendering, standard Vercel pairing.
- **Sanity** — headless CMS. Studio embedded at `/studio` in the same repo/deploy.
- **Portable Text** — Sanity's structured rich-text format; powers both body and footnotes.
- **Tailwind CSS** — styling. Breakpoint-driven responsive layout for the sidenote/footer split. `shadcn/ui` available later for richer UI.
- **Vercel** — hosting and CI/CD deploys.

## Locked-in decisions

1. **Footnote rendering:** desktop = margin sidenotes (Tufte-style), aligned to their reference. Mobile = footer section with a "return to text" link from each footnote. A tap-to-popover variant is a later enhancement, not a launch requirement.
2. **Styling:** Tailwind CSS.
3. **Portfolio content:** hand-coded React pages at launch, but the rendering layer (Portable Text components, image handling, links) is built generically so a future `project` Sanity schema can reuse it without rewrites.

## Content model (Sanity)

```
post (document)
├── title, slug, publishedAt, coverImage, excerpt
├── body            → Portable Text
│   ├── blocks: headings, paragraphs
│   ├── inline image (png/gif)
│   ├── external link (mark)
│   └── footnoteRef (custom mark → footnote _key)
└── footnotes[]      → array of:
    ├── _key, number/label
    └── content      → Portable Text (text, images, links)
```

Every new essay = a new `post` document in Studio. No code changes required.

## Known gotchas

1. **Animated GIFs:** Sanity's image CDN strips GIF animation under transforms. Serve GIFs from the original asset URL (no transform params). Detect GIF mime type at render.
2. **Bidirectional navigation:** footnote markers jump to the footnote; each footnote needs a "return to text" affordance back to the marker position.
3. **Studio location:** embedded at `/studio` for a single repo and deploy.

## Phased plan

### Phase 1 — Foundations (current)
- Scaffold Next.js + Sanity + Tailwind.
- Connect to a Sanity project; embed Studio at `/studio`.
- Deploy a hello-world to Vercel.

### Phase 2 — Content model
- Define `post` schema: fields, footnote array, custom Portable Text marks (footnoteRef, external link, inline image).
- Verify authoring end-to-end in Studio.

### Phase 3 — Rendering (built generically / reusable)
- Portable Text renderer for the body; custom components for footnote markers, links, images.
- GIF passthrough handling.
- Keep components decoupled from "post" so a future `project` type reuses them.

### Phase 4 — Footnote UX
- Desktop sidenotes (margin layout, alignment to reference).
- Mobile footer collapse with scroll/jump + return-to-text links.
- (Optional later) tap-to-popover for short footnotes.

### Phase 5 — Portfolio shell
- Home/landing, projects/work pages, about, nav, layout, styling.
- Hand-coded content; CMS-ready structure.

### Phase 6 — Polish & launch
- SEO/metadata, OG images, responsive QA, performance, custom domain, production deploy.

### Future
- `project`/`work` Sanity schema to bring portfolio content into the CMS, reusing Phase 3 rendering.
