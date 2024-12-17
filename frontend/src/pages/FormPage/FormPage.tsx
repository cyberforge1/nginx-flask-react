// src/pages/FormPage/FormPage.tsx

import React, { useState, useEffect } from 'react';
import TodoForm from '../TodoForm/TodoForm';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api/api';
import { Todo } from '../../types/types';

const FormPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getTodos();
      setTodos(data || []);
      setError(null);
    } catch {
      setError('Failed to load todos. Please try again later.');
      setTodos([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      await createTodo({ title });
      loadTodos();
    } catch {
      setError('Failed to add todo. Please try again.');
    }
  };

  const handleUpdateTodo = async (id: number, title: string) => {
    try {
      await updateTodo(id, { title });
      loadTodos();
      setIsEditing(null);
    } catch {
      setError('Failed to update todo. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch {
      setError('Failed to delete todo. Please try again.');
    }
  };

  return (
    <div data-testid="form-page">
      <h1>Todo Management</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TodoForm onSubmit={handleAddTodo} buttonText="Add Todo" />
      {isLoading ? (
        <p>Loading todos...</p>
      ) : (
        <ul>
          {todos.length > 0 ? (
            todos
              .slice() // Create a shallow copy to avoid mutating the original array
              .reverse() // Reverse the order of todos
              .map((todo) => (
                <li key={todo.id}>
                  {isEditing === todo.id ? (
                    <TodoForm
                      onSubmit={(title) => handleUpdateTodo(todo.id, title)}
                      initialTitle={todo.title}
                      buttonText="Update Todo"
                    />
                  ) : (
                    <>
                      <h3>{todo.title}</h3>
                      <button onClick={() => setIsEditing(todo.id)}>Edit</button>
                      <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </>
                  )}
                </li>
              ))
          ) : (
            <p>No todos available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default FormPage;
