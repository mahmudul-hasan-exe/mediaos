# MediaOS — Multi-Tenant Newspaper & Digital Publishing Management Platform

**Brand:** MediaOS  
**Developer:** SoftSync Agency  
**Tagline:** *One Platform. Every Publication.*  
**Primary Color:** `#2563EB` (Royal Blue)

---

## 1. Executive Summary

**MediaOS** is a commercial-grade, multi-tenant digital publishing platform engineered for media conglomerates, independent national broadsheets, and regional newspapers. It enables multiple independent newspaper organizations to manage distinct publications, custom domains, native branding, multi-language editions, and revenue ad campaigns through a centralized multi-tenant architecture.

The platform consists of four unified operational pillars:
1. **Public Newspaper Website:** Modern broadsheet layout, breaking news ticker, multimedia dispatches, category sections, font-size accessibility controls, social sharing, interactive reader comments, and an authentic print-replica digital E-Paper.
2. **Super Admin Console:** Platform-wide oversight of tenant subscriptions, MRR analytics, automated tenant provisioning, upstream AI provider orchestration (OpenAI, Gemini, Anthropic), S3 storage, and system audit logs.
3. **Newspaper Admin CMS:** Comprehensive newsroom management for individual publications—rich editorial news composer, breaking news dispatch, category hierarchies, journalist directories, media library, monetization banner zones, and push broadcasts.
4. **Editorial & Reporter Desk:** Dedicated role-aware review queue (Draft → Pending Review → Approved → Scheduled / Published → Rejected with reviewer feedback notes) and a reporter workbench.

---

## 2. Technology Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS with PostCSS & CSS Variables
- **Design System:** shadcn/ui & Radix UI accessible primitives
- **Icons:** Lucide React
- **State Management:** Zustand with local persistence
- **Data Fetching & API:** Centralized Axios client with tenant headers (`X-Tenant-Domain`, `X-Tenant-ID`) and TanStack Query readiness
- **Form Management:** React Hook Form & Zod schema validation
- **Data Visualization:** Custom SVG & Tailwind SaaS analytics bars
- **Internationalization:** Multi-language dictionary engine supporting English (`en`), Bangla (`bn`), and Arabic (`ar` with native RTL layout flipping)

---

## 3. Application Directory Structure

