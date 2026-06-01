# Wedding Invitation Website — Project Summary

## Goal

Build a modern, elegant, mobile-first wedding invitation website that:
- Looks premium
- Loads fast
- Is easy for guests to use
- Handles RSVP collection
- Is inexpensive and easy to maintain

The website should prioritize simplicity, accessibility, and mobile usability over excessive animations or complexity.

---

## Stack

### Frontend
- **Next.js** (App Router) — main framework
- **Tailwind CSS** — styling
- **Framer Motion** — optional, light animations only

### Backend
- **Supabase** — RSVP persistence, guest management, personalized invitations

### Hosting & Deployment
- **Vercel** — free tier, native Next.js integration, auto-deploy from GitHub
- **GitHub** → Vercel auto-deploy pipeline

### Domain
- Custom domain (e.g., `yournames.com` or `surname-wedding.com`)
- Recommended registrars: Cloudflare Registrar or Namecheap
- Connect domain to Vercel

---

## Architecture

```
Next.js Frontend
    ↓
Supabase Backend/API
    ↓
Vercel Hosting
```

---

## Features

### Core (Phase 1 MVP)
- Landing page
- Wedding information (date, time, location)
- RSVP form
- Countdown timer
- Google Maps link
- Dress code section
- Registry/gifts section
- Contact buttons (WhatsApp)
- Responsive design

### Optional (Phase 2)
- Personalized guest pages / invitation code system
- Guest database
- Seating table lookup
- Photo gallery
- Animations
- Multi-language support
- Story/timeline section

---

## Suggested Folder Structure

```
/app
/components
/styles
/public
    /images
    /fonts
/lib
```

### Pages
- `/` — Home
- `/story` — Our Story
- `/rsvp` — RSVP Form
- `/gallery` — Photo Gallery
- `/info` — Event Info

---

## UX & Design Priorities

Most guests will open the site from WhatsApp, on a phone, for less than 1 minute.

**Optimize for:** "Open → understand everything immediately."

### Must-Have
- Mobile-first layout
- Large, readable typography
- Fast loading
- Minimal clicks to RSVP
- High-contrast text
- Large buttons (usable by older relatives)
- Works on slow connections

### Avoid
- Heavy animations
- Intro videos
- Autoplay music
- Complex authentication
- Slow loading assets
- Overengineering

### Visual Aesthetic
- Elegant, minimal, warm, editorial/premium
- References: The Knot, Zola, Joy Wedding

---

## Estimated Costs

| Item    | Cost             |
|---------|-----------------|
| Domain  | ~$10–20/year    |
| Hosting | Free (Vercel)   |
| Database| Free (Supabase) |
| **Total** | **~$20/year** |

---

## Development Goals

Primary objective: Create a beautiful and practical digital invitation experience, not a complex web application.

Focus on: polish, usability, readability, emotional presentation, reliability.
