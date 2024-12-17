// src/api/api.ts

import axios, { AxiosResponse } from 'axios';
import { Todo, TodoCreation, TodoUpdate, ApiResponse } from '../types/types';

const API_BASE_URL = 'http://localhost:5001/api'; // Flask API base URL

// Get the main welcome message
export const getMainMessage = async (): Promise<string> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URL}/`);
    return response.data.message;
  } catch (error) {
    console.error('Error fetching Main message:', error);
    throw error;
  }
};

// Get Hello World message
export const getHelloWorld = async (): Promise<string> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(`${API_BASE_URL}/helloworld/`);
    return response.data.message;
  } catch (error) {
    console.error('Error fetching Hello World message:', error);
    throw error;
  }
};

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const response: AxiosResponse<Todo[]> = await axios.get(`${API_BASE_URL}/todos/`);
    console.log('Fetched todos:', response.data); // Debugging log
    return response.data; // Directly return the array of todos
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// Get a single todo by ID
export const getTodoById = async (id: number): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.get(`${API_BASE_URL}/todos/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching todo with ID ${id}:`, error);
    throw error;
  }
};

// Create a new todo
export const createTodo = async (todo: TodoCreation): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.post(`${API_BASE_URL}/todos/`, todo);
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Update an existing todo
export const updateTodo = async (id: number, todoUpdate: TodoUpdate): Promise<Todo> => {
  try {
    const response: AxiosResponse<Todo> = await axios.put(`${API_BASE_URL}/todos/${id}/`, todoUpdate);
    return response.data;
  } catch (error) {
    console.error(`Error updating todo with ID ${id}:`, error);
    throw error;
  }
};

// Delete a todo
export const deleteTodo = async (id: number): Promise<ApiResponse> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.delete(`${API_BASE_URL}/todos/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting todo with ID ${id}:`, error);
    throw error;
  }
};
