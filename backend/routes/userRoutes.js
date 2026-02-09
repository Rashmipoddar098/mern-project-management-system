const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUserRole,
  deleteUser,
  getAssignableUsers,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly, managerOrAdmin } = require('../middleware/roleMiddleware');

// Must be before /:id route to avoid conflict
router.get('/assignable', protect, managerOrAdmin, getAssignableUsers);

router.get('/', protect, adminOnly, getUsers);
router.get('/:id', protect, adminOnly, getUserById);
router.put('/:id/role', protect, adminOnly, updateUserRole);
router.delete('/:id', protect, adminOnly, deleteUser);

module.exports = router;
