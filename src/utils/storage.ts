import { Todo } from '../types/todo';

export const saveTodos = (todos: Todo[]): void => {
  const todosJson = JSON.stringify(todos.map(todo => ({
    ...todo,
    createdAt: todo.createdAt.toISOString()
  })));
  localStorage.setItem('todos', todosJson);
};

export const loadTodos = (): Todo[] => {
  const todosJson = localStorage.getItem('todos');
  if (!todosJson) return [];
  
  try {
    const parsedTodos = JSON.parse(todosJson);
    return parsedTodos.map((todo: any) => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }));
  } catch (error) {
    console.error('Failed to parse todos from localStorage:', error);
    return [];
  }
};
