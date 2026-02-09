# Usage Guide

Complete instructions for setting up and running the Project Management System locally.

## Prerequisites

- **Docker Desktop** (recommended) - [Download here](https://www.docker.com/products/docker-desktop/)
- OR for local development without Docker:
  - Node.js 18+
  - MongoDB 7.0+ running locally

## Quick Start with Docker (Recommended)

### 1. Start All Services

```bash
# Build and start all containers (MongoDB, Backend, Frontend)
docker-compose up -d --build
```

This single command will:
- Pull MongoDB 7.0 image
- Build the backend Node.js container
- Build the frontend React container
- Create a Docker network for inter-service communication
- Start all three services

### 2. Verify Services Are Running

```bash
# Check container status
docker-compose ps
```

Expected output:
```
NAME           STATUS    PORTS
pm-mongodb     running   0.0.0.0:27017->27017/tcp
pm-backend     running   0.0.0.0:5000->5000/tcp
pm-frontend    running   0.0.0.0:3000->3000/tcp
```

### 3. Seed Sample Data (Optional but Recommended)

```bash
docker-compose exec backend npm run seed
```

This creates test users and sample projects/tasks.

### 4. Access the Application

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | React web application |
| Backend API | http://localhost:5001/api | REST API endpoints |
| MongoDB | mongodb://localhost:27017 | Database (use MongoDB Compass to browse) |

### 5. Login with Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Project Manager | pm@example.com | password123 |
| Team Member | john@example.com | password123 |
| Team Member | jane@example.com | password123 |

---

## Docker Commands Reference

### Start Services
```bash
# Start all services in background
docker-compose up -d

# Start with build (use after code changes)
docker-compose up -d --build

# Start and view logs in terminal
docker-compose up
```

### Stop Services
```bash
# Stop all services (keeps data)
docker-compose down

# Stop and remove all data (fresh start)
docker-compose down -v
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb
```

### Execute Commands in Containers
```bash
# Run seed script
docker-compose exec backend npm run seed

# Access backend shell
docker-compose exec backend sh

# Access MongoDB shell
docker-compose exec mongodb mongosh
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart backend
```

---

## Using Makefile (Alternative)

If you have `make` installed, use these shortcuts:

```bash
make build     # Build all containers
make start     # Start all services
make stop      # Stop all services
make restart   # Restart all services
make logs      # View logs
make clean     # Remove containers and volumes
make zip       # Create distribution zip
```

---

## Local Development (Without Docker)

### 1. Install MongoDB

**macOS (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
brew services start mongodb-community@7.0
```

**Ubuntu/Debian:**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
```

**Windows:**
Download and install from [MongoDB Download Center](https://www.mongodb.com/try/download/community)

### 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure Environment

Backend `.env` (already configured):
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/project_management
JWT_SECRET=supersecretkey
NODE_ENV=development
```

Frontend `.env` (already configured):
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Start Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Seed Data (Optional)
```bash
cd backend
npm run seed
```

---

## Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :5000
lsof -i :3000
lsof -i :27017

# Kill process by PID
kill -9 <PID>
```

### Docker Issues

```bash
# Reset everything
docker-compose down -v
docker system prune -f
docker-compose up -d --build
```

### MongoDB Connection Failed

1. Ensure MongoDB container is healthy:
   ```bash
   docker-compose ps
   docker-compose logs mongodb
   ```

2. Wait for MongoDB to be ready (health check takes ~10 seconds)

3. Check if port 27017 is available

### Frontend Not Loading

1. Check if backend is running:
   ```bash
   curl http://localhost:5001/api/health
   ```

2. Check browser console for CORS errors

3. Verify `VITE_API_URL` in frontend `.env`

### Clear and Restart Fresh

```bash
# Nuclear option - removes all data
docker-compose down -v
docker-compose up -d --build
docker-compose exec backend npm run seed
```

---

## API Health Check

Verify the backend is running:

```bash
curl http://localhost:5001/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"2026-02-08T12:00:00.000Z"}
```

---

## Service Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Network                        │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Frontend   │  │   Backend    │  │   MongoDB    │  │
│  │   (React)    │──│   (Node.js)  │──│   Database   │  │
│  │   Port 3000  │  │   Port 5001  │  │   Port 27017 │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
         │                   │                   │
         ▼                   ▼                   ▼
   localhost:3000      localhost:5001      localhost:27017
```

---

## Next Steps

1. Open http://localhost:3000
2. Register a new account or login with test credentials
3. Create a project
4. Add tasks to the project
5. Invite team members (as Admin)
6. Update task statuses

For API documentation, see [README.md](./README.md#api-endpoints).
