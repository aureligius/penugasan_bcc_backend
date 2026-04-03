# Task API Backend
This project is a backend API built using Node.js, Express, and TypeScript. It includes user authentication, task management (CRUD), validation, real-time updates, and external API integration.

## Technologies Used
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT (authentication)
- bcrypt (password hashing)
- Socket.IO (real-time)
- Zod (validation)

## Features
1. Authentication
- Register and login users
- Password is hashed using bcrypt
- JWT is used for authentication
- Protected routes using middleware

2. Task Management
- Create, read, update, and delete tasks
- Tasks are linked to the logged-in user

3. Validation
- Zod is used to validate request data

4. Middleware
- Authentication middleware
- Logging middleware
- Global error handler

5. Database
- PostgreSQL is used to store users and tasks

6. Real-time Updates
- Socket.IO is used
- Events: taskCreated, taskUpdated, taskDeleted

7. External API
- Fetches a quote and includes it when creating a task

## API Endpoints
Auth:
- POST /auth/register
- POST /auth/login

Tasks (require token):
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

## Authentication
Use this header:
Authorization: Bearer <token>

## Setup
1. Install dependencies
npm install

2. Create a .env file

PORT=3000
DATABASE_URL=your_database_url
JWT_SECRET=your_secret

3. Run the server
npm run dev

Server runs at http://localhost:3000

## Project Flow
Request -> Middleware -> Controller -> Service -> Database -> Response
