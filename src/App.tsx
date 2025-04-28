import React, { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import { Todo } from './types/todo';
import { saveTodos, loadTodos } from './utils/storage';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = loadTodos();
    setTodos(storedTodos);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const handleAddTodo = (title: string, description: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const handleToggleComplete = (id: string) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center">
            <CheckSquare size={32} className="mr-3" />
            <h1 className="text-2xl font-bold">Daily Task Tracker</h1>
          </div>
          <p className="mt-1 text-blue-100">Keep track of your tasks and progress</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TodoForm onAddTodo={handleAddTodo} />
            <TodoList 
              todos={todos} 
              onToggleComplete={handleToggleComplete} 
              onDelete={handleDeleteTodo} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <TodoStats todos={todos} />
            
            <div className="bg-white rounded-lg shadow-md p-5">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Tips</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Break large tasks into smaller, manageable steps</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Set realistic deadlines for your tasks</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Prioritize tasks based on importance and urgency</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-2"></span>
                  <span>Celebrate your progress and completed tasks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>Daily Task Tracker - Built with ChatAndBuild</p>
          <p className="text-sm mt-1">Keep organized and boost your productivity</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
