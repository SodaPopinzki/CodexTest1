# Bitterroot Sound LLC Website Audit

## Current Repository State

- Repository is initialized with Git metadata.
- No Astro, React, Tailwind, or application source files currently exist.
- No package manifest (`package.json`) or lockfile is present.
- No build configuration, deployment configuration, or content pages are present.

## What Exists

- Placeholder file: `.gitkeep`

## What Needs to Be Built

### 1. Project Bootstrap (Astro 5.x)
- Initialize Astro 5.x project structure.
- Add React integration for interactive components.
- Configure Tailwind CSS.
- Add Framer Motion and Howler.js dependencies.

### 2. Core Site Structure
- Global layout and shared SEO metadata.
- Home page with conversion-focused sections:
  - Hero
  - Service categories (weddings, memorials, business jingles, etc.)
  - Portfolio/audio samples
  - Testimonial area
  - Clear CTAs
- Dedicated pages:
  - Services
  - Pricing/packages
  - About (James + Bitterroot Sound LLC story)
  - Contact/order form (Netlify Forms)
  - Checkout handoff (Stripe Checkout)

### 3. Visual System
- Apply brand palette:
  - Forest Green `#1a4d2e`
  - Gold `#d4a853`
  - Sunset Orange `#e07b39`
  - Cream `#faf8f5`
  - Bark Brown `#2d1810`
  - Slate `#374151`
- Typography:
  - Inter (body)
  - Playfair Display (headings)
- Mobile-first responsive styling and spacing scale.

### 4. Interactive + Media Features
- Audio player components using Howler.js.
- Motion accents and transitions with Framer Motion.
- Form validation and submission states for lead capture.

### 5. Integrations
- Netlify Forms wired for inquiries/orders.
- Stripe Checkout flow for payment/deposit actions.

### 6. SEO + Performance
- Per-page title/description, canonical tags, and Open Graph metadata.
- Structured data for local business/service where appropriate.
- Performance optimization (image strategy, code splitting, lazy loading).

## Recommended Build Order

1. Bootstrap Astro + React + Tailwind.
2. Create global layout and design tokens.
3. Build conversion-focused home page sections.
4. Implement audio sample components.
5. Add contact/order form (Netlify Forms).
6. Add Stripe Checkout integration points.
7. Complete SEO and performance hardening.
