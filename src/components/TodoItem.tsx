import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 ${todo.completed ? 'border-green-500' : 'border-blue-500'}`}>
      <div className="flex items-start">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-md border ${
            todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 text-transparent hover:border-blue-500'
          } flex items-center justify-center mr-3 mt-0.5`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <Check size={16} />}
        </button>
        
        <div className="flex-grow">
          <h3 className={`text-lg font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          
          {todo.description && (
            <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
              {todo.description}
            </p>
          )}
          
          <div className="mt-2 text-xs text-gray-500">
            Added {formatDate(todo.createdAt)}
          </div>
        </div>
        
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
