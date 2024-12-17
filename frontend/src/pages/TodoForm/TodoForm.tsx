// src/pages/TodoForm/TodoForm.tsx

import React, { useState } from 'react';

interface TodoFormProps {
  onSubmit: (title: string) => Promise<void> | void;
  initialTitle?: string;
  buttonText: string;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialTitle = '', buttonText }) => {
  const [title, setTitle] = useState(initialTitle);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    try {
      setError(null);
      await onSubmit(title.trim());
      setTitle('');
    } catch {
      setError('Failed to submit. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="todo-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default TodoForm;
