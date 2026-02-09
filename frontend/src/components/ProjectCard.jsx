import { Link } from 'react-router-dom';

function ProjectCard({ project, onEdit, onDelete, canEdit }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on_hold':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <Link to={`/projects/${project._id}`} className="hover:text-indigo-600">
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        </Link>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}
        >
          {project.status?.replace('_', ' ')}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {project.description || 'No description'}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <span>Owner: {project.owner?.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span>{project.members?.length || 0} members</span>
        </div>
      </div>
      {canEdit && (
        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
          <button
            onClick={() => onEdit(project)}
            className="px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(project._id)}
            className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