```text
MediaOS/
├── frontend/
│   ├── app/
│   │   ├── (public)/                 # Public Broadsheet Newspaper Pages
│   │   │   ├── page.tsx              # Front Page (Breaking Ticker, Hero Grid, Videos, Ads)
│   │   │   ├── news/[slug]/page.tsx  # Article Details, Audio/Gallery, Font Sizing, Comments
│   │   │   ├── category/[slug]/page.tsx # Category & Subcategory Desks
│   │   │   ├── search/page.tsx       # Archive Search & Filters
│   │   │   ├── epaper/page.tsx       # Interactive Digital E-Paper Replica with Hotspots
│   │   │   ├── trending/page.tsx     # Trending & Most Read Stories Ranking
│   │   │   ├── about/page.tsx        # Newsroom Heritage & Principles
│   │   │   ├── contact/page.tsx      # Bureau Contacts & Whistleblower Tips
│   │   │   ├── privacy/page.tsx      # Privacy Policy
│   │   │   ├── terms/page.tsx        # Terms of Service
│   │   │   └── layout.tsx            # Public Layout with Masthead & Footer
│   │   ├── (auth)/                   # Authentication & Access Control
│   │   │   ├── login/page.tsx        # Role-aware login with instant demo switcher
│   │   │   ├── register/page.tsx     # Tenant publication onboarding
│   │   │   ├── forgot-password/page.tsx
│   │   │   ├── reset-password/page.tsx
│   │   │   ├── verify-email/page.tsx
│   │   │   ├── two-factor/page.tsx
│   │   │   ├── unauthorized/page.tsx
│   │   │   └── layout.tsx
│   │   ├── super-admin/              # Platform Super Admin Console
│   │   │   ├── page.tsx              # Platform Overview & MRR Analytics
│   │   │   ├── tenants/page.tsx      # All Tenants Registry & Suspend/Activate
│   │   │   ├── tenants/create/page.tsx # Provision New Newspaper Tenant
│   │   │   ├── plans/page.tsx        # SaaS Subscription Tiers (Starter, Pro, Enterprise)
│   │   │   ├── ai-providers/page.tsx # Upstream AI Gateway (Gemini, OpenAI, Anthropic)
│   │   │   ├── analytics/page.tsx    # Macro Platform Growth & Infrastructure Health
│   │   │   ├── settings/page.tsx     # SMTP, S3 Storage, License Key, System Logs
│   │   │   └── layout.tsx
│   │   ├── admin/                    # Newspaper CMS Management
│   │   │   ├── page.tsx              # Newsroom CMS Overview & Traffic
│   │   │   ├── news/page.tsx         # All News (Drafts, Pending, Approved, Published)
│   │   │   ├── news/create/page.tsx  # Rich News Editor with Integrated AI Writing Assistant
│   │   │   ├── news/[id]/edit/page.tsx # Edit Story
│   │   │   ├── news/review/page.tsx  # Editorial Fact-Checking & Review Queue
│   │   │   ├── categories/page.tsx   # Category Desks & Subcategories
│   │   │   ├── authors/page.tsx      # Authors, Columnists & Reporters
│   │   │   ├── media/page.tsx        # Media Library & Asset CDN Manager
│   │   │   ├── ai/page.tsx           # Standalone AI Editorial Suite
│   │   │   ├── epaper/page.tsx       # BroadSheet Editions Management
│   │   │   ├── advertisements/page.tsx # Ad Zones & Sponsor Campaigns
│   │   │   ├── comments/page.tsx     # Reader Comments Moderation
│   │   │   ├── notifications/page.tsx# Push Notification Broadcasts
│   │   │   ├── settings/page.tsx     # Publication Branding, RSS, Social
│   │   │   ├── analytics/page.tsx    # Readership Demographics & Top Desks
│   │   │   └── layout.tsx
│   │   ├── reporter/                 # Reporter Desk
│   │   │   ├── page.tsx              # Correspondent Workbench & Submissions
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   └── rss/route.ts          # Automated RSS 2.0 XML Syndication
│   │   ├── robots.ts                 # Search Engine Crawler Directives
│   │   ├── sitemap.ts                # Dynamic Multi-Route XML Sitemap
│   │   ├── not-found.tsx             # 404 Error Page
│   │   ├── layout.tsx                # Root Layout
│   │   └── globals.css               # Design Tokens & Custom CSS
│   ├── components/
│   │   ├── ui/                       # Reusable shadcn/Radix Component Primitives
│   │   ├── shared/                   # RoleSwitcher, TenantSwitcher, DataTable, StatCard
│   │   ├── layout/                   # Header, Sidebar, Masthead, Footer
│   │   ├── newspaper/                # BreakingTicker, HeroNewsGrid, NewsCard, AdBanner
│   │   └── ai/                       # AIWritingModal & Prompt Generator
│   ├── lib/
│   │   ├── api-client.ts             # Centralized Axios Client with Tenant Headers
│   │   ├── utils.ts                  # Date formatters, slugify, cn helper
│   │   └── translations.ts           # Multi-language Dictionaries (EN, BN, AR)
│   ├── services/                     # Business Logic Services with Realistic Mock Data
│   ├── stores/                       # Zustand Stores (Auth, Tenant, UI/Locale)
│   └── types/                        # TypeScript Strict Domain Interfaces
```

---

## 4. Multi-Tenant Architecture & Domain Resolution

MediaOS isolates publications logically and visually:
1. **Dynamic Branding:** When switching tenants, the active organization's brand name, color theme, logo, custom domain, and tagline update dynamically across both the public broadsheet and CMS backoffice.
2. **Domain Header Resolution:** Every outgoing request dispatched via `lib/api-client.ts` automatically attaches:
   - `X-Tenant-Domain`: Registered FQDN (e.g. `metrochronicle.com`)
   - `X-Tenant-ID`: Unique tenant identifier
   - `Accept-Language`: Active reader locale (`en`, `bn`, `ar`)
