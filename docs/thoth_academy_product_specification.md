# 🏛️ Thoth Academy — Product Specification (MVP)

---

## 🧭 Overview

**Thoth Academy** is a personal learning platform designed to structure and share a **5-week Angular learning journey**, aimed at preparing developers for the _certification.dev_ certification.

The platform combines:

- 📚 Structured learning (daily lessons + PDFs)
- 💻 Hands-on practice (interactive coding challenges)
- 🤝 Knowledge sharing (for colleagues)
- 🧪 A flexible experimentation space (sandbox / lab)

---

## 🎯 Goals

### Primary Goals

- Deliver a clear, structured Angular learning path (5 weeks)
- Enable active learning via coding challenges
- Provide a shareable platform for colleagues
- Help users prepare efficiently for certification.dev

### Secondary Goals

- Showcase a **portfolio-grade Angular application**
- Provide a sandbox for additional learning (e.g., Coursera)

---

## 🚫 Out of Scope (MVP)

- AI assistant (planned later)
- Advanced analytics/dashboard
- Social features (comments, likes)
- Real-time collaboration

---

## 👤 Target Users

### Primary

- Frontend developers transitioning to Angular
- Developers preparing for certification.dev

### Secondary

- Yourself (creator + learner)
- Colleagues following your structured plan

---

## 🧩 Core Features

### ~~📚 1. Course Module (Main Feature)~~ ✅ DONE — `/week/:id`

#### Description

A structured 5-week learning program:

```
Weeks → Days → Lessons
```

#### Each Lesson Includes

- ✅ Title & topic
- PDF resources (embedded or downloadable) — links present, PDFs pending
- Optional notes / description — summary field in place
- Associated challenge (optional) — tab present, Monaco editor pending

#### UX Expectations

- ✅ Clean layout — day sidebar + 3-tab content panel (Lesson / Challenge / Solution)
- ✅ Easy navigation between days — sidebar buttons with active state
- ✅ Progress indicators — per-day completion dots on dashboard, checkmarks in sidebar

#### Implementation Notes

- Shared data layer: all course data lives in `src/app/data/course-data.ts` (`CourseWeek` / `CourseDay` interfaces + `COURSE_WEEKS` constant) — single source of truth consumed by both Dashboard and WeekDetail
- Progress is tracked via `ProgressService` (signal-based, auto-persisted to `localStorage`)
- Day completion keys use the slug format `w{weekId}-d{dayNumber}` (e.g. `w1-d3`)
- "Mark as complete" toggle button on each lesson; toggling updates the dashboard ring and CTA in real time
- "Continue Learning" CTA on the dashboard resolves to the first incomplete day; shows "Course complete" when all 25 are done

---

### 💻 2. Challenge & Code Playground

#### Description

Interactive coding environment embedded in the app.

#### Features

- Code editor (Monaco — Phase 2) or StackBlitz
- Run / test capability (basic)
- "Show Solution" toggle
- Side-by-side comparison (user vs solution)

#### UX Expectations

- Minimal friction (fast load, simple UI)
- Clear separation:
  - Problem statement
  - Code editor
  - Solution view

---

### ~~📖 3. User Guide Page~~ ✅ DONE — `/guide`

#### Purpose

Help users understand how to follow the course.

#### Content

- ✅ How the 5-week plan works — "What This Course Is" section + 5-week overview table
- ✅ Recommended daily workflow — "Your Daily Study Routine" (4 timed blocks)
- ✅ Environment setup — evolved into "Setting Up Your Claude Project" (4-step process), which reflects the actual course workflow
- ✅ How to approach challenges — "Session Formats" cards + "Power Tips" section
- ✅ Tips for certification.dev preparation — "Power Tips", My Profile, CTA card

#### UX Expectations

- ✅ Documentation-style layout — clearly structured sections with uppercase labels
- ✅ Sections with anchor navigation — inline jump-link pills below the page title, `id` on every section

