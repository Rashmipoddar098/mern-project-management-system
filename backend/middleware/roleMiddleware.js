// Check if user has required role(s)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Role '${req.user.role}' is not authorized to access this route`,
      });
    }

    next();
  };
};

// Shorthand middleware for common role checks
const adminOnly = authorize('admin');
const managerOrAdmin = authorize('admin', 'project_manager');
const allRoles = authorize('admin', 'project_manager', 'team_member');

module.exports = {
  authorize,
  adminOnly,
  managerOrAdmin,
  allRoles,
};
