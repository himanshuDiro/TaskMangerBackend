// routes/tasks.js
const express = require('express');
const router = express.Router();
const { 
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask 
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

// Protect all task routes
router.use(protect);

// Routes for /api/tasks
router.route('/')
  .get(getTasks)
  .post(createTask);

// Routes for /api/tasks/:id
router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;