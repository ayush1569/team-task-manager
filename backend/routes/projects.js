const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { auth, isAdmin } = require('../middleware/auth');

// Get all projects (Admins get all, Members get projects they belong to)
router.get('/', auth, async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find().populate('members', 'name email');
    } else {
      projects = await Project.find({ members: req.user.id }).populate('members', 'name email');
    }
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a project (Admin only)
router.post('/', [auth, isAdmin], async (req, res) => {
  try {
    const { name, description, members } = req.body;
    const newProject = new Project({
      name,
      description,
      createdBy: req.user.id,
      members: members || [req.user.id] // Admin is a member by default
    });

    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add member to project (Admin only)
router.put('/:id/members', [auth, isAdmin], async (req, res) => {
  try {
    const { userId } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (!project.members.includes(userId)) {
      project.members.push(userId);
      await project.save();
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
