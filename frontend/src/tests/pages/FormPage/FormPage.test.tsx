// src/tests/pages/FormPage/FormPage.test.tsx

import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import FormPage from '../../../pages/FormPage/FormPage';

// Mock the API calls used in FormPage
vi.mock('../../../api/api', () => ({
  getTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

import { getTodos, createTodo, updateTodo, deleteTodo } from '../../../api/api';

describe('FormPage Component', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks(); // Clear all mocks after each test
  });

  it('renders the heading "Todo Management"', () => {
    render(<FormPage />);
    const headingElement = screen.getByRole('heading', { name: /todo management/i });
    expect(headingElement).toBeTruthy();
  });

  it('displays "Loading todos..." when loading', () => {
    render(<FormPage />);
    const loadingText = screen.getByText(/loading todos.../i);
    expect(loadingText).toBeTruthy();
  });

  it('renders todos fetched from the API', async () => {
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([{ id: 1, title: 'Test Todo' }]);

    render(<FormPage />);
    expect(await screen.findByText(/test todo/i)).toBeTruthy();
  });

  it('handles adding a new todo', async () => {
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]); // Initial fetch returns no todos
    (createTodo as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ id: 2, title: 'New Todo' });
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([{ id: 2, title: 'New Todo' }]); // After adding, fetch returns the new todo

    render(<FormPage />);
    const inputField = screen.getByPlaceholderText(/title/i);
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(inputField, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    expect(await screen.findByText(/new todo/i)).toBeTruthy();
  });

  it('handles deleting a todo', async () => {
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([{ id: 1, title: 'Test Todo' }]); // Initial fetch
    (deleteTodo as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ message: 'Deleted' });
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]); // After delete, fetch returns no todos

    render(<FormPage />);
    const deleteButton = await screen.findByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith(1);
    expect(await screen.findByText(/no todos available/i)).toBeTruthy();
  });

  it('displays an error message when API call fails', async () => {
    (getTodos as ReturnType<typeof vi.fn>).mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch todos')));

    render(<FormPage />);
    expect(await screen.findByText(/failed to load todos\. please try again later\./i)).toBeTruthy();
  });

  it('handles editing a todo', async () => {
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([{ id: 1, title: 'Editable Todo' }]);
    (updateTodo as ReturnType<typeof vi.fn>).mockResolvedValueOnce({ id: 1, title: 'Updated Todo' });
    (getTodos as ReturnType<typeof vi.fn>).mockResolvedValueOnce([{ id: 1, title: 'Updated Todo' }]); // After update, fetch returns updated todo

    render(<FormPage />);
    const editButton = await screen.findByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const inputField = screen.getByDisplayValue(/editable todo/i);
    const updateButton = screen.getByRole('button', { name: /update todo/i });

    fireEvent.change(inputField, { target: { value: 'Updated Todo' } });
    fireEvent.click(updateButton);

    expect(await screen.findByText(/updated todo/i)).toBeTruthy();
  });

  it('matches the snapshot', () => {
    const { container } = render(<FormPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
