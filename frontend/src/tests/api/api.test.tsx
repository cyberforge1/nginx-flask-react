// src/tests/api/api.test.tsx

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import {
  getMainMessage,
  getHelloWorld,
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../../api/api';
import { ApiResponse, Todo } from '../../types/types';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios, true);

describe('API Functions', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches the main message', async () => {
    const mockResponse: ApiResponse = { message: 'Welcome to the API' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const message = await getMainMessage();
    expect(message).toBe('Welcome to the API');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5001/api/');
  });

  it('fetches the hello world message', async () => {
    const mockResponse: ApiResponse = { message: 'Hello, World!' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockResponse });

    const message = await getHelloWorld();
    expect(message).toBe('Hello, World!');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5001/api/helloworld/');
  });

  it('fetches all todos', async () => {
    const mockTodos: Todo[] = [{ id: 1, title: 'Test Todo' }];
    mockedAxios.get.mockResolvedValueOnce({ data: mockTodos });

    const todos = await getTodos();
    expect(todos).toEqual(mockTodos);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5001/api/todos/');
  });

  it('fetches a single todo by ID', async () => {
    const mockTodo: Todo = { id: 1, title: 'Test Todo' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockTodo });

    const todo = await getTodoById(1);
    expect(todo).toEqual(mockTodo);
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5001/api/todos/1/');
  });

  it('creates a new todo', async () => {
    const mockTodo: Todo = { id: 2, title: 'New Todo' };
    mockedAxios.post.mockResolvedValueOnce({ data: mockTodo });

    const todo = await createTodo({ title: 'New Todo' });
    expect(todo).toEqual(mockTodo);
    expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:5001/api/todos/', { title: 'New Todo' });
  });

  it('updates an existing todo', async () => {
    const mockTodo: Todo = { id: 1, title: 'Updated Todo' };
    mockedAxios.put.mockResolvedValueOnce({ data: mockTodo });

    const todo = await updateTodo(1, { title: 'Updated Todo' });
    expect(todo).toEqual(mockTodo);
    expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:5001/api/todos/1/', { title: 'Updated Todo' });
  });

  it('deletes a todo', async () => {
    const mockResponse: ApiResponse = { message: 'Deleted' };
    mockedAxios.delete.mockResolvedValueOnce({ data: mockResponse });

    const response = await deleteTodo(1);
    expect(response).toEqual(mockResponse);
    expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:5001/api/todos/1/');
  });

  it('handles errors gracefully', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    await expect(getMainMessage()).rejects.toThrow('Network Error');
    expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:5001/api/');
  });
});
