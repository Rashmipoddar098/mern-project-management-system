function TaskCard({ task, onEdit, onDelete, onStatusChange, canEdit, canChangeStatus }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString();
  };

  const statuses = ['todo', 'in_progress', 'review', 'completed'];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-medium text-gray-900">{task.title}</h4>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}
        >
          {task.status?.replace('_', ' ')}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
        {task.description || 'No description'}
      </p>
      <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
        <span className={`font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority?.toUpperCase()}
        </span>
        <span>•</span>
        <span>Due: {formatDate(task.dueDate)}</span>
        {task.assignedTo && (
          <>
            <span>•</span>
            <span>Assigned: {task.assignedTo.name}</span>
          </>
        )}
      </div>
      {task.project?.name && (
        <div className="text-xs text-gray-400 mb-3">Project: {task.project.name}</div>
      )}
      <div className="flex flex-wrap gap-2">
        {canChangeStatus && (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value)}
            className="text-xs border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status.replace('_', ' ')}
              </option>
            ))}
          </select>
        )}
        {canEdit && (
          <>
            <button
              onClick={() => onEdit(task)}
              className="px-2 py-1 text-xs text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
