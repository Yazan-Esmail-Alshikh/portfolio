# Graph Report - .  (2026-08-07)

## Corpus Check
- Corpus is ~10,794 words - fits in a single context window. You may not need a graph.

## Summary
- 94 nodes · 108 edges · 17 communities (8 shown, 9 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.85)
- Token cost: 500 input · 300 output

## Community Hubs (Navigation)
- [[_COMMUNITY_TypeScript Compiler Options|TypeScript Compiler Options]]
- [[_COMMUNITY_Core Runtime Dependencies|Core Runtime Dependencies]]
- [[_COMMUNITY_Portfolio Application Components|Portfolio Application Components]]
- [[_COMMUNITY_Development Build Tooling|Development Build Tooling]]
- [[_COMMUNITY_Audio & Schematic UI Controls|Audio & Schematic UI Controls]]
- [[_COMMUNITY_Section Views & Animation Motion|Section Views & Animation Motion]]
- [[_COMMUNITY_Experience History & Real-Time Engineering|Experience History & Real-Time Engineering]]
- [[_COMMUNITY_Vite & Figma Build Configuration|Vite & Figma Build Configuration]]
- [[_COMMUNITY_Agent Workspace Documentation|Agent Workspace Documentation]]
- [[_COMMUNITY_HTML Entry & Mounting Shell|HTML Entry & Mounting Shell]]
- [[_COMMUNITY_Footer & Fade Transition Helpers|Footer & Fade Transition Helpers]]
- [[_COMMUNITY_Doctor Fahd Telehealth System|Doctor Fahd Telehealth System]]
- [[_COMMUNITY_Fitnet Fitness Tracking System|Fitnet Fitness Tracking System]]
- [[_COMMUNITY_Quick Findout Inventory System|Quick Findout Inventory System]]
- [[_COMMUNITY_TMKN Educational Platform|TMKN Educational Platform]]
- [[_COMMUNITY_Tailwind CSS v4 Configuration|Tailwind CSS v4 Configuration]]

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `prefersReducedMotion()` - 11 edges
3. `useReveal()` - 10 edges
4. `fadeRise()` - 7 edges
5. `scripts` - 5 edges
6. `fadeOnly()` - 3 edges
7. `useCountUp()` - 3 edges
8. `StatLabel()` - 3 edges
9. `Hero()` - 3 edges
10. `ChannelStrip()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `CLAUDE.md AGENTS Reference` --references--> `Project Structure Specification`  [EXTRACTED]
  CLAUDE.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Featured Mobile Projects Portfolio** — pasted_text_yazan_alshikh_portfolio_1_md_projects_tmkn, pasted_text_yazan_alshikh_portfolio_1_md_projects_fitnet, pasted_text_yazan_alshikh_portfolio_1_md_projects_quick_findout, pasted_text_yazan_alshikh_portfolio_1_md_projects_doctor_fahd [EXTRACTED 1.00]

## Communities (17 total, 9 thin omitted)

### Community 0 - "TypeScript Compiler Options"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, baseUrl, isolatedModules, jsx, lib, module, moduleResolution (+11 more)

### Community 1 - "Core Runtime Dependencies"
Cohesion: 0.15
Nodes (12): dependencies, react, react-dom, name, private, scripts, build, dev (+4 more)

### Community 2 - "Portfolio Application Components"
Cohesion: 0.15
Nodes (7): experiences, meterStats, mono, sans, serif, skillGroups, T

### Community 3 - "Development Build Tooling"
Cohesion: 0.20
Nodes (10): devDependencies, oxfmt, tailwindcss, @tailwindcss/vite, @types/node, @types/react, @types/react-dom, typescript (+2 more)

### Community 4 - "Audio & Schematic UI Controls"
Cohesion: 0.25
Nodes (9): ChannelStrip(), Header(), Hero(), LevelMeter(), prefersReducedMotion(), ProjectCard(), SkillCard(), StatLabel() (+1 more)

### Community 5 - "Section Views & Animation Motion"
Cohesion: 0.43
Nodes (7): Contact(), EducationLanguages(), Experience(), fadeRise(), projects, Skills(), useReveal()

### Community 6 - "Experience History & Real-Time Engineering"
Cohesion: 0.40
Nodes (5): Blueprint & Schematic Design System, Dream WD Live Audio & WebRTC, Future Code Socket.IO Ops, Pharaon Group IPTV & Sawa, Vroad Logistics & Services

## Knowledge Gaps
- **53 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **9 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Development Build Tooling` to `Core Runtime Dependencies`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _55 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `TypeScript Compiler Options` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._