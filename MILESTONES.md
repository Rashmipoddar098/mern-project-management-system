# TaskFlow - Project Management System

## Milestones & Action Items

---

## Project Overview
**TaskFlow** is a full-stack MERN Project Management System inspired by Jira/Kanban, featuring role-based access control, drag-and-drop Kanban board, Docker containerization, and Makefile automation.

---

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Database | MongoDB (local/Docker) | Document-based fits project/task structure |
| Auth | JWT stored in localStorage | Secure, stateless authentication |
| Frontend State | React Context + useReducer | Lightweight, no external deps needed |
| CSS Framework | TailwindCSS | Utility-first, rapid development |
| Containerization | Docker Compose | Easy local dev, portable deployment |
| API Structure | RESTful | Standard, well-documented patterns |
| Build Tool | Vite | Faster than CRA, modern ESM support |
| UI Inspiration | Jira/Kanban | Familiar project management UX |
| Backend Port | 5001 | Avoid macOS AirPlay conflict on 5000 |

---

## Completed Milestones

### Milestone 1: Project Setup & Infrastructure ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 1.1 | Create folder structure | ✅ Complete | backend/, frontend/ with subdirs |
| 1.2 | Setup Docker Compose | ✅ Complete | MongoDB, Backend (5001), Frontend (3000) |
| 1.3 | Create Makefile | ✅ Complete | build, start, stop, clean, zip commands |
| 1.4 | Environment configuration | ✅ Complete | .env files for both services |

### Milestone 2: Backend Core ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 2.1 | MongoDB connection (db.js) | ✅ Complete | Simple connection with error handling |
| 2.2 | User model & schema | ✅ Complete | name, email, password (hashed), role |
| 2.3 | Project model & schema | ✅ Complete | name, description, owner, members, status |
| 2.4 | Task model & schema | ✅ Complete | title, desc, status, priority, assignee, dueDate |
| 2.5 | Activity model & schema | ✅ Complete | action, description, user, project, task |

### Milestone 3: Backend Authentication & Authorization ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 3.1 | Auth routes (register/login) | ✅ Complete | JWT generation, password hashing |
| 3.2 | Auth middleware | ✅ Complete | Token verification from Bearer header |
| 3.3 | Role middleware | ✅ Complete | adminOnly, managerOrAdmin, allRoles |
| 3.4 | Error handling middleware | ✅ Complete | Centralized error responses |

### Milestone 4: Backend API Routes ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 4.1 | User routes | ✅ Complete | CRUD, role assignment (Admin only) |
| 4.2 | **Assignable users endpoint** | ✅ Complete | `/api/users/assignable` for PM task assignment |
| 4.3 | Project routes | ✅ Complete | CRUD, member management |
| 4.4 | Task routes | ✅ Complete | CRUD, status updates, project filtering |
| 4.5 | Activity routes | ✅ Complete | Fetch logs per project |

### Milestone 5: Frontend Setup ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 5.1 | Create React app (Vite) | ✅ Complete | Fast dev server, ESM |
| 5.2 | TailwindCSS setup | ✅ Complete | Config + base styles |
| 5.3 | Axios instance | ✅ Complete | Base URL, auth interceptors |
| 5.4 | Auth context | ✅ Complete | User state, login/logout/register |

### Milestone 6: Frontend Pages ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 6.1 | Login page | ✅ Complete | **Branded TaskFlow design** |
| 6.2 | Register page | ✅ Complete | **Branded TaskFlow design** |
| 6.3 | Dashboard page | ✅ Complete | Stats cards, task breakdown, activity |
| 6.4 | Projects page | ✅ Complete | List, create, edit, delete modals |
| 6.5 | Project Detail page | ✅ Complete | Tasks, members, activity log |
| 6.6 | **Kanban Board page** | ✅ Complete | **Drag-and-drop task management** |
| 6.7 | Tasks page | ✅ Complete | List with filters, CRUD modals |
| 6.8 | Users page (Admin) | ✅ Complete | User list, role management |

