# Project Management System (MERN Stack)

A full-stack Project Management System built with MongoDB, Express.js, React.js, and Node.js. Features role-based access control, task management, and activity logging.

## Features

- **User Authentication**: JWT-based authentication with secure login/register
- **Role-Based Access Control**:
  - **Admin**: Full access - manage users, projects, tasks, assign roles
  - **Project Manager**: Create projects, manage team members, manage tasks
  - **Team Member**: View assigned tasks, update task status
- **Project Management**: Create, update, delete projects with team members
- **Task Management**: Full CRUD with status, priority, due dates, assignments
- **Dashboard**: Overview of projects, tasks, and recent activity
- **Activity Logging**: Track all project and task changes

## Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **DevOps**: Docker, Docker Compose, Makefile

## Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Build and start all services
make build
make start

# Or in one command
docker-compose up -d --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB: mongodb://localhost:27017

### Option 2: Local Development (Without Docker)

**Prerequisites:**
- Node.js 18+
- MongoDB running locally on port 27017

```bash
# Install dependencies
make install
# Or manually:
cd backend && npm install
cd ../frontend && npm install

# Start development servers (in separate terminals)
cd backend && npm run dev
cd frontend && npm run dev
```

### Seed Sample Data

```bash
# With Docker
docker-compose exec backend npm run seed

# Without Docker
cd backend && npm run seed
```

## Test Accounts

After seeding, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Project Manager | pm@example.com | password123 |
| Team Member | john@example.com | password123 |
| Team Member | jane@example.com | password123 |

## Available Make Commands

```bash
make help      # Show all available commands
make build     # Build Docker containers
make start     # Start all services
make stop      # Stop all services
make restart   # Restart all services
make logs      # View logs from all services
make clean     # Remove containers and volumes
make install   # Install dependencies locally
make zip       # Create distributable zip file
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/role` - Update user role
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects (filtered by role)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (Admin/PM)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/members` - Add member
- `DELETE /api/projects/:id/members/:userId` - Remove member

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get task by ID
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `POST /api/tasks` - Create task (Admin/PM)
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task (Admin/PM)

### Activities
- `GET /api/activities` - Get all activities
- `GET /api/activities/project/:projectId` - Get activities by project

## Project Structure

```
project-manager-mern/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   ├── taskController.js
│   │   └── activityController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── taskRoutes.js
│   │   └── activityRoutes.js
│   ├── Dockerfile
│   ├── package.json
│   ├── seed.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
├── Makefile
├── MILESTONES.md
└── README.md
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/project_management
JWT_SECRET=supersecretkey
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Creating a Distribution Zip

```bash
make zip
```

This creates `project-manager-mern.zip` excluding node_modules, .git, and other unnecessary files.

## License

MIT
