import { useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash2, X, Check } from 'lucide-react';

export default function TaskList({ tasks = [], markCompleted, updateTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState('Pending');
  const [editError, setEditError] = useState('');

  const startEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setEditStatus(task.status);
    setEditError('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditError('');
  };

  const saveEdit = async () => {
    setEditError('');
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle) {
      setEditError('Title is required');
      return;
    }
    try {
      await updateTask(editingId, {
        title: trimmedTitle,
        description: editDescription.trim(),
        status: editStatus,
      });
      setEditingId(null);
    } catch (err) {
      setEditError(err.response?.data?.message || 'Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this task?')) {
      try {
        await deleteTask(id);
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {editingId === task.id ? (
            <div className="flex-1 space-y-2">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description"
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
              {editError && <p className="text-sm text-red-600">{editError}</p>}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={saveEdit}
                  className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                >
                  <Check size={16} /> Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => task.status !== 'Completed' && markCompleted(task.id)}
                className="text-gray-500 hover:text-purple-600 mt-0.5 shrink-0"
                title={task.status === 'Completed' ? 'Completed' : 'Mark as completed'}
              >
                {task.status === 'Completed' ? (
                  <CheckCircle className="text-purple-600" />
                ) : (
                  <Circle />
                )}
              </button>
              <div className="flex-1 min-w-0">
                <span
                  className={`block font-medium ${
                    task.status === 'Completed' ? 'text-gray-400 line-through' : 'text-gray-800'
                  }`}
                >
                  {task.title}
                </span>
                {task.description && (
                  <span
                    className={`block text-sm mt-1 ${
                      task.status === 'Completed' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    {task.description}
                  </span>
                )}
                <span className="block text-xs text-gray-400 mt-1">
                  {task.status} · {new Date(task.created_at).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(task)}
                  className="p-1.5 text-gray-400 hover:text-purple-600 rounded"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(task.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
