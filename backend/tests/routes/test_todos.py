# tests/routes/test_todos.py

import pytest

def test_get_todos(client):
    """Test GET /api/todos/ endpoint."""
    response = client.get('/api/todos/')
    assert response.status_code == 200
    assert isinstance(response.json, list)

def test_create_todo_success(client):
    """Test POST /api/todos/ endpoint with valid data."""
    response = client.post('/api/todos/', json={"title": "New Todo"})
    assert response.status_code == 201
    assert response.json["message"] == "Todo created"
    assert "id" in response.json["todo"]
    assert response.json["todo"]["title"] == "New Todo"

def test_get_single_todo_success(client):
    """Test GET /api/todos/<id>/ endpoint with valid ID."""
    # First create a todo
    create_response = client.post('/api/todos/', json={"title": "Sample Todo"})
    todo_id = create_response.json["todo"]["id"]

    # Then fetch the created todo
    response = client.get(f'/api/todos/{todo_id}/')
    assert response.status_code == 200
    assert response.json["id"] == todo_id
    assert response.json["title"] == "Sample Todo"

def test_get_single_todo_not_found(client):
    """Test GET /api/todos/<id>/ endpoint with invalid ID."""
    response = client.get('/api/todos/99999/')
    assert response.status_code == 404
    assert response.json == {"error": "Todo not found"}

def test_update_todo_success(client):
    """Test PUT /api/todos/<id>/ endpoint with valid data."""
    # First create a todo
    create_response = client.post('/api/todos/', json={"title": "Old Todo"})
    todo_id = create_response.json["todo"]["id"]

    # Then update the todo
    response = client.put(f'/api/todos/{todo_id}/', json={"title": "Updated Todo"})
    assert response.status_code == 200
    assert response.json["message"] == "Todo updated"
    assert response.json["todo"]["title"] == "Updated Todo"

def test_update_todo_not_found(client):
    """Test PUT /api/todos/<id>/ endpoint with invalid ID."""
    response = client.put('/api/todos/99999/', json={"title": "Updated Todo"})
    assert response.status_code == 404
    assert response.json == {"error": "Todo not found"}

def test_delete_todo_success(client):
    """Test DELETE /api/todos/<id>/ endpoint with valid ID."""
    # First create a todo
    create_response = client.post('/api/todos/', json={"title": "Sample Todo"})
    todo_id = create_response.json["todo"]["id"]

    # Then delete the todo
    response = client.delete(f'/api/todos/{todo_id}/')
    assert response.status_code == 200
    assert response.json["message"] == "Todo deleted"

def test_delete_todo_not_found(client):
    """Test DELETE /api/todos/<id>/ endpoint with invalid ID."""
    response = client.delete('/api/todos/99999/')
    assert response.status_code == 404
    assert response.json == {"error": "Todo not found"}
