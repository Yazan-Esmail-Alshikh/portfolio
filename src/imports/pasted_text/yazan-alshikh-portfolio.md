# Figma Make Prompt — Yazan Alshikh Portfolio

Copy everything below into Figma Make as one prompt.

---

## Brief

Design and build a one-page portfolio site for **Yazan Esmail Alshikh**, a Senior Flutter Developer with 4+ years shipping production mobile apps across fintech, healthcare, real-time communication, and IPTV. His work is defined by **real-time systems, offline-first architecture, and clean architecture discipline** — live audio platforms (WebRTC/Zego), IPTV streaming apps, socket-based dispatch/tracking systems, and offline-sync pipelines.

The design direction is an **engineering schematic / blueprint** aesthetic: this is a page for someone who thinks in system diagrams, data traces, and signal flow — not a generic "creative portfolio" look. Treat sections like sheets in a technical drawing set, and treat his career progression like software version history (it literally is one).

Do not default to a warm cream/serif look, a plain near-black-with-one-neon-accent look, or a hairline-newspaper layout. Use the direction below.

## Design tokens

**Color**
- `--blueprint-900` `#0D2C4C` — page background, deep blueprint blue
- `--blueprint-800` `#123A63` — panel/card surfaces
- `--line-white` `#F4F8FC` — primary text, grid lines, schematic strokes
- `--signal-amber` `#FFB627` — primary accent: CTAs, "live" indicators, active states
- `--trace-cyan` `#4FD1C5` — secondary accent: data traces, connecting lines, links, hover states
- `--muted-blue` `#8FA8C2` — secondary text, captions, timestamps

**Type**
- Display: **Space Grotesk** (bold, wide-set headlines — geometric letterforms read like technical lettering)
- Body: **IBM Plex Sans** (clean, humanist, pairs naturally with the mono face below)
- Utility/mono: **IBM Plex Mono** — used for tech-stack tags, dates, role labels, section eyebrows, and the "title block" — this is what makes the page feel like a schematic sheet, not a generic resume

**Layout concept**
- A faint 8px blueprint grid sits behind the whole page (very low-opacity `--trace-cyan` lines).
- Sections are connected by a single continuous **signal trace line** — a thin animated path (like a PCB trace / circuit line) that runs top to bottom through the page, passing through a small circular "node" at the start of each section. This is the signature element: it visually represents the real-time data flow he builds for a living.
- Every panel/card has a hairline `--trace-cyan` border and a small corner tick mark, like a component outlined on a schematic sheet — not rounded soft cards.
- No numbered "01 / 02 / 03" markers except where it's genuinely a sequence (see Experience section below, where version numbers ARE meaningful).

**Signature element**
A hero **live system schematic**: an animated diagram showing `Mobile Client → API/Socket Layer → Real-time Engine (WebRTC/Zego) → Cloud` with a pulsing amber dot traveling along the trace line on load and looping subtly. This is the one bold, animated moment on the page — everything else stays calm and static.

## Page structure & real content to use

### Header / "title block" (fixed top bar, styled like a technical drawing's title block)
```
YAZAN ESMAIL ALSHIKH   //   SENIOR FLUTTER DEVELOPER
SHEET: PORTFOLIO   REV: 2026   LOC: SYRIA (REMOTE-READY)
```
Nav links (mono, small caps): `WORK` `EXPERIENCE` `SKILLS` `CONTACT`

### Hero
- Eyebrow (mono, trace-cyan): `SYSTEM STATUS: AVAILABLE FOR REMOTE ROLES`
- Headline (Space Grotesk, large): "I build real-time, offline-first mobile systems that don't fall over."
- Subhead (Plex Sans, muted-blue): Senior Flutter Engineer with 4+ years building and scaling production-grade mobile platforms across fintech, healthcare, real-time communication, and data-driven consumer apps — offline-first systems, real-time voice and messaging, secure data pipelines, and high-performance apps shipped to Google Play and the App Store.
- The animated schematic diagram (signature element) sits beside or beneath the headline.
- Primary CTA (amber, filled): `Email Yazan` → mailto:yazan.alshikh@outlook.com
- Secondary CTA (cyan, outline): `Contact on X` → https://x.com/Yazan Alshikh (use as placeholder link/label)

### Experience — presented as version history (revision log, not a plain timeline)
Frame this section as a changelog. Each role is a "release" — this is a real, honest structural device because his career genuinely reads as sequential seniority growth.

