import { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const COLUMNS = [
  { id: 'todo', title: 'To Do', color: 'bg-slate-100', headerColor: 'bg-slate-500' },
  { id: 'in_progress', title: 'In Progress', color: 'bg-blue-50', headerColor: 'bg-blue-500' },
  { id: 'review', title: 'In Review', color: 'bg-amber-50', headerColor: 'bg-amber-500' },
  { id: 'completed', title: 'Done', color: 'bg-emerald-50', headerColor: 'bg-emerald-500' },
];

function Board() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [loading, setLoading] = useState(true);
  const [draggingTask, setDraggingTask] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        api.get('/tasks'),
        api.get('/projects'),
      ]);
      setTasks(tasksRes.data);
      setProjects(projectsRes.data);
      if (projectsRes.data.length > 0 && !selectedProject) {
        setSelectedProject(projectsRes.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggingTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (!draggingTask || draggingTask.status === newStatus) {
      setDraggingTask(null);
      return;
    }

    // Check if user can change status
    const canChange = ['admin', 'project_manager'].includes(user?.role) || 
                      draggingTask.assignedTo?._id === user?._id;
    
    if (!canChange) {
      setDraggingTask(null);
      return;
    }

    try {
      await api.put(`/tasks/${draggingTask._id}`, { status: newStatus });
      setTasks(tasks.map(t => 
        t._id === draggingTask._id ? { ...t, status: newStatus } : t
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setDraggingTask(null);
  };

  const filteredTasks = selectedProject 
    ? tasks.filter(t => t.project?._id === selectedProject)
    : tasks;

  const getTasksByStatus = (status) => {
    return filteredTasks.filter(t => t.status === status);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-amber-500';
      case 'low': return 'border-l-emerald-500';
      default: return 'border-l-slate-300';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Kanban Board</h1>
          <p className="text-slate-600">Drag and drop tasks to update status</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Projects</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-4 gap-4 h-full">
        {COLUMNS.map((column) => {
          const columnTasks = getTasksByStatus(column.id);
          return (
            <div
              key={column.id}
              className={`${column.color} rounded-xl overflow-hidden flex flex-col`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              {/* Column Header */}
              <div className={`${column.headerColor} px-4 py-3 flex items-center justify-between`}>
                <h3 className="font-semibold text-white">{column.title}</h3>
                <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>

              {/* Tasks */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {columnTasks.map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className={`bg-white rounded-lg shadow-sm border-l-4 ${getPriorityColor(task.priority)} p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-slate-900 text-sm leading-tight">
                        {task.title}
                      </h4>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPriorityBadge(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    
                    {task.description && (
                      <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                        {task.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {task.assignedTo ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center text-xs font-semibold text-slate-900">
                            {task.assignedTo.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-xs text-slate-600 truncate max-w-[100px]">
                            {task.assignedTo.name}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">Unassigned</span>
                      )}
                      
                      {task.dueDate && (
                        <span className="text-xs text-slate-500">
                          {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Board;
