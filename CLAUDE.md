@AGENTS.md

# Wedding Invitation — Sol & Gabriel · Nov 14, 2026 · Lima, Perú

## Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Framework  | Next.js 16 (App Router), React 19       |
| Styling    | Tailwind CSS v4                         |
| Language   | TypeScript                              |
| Backend    | Supabase (not yet wired up)             |
| Hosting    | Vercel (auto-deploy from GitHub)        |

**These are bleeding-edge versions with breaking changes.** Read `node_modules/next/dist/docs/` before touching Next.js APIs. Tailwind v4 config lives in CSS, not `tailwind.config.js`.

## Project goal

A premium, mobile-first digital wedding invitation — not a web app. Most guests arrive from WhatsApp on a phone and spend under a minute. Optimize for: open → understand everything immediately.

Avoid: heavy animations, complex auth, overengineering, slow assets.

Exception: background music (`MusicPlayer.tsx`) autoplays on load, falling back silently to its "off" state if the browser blocks unmuted autoplay.

## File structure

```
app/
  layout.tsx          — root layout, fonts (Cormorant Garamond + Inter), lang="es"
  page.tsx            — Spanish invitation (/)
  globals.css         — global styles + Tailwind
  en/
    page.tsx          — English invitation (/en)
components/
  HeroSection.tsx
  CountdownSection.tsx
  EventInfoSection.tsx
  LocationSection.tsx
  DressCodeSection.tsx
  RegistrySection.tsx
  RsvpSection.tsx
  ContactSection.tsx
content/
  types.ts            — SiteContent interface (single source of truth for all text)
  es.ts               — Spanish strings (primary)
  en.ts               — English strings (/en route)
```

## Content / i18n system

All UI text lives in `content/es.ts` and `content/en.ts`. Every component accepts a typed `content` prop (e.g. `content: SiteContent["hero"]`). The pages import a content object and pass slices down:

```tsx
import es from "@/content/es";
<HeroSection content={es.hero} />
```

To change any copy, edit only the content files — never touch component JSX for text changes. To add a new language, add a new file in `content/` and a new route under `app/`.

> Note: `<html lang>` is fixed to `"es"` in the root layout — Next.js App Router does not allow nested layouts to override it. This is a minor SEO imperfection; both routes work correctly.

## Design tokens

**Warm palette (base):**
- Backgrounds: `#faf8f4` (off-white), `#f5f0e8` (warm cream), `#ffffff`
- Gold accent: `#c9a96e` — used only for decorative divider lines and italic signature text
- Text: `#2c2c2c` (primary), `#7a7a7a` (secondary), `#9a8066` / `#6b5744` (muted warm)

**Blue palette (accent sections & interactions):**
- `#5D7B9F` — dark section backgrounds (Countdown, Contact) — replaces charcoal
- `#9BAED4` — interactive states: input focus borders, active/hover buttons in RSVP
- `#AEBDCF` — muted text inside blue sections (replaces `#9a8a7a` on dark bg)

**Rule:** gold = decorative, blue = structural sections and user interactions. Never use both as competing accents in the same element.

**Fonts:**
- Heading: `var(--font-heading)` → Cormorant Garamond (light, italic for accents)
- Body: `var(--font-body)` → Inter

## Current state (Phase 1 MVP — UI complete)

- [x] All sections built and rendering correctly
- [x] Countdown timer (live, client-side)
- [x] RSVP form (UI only — Supabase not connected)
- [x] Spanish (`/`) and English (`/en`) routes
- [ ] Supabase RSVP persistence (RsvpSection has a `// TODO: wire to Supabase` comment)
- [ ] Custom domain
- [ ] Personalized guest pages / invitation codes (Phase 2)

## Wedding details

- **Couple:** Sol & Gabriel
- **Date:** Saturday, November 14, 2026
- **Ceremony:** Parroquia Nuestra Señora de Fátima, Av. Armendariz 350, Lima, Perú · 12:00 PM
- **Maps link:** https://maps.app.goo.gl/UqyHfwYS5m7971fz5
- **RSVP deadline:** May 31, 2026
- **Dress code:** Black Tie
- **Registry stores:** Amazon, El Corte Inglés (URLs are `#` placeholders)
- **WhatsApp contact:** `+34600000000` (placeholder — needs real number)
