const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTasksByProject,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const { managerOrAdmin } = require('../middleware/roleMiddleware');

router.get('/', protect, getTasks);
router.get('/:id', protect, getTaskById);
router.get('/project/:projectId', protect, getTasksByProject);
router.post('/', protect, managerOrAdmin, createTask);
router.put('/:id', protect, updateTask);
router.delete('/:id', protect, managerOrAdmin, deleteTask);

module.exports = router;