3. **Tenant State Enforcement:** The system prevents cross-tenant data leaks and handles suspended tenants cleanly.

---

## 5. Roles & Editorial Workflow

The platform enforces strict role-aware routing and permissions:
- **Super Admin:** Global platform management, tenant provisioning, subscription billing, upstream AI models.
- **Newspaper Admin / Owner:** Full control over publication CMS, news, categories, monetization, e-paper, and staff invitations.
- **Desk Editor:** Access to the **Editorial Review Queue** (`/admin/news/review`) to fact-check, request changes, or reject with feedback notes before stories can be published.
- **Field Reporter:** Reporter workspace (`/reporter`) to draft dispatches, view editorial feedback notes, and track bylines.
- **Public Reader:** Front-page access, multi-language switching, e-paper reader, comments, and newsletter signup.

---

## 6. AI Writing Suite & Human Oversight Guardrails

MediaOS features 8 specialized AI editorial tools:
1. **AI Article Writer:** Generates complete journalistic stories from factual prompts.
2. **AI Headline Generator:** Produces punchy, broadsheet-calibrated headlines.
3. **AI Article Rewriter:** Enhances clarity, objectivity, and flow.
4. **AI Summarizer:** Distills articles into executive takeaways and bullet points.
5. **AI Multilingual Translator:** Flawlessly translates across English, Bangla, and Arabic.
6. **AI SEO Generator:** Synthesizes optimized meta titles, descriptions, and keywords.
7. **AI Social Media Broadcaster:** Formulates broadcast packages for X, LinkedIn, and Facebook.
8. **Photojournalism Prompt Generator:** Creates photorealistic documentary image prompts.

> [!IMPORTANT]
> **Zero Unsupervised Publishing:** All AI-generated outputs are initialized in `draft` status. They must be audited and verified by an authorized human editor before syndication.
> **Zero Secret Leakage:** Upstream API keys are never bundled into client JavaScript. All AI requests pass through the centralized Laravel backend proxy.

---

## 7. Digital E-Paper Replica Viewer

The E-Paper module (`/epaper`) provides an authentic print replica experience:
- High-definition broadsheet layout rendering.
- Interactive page-turner navigation (Page 1 to 16).
- Zoom in / Zoom out magnification controls (80% to 150%).
- **Interactive Clipping Hotspots:** Clicking on any story box on the broadsheet opens a modal containing the full article excerpt with a direct link to the multimedia web article.
- PDF download option.

---

## 8. Internationalization & RTL Support

MediaOS natively supports:
- **English (`en`)**: LTR layout
- **Bangla (`bn`)**: LTR layout with native Bengali typography
- **Arabic (`ar`)**: Full **RTL (Right-to-Left)** layout flipping with custom font smoothing

The active language can be toggled instantly from the header language switcher.

---

## 9. Laravel REST API Integration Readiness

The frontend is 100% prepared to connect to a Laravel REST API v1 backend:
- `lib/api-client.ts` centralizes all HTTP interactions with automatic Bearer token injection.
- Automatic logout and session redirection on `401 Unauthorized`.
- Isolated services (`news-service.ts`, `media-service.ts`, `tenant-service.ts`, `ai-service.ts`) allow replacing simulated data with real Laravel endpoints in seconds without altering UI components.

---

## 10. Getting Started

### Prerequisites
- Node.js 18+ (tested on Node v20 & v26)
- npm or yarn

### Installation & Development Run
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install --legacy-peer-deps

# Start the Next.js development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Start the production server
npm run start
```

---

## 11. Commercial Publishing Details

- **Product Name:** MediaOS
- **Developer:** SoftSync Agency
- **Tagline:** One Platform. Every Publication.
- **License:** Commercial SaaS License (Suitable for CodeCanyon, SellMyCode, and Enterprise SaaS deployments)

