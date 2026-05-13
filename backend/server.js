const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Only serve frontend for non-API routes (SPA fallback)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

// Global error handler (important for Express 5)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Database Connection — connect FIRST, then start server
const MONGO_URI = process.env.MONGO_URI || 'mongodb://ayushpratap195_db_user:ayush123@ac-wyr4bbz-shard-00-00.jy8zwdz.mongodb.net:27017,ac-wyr4bbz-shard-00-01.jy8zwdz.mongodb.net:27017,ac-wyr4bbz-shard-00-02.jy8zwdz.mongodb.net:27017/teamtaskmanager?ssl=true&replicaSet=atlas-89igpi-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    // Start server anyway so Railway doesn't keep restarting
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (DB disconnected)`));
  });
