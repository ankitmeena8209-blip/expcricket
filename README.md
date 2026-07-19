# EXP Cricket (Xpert Cricket) — High-Performance Cricket Intelligence Platform

Production-ready Next.js 14 (App Router) + TypeScript cricket analytics web application built strictly according to the **EXP Cricket Master Development Specification** and pixel-perfect Stitch UI designs.

---

## 🌟 Key Features

* **Command Center (Home)**: High-performance match telemetry ticker, live match win probability models, trending player profiles, and featured venue pitch maps.
* **Player Intelligence**: Comprehensive player analysis (Virat Kohli, Travis Head, Jofra Archer, etc.) with dynamic national team accent colors, format filters (Test, ODI, T20I, All), skill radar charts, phase analysis (Powerplay, Middle, Death overs), and head-to-head bowler matchup matrices.
* **Ground Intelligence**: Venue profiles (MCG, Lord's, etc.), pitch behavior indicators, pace vs spin split ratios, 8-axis SVG outfield boundary dimension maps, and historical records.
* **AI Cricket Analyst**: Multi-provider AI assistant (Gemini 1.5 Pro, OpenAI GPT-4o, Grok 2) with response caching, preset tactical query cards, and structured risk analysis.
* **Compare Engine**: Side-by-side metric comparison matrix for Player vs Player and Ground vs Ground.
* **Team Analysis & Rankings**: Official ICC & EXP player rankings across formats and national squad head-to-head records.
* **Admin Portal**: Institutional dashboard with CRUD consoles for Players, Teams, Grounds, Matches, Rankings, Users, Reports, AI Cache, System Audit Logs, and Central Configuration.
* **Interactive Dark Shader**: Custom WebGL interactive dark background shader with responsive canvas resizing and mouse interaction.

---

## 🏗️ Architecture & Decoupled Design Layer

The codebase strictly adheres to Clean Layered Architecture:

```
UI Components (Pages & Widgets)
          ↓
  Custom React Hooks (usePlayer, useGround, useAIAnalyst, useSearch, useFavorites)
          ↓
  Services Layer (playerService, groundService, matchService, aiService, compareService)
          ↓
  API Route Handlers (/api/players, /api/grounds, /api/matches, /api/ai, /api/search)
          ↓
  Future Supabase Database & AI Providers (Zero UI changes required)
```

---

## 📁 Folder Structure

```
expcricket/
├── app/                        # Next.js 14 App Router Pages & API Endpoints
│   ├── page.tsx                # Command Center (Home Page)
│   ├── player-intelligence/    # Player Intelligence Page
│   ├── ground-intelligence/    # Ground Intelligence Page
│   ├── ai-analyst/             # AI Analyst Page
│   ├── compare/                # Compare Engine Page
│   ├── team-analysis/          # Team Analysis Page
│   ├── rankings/               # Rankings Page
│   ├── match-analysis/         # Match Analytics Scorecards Page
│   ├── search/                 # Global Search Page
│   ├── favorites/              # Saved Bookmarks Page
│   ├── admin/                  # Admin Dashboard Suite
│   ├── auth/                   # Authentication Pages (Login, Forgot Password, 403)
│   ├── about/, contact/, faq/, privacy/, terms/, disclaimer/ # Informational Pages
│   ├── offline/, not-found.tsx, error.tsx # System & Error Pages
│   ├── api/                    # Server-side API Endpoints Placeholder Routes
│   └── globals.css             # Tailwind CSS & Material Symbols font styles
├── components/
│   ├── layout/                 # Header, Sidebar, Footer, MobileNav, BackgroundShader
│   ├── common/                 # StatCard, Badge, Button, Tabs, SkeletonLoader, EmptyState, ErrorState
│   ├── charts/                 # RadarChart, PitchMap, BoundaryDiagram
│   └── player/, ground/, ai/, admin/ # Domain Components
├── config/                     # Central Site & AI Provider Configurations
├── services/                   # Isolated Data & Business Logic Layer
├── types/                      # TypeScript Models (Player, Ground, Match, Team, AI, Admin, Supabase)
├── hooks/                      # Custom React Hooks
└── lib/mockData/               # Isolated Mock Datasets (Kohli, Head, Archer, MCG, Lord's, BGT)
```

---

## ⚙️ Installation & Running Locally

### Prerequisites
- Node.js 18.x or 20.x installed
- npm or yarn

### Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Environment Variables:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Environment Variables & Security

Sensitive secrets and API keys are stored exclusively in `.env.local` and accessed via `process.env`. Real keys are never hardcoded or exposed to the client browser.

`.env.local` contents:
```env
NEXT_PUBLIC_APP_NAME=EXP Cricket
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_USERNAME=example_admin_username
ADMIN_PASSWORD=example_admin_password
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_placeholder
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_placeholder
DEFAULT_AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_placeholder
OPENAI_API_KEY=your_openai_api_key_placeholder
XAI_API_KEY=your_grok_xai_api_key_placeholder
```

The repository includes a `.gitignore` to prevent any credentials from being committed.

---

## 🔌 Future Supabase & AI Setup

### Connecting Supabase
1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Populate `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.
3. Update `services/supabaseClient.ts` to instantiate `createClient()`.
4. Replace mock data returns in `services/playerService.ts`, `services/groundService.ts`, etc., with Supabase client table queries (`supabase.from('players').select('*')`). Zero changes to UI components will be needed!

### Connecting AI Providers
1. Set `GEMINI_API_KEY`, `OPENAI_API_KEY`, or `XAI_API_KEY` in `.env.local`.
2. Configure `DEFAULT_AI_PROVIDER` (`gemini` | `openai` | `grok`).
3. Update `services/aiService.ts` to call official SDKs / REST endpoints on the server side in `app/api/ai/route.ts`.
