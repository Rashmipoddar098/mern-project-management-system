const Activity = require('../models/Activity');

// @desc    Get all activities
// @route   GET /api/activities
// @access  Private
const getActivities = async (req, res) => {
  try {
    const { projectId, limit = 50 } = req.query;
    let query = {};

    if (projectId) {
      query.project = projectId;
    }

    const activities = await Activity.find(query)
      .populate('user', 'name email')
      .populate('project', 'name')
      .populate('task', 'title')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activities by project
// @route   GET /api/activities/project/:projectId
// @access  Private
const getActivitiesByProject = async (req, res) => {
  try {
    const activities = await Activity.find({ project: req.params.projectId })
      .populate('user', 'name email')
      .populate('task', 'title')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getActivities, getActivitiesByProject };
