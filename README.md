<div align="center">

# Haritha Wickremesinghe — Developer Portfolio

A modern, performant, and fully responsive developer portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Material UI 7**.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-7-007FFF?logo=mui&logoColor=white)](https://mui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white)](#docker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Docker](#docker)
- [Scripts](#scripts)
- [License](#license)

---

## Overview

A high-performance, single-page portfolio application designed to showcase projects, skills, experience, and contact information. Built with a component-driven architecture, it features dark/light theme toggling, smooth scroll-based animations, a live GitHub activity heatmap, a command palette (`Cmd+K`), and a functional contact form via EmailJS.

---

## Live Demo

> Deploy to [Vercel](https://vercel.com), [Render](https://render.com), or any Docker-compatible host.

---

## Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | `16.0.10` | React framework — App Router, SSR/SSG, file-based routing, standalone output |
| [React](https://react.dev/) | `19.2.1` | UI library — concurrent rendering, hooks, server components |
| [TypeScript](https://www.typescriptlang.org/) | `5.x` | Static type safety across the entire codebase |

### UI & Styling

| Technology | Version | Purpose |
|---|---|---|
| [Material UI (MUI)](https://mui.com/) | `7.3.6` | Component library — theming, responsive layout, design system |
| [MUI Icons](https://mui.com/material-ui/material-icons/) | `7.3.6` | 2,100+ Material Design icons |
| [Emotion](https://emotion.sh/) | `11.x` | CSS-in-JS engine powering MUI's `sx` prop and styled components |
| [Tailwind CSS](https://tailwindcss.com/) | `4.x` | Utility-first CSS — global styles, scrollbar hiding, touch targets |

### Animation

| Technology | Version | Purpose |
|---|---|---|
| [Framer Motion](https://www.framer.com/motion/) | `12.x` | Declarative animations — scroll-triggered reveals, hover effects, `AnimatePresence` |

### Integrations

| Technology | Purpose |
|---|---|
| [EmailJS](https://www.emailjs.com/) | Client-side email delivery for the contact form (no backend needed) |
| [GitHub Contributions API](https://github.com/grubersjoe/github-contributions-api) | Live GitHub activity heatmap with contribution stats |
| [Sonner](https://sonner.emilkowal.dev/) | Lightweight toast notifications for form feedback |

### Developer Tooling

| Tool | Purpose |
|---|---|
| [ESLint](https://eslint.org/) | Linting — `eslint-config-next` with Core Web Vitals + TypeScript rules |
| [PostCSS](https://postcss.org/) | CSS processing pipeline for Tailwind CSS |
| [Docker](https://www.docker.com/) | Multi-stage containerized builds with standalone output |
| [Node.js 22 (Alpine)](https://hub.docker.com/_/node) | Lightweight production runtime |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App Router                    │
│                   (Server Components)                    │
├─────────────────────────────────────────────────────────┤
│  layout.tsx                                             │
│  ├── AppRouterCacheProvider (MUI + Emotion SSR cache)   │
│  └── AppThemeProvider (Dark/Light theme context)        │
│       └── page.tsx                                      │
│            ├── Navigation    (fixed navbar + drawer)    │
│            ├── Hero          (typing animation + term)  │
│            ├── About         (profile + stats)          │
│            ├── CodeSkills    (code editor tabs)         │
│            ├── DevProjects   (filterable grid + modal)  │
│            ├── GitHubActivity(live heatmap + stats)     │
│            ├── Experience    (responsive timeline)      │
│            ├── Contact       (EmailJS form)             │
│            ├── Footer        (links + back-to-top)      │
│            └── CommandPalette(Cmd+K search)             │
├─────────────────────────────────────────────────────────┤
│  Theme Layer: MUI createTheme (dark / light)            │
│  Animation Layer: Framer Motion                         │
│  Styling Layer: Emotion (sx) + Tailwind (globals)       │
└─────────────────────────────────────────────────────────┘
```

---

## Features

- **Dark / Light Mode** — Persistent theme toggle with `localStorage` and smooth transitions
- **Command Palette** — `Cmd+K` / `Ctrl+K` keyboard shortcut for quick section navigation
- **Live GitHub Heatmap** — Auto-fetched contribution data with an animated heatmap grid
- **Code Editor UI** — Interactive tabbed code viewer for skills showcase
- **Typing Animation** — Rotating role titles with a typewriter effect
- **Matrix Rain Background** — Animated binary rain with reduced intensity on mobile
- **Fully Responsive** — Mobile-first layout with center-aligned content on small screens
- **Contact Form** — Working email form via EmailJS with toast notifications
- **Scroll Animations** — `whileInView` reveal effects across every section
- **Project Filtering** — Category-based project filters with animated transitions
- **Timeline** — Responsive experience and education timeline
- **Docker Ready** — Production-optimized multi-stage Docker build
- **Accessibility** — 44px minimum touch targets, semantic HTML, keyboard navigation

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x (or `yarn` / `pnpm`)

### Installation

```bash
# Clone the repository
git clone https://github.com/Haritha0705/portfolio-v2.git
cd portfolio-v2

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
portfolio-v2/
├── app/
│   ├── layout.tsx            # Root layout — providers, metadata, fonts
│   ├── page.tsx              # Home page — composes all sections
│   ├── globals.css           # Global styles (Tailwind, scrollbar, touch)
│   ├── favicon.ico           # Browser tab icon
│   ├── icon.png              # PWA / bookmark icon (192x192)
│   └── apple-icon.png        # iOS home screen icon (180x180)
├── components/
│   ├── Navigation.tsx        # Fixed navbar + mobile drawer
│   ├── Hero.tsx              # Hero section — typing effect, CTA, socials
│   ├── About.tsx             # About — profile image, stats, competencies
│   ├── CodeSkills.tsx        # Code editor-style skills viewer
│   ├── DevProjects.tsx       # Filterable project cards + detail modal
│   ├── GitHubActivity.tsx    # Live GitHub contribution heatmap
│   ├── Experience.tsx        # Timeline — experience and education
│   ├── Contact.tsx           # EmailJS-powered contact form
│   ├── Footer.tsx            # Footer + scroll-to-top button
│   ├── CommandPalette.tsx    # Cmd+K command palette
│   └── ui/
│       ├── BadgeN.tsx        # Status badge (available / busy / unavailable)
│       └── Terminal.tsx      # Animated terminal emulator
├── data/
│   └── content.tsx           # Centralized data — projects, skills, links, timeline
├── theme/
│   ├── theme.ts              # MUI theme definitions (dark + light)
│   └── ThemeProvider.tsx     # Theme context + toggle logic
├── public/
│   ├── about_Img.png         # Profile image
│   └── haritha.jpg           # Source photo
├── Dockerfile                # Multi-stage Docker build
├── next.config.ts            # Next.js configuration (standalone output)
├── tsconfig.json             # TypeScript configuration
├── eslint.config.mjs         # ESLint flat config
├── postcss.config.mjs        # PostCSS + Tailwind plugin
└── package.json              # Dependencies and scripts
```

---

## Environment Variables

Create a `.env.local` file in the project root:

```env
# EmailJS — Contact Form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> Sign up at [emailjs.com](https://www.emailjs.com/) to obtain your credentials.

---

## Docker

The project includes a production-optimized, multi-stage Dockerfile using Next.js standalone output.

```bash
# Build the image
docker build -t portfolio .

# Run the container
docker run -p 3000:3000 portfolio
```

**Build stages:**

| Stage | Base Image | Purpose |
|---|---|---|
| `deps` | `node:22-alpine` | Install production dependencies |
| `builder` | `node:22-alpine` | Install all dependencies and build Next.js |
| `runner` | `node:22-alpine` | Minimal runtime — non-root user, standalone server |

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint (Core Web Vitals + TypeScript) |

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

**Haritha Wickremesinghe** · [GitHub](https://github.com/Haritha0705)

</div>
