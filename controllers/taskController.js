// controllers/taskController.js
const Task = require('../models/Task');

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    console.error('Get task error:', error.message);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description,
      status: status || 'Pending',
      userId: req.user._id
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Find task by id and user
    let task = await Task.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;

    // Save updated task
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error.message);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error('Delete task error:', error.message);
    
    // Check if error is due to invalid ObjectId
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};