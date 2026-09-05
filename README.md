# TaskFlow — Jira Clone

A frontend Jira-style project management tool, built with **React**, **Redux Toolkit**, and **React Router** as a portfolio project targeting React Developer roles.

The project is being built in explicit, incremental phases — each phase is a real, working slice of a Jira-like task management app (UI shell → state → projects → tasks → board → team → search → comments → notifications), rather than one big upfront build.

> **Status:** Phase 9 of 9 complete — all phases done! See [Roadmap](#roadmap) below.

![React](https://img.shields.io/badge/React-18-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.x-purple)
![Vite](https://img.shields.io/badge/Vite-5-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38bdf8)
![dnd-kit](https://img.shields.io/badge/dnd--kit-latest-orange)
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
| Drag & Drop  | dnd-kit                                      |

Planned for later phases: REST API integration via a mock backend (JSON Server) then a real backend, team member management UI, search & filters, comments, notifications UI.

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
│   │   ├── layout/              # Sidebar, Topbar, Layout (shared shell)
│   │   ├── ui/                  # Reusable primitives (Modal, Avatar)
│   │   ├── NotificationsDropdown.jsx
│   │   ├── TaskDetail.jsx       # Task detail + comments modal
│   │   ├── TaskForm.jsx         # Create/edit task form
│   │   ├── ProjectForm.jsx      # Create/edit project form
│   │   └── MemberForm.jsx       # Add/edit member form
│   ├── pages/                   # Dashboard, Projects, Tasks, Board, Team, 404
│   ├── redux/
│   │   ├── store.js             # Central Redux store
│   │   └── slices/              # projects, tasks, members, comments, notifications, ui
│   ├── services/                # REST API layer (future)
│   └── data/mockData.js         # All mock data
├── index.html
└── vite.config.js
```

## Features

### Currently implemented (Phase 9)

- **App shell / layout** — persistent sidebar navigation + topbar on every page.
- **Routing** — Dashboard, Projects, Tasks, Board, Team, and a 404 page; React Router navigation without page reloads.
- **Dashboard** — stat cards (projects, tasks, in-progress, completed) driven by live Redux state.
- **Projects CRUD** — create, edit, and delete projects via modal forms; color picker.
- **Tasks CRUD** — create, edit, and delete tasks; assign to a project and a team member.
- **Task comments** — add and delete comments on any task from a task-detail modal; comment list with author avatar, timestamp, and live counts on the Tasks table and Board cards.
- **Team members page** — add/remove members with name, role, and auto-gendered avatar; shows each member's assigned task count.
- **Inline task assignment** — assign or reassign a member to a task directly from the Tasks table or a Board card, without opening the form.
- **Global search** — topbar search filters tasks (title/description), projects, and board cards live, via shared Redux state.
- **Filters** — Tasks page filters by project, status, and priority; Board page filters by priority; combined with search.
- **Tasks table** — list with project, status/priority badges, assignee, and actions; filter by project/status/priority.
- **Kanban board with drag & drop** — 3-column board (To Do / In Progress / Done); drag cards between columns with dnd-kit, with drop-target highlighting.
- **Notifications** — bell icon with unread count badge, dropdown with mark-as-read, mark all read, dismiss individual, and clear notifications.
- **Reusable modal & avatar** — shared `Modal`, `Avatar`, and form components reused across Add/Edit flows.
- **Tailwind CSS** — fully responsive styling via utility classes.

### Potential extensions

- REST API integration (JSON Server or real backend)
- Authentication (JWT login/signup)
- Real-time notifications (WebSocket)
- Role-based access control
- Dark mode
- Deployment to Vercel/Netlify

## Roadmap

| Phase | Scope                                              | Status     |
|-------|-----------------------------------------------------|------------|
| 1     | Project setup, layout, routing, basic UI            | ✅ Done     |
| 2     | Redux Toolkit store, slices, sample state           | ✅ Done     |
| 3     | Projects CRUD (create, read, update, delete)        | ✅ Done     |
| 4     | Tasks CRUD + Kanban board layout                    | ✅ Done     |
| 5     | Drag & drop on the board (dnd-kit)                  | ✅ Done     |
| 6     | Team members & task assignment                      | ✅ Done     |
| 7     | Search & filter by status/priority                  | ✅ Done     |
| 8     | Task comments                                       | ✅ Done     |
| 9     | Notifications UI                                    | ✅ Done     |

Tracked in more detail via GitHub Issues / Projects as each phase starts.

## License

MIT — see [LICENSE](LICENSE).
