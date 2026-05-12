const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Project = require('../models/Project');
const { auth, isAdmin } = require('../middleware/auth');

// Get tasks for a project
router.get('/project/:projectId', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    // Check access
    if (req.user.role !== 'Admin' && !project.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized for this project' });
    }

    const tasks = await Task.find({ project: req.params.projectId })
      .populate('assignedTo', 'name email')
      .populate('project', 'name');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get user's tasks across all projects
router.get('/my', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user.id }).populate('project', 'name');
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Create a task
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, status, project, assignedTo, dueDate } = req.body;
    
    const proj = await Project.findById(project);
    if (!proj) return res.status(404).json({ message: 'Project not found' });
    
    // Only Admin or project members can create tasks
    if (req.user.role !== 'Admin' && !proj.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const taskData = {
      title,
      description,
      status,
      project,
      dueDate
    };
    
    if (assignedTo) {
      taskData.assignedTo = assignedTo;
    }

    const newTask = new Task(taskData);

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update task status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status, assignedTo } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const proj = await Project.findById(task.project);
    if (req.user.role !== 'Admin' && !proj.members.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (status) task.status = status;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
