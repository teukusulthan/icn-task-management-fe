# Task Manager Frontend

Frontend interface for the Task Manager application built as part of a
technical test. This application allows users to register, log in, and
manage their daily tasks through a clean and responsive interface.

The frontend communicates with the Task Manager API to handle
authentication and task management operations.

---

# Features

## Authentication

- User registration
- User login
- Password visibility toggle
- Form validation using Zod
- Protected routes for authenticated users

## Task Management

- Create new task
- Edit existing task
- Delete task with confirmation dialog
- Toggle task completion
- View full task details
- Character limit validation for task description

## UI / UX

- Responsive layout
- Toast notifications for success and error messages
- Dialog-based forms for creating and editing tasks
- Task detail modal
- Character counter for description input

---

# Tech Stack

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- Axios
- TailwindCSS
- shadcn/ui
- Sonner (toast notifications)
- Lucide Icons

---

# Project Structure

src │ ├── api │ └── axios.ts │ ├── components │ ├── tasks │ │ ├──
TaskCard.tsx │ │ ├── TaskForm.tsx │ │ ├── DeleteTaskDialog.tsx │ │ └──
TaskDetailDialog.tsx │ ├── hooks │ └── useDebounce.ts │ ├── pages │ ├──
Login.tsx │ ├── Register.tsx │ └── Dashboard.tsx │ ├── services │ ├──
auth.service.ts │ └── task.service.ts │ ├── validators │ ├──
auth.schema.ts │ └── task.schema.ts │ └── App.tsx

---

# Environment Variables

Create a `.env` file in the root directory.

Example:

VITE_API_URL=http://localhost:3000

Or copy from:

.env.example

---

# Installation

Clone the repository:

git clone `<repository-url>`{=html}

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

---

# Running the Application

Start development server:

npm run dev

The application will run at:

http://localhost:5173

---

# Application Pages

## Login Page

Users can log in using their email and password.

Features: - Form validation - Password visibility toggle - Error
handling using toast notifications

## Register Page

Users can create a new account.

Features: - Email validation - Password validation - Confirm password
check

## Dashboard

Main interface for managing tasks.

Features: - Display user's tasks - Create new task - Edit task - Delete
task - Toggle task completion - View detailed task information - Logout
functionality

---

# API Integration

The frontend communicates with the backend using Axios.

Main endpoints used:

POST /users Register user POST /users/login User login GET
/tasks/my-tasks Get tasks for logged in user POST /tasks Create task PUT
/tasks/:id Update task DELETE /tasks/:id Delete task

---

# State Management

State is handled using:

- React useState
- React useEffect
- React Hook Form for form state
- LocalStorage for storing user email

---

# UI Components

UI components are built using shadcn/ui with TailwindCSS.

Main components used:

- Card
- Dialog
- Button
- Input
- Textarea
- Checkbox
- Badge

---

# Validation

Form validation is implemented using Zod + React Hook Form.

Examples:

- Email format validation
- Password minimum length
- Task title required
- Task description maximum 1000 characters

---

# Notifications

User feedback is handled using Sonner toast notifications.

Examples:

- Login success
- Task creation success
- Task update confirmation
- Task deletion confirmation
- Error messages

---

# Notes

- This frontend is designed to work with the Task Manager API backend.
- All API communication is handled using Axios.
- Authentication uses HTTP cookies from the backend.
