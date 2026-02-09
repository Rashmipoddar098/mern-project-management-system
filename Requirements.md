Objective:
This assignment evaluates your ability to design and develop a full-stack Project Management
System using MongoDB, Express.js, React.js, and Node.js. You are expected to demonstrate
structured backend architecture, reusable frontend components, authentication/authorization, and
good UI/UX design practices.
Project Overview:
Build a Project Management web application that allows users to manage multiple projects and
assign tasks to team members based on their roles. The system should support different user roles
such as Admin, Project Manager, and Team Member.
User Roles and Permissions:
• Admin: Can manage all users, projects, and tasks. Can assign roles to users.
• Project Manager: Can create projects, add team members, and manage tasks within their
projects.
• Team Member: Can view and update tasks assigned to them.
Core Features:
• User Authentication (Login, Register) using JWT.
• Role-based access control for different user permissions.
• CRUD operations for Projects (Create, Read, Update, Delete).
• CRUD operations for Tasks (linked to specific projects).
• Each task should include title, description, assigned member, status, priority, and due date.
• Dashboard showing an overview of active projects and pending/completed tasks.
• Activity logs for each project (e.g., task created, status updated, etc.).
Backend (Node.js + Express + MongoDB):
• Implement RESTful APIs for managing users, projects, and tasks.
• Use MongoDB (Atlas or local) for database storage.
• Use Mongoose for schema design and validation.
• Implement authentication and role-based authorization using JWT and middleware.
• Handle all API responses with proper status codes and error messages.
• Use environment variables for sensitive data (JWT secret, DB connection, etc.).
Frontend (React.js):
• Use React functional components and hooks.
• Implement authentication pages (Login, Register) and protected routes.
• Provide a dashboard to display projects and tasks based on user roles.
• Implement forms for creating/editing projects and tasks.
• Use Axios or Fetch API to connect with backend APIs.
• Implement proper error handling and loading states.
• Make the UI responsive and visually appealing (bonus if using Material UI or TailwindCSS).

Bonus Features (Optional):
• Add notifications or email alerts for task updates.
• Implement search, filtering, and sorting for tasks and projects.
• Add file upload functionality for project documentation.
• Create a Gantt chart or progress tracker for tasks.
• Deploy the application on Render, Vercel, or Netlify with MongoDB Atlas.
Submission Guidelines:
• Submit the GitHub repository link containing both frontend and backend code.
• Include a README file with setup instructions and API documentation.
• If deployed, include the live URL for demo access.
• Ensure your app can be run locally using simple setup commands (e.g., npm install, npm start).
Evaluation Criteria:
• Project structure, code readability, and organization.
• API design, validation, and error handling.
• Proper implementation of authentication and authorization.
• UI/UX quality and responsiveness.
• State management and reusability of components.
• Bonus feature implementation (if any).