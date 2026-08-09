# Figma Make Prompt — Yazan Alshikh Portfolio (v2)

Copy everything below into Figma Make as one prompt.

---

## Brief

Design and build a one-page portfolio for **Yazan Esmail Alshikh**, a Senior Flutter Developer with 4+ years shipping real-time voice platforms (WebRTC/Zego, 50+ concurrent speakers), IPTV streaming apps, and offline-first systems for fintech, healthcare, and logistics.

Concept: a **broadcast / mixing-console** aesthetic — the visual language of a professional audio-video control room. This is a deliberate, subject-specific choice: his actual work is live audio rooms, streaming reliability, and signal pipelines, so the page should feel like a console monitoring a live signal, not a diagram or a resume. It should feel premium, tactile, and quiet — closer to a high-end studio's site than a "developer portfolio template."

Avoid generic AI-portfolio defaults: no cream background with a serif+terracotta combo, no plain near-black page with a single neon-green or vermilion accent and nothing else going on, no hairline-broadsheet grid layout. Follow the direction below instead.

## Design tokens

**Color**
- `--void` `#0A0A0B` — page background, warm-tinted near-black (not blue-black)
- `--panel` `#17171B` — card/panel surfaces, very slightly lifted off the void
- `--ivory` `#F5F3EE` — primary text, warm off-white (never pure white)
- `--brass` `#D4A94E` — primary accent: peak meters, primary CTA, "live" indicator — reads like brushed console hardware, not a neon highlight
- `--indigo` `#6B5CA5` — secondary accent: hover states, secondary links, ambient glow behind the hero meter
- `--grey-60` `#8A8A90` — secondary text, captions, timestamps

**Type**
- Display: **Fraunces** (a serif with real character and weight contrast) — set large, used sparingly, for the headline and section titles only. It gives the page an editorial, human warmth that contrasts deliberately with the cold, technical meter readouts.
- Body: **Inter** — clean, quiet, gets out of the way.
- Utility/mono: **JetBrains Mono** — used only for numbers, timestamps, tech-stack tags, and meter labels. This contrast (warm serif headlines vs. cold mono data) is the core typographic idea: the human product on top, the real-time engineering underneath.

**Layout concept**
- The page is dark and spacious. Generous vertical rhythm, no crowding — like the negative space around hardware in a studio rack photo.
- A soft `--indigo` glow sits behind the hero, low-opacity, like a monitor bloom in a dim room.
- Panels have almost no border — a barely-there 1px `--panel`-on-`--void` edge, not `--brass` outlines everywhere. Reserve `--brass` for the few things that are actually "live" or actionable.
- No numbered 01/02/03 markers. No diagram lines connecting sections. Structure comes from spacing, type scale, and the meter motif — not from decorative connective tissue.

**Signature element**
A hero **stereo level meter** — a set of vertical bars (like a real VU meter / console channel fader bank) that idles with a slow, quiet ambient animation on load, as if monitoring a live signal. A few of the bars are labeled with real numbers pulled straight from his CV: `4+ YRS`, `50+ SPEAKERS/ROOM`, `6 APPS SHIPPED`, `1/3 OF ACTIVE PRODUCTS OWNED`. This is the one bold, animated moment on the page. Everything else is calm, static, and precise.

## Page structure & real content to use

### Header (thin, minimal — like a console's top rail)
```
YAZAN ALSHIKH   —   SENIOR FLUTTER DEVELOPER
```
Right-aligned nav (small caps, Inter, `--grey-60`): `Work` `Experience` `Skills` `Contact`

### Hero
- Eyebrow (mono, `--brass`, small, letter-spaced): `● LIVE — AVAILABLE FOR REMOTE ROLES`
- Headline (Fraunces, large, `--ivory`): "Code that aligns with business goals, not just specs."
- Subhead (Inter, `--grey-60`): Senior Flutter Engineer with 4+ years building and scaling production-grade mobile platforms across fintech, healthcare, real-time communication, and data-driven consumer apps — offline-first architecture, live audio and messaging, secure data pipelines, and high-performance apps shipped to Google Play and the App Store.
- The level-meter signature element sits beside or beneath the headline, with the four labeled stats above.
- Primary CTA (filled `--brass`, dark text): `Email Yazan` → mailto:yazan.alshikh@outlook.com
- Secondary CTA (ghost, `--ivory` border): `+963 931 697 454`

### Experience — "channels" (each role is a console channel, not a numbered timeline)
Present each role as a quiet horizontal panel: role + company on the left, dates in mono on the right, a short scope line, then bullets. No revision numbers, no diagram — just clean, confident channel strips stacked with generous space between them.