#### Implementation Notes

The guide page goes well beyond the original spec. It includes:

- Claude project setup guide (4 steps)
- Power tips for sessions (7 tips)
- Keeping project instructions fresh (with code example)
- Reference PDF library table
- "You Are Ready" CTA card

---

### ~~🧪 4. Orphan Page (Experimental Playground)~~ ✅ DONE — `/coursera`

#### Description

Standalone page for experimentation and learning outside the core flow.

#### Purpose

- ✅ Follow other courses (e.g., Coursera) — page is dedicated to tracking and coding alongside Coursera instructors
- ✅ Build experiments without affecting the main app

#### Characteristics

- ✅ No strict structure
- ✅ Independent from course module
- ✅ Can include random components, notes, and mini-projects coded directly in Angular alongside the instructor

#### UX Expectations

- ✅ Clearly labeled as **"Temporary Page"** (badge visible in page header)
- ✅ Accessible but not prominent — secondary nav item

#### Implementation Notes

- Hosted at `/coursera` (more semantic than `/lab` given its purpose)
- Displays a "Temporary Page" badge and intro copy making the ephemeral nature explicit
- **Monaco editor intentionally excluded** — user codes directly inside Angular components on the page
- Components added here are temporary and scoped to the Coursera cursus; they will be removed when the course is complete

---

### 🏠 5. Dashboard / Home

#### Purpose

Main entry point of the application

#### Content

- Overview of the 5-week program
- Quick access:
  - Continue learning
  - Current week/day
- Optional:
  - Progress summary (MVP+)

---

### 📊 6. Progress Tracking (Optional MVP+)

#### Features

- Mark lessons as completed
- Track current week/day
- Persistence via localStorage (MVP)

---

## 🧱 Application Structure

### Pages

```
/                     → Dashboard
/course              → Course overview
/course/:week/:day   → Lesson view
/challenge/:id       → Code playground
/guide               → User Guide
/lab                 → Experimental sandbox
```

---

## 🧩 Component Breakdown

### Core Components

- AppShell (layout, navbar, sidebar)
- WeekCard
- DayItem
- LessonViewer
- PDFViewer
- ChallengeBlock
- CodeEditor (Monaco wrapper)
- SolutionToggle
- UserGuideSection
- SandboxContainer

---

## 🎨 UX & Design Principles

- Clean, developer-focused UI
- Inspired by:
  - Notion (structure)
  - Linear (clarity)
  - Coursera (learning flow)

### Principles

- Fast navigation
- Minimal distractions
- Clear hierarchy

---

## 🎨 Design System (Tailwind-based)

### Color Philosophy

- Knowledge & wisdom (Egyptian inspiration)
- Calm and focused interface

### Suggested Palette

- Primary: Deep Indigo / Blue
- Secondary: Sand / Gold accents
- Background: Neutral (dark mode ready)
- Accent: Cyan or Amber

---

## ⚙️ Technical Architecture

### Frontend

- Angular (latest version)
- TailwindCSS
- Angular Router

### Key Integrations

- Monaco Editor (code playground)

### State Management

- Simple services (MVP)
- Optional: NgRx (later)

### Data Source

- Static JSON (MVP)
- Future: API (FastAPI)

---

## 📦 Data Model (Simplified)

```ts
Week {
  id: number;
  title: string;
  days: Day[];
}

Day {
  id: number;
  title: string;
  lessons: Lesson[];
}

Lesson {
  id: number;
  title: string;
  pdfUrl: string;
  challengeId?: string;
}

Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solutionCode: string;
}
```

---

## 🚀 MVP Roadmap

### Phase 1 (Core)

- ✅ App shell (layout + routing) — header, footer, `AppShell` with Angular Router
- ✅ Course structure (weeks/days/lessons) — `COURSE_WEEKS` / `CourseWeek` / `CourseDay` in `course-data.ts`, full `/week/:id` route
- ✅ PDF integration — 21 PDFs wired via `pdfUrl` in `course-data.ts`, embedded viewer in Lesson tab
- ✅ Basic challenge viewer (no editor) — challenge & solution tabs in `WeekDetail`; superseded by Monaco in Phase 2