```
v4.0 — 2026/03 – Present
Senior Flutter Developer, Pharaon Group
• Refactored and enhanced a large-scale IPTV application, improving
  performance, code maintainability, and streaming reliability
• Continuous improvement and feature development for the Sawa mobile app —
  stability, UX, bug fixing
• Developing and maintaining Askoonect, a tendering and procurement
  platform: dynamic workflows, API integrations, scalable architecture
• Applied Clean Architecture and modular design across projects
Stack: Flutter, REST APIs, Clean Architecture, BLoC, Performance Optimization

v3.0 — 2024/10 – 2026/02
Senior Flutter Developer, Dream WD LLC
• Owns and maintains a production real-time voice platform (live audio
  rooms) using Zego Cloud and WebRTC, with background audio services and
  Firebase-based signaling
• Designed and stabilized a low-latency audio pipeline supporting 50+
  concurrent speakers per room — reconnection handling, network fallback,
  audio focus management
• Led development of a national-scale Qatari Calendar platform: prayer
  times, Qibla direction, Adhan notifications, offline religious content
  on Android and iOS
• Implemented background scheduling, timezone-aware notifications, and
  resilient data caching for reliability even when the app isn't running
Stack: Flutter, WebRTC, Zego, Firebase, Background Services, Push Notifications, Clean Architecture

v2.0 — 2023/10 – 2024/08
Flutter Developer, Vroad LLC
• Led delivery of six production mobile applications across logistics,
  service booking, and business operations — Google Play, TestFlight,
  App Store
• Owned roughly one-third of all active mobile products end-to-end:
  architecture, releases, hotfixes, feature delivery
• Built scalable UI systems and API integration layers using GetX, REST,
  and offline caching for stable operation under poor network conditions
Stack: Flutter, REST APIs, GetX, Firebase, App Store & Play Store distribution

v1.0 — 2022/06 – 2023/10
Flutter Developer, Future Code LLC
• Engineered three production mobile platforms: captain tracking,
  e-commerce, real-time operations
• Built Socket.IO-based real-time communication layers, reducing message
  latency and improving live update reliability for dispatch and tracking
• Delivered performance-optimized UIs and custom widgets that improved
  engagement and session duration
• Designed local caching and sync pipelines for offline operation with
  seamless server reconciliation
Stack: Flutter, Socket.IO, REST APIs, Custom UI, Offline Sync
```

### Featured Projects — as component/spec cards, tech stack shown as mono "chips"
```
TMKN | تمكن — Educational Platform
Smart digital learning platform connecting teachers and students: online
lessons and recorded video, teacher–student communication and
announcements, course materials/notes/assignments, secure auth with
teacher/student roles.
[Flutter] [REST APIs] [Firebase Cloud Messaging] [Secure Storage]

Fitnet — Fitness & Performance Platform
Real-time fitness tracking system with workout analytics, coach-driven
training plans, and multimedia exercise content. Real-time activity
tracking and analytics, coach dashboards and performance reporting,
scalable cloud-synced user data model.
[Flutter] [Firebase] [REST APIs] [Charts] [Media Handling]

Quick Findout — Inventory & Workforce Platform
Enterprise-grade warehouse and staff management system for stock flow
and employee activity: role-based access control, real-time stock and
attendance tracking, advanced reporting dashboards.
[Flutter] [Drift/SQLite] [REST APIs] [GetX]

Doctor Fahd Platform — Healthcare System
Subscription-based telehealth and patient management platform: secure
patient–doctor messaging, medical history and nutrition tracking,
subscription and payment workflows.
[Flutter] [Firebase Cloud Messaging] [Secure Storage] [REST APIs]
```

### Skills — grouped like a parts list / component library, not a generic tag cloud
```
MOBILE & UI
Flutter · Dart · Material & Cupertino · Custom Renderers · Animations ·
Adaptive UI · Deep Linking

ARCHITECTURE & STATE
Clean Architecture · BLoC · Cubit · GetX · Riverpod · Dependency
Injection · Repository Pattern · Reactive Streams (RxDart)

DATA & OFFLINE SYSTEMS
Drift (SQLite) · ObjectBox · Hive · Offline-first Sync · Conflict
Resolution · Local/Remote ID Mapping

NETWORKING & REALTIME
Dio · Retrofit · REST APIs · WebSockets · Socket.IO · WebRTC · Zego Cloud

CLOUD & BACKEND INTEGRATION
Firebase (Auth, Firestore, FCM) · Background Services · Push
Notifications

SECURITY & PERFORMANCE
AES/RSA encryption · Secure Storage · App Hardening · Memory & Rendering
Optimization

RELEASE & DISTRIBUTION
Google Play · App Store · TestFlight · CI/CD · Multi-environment builds

AI & DEVELOPER TOOLING
AI-assisted development (ChatGPT, Claude, Cursor, Copilot) for code
generation, debugging, refactoring · Prompt engineering for reliable AI
outputs · Rapid prototyping and feature scaffolding · Codebase analysis
via AI agents · Integrating AI APIs into mobile apps
```

### Education
```
Technical Computer College, Damascus University
Software Engineering, Mobile Development — 2015–2019
```

### Languages
```
Arabic — Native
English — Professional working proficiency
```

### Footer / "sign-off" block (styled like a drawing sheet sign-off)
```
DRAWN BY: Yazan Alshikh   CONTACT: yazan.alshikh@outlook.com   +963 931 697 454
STATUS: Open to remote Senior Flutter roles
```
Include simple icon-links to email and phone. Keep the sign-off minimal — one line, mono font, muted-blue.

## Interaction & motion notes
- The signal trace animates once on page load (amber pulse travels top to bottom through each node), then settles into a subtle idle glow at the current scroll position as the user scrolls — motion should feel like monitoring a live system, not decorative confetti.
- Card hover: hairline border shifts from `--trace-cyan` at 30% opacity to 100%, plus a small "connected" tick animation — no heavy shadows or scale-bounce.
- Respect `prefers-reduced-motion`: fall back to a static trace with no pulse.
- Fully responsive down to mobile: on small screens, the version-history "changelog" and project "spec sheets" stack vertically; the schematic hero diagram simplifies to a vertical flow.

## Accessibility & quality bar
- Visible keyboard focus states on all links/buttons, using `--signal-amber` outline.
- Text contrast: `--line-white` on `--blueprint-900`/`--blueprint-800` meets AA; don't set body text in `--muted-blue` at small sizes on the darkest background.
- Real content only — do not invent projects, employers, or metrics beyond what's listed above.