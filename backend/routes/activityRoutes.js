const express = require('express');
const router = express.Router();
const {
  getActivities,
  getActivitiesByProject,
} = require('../controllers/activityController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getActivities);
router.get('/project/:projectId', protect, getActivitiesByProject);

module.exports = router;
