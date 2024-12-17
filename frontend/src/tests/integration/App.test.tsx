// src/tests/integration/App.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import * as api from '../../api/api';
import App from '../../App';

// Mock API calls
vi.mock('../../api/api', () => ({
  getMainMessage: vi.fn(),
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

describe('App Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('navigates between pages and fetches data', async () => {
    (api.getMainMessage as ReturnType<typeof vi.fn>).mockResolvedValueOnce('Welcome to the app!');
    (api.getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { id: 1, title: 'Test Todo' },
    ]);

    render(<App />);

    // Verify StaticPage content
    expect(await screen.findByText('Welcome to the app!')).toBeTruthy();

    // Locate and click the "Go to Form" button
    const goToFormButton = await screen.findByRole('button', { name: /go to form/i });
    fireEvent.click(goToFormButton);

    // Verify FormPage content
    expect(await screen.findByText(/loading todos\.\.\./i)).toBeTruthy();
    expect(await screen.findByText('Test Todo')).toBeTruthy();
  });

  // it('adds a new todo and displays it', async () => {
  //   (api.getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]); // Initial fetch: no todos
  //   (api.createTodo as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
  //     id: 2,
  //     title: 'New Todo',
  //   });
  //   (api.getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
  //     { id: 2, title: 'New Todo' },
  //   ]); // After creation

  //   render(<App />);

  //   // Locate and click the "Go to Form" button
  //   const goToFormButton = await screen.findByRole('button', { name: /go to form/i });
  //   fireEvent.click(goToFormButton);

  //   // Add a new todo
  //   const inputField = screen.getByPlaceholderText(/title/i);
  //   const addButton = screen.getByRole('button', { name: /add todo/i });

  //   fireEvent.change(inputField, { target: { value: 'New Todo' } });
  //   fireEvent.click(addButton);

  //   // Verify the new todo is displayed
  //   expect(await screen.findByText('New Todo')).toBeTruthy();
  // });

  // it('handles error scenarios gracefully', async () => {
  //   (api.getTodos as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
  //     new Error('Failed to fetch todos')
  //   );

  //   render(<App />);

  //   // Locate and click the "Go to Form" button
  //   const goToFormButton = await screen.findByRole('button', { name: /go to form/i });
  //   fireEvent.click(goToFormButton);

  //   // Verify error message is displayed
  //   expect(await screen.findByText(/failed to load todos\. please try again later\./i)).toBeTruthy();
  // });
});
