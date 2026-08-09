# Yazan Alshikh - Senior Flutter Developer Portfolio

A responsive, single-page web application showcasing the software engineering portfolio of **Yazan Esmail Alshikh**, Senior Flutter Developer. The site features an engineering schematic / blueprint aesthetic, smooth micro-animations, system data traces, and detailed technical project specifications.

---

## 🚀 Overview & Features

- **Engineering Schematic Aesthetic**: Styled with technical blueprint tokens (`--blueprint-900`, `--trace-cyan`, `--signal-amber`), crisp grid lines, and title blocks.
- **Career Version History**: Experience structured as software release logs (`v4.0`, `v3.0`, `v2.0`, `v1.0`).
- **Interactive UI Components**:
  - VU Level Meter with animated stat counters (`useCountUp`)
  - Scroll-triggered reveal animations (`useReveal`, `fadeRise`, `fadeOnly`)
  - Accessible design supporting `prefers-reduced-motion`
- **Featured Projects**: Component specification cards for TMKN, Fitnet, Quick Findout, Doctor Fahd Telehealth, and more.
- **Skills Catalog**: Grouped technical competencies (Mobile & UI, Architecture, Data & Offline, Networking & Realtime, Security, Cloud, AI Tooling).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) & [React DOM 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) with TypeScript 5.7
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Formatter**: [oxfmt](https://github.com/oxc-project/oxc)
- **Language**: TypeScript

---

## 📁 Project Structure

```text
├── src/
│   ├── App.tsx          # Main Portfolio component with all sections & components
│   ├── main.tsx         # React application entrypoint
│   ├── index.css        # Global CSS entrypoint & Tailwind CSS v4 imports
│   └── vite-env.d.ts    # TypeScript definitions for Vite
├── index.html           # Vite HTML shell with #root mount point
├── package.json         # Dependencies and script definitions
├── vite.config.ts       # Vite configuration with React & Tailwind plugins
├── AGENTS.md            # Agent workspace development guidelines
└── README.md            # Project documentation & setup guide
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+ recommended) and a package manager (`pnpm`, `npm`, or `yarn`) installed.

### 1. Install Dependencies

Using `npm`:
```bash
npm install
```

Or using `pnpm`:
```bash
pnpm install
```

---

## 🖥️ Running the Development Server

To start the Vite development server with hot-module replacement (HMR):

```bash
npm run dev
# or
pnpm dev
```

The application will be served locally (typically at `http://localhost:5173` or port `$PORT`).

---

## 📦 Building for Production

To create an optimized production build in the `dist` folder:

```bash
npm run build
# or
pnpm build
```

To preview the production build locally:

```bash
npm run preview
# or
pnpm preview
```

---

## 🧹 Code Formatting

Format all source files using `oxfmt`:

```bash
npm run format
# or
pnpm format
```

---

## 📬 Contact & Info

- **Developer**: Yazan Esmail Alshikh
- **Role**: Senior Flutter Developer
- **Email**: [yazan.alshikh@outlook.com](mailto:yazan.alshikh@outlook.com)
