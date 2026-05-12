# Team Task Manager

A full-stack web application for creating projects, assigning tasks, and tracking progress with role-based access control (Admin/Member).

## Key Features
- **Authentication**: Signup and Login functionality with JWT.
- **Role-Based Access**: 
  - Admins can create projects and assign tasks.
  - Members can view projects they are part of and update their task statuses.
- **Project & Team Management**: Group tasks by project.
- **Task Tracking**: Create, assign, and track the status of tasks.
- **Dashboard**: View all projects and your assigned tasks at a glance.

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios, Pure CSS.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose.

## Local Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Team Task Manager"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder and add:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

4. **Run Locally**
   Start backend (from `backend` folder): `npm run dev`
   Start frontend (from `frontend` folder): `npm run dev`

## Deployment (Railway)
This project is configured to be easily deployed on Railway as a single service.

1. Push your code to a GitHub repository.
2. In Railway, create a new project and select **Deploy from GitHub repo**.
3. Railway will automatically detect the root `package.json`.
4. Make sure to add `MONGO_URI` and `JWT_SECRET` in the Railway environment variables.
5. Railway will automatically run the `postinstall`, `build`, and `start` scripts defined in the root `package.json`, which builds the frontend and serves it via the backend Express server.
