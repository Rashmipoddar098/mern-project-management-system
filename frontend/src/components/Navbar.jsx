import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', roles: ['admin', 'project_manager', 'team_member'] },
    { path: '/projects', label: 'Projects', roles: ['admin', 'project_manager', 'team_member'] },
    { path: '/board', label: 'Board', roles: ['admin', 'project_manager', 'team_member'] },
    { path: '/tasks', label: 'Tasks', roles: ['admin', 'project_manager', 'team_member'] },
    { path: '/users', label: 'Users', roles: ['admin'] },
  ];

  const filteredLinks = navLinks.filter((link) => link.roles.includes(user?.role));

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'project_manager':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-emerald-100 text-emerald-800';
    }
  };

  const formatRole = (role) => {
    return role?.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">TaskFlow</span>
            </Link>
            <div className="hidden md:flex space-x-1">
              {filteredLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-slate-900 font-semibold text-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{formatRole(user?.role)}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-all"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
