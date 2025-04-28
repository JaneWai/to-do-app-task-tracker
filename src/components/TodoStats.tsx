import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoStatsProps {
  todos: Todo[];
}

const TodoStats: React.FC<TodoStatsProps> = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Task Statistics</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <Clock size={20} className="text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-600">Pending</span>
          </div>
          <p className="text-2xl font-bold mt-1">{pendingTasks}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle size={20} className="text-green-600 mr-2" />
            <span className="text-sm font-medium text-green-600">Completed</span>
          </div>
          <p className="text-2xl font-bold mt-1">{completedTasks}</p>
        </div>
      </div>
      
      <div className="mb-2 flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">Completion Rate</span>
        <span className="text-sm font-medium text-gray-700">{completionRate}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-green-600 h-2.5 rounded-full" 
          style={{ width: `${completionRate}%` }}
        ></div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-gray-500">Total Tasks</span>
            <p className="font-medium text-gray-800">{totalTasks}</p>
          </div>
          <div className="text-right">
            <span className="text-gray-500">Today's Progress</span>
            <p className="font-medium text-gray-800">{completedTasks} of {totalTasks}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
