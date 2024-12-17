// src/types/types.ts

export interface Todo {
    id: number; // Unique identifier for the todo item
    title: string; // Title of the todo
  }
  
  export interface TodoCreation {
    title: string; // Title of the todo to be created
  }
  
  export interface TodoUpdate {
    title?: string; // Optional title for updating a todo
  }
  
  export interface ApiResponse {
    message: string; // General response message
    error?: string; // Optional error message
  }
  
  export interface TodoListResponse extends ApiResponse {
    todos: Todo[]; // List of todos in the response
  }
  
  export interface TodoResponse extends ApiResponse {
    todo?: Todo; // Single todo item in the response
  }
  