### Phase 2

- ✅ Monaco editor — `ngx-monaco-editor-v2` integrated in `WeekDetail`; challenge tab uses `starterCode`, solution tab uses `solutionCode` (read-only)
- ✅ Solution toggle — read-only Monaco editor in Solution tab; `CourseChallenge.solutionCode` populated for Weeks 1–4 Day 5
- ✅ User Guide page — `/guide` with anchor navigation, Claude project setup, power tips, PDF library table

### Phase 3

- ✅ Sandbox (Lab page) — `/coursera` page (Temporary Page badge), scoped to Coursera experiments, independent from core flow
- ✅ UX polish — consistent design system, dark/light theme toggle, OnPush change detection, responsive layout

### Phase 4 (Optional)

- ✅ Progress tracking — `ProgressService` + `localStorage` persistence + dashboard ring + "Continue Learning" CTA
- ✅ Performance improvements — `OnPush` on root `App` component; `tabs` converted from `computed()` to plain readonly array; dashboard method calls (`completedForWeek`, `strokeDashoffset`, `isDayComplete`) replaced with a single `weekData` computed signal; inline SVG circumference math extracted to a `CIRCUMFERENCE` constant

---

## 📈 Success Metrics

- Full 5-week plan can be completed inside the app
- Colleagues can follow without external help
- Challenges are usable and engaging
- App feels portfolio-ready

---

## 🔮 Future Enhancements

- AI assistant (context-aware)
- Backend (FastAPI + authentication)
- Multi-user support
- Real-time code feedback
- SaaS deployment

---

## 🧠 Final Vision

Thoth Academy is not just a learning app.

It is a **structured, developer-focused learning system** combining:

- Clear pedagogy
- Practical coding experience
- Scalable architecture

Built as both a **learning tool** and a **portfolio-grade product**.

---

## 🗺️ Next Steps

### P0 — Unblock core learning flow

- [x] **Add real PDF files** to `public/pdfs/` and wire `pdfUrl` fields in `COURSE_WEEKS` — 21 PDFs wired, day titles/themes realigned to match actual content, "No PDF" ghost state shown for days without a file
- [x] **Monaco editor integration** — Challenge and Solution tabs are stubbed with placeholder divs; install `@monaco-editor/angular` and replace the placeholders

### P1 — Polish & UX lift

- [ ] **Week completion celebration** — show a toast / banner when `completedCountForWeek(id) === 5`, e.g. "Week 1 complete! 🎉" — `ProgressService.completedCountForWeek()` is already available; needs a toast component and a trigger in `WeekDetail.toggleDay()`
- [ ] **Streak tracker** — store `lastActivity: ISO string` in `ProgressService` on every `toggleDay()` call; compute consecutive active days; surface as a flame icon on the dashboard
- [ ] **Progress reset** — "Reset my progress" option (settings or dashboard footer) essential for re-runs and testing
- [ ] **Accessible focus management** — when clicking a day in the sidebar, move focus to the first heading in the content panel

### P2 — Data & content depth

- [ ] **Lesson notes field** — add an optional `notes?: string` field to `CourseDay` and render rich text below the summary in the Lesson tab
- [ ] **Challenge description** — add `challenge?: { description: string; starterCode: string; solutionCode: string }` to `CourseDay` so the Challenge and Solution tabs have real content before Monaco lands
- [ ] **Time estimate per day** — e.g. `estimatedMinutes?: number` — surface as "~20 min" badge in the sidebar to set learner expectations

### P3 — Future

- [ ] **Progress export** — "Download my progress as JSON" power-user feature pitched at the dev audience
- [ ] **Multi-user / backend** — swap `localStorage` for a `FastAPI` backend when multi-user support is needed
