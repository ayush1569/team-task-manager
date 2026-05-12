# 🚀 Team Task Manager (Full-Stack)

A full-stack web application where users can create projects, assign tasks, and track progress with **role-based access control (Admin/Member)**.

## 🌐 Live Demo
**[https://team-task-manager-production-2545.up.railway.app](https://team-task-manager-production-2545.up.railway.app)**

## 📁 GitHub Repository
**[https://github.com/ayush1569/team-task-manager](https://github.com/ayush1569/team-task-manager)**

---

## 🎯 Key Features

- ✅ **Authentication** — Secure Signup & Login with JWT tokens and bcrypt password hashing
- ✅ **Role-Based Access Control** — Admins and Members have different permissions
  - **Admin**: Can create projects, create tasks, assign tasks to members
  - **Member**: Can view their assigned tasks and update their status
- ✅ **Project & Team Management** — Create and manage multiple projects
- ✅ **Task Creation & Assignment** — Create tasks with title, due date, and project
- ✅ **Status Tracking** — Tasks have statuses: `To Do`, `In Progress`, `Done`
- ✅ **Dashboard** — See all projects and assigned tasks in one place
- ✅ **Overdue Indicators** — Tasks past their due date show a red **OVERDUE** badge automatically

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React (Vite), React Router, Axios, Pure CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (NoSQL) with Mongoose |
| **Auth** | JWT (JSON Web Tokens) + bcryptjs |
| **Deployment** | Railway |

---

## ⚙️ Requirements Fulfilled

- ✅ REST APIs with proper routes
- ✅ NoSQL Database (MongoDB) with relationships
- ✅ Proper validations on all inputs
- ✅ Role-based access control enforced on backend
- ✅ Deployed and live on Railway

---

## 🚀 Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ayush1569/team-task-manager.git
   cd team-task-manager
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```

3. **Run locally**
   ```bash
   npm start
   ```

4. Open **[http://localhost:5000](http://localhost:5000)** in your browser.

---

## 📦 Deployment (Railway)

This project is fully configured for one-click Railway deployment.

1. Push code to GitHub.
2. Go to [Railway.app](https://railway.app/) → **New Project** → **Deploy from GitHub repo**.
3. Select `team-task-manager` repository.
4. Railway auto-detects scripts and builds the full app.
5. Click **Generate Domain** to get a live URL.

---

## 📂 Project Structure

```
team-task-manager/
├── backend/
│   ├── models/         # Mongoose models (User, Project, Task)
│   ├── routes/         # Express API routes
│   ├── middleware/      # JWT auth middleware
│   └── server.js       # Main Express server
├── frontend/
│   ├── src/
│   │   ├── pages/      # Login, Register, Dashboard
│   │   ├── context/    # Auth context
│   │   └── App.jsx
│   └── vite.config.js
├── package.json        # Root build scripts for Railway
└── README.md
```