```
Senior Flutter Developer — Pharaon Group                     2026/03 – Present
Refactoring a large-scale IPTV platform and shipping Askoonect, a
tendering and procurement platform.
• Refactored and enhanced a large-scale IPTV application, improving
  performance, code maintainability, and streaming reliability
• Continuous improvement and feature development for the Sawa mobile
  app — stability, UX, bug fixing
• Developing and maintaining Askoonect: dynamic workflows, API
  integrations, scalable architecture
• Applied Clean Architecture and modular design across projects
Stack — Flutter · REST APIs · Clean Architecture · BLoC · Performance Optimization

Senior Flutter Developer — Dream WD LLC                    2024/10 – 2026/02
Owned a production real-time voice platform used for live audio rooms
with 50+ concurrent speakers.
• Owns and maintains a real-time voice platform (Zego Cloud, WebRTC)
  with background audio services and Firebase-based signaling
• Designed and stabilized a low-latency audio pipeline for 50+
  concurrent speakers per room — reconnection handling, network
  fallback, audio focus management
• Led a national-scale Qatari Calendar platform: prayer times, Qibla
  direction, Adhan notifications, offline religious content
• Implemented background scheduling, timezone-aware notifications, and
  resilient data caching for reliability even when the app isn't running
Stack — Flutter · WebRTC · Zego · Firebase · Background Services · Push Notifications

Flutter Developer — Vroad LLC                               2023/10 – 2024/08
Owned roughly a third of all active mobile products, end to end.
• Led delivery of six production mobile apps across logistics, service
  booking, and business operations — Google Play, TestFlight, App Store
• Owned architecture, releases, hotfixes, and feature delivery for
  ~1/3 of all active mobile products
• Built scalable UI and API integration with GetX, REST, and offline
  caching for stable operation under poor network conditions
Stack — Flutter · REST APIs · GetX · Firebase · App Store & Play Store distribution

Flutter Developer — Future Code LLC                         2022/06 – 2023/10
Built the real-time layer behind three production platforms.
• Engineered three production platforms: captain tracking, e-commerce,
  real-time operations
• Built Socket.IO-based real-time communication, reducing message
  latency and improving live update reliability
• Delivered performance-optimized UIs and custom widgets that improved
  engagement and session duration
• Designed local caching and sync pipelines for offline operation with
  seamless server reconciliation
Stack — Flutter · Socket.IO · REST APIs · Custom UI · Offline Sync
```

### Featured Projects — quiet cards, tech stack as small mono tags
```
TMKN | تمكن — Educational Platform
Smart digital learning platform connecting teachers and students: online
lessons and recorded video, teacher–student communication and
announcements, course materials/notes/assignments, secure auth with
teacher/student roles.
Flutter · REST APIs · Firebase Cloud Messaging · Secure Storage

Fitnet — Fitness & Performance Platform
Real-time fitness tracking with workout analytics, coach-driven training
plans, and multimedia exercise content. Real-time activity tracking and
analytics, coach dashboards and performance reporting, scalable
cloud-synced user data model.
Flutter · Firebase · REST APIs · Charts · Media Handling

Quick Findout — Inventory & Workforce Platform
Enterprise-grade warehouse and staff management system: role-based
access control, real-time stock and attendance tracking, advanced
reporting dashboards.
Flutter · Drift (SQLite) · REST APIs · GetX

Doctor Fahd Platform — Healthcare System
Subscription-based telehealth and patient management platform: secure
patient–doctor messaging, medical history and nutrition tracking,
subscription and payment workflows.
Flutter · Firebase Cloud Messaging · Secure Storage · REST APIs
```

### Skills — grouped, quiet, mono labels, no icon soup
```
Mobile & UI — Flutter, Dart, Material & Cupertino, Custom Renderers,
Animations, Adaptive UI, Deep Linking

Architecture & State — Clean Architecture, BLoC, Cubit, GetX, Riverpod,
Dependency Injection, Repository Pattern, Reactive Streams (RxDart)

Data & Offline Systems — Drift (SQLite), ObjectBox, Hive, Offline-first
Sync, Conflict Resolution, Local/Remote ID Mapping

Networking & Realtime — Dio, Retrofit, REST APIs, WebSockets, Socket.IO,
WebRTC, Zego Cloud

Cloud & Backend — Firebase (Auth, Firestore, FCM), Background Services,
Push Notifications

Security & Performance — AES/RSA encryption, Secure Storage, App
Hardening, Memory & Rendering Optimization

Release & Distribution — Google Play, App Store, TestFlight, CI/CD,
Multi-environment builds

AI & Developer Tooling — AI-assisted development (ChatGPT, Claude,
Cursor, Copilot), prompt engineering, rapid prototyping, codebase
analysis via AI agents, AI API integration into mobile apps
```

### Education
```
Technical Computer College, Damascus University
Software Engineering, Mobile Development — 2015–2019
```

### Languages
```
Arabic — Native      English — Professional working proficiency
```

### Footer (minimal, like a console's bottom rail — not a heavy CTA block)
```
Yazan Alshikh — yazan.alshikh@outlook.com — +963 931 697 454
Open to remote Senior Flutter roles.
```

## Motion notes
- The hero level meter idles with a slow, subtle ambient animation (bars drift within a narrow range, like monitoring quiet background signal) — not a flashy loop. On load, it settles into place over ~800ms.
- Panel hover: a barely-there lift and a soft `--indigo` glow behind the card, no border color changes, no scale-bounce.
- Respect `prefers-reduced-motion`: the meter freezes at a static resting position.
- Fully responsive to mobile: hero stat labels stack under the meter, channel panels go full-width and stack, project cards go single column.

## Accessibility & quality bar
- Visible keyboard focus states using `--brass` outline, 2px, offset.
- `--ivory` on `--void`/`--panel` meets AA; keep `--grey-60` for secondary text only, never for anything essential at small sizes.
- Real content only — every stat, role, and project above is from his CV; don't invent metrics or projects beyond what's listed.