### Milestone 7: Frontend Components ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 7.1 | Navbar component | ✅ Complete | **Dark theme, TaskFlow branding** |
| 7.2 | ProtectedRoute component | ✅ Complete | Auth + role guards |
| 7.3 | ProjectCard component | ✅ Complete | Reusable project display |
| 7.4 | TaskCard component | ✅ Complete | Status change, priority colors |
| 7.5 | Modal component | ✅ Complete | Reusable modal wrapper |
| 7.6 | LoadingSpinner component | ✅ Complete | Loading states |

### Milestone 8: Bug Fixes & Improvements ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 8.1 | **Fix task assignment dropdown** | ✅ Complete | Shows `Name (email)` format |
| 8.2 | **PM can assign to team members** | ✅ Complete | New `/users/assignable` endpoint |
| 8.3 | **PM project access control** | ✅ Complete | Only sees owned/member projects |
| 8.4 | **TaskFlow branding** | ✅ Complete | Logo, colors, dark theme |
| 8.5 | **Kanban board view** | ✅ Complete | Drag-and-drop status updates |

### Milestone 9: Documentation & Packaging ✅
| # | Task | Status | Notes |
|---|------|--------|-------|
| 9.1 | Setup README | ✅ Complete | Full instructions, API docs |
| 9.2 | Usage guide | ✅ Complete | Docker setup instructions |
| 9.3 | Create zip packaging | ✅ Complete | `make zip` command |
| 9.4 | Milestones document | ✅ Complete | This file |

---

## Progress Summary

| Milestone | Progress | Status |
|-----------|----------|--------|
| 1. Infrastructure | 4/4 | ✅ Complete |
| 2. Backend Core | 5/5 | ✅ Complete |
| 3. Backend Auth | 4/4 | ✅ Complete |
| 4. Backend Routes | 5/5 | ✅ Complete |
| 5. Frontend Setup | 4/4 | ✅ Complete |
| 6. Frontend Pages | 8/8 | ✅ Complete |
| 7. Frontend Components | 6/6 | ✅ Complete |
| 8. Bug Fixes | 5/5 | ✅ Complete |
| 9. Documentation | 4/4 | ✅ Complete |

**Overall: 45/45 tasks complete** ✅

---

## Key Features

### Role-Based Access Control
- **Admin**: Full access - manage users, all projects, all tasks, assign roles
- **Project Manager**: Create projects, manage own projects, assign tasks to team members
- **Team Member**: View assigned tasks, update task status

### Kanban Board
- Drag-and-drop task management
- Filter by project
- Visual status columns (To Do, In Progress, Review, Done)
- Priority indicators

### Task Assignment
- Project Managers can assign tasks to any team member by name/email
- Dropdown shows `Name (email)` format for clarity
- Only project members can be assigned to project tasks

---

## Change Log

| Date | Change | Impact |
|------|--------|--------|
| 2026-02-08 | Initial project creation | Full MERN stack |
| 2026-02-08 | Changed backend port to 5001 | Avoid macOS AirPlay conflict |
| 2026-02-08 | Fixed task assignment dropdown | Shows name + email |
| 2026-02-08 | Added `/users/assignable` endpoint | PM can fetch users |
| 2026-02-08 | Added Kanban Board page | Drag-and-drop tasks |
| 2026-02-08 | Rebranded to TaskFlow | New logo, dark theme |

---

## Quick Start

```bash
# Build and start all services
docker-compose up -d --build

# Seed sample data
docker-compose exec backend npm run seed

# Access the app
open http://localhost:3000
```

### Test Accounts
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Project Manager | pm@example.com | password123 |
| Team Member | john@example.com | password123 |
| Team Member | jane@example.com | password123 |

---

## Future Enhancements (Not Implemented)

- [ ] Email notifications for task assignments
- [ ] File upload for project documentation
- [ ] Gantt chart / progress tracker
- [ ] Search and advanced filtering
- [ ] Real-time updates with WebSockets
- [ ] Deployment to cloud (Render/Vercel)
- [ ] Dark/Light theme toggle
- [ ] Task comments and attachments
