# Fonts

How typefaces are wired up across the site, and which content role uses which one.

## 1. The variable layer (edit fonts here, not in components)

```
app/layout.tsx
├─ --font-heading-cormorant → Cormorant Garamond   (site-wide heading, current default)
├─ --font-body-inter        → Inter                 (site-wide body, current default)
├─ --font-heading-new       → Libre Bodoni          (trial pairing)
├─ --font-body-new          → Manrope               (trial pairing)
│
├─ --font-heading = PREVIEW_NEW_FONTS ? --font-heading-new : --font-heading-cormorant
└─ --font-body    = PREVIEW_NEW_FONTS ? --font-body-new    : --font-body-inter
```

Every component references `var(--font-heading)` / `var(--font-body)` — never a font name directly. To swap the site's typeface, edit the Google Font import + the two `variable:` mappings in `layout.tsx`; nothing in the components needs to change.

**One exception:** `OurStorySection.tsx` is hardcoded to `var(--font-heading-new)` / `var(--font-body-new)` (Libre Bodoni/Manrope) regardless of the `PREVIEW_NEW_FONTS` flag — it's permanently pinned there as the font trial. Flip `PREVIEW_NEW_FONTS = true` in `layout.tsx` to preview that pairing on the rest of the site too.

## 2. The content hierarchy (which role uses which variable)

| Role | Example | Variable | Typical size |
|---|---|---|---|
| **Hero names** | "Sol & Gabriel" | `--font-heading` | `text-7xl` → `text-9xl` |
| **Section heading (h2)** | "Confirmar Asistencia", "Mesa de Regalos", "Código de Vestimenta" | `--font-heading` | `text-4xl` |
| **Card/milestone title (h3)** | itinerary item names, FAQ questions, drawer titles | `--font-heading` | `text-2xl`–`text-3xl` |
| **Countdown digits** | "02 · 29 · 19..." | `--font-heading` | large, bold-ish |
| **Eyebrow / label** | "RSVP", uppercase tracked tags | `--font-body` | `text-xs`–`text-sm`, uppercase, tracked |
| **Body paragraph** | descriptions, FAQ answers, form helper text | `--font-body` | `text-sm`–`text-base` |
| **Form inputs / buttons** | RSVP fields, CTA buttons | `--font-body` | `text-sm` |

There's no separate "subtitle" variable — subtitles/eyebrows are just smaller `body`-variable text styled with `uppercase tracking-widest`, not a distinct font role. Heading tier (h1/h2/h3, numbers) always uses `--font-heading`; everything else uses `--font-body`.

### `OurStorySection` (pinned trial, Libre Bodoni/Manrope)

| Role | Variable |
|---|---|
| Eyebrow ("Estás cordialmente invitado...") | `--font-body-new` |
| Heading ("Nuestra historia de Amor") + milestone titles | `--font-heading-new` |
| Milestone body text | `--font-body-new` |
