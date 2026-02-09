.PHONY: help build start stop restart logs clean install dev prod zip

# Default target
help:
	@echo "Project Management System - Available Commands"
	@echo "=============================================="
	@echo ""
	@echo "Docker Commands:"
	@echo "  make build      - Build all Docker containers"
	@echo "  make start      - Start all services"
	@echo "  make stop       - Stop all services"
	@echo "  make restart    - Restart all services"
	@echo "  make logs       - View logs from all services"
	@echo "  make clean      - Stop and remove all containers, volumes"
	@echo ""
	@echo "Development Commands:"
	@echo "  make install    - Install dependencies locally (no Docker)"
	@echo "  make dev        - Start development servers locally"
	@echo ""
	@echo "Packaging:"
	@echo "  make zip        - Create distributable zip file"
	@echo ""

# Docker commands
build:
	docker-compose build

start:
	docker-compose up -d
	@echo ""
	@echo "Services started!"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:5000"
	@echo "  MongoDB:  mongodb://localhost:27017"

stop:
	docker-compose down

restart: stop start

logs:
	docker-compose logs -f

clean:
	docker-compose down -v --rmi local
	@echo "Cleaned up all containers and volumes"

# Local development (without Docker)
install:
	cd backend && npm install
	cd frontend && npm install

dev:
	@echo "Starting backend and frontend in development mode..."
	@echo "Make sure MongoDB is running locally on port 27017"
	cd backend && npm run dev & cd frontend && npm run dev

# Production build
prod:
	docker-compose -f docker-compose.yml up -d --build

# Create zip for distribution
zip:
	@echo "Creating distribution zip..."
	@rm -f project-manager-mern.zip
	zip -r project-manager-mern.zip . \
		-x "*.git*" \
		-x "*node_modules*" \
		-x "*.env.local" \
		-x "*mongodb_data*" \
		-x "*.zip"
	@echo "Created: project-manager-mern.zip"

# Database seed (optional)
seed:
	docker-compose exec backend npm run seed
