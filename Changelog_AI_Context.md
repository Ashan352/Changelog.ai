# Changelog.ai: Full Architecture & Context Specification

## Project Overview
Changelog.ai is a high-velocity, premium SaaS platform designed for developers to instantly covert raw Git commits into polished, marketing-ready changelogs, GitHub release notes, and social media threads in under 4 seconds. 

The site is built on **Next.js 14+ (App Router)** and prioritizes a luxury, tech-editorial aesthetic featuring cinematic animations, smooth scrolling, and strict performance metrics. 

---

## 🏗️ Technology Stack
*   **Framework**: Next.js (App Router), React 18
*   **Styling**: Tailwind CSS (extensively customized with design tokens), custom CSS layers in `globals.css`.
*   **Database**: PostgreSQL via Supabase, managed with Prisma ORM.
*   **Authentication**: NextAuth.js (v5 beta) utilizing Google OAuth, GitHub OAuth, and a bespoke credentials/magic-link UI.
*   **Payments**: Stripe integration for Tiered Subscriptions (Free vs. Pro).
*   **Animations**: Framer Motion, `@studio-freight/react-lenis` (for smooth physics-based scrolling).
*   **UI Primitives**: Radix UI (or similar headless structures), Lucide React (Icons).

---

## 🎨 Visual & UI Design System
The visual language mimics high-end luxury tech products (e.g., Vercel, Linear).
*   **Color Palette**: Primarily dark mode. Uses deep blacks (`#0a0a0a`), vibrant lemon/acid yellow accents (`#e8ff47`) for CTAs, and subtle borders (`hsla(0,0%,100%,0.1)`).
*   **Typography**: Combines stark, high-legibility monospace fonts for technical data (labels, metrics, badges) with an elegant, italicized Serif font for primary marketing headers. Punctuation inside main section headers (`H1`, `H2`) is strictly forbidden.
*   **Interactions**:
    *   **Lenis Smooth Scroll**: Cinematic viewport scrolling with friction and easing.
    *   **Custom Scrollbars**: Native browser scrollbars are explicitly hidden globally (`::-webkit-scrollbar { display: none; }`).
    *   **Magnetic Buttons**: Core CTAs possess physical pull/magnetism upon cursor hover.
    *   **Micro-interactions**: Inputs glow on focus, buttons scale locally, and loaders cross-fade seamlessly via `AnimatePresence`.

---

## 🧩 Core Architecture & Components

### 1. The Landing Page (`app/page.tsx`)
A unified scrolling experience broken down into precise conversion sections:
*   **Header**: Features the Logo, Slogan ("Stop writing changelogs"), perfectly centered Desktop Nav (`absolute left-1/2`), and dynamic auth buttons (Login/Dashboard toggle).
*   **Hero (`Hero.tsx`)**: Integrates an Ambient Aurora background, live database user counters (`Stats` integration), and dynamic CTAs that change based on User Session.
*   **Product Showcase (`ProductShowcase.tsx`)**: An interactive demo bridging "Messy Commits" to "Polished Output". Features functional "Copy to Clipboard" utilities.
*   **How It Works (`HowItWorks.tsx`)**: Explains the 3-step value proposition.
*   **Developer Proof (`DomeGallery.tsx`)**: A fluid 3D carousel serving as visual testaments/reviews.
*   **Live Metrics (`Stats.tsx`)**: Connects strictly to PostgreSQL (via Prisma) to pull real, non-hardcoded numbers of active users and generations, establishing trust.
*   **Pricing (`Pricing.tsx`)**: Outlines the Free and Pro tiers, connecting to the Stripe Checkout router.
*   **Footer (`Footer.tsx`)**: Trust badges (99.9% Uptime, OAuth Secured), mission statement, and utility links.

### 2. Authentication & Registration (`app/(auth)/login/page.tsx`)
A bespoke, high-converting Single-Column Registration pipeline.
*   **Smart Toggling**: URL param `?signup=true` governs whether the user sees the "Log In" or "Create Account" copy to prevent friction.
*   **Real-time Validation**: Input limits and Regex checks run every keystroke, driving dynamic error states and `CheckCircle2` success markers.
*   **Password Visibility**: Natively integrated "Eye" toggles.
*   **Background Registration Mockup**: Includes an `AnimatePresence` driven transition state that shows an authentic "Registration Successful" card before redirecting.
*   **OAuth Fallbacks**: GitHub and Google buttons sit securely at the base.

### 3. Database Schema (`prisma/schema.prisma`)
The PostgreSQL database defines the following mission-critical entities:
*   `User`: Tracks core identity (`name`, `email`), `plan` tier (`free` | `pro`), and accumulated `generations` count.
*   `Account`: OAuth payload tracker.
*   `Session` & `VerificationToken`: Handled natively by NextAuth.

### 4. API & Webhooks
*   **Stripe Webhook (`app/api/stripe/webhook/route.ts`)**: Secure listener that watches for `checkout.session.completed` to instantly upgrade a user's `plan` payload in Supabase.
*   **Stats Action (`app/actions/stats.ts`)**: Server action that safely bridges live PostgreSQL aggregation logic to the `Stats.tsx` UI client components.

---

## 🛡️ Security & Performance Enhancements
*   **Content Security Policy (CSP)**: Hand-configured in `next.config.ts`, specifically permitting necessary external domains (like Vercel Analytics, Stripe).
*   **SSL Verification**: Implemented strict SSL enforcement (`sslmode=verify-full`) in the PostgreSQL URI inside `.env`.
*   **Layout Shift Negation**: Zero Cumulative Layout Shift (CLS) on fonts and critical renders. Minimum heights and exact widths are mathematically locked in tailwind configs.

## 🚀 Future Roadmap & Deploy Sequence
1. Deploy to Vercel.
2. Port locally tested `.env` keys (OAuth Client secrets, Stripe Webhook secrets, Supabase URIs) directly into the Vercel Dashboard.
3. Hook live Stripe Webhook URI endpoints into the Stripe dashboard for production processing.
