import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';

export default function TodoList() {
  const { todos, toggleTodo, deleteTodo } = useTodos();

  if (todos.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <button
            onClick={() => toggleTodo(todo.id, !todo.completed)}
            className="text-gray-500 hover:text-purple-600"
          >
            {todo.completed ? (
              <CheckCircle className="text-purple-600" />
            ) : (
              <Circle />
            )}
          </button>
          <span
            className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}
          >
            {todo.title}
          </span>
          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
}
