import { CheckCircle, Circle } from 'lucide-react';

export default function TaskList({ tasks = [], markCompleted }) {

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
        </li>
      ))}
    </ul>
  );
}
