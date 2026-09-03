# TaskFlow — Jira Clone

A frontend Jira-style project management tool, built with **React**, **Redux Toolkit**, and **React Router** as a portfolio project targeting React Developer roles.

The project is being built in explicit, incremental phases — each phase is a real, working slice of a Jira-like task management app (UI shell → state → projects → tasks → board → team → search → comments → notifications), rather than one big upfront build.

> **Status:** Phase 4 of 9 complete. See [Roadmap](#roadmap) below.

![React](https://img.shields.io/badge/React-18-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-purple)
![Vite](https://img.shields.io/badge/Vite-5-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Features](#features)
- [Roadmap](#roadmap)
- [License](#license)

---

## Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| Language     | JavaScript (ES6+)                            |
| Framework    | React 18                                     |
| State        | Redux Toolkit + React Redux                  |
| Routing      | React Router v6                              |
| Styling      | Tailwind CSS 4                               |
| Build tool   | Vite 5                                       |
| Drag & Drop  | (planned) dnd-kit                            |

Planned for later phases: REST API integration via a mock backend (JSON Server) then a real backend, drag & drop with dnd-kit, notifications UI.

## Architecture

The frontend follows a component-based, feature-first structure:

```
┌─────────────────────────────────────────────┐
│                  Pages                       │  Route-level screens
│   Dashboard · Projects · Tasks · Board      │
├─────────────────────────────────────────────┤
│                Components                    │  Reusable UI building blocks
│        layout/ (Sidebar · Topbar), ui/       │
├─────────────────────────────────────────────┤
│                 Redux                        │  Global state
│      slices/ (projects · tasks · auth)      │
├─────────────────────────────────────────────┤
│                Services                      │  REST API calls
│              (fetch / axios)                │
└─────────────────────────────────────────────┘
```

Key conventions:

- **`pages/`** — one folder per route; each page composes smaller components.
- **`components/layout/`** — shared shell (Sidebar + Topbar) wrapped around every page via a parent route + `<Outlet />`.
- **`components/ui/`** — small reusable primitives (buttons, cards, badges) to avoid repetition.
- **`redux/slices/`** — feature-based state slices using Redux Toolkit's `createSlice`.
- **`services/`** — all API communication isolated here; components never talk to fetch directly.
- Data flows one way: components `dispatch` actions → Redux store updates → components re-render from the store.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/jira-clone.git
cd jira-clone
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Vite will start the dev server with hot reload. Open the printed URL — by default **http://localhost:5173**.

### 3. Production build

```bash
npm run build
npm run preview
```

### Project structure

```
jira-clone/
├── src/
│   ├── components/
│   │   └── layout/       # Sidebar, Topbar, Layout (shared shell)
│   ├── pages/            # Dashboard, Projects, Tasks, Board, 404
│   ├── redux/slices/     # Redux Toolkit slices (Phase 2+)
│   ├── services/         # REST API layer (Phase 8+)
│   └── data/             # Mock data (Phase 3+)
├── index.html
└── vite.config.js
```

## Features

### Currently implemented (Phase 4)

- **App shell / layout** — persistent sidebar navigation + topbar on every page.
- **Routing** — Dashboard, Projects, Tasks, Board, and a 404 page; React Router navigation without page reloads.
- **Dashboard** — stat cards (projects, tasks, in-progress, completed) driven by live Redux state.
- **Projects CRUD** — create, edit, and delete projects via modal forms; color picker.
- **Tasks CRUD** — create, edit, and delete tasks; assign to a project and a team member.
- **Task assignment** — tasks link to projects and team members.
- **Tasks table** — list with project, status/priority badges, assignee, and actions; filter by project.
- **Kanban board** — 3-column board (To Do / In Progress / Done); move tasks between columns with arrow controls.
- **Reusable modal** — shared `Modal` and form components reused across Add/Edit flows.
- **Tailwind CSS** — fully responsive styling via utility classes.

### Planned

- Drag & drop on the board (dnd-kit)
- Team members & task assignment (full member management UI)
- Search and filter by status/priority
- Task comments
- Notifications UI
- REST API integration

## Roadmap

| Phase | Scope                                              | Status     |
|-------|-----------------------------------------------------|------------|
| 1     | Project setup, layout, routing, basic UI            | ✅ Done     |
| 2     | Redux Toolkit store, slices, sample state           | ✅ Done     |
| 3     | Projects CRUD (create, read, update, delete)        | ✅ Done     |
| 4     | Tasks CRUD + Kanban board layout                    | ✅ Done     |
| 5     | Drag & drop on the board (dnd-kit)                  | ⏳ Planned  |
| 6     | Team members & task assignment                      | ⏳ Planned  |
| 7     | Search & filter by status/priority                  | ⏳ Planned  |
| 8     | Task comments                                       | ⏳ Planned  |
| 9     | Notifications UI + REST API integration & polish    | ⏳ Planned  |

Tracked in more detail via GitHub Issues / Projects as each phase starts.

## License

MIT — see [LICENSE](LICENSE).
