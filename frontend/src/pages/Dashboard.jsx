import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, tasksRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/tasks/my') // We'll add this route to backend
      ]);
      setProjects(projectsRes.data);
      setTasks(tasksRes.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!newProjectName) return;
    try {
      await axios.post('/api/projects', { name: newProjectName });
      setNewProjectName('');
      fetchData();
    } catch (err) {
      alert('Error creating project');
    }
  };

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Team Task Manager</h1>
        <div className="user-info">
          <span>{user.name} ({user.role})</span>
          <button onClick={logout} className="logout-btn">Logout</button>
        </div>
      </header>

      <main className="dashboard-main">
        <section className="dashboard-section">
          <h2>Projects</h2>
          {user.role === 'Admin' && (
            <form onSubmit={createProject} className="create-form">
              <input 
                type="text" 
                placeholder="New Project Name" 
                value={newProjectName} 
                onChange={(e) => setNewProjectName(e.target.value)} 
              />
              <button type="submit">Create Project</button>
            </form>
          )}
          <div className="card-grid">
            {projects.map(p => (
              <div key={p._id} className="card project-card">
                <h3>{p.name}</h3>
                <p>{p.members.length} members</p>
                {/* Link to project details */}
              </div>
            ))}
            {projects.length === 0 && <p>No projects found.</p>}
          </div>
        </section>

        <section className="dashboard-section">
          <h2>My Tasks</h2>
          <div className="task-list">
            {tasks.map(t => (
              <div key={t._id} className={`task-item status-${t.status.replace(' ', '-').toLowerCase()}`}>
                <div className="task-info">
                  <h4>{t.title}</h4>
                  <p className="task-project">{t.project?.name}</p>
                </div>
                <span className="status-badge">{t.status}</span>
              </div>
            ))}
            {tasks.length === 0 && <p>You have no assigned tasks.</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
