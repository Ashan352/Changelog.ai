# Product Requirements Document: Changelog.ai

## 1. Executive Summary
**Changelog.ai** is a high-velocity developer tool designed to eliminate the friction between shipping code and informing users. It leverages AI to transform raw Git commit logs into polished, multi-platform artifacts: professional changelogs, GitHub release bodies, and social media tweet threads.

---

## 2. Target Audience
- **Individual Developers**: Wanting to automate repetitive documentation tasks.
- **Open Source Maintainers**: Needing consistent, readable release notes.
- **Startup Teams**: Shipping fast and requiring rapid marketing synchronization.

---

## 3. Product Features (V1.0)

### 3.1 AI Generation Engine
- **Logic**: Multi-agent orchestration using Mistral/OpenRouter to parse and categorize commits.
- **Artifacts**:
    - `CHANGELOG.md`: Standard markdown format with semantic categorization (Added, Fixed, Chores).
    - `GitHub Release`: Polished summary with emojis and version highlights.
    - `Twitter/X Thread`: Engagement-focused thread summarizing the release.
- **Safety**: Built-in "Slop Detection" and "Breaking Change" flagging.

### 3.2 User Dashboard
- **Generator**: Interactive input area for commits with real-world formatting support.
- **History**: Permanent storage of all past generations for reference and re-export.
- **Usage Tracking**: Real-time visualization of generation limits and subscription status.

### 3.3 Account & Authentication
- **Multi-Provider Auth**: Secure login via GitHub, Google, or Credentials (Email/Password).
- **Security**: Strict "User-First" policy—forcing signup for new accounts and preventing unintended account merging.
- **Settings**: Full profile management and data deletion (Account Purge) functionality.

### 3.4 Monetization & Billing
- **Free Tier**: 5 total generations to sample the product.
- **Pro Plan**: Unlimited generations, priority AI models, and custom hosted pages.
- **Stripe Integration**: Secure checkout and recurring billing management.

---

## 4. Technical Architecture

### 4.1 Frontend
- **Framework**: Next.js 16 (App Router)
- **Styling**: Vanilla CSS for specialized animations.
- **Animations**: GSAP for luxury menu transitions and Framer Motion for micro-interactions.
- **Legibility**: High-contrast "SeaShell" (#FFF5EE) and White (#FFFFFF) typography standard.

### 4.2 Backend & Data
- **Database**: PostgreSQL (Supabase) managed via Prisma ORM.
- **Auth**: NextAuth.js with JWT strategy.
- **API**: Edge-compatible Route Handlers for high-speed generation.

### 4.3 AI & Integrations
- **AI Core**: OpenRouter (Mistral 7B / Large 2)
- **Payments**: Stripe (Checkout + Webhooks)
- **Performance**: Vercel Speed Insights for RUM (Real User Monitoring).

---

## 5. UI/UX Philosophy
- **Luxury Aesthetic**: Cinematic visual textures (Aurora backgrounds, Noise overlays).
- **Velocity First**: Minimal clicks from "Paste" to "Ship".
- **Responsive Mastery**: 100% mobile-optimized with no horizontal overflow and touch-friendly controls.

---

## 6. Future Roadmap
- **GitHub App**: Direct integration to watch repositories and auto-generate notes on Tag push.
- **Custom Templates**: User-definable AI prompt templates for different brand voices.
- **Public Hosted Pages**: SEO-optimized changelog pages hosted on `changelog.ai/yourproject`.
- **API Access**: Programmatic generation for CI/CD pipelines.

---

## 7. Success Metrics
- **Conversion Rate**: Free-to-Pro upgrade percentage.
- **Retention**: Monthly Active Users (MAU) returning for multiple releases.
- **Accuracy**: User satisfaction with AI-categorized commit logs.
