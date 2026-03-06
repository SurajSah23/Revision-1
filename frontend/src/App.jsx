import { useTasks } from './hooks/useTasks';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

function App() {
  const taskProps = useTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Task Management
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <AddTask {...taskProps} />
          <TaskList {...taskProps} />
        </div>
      </div>
    </div>
  );
}

export default App;
