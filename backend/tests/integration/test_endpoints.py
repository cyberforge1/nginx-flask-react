# tests/integration/test_endpoints.py

def test_todo_workflow(client):
    """Test the full Todo workflow."""
    # Step 1: Create a new todo
    response = client.post('/api/todos/', json={"title": "Integration Test Todo"})  # Added trailing slash
    assert response.status_code == 201
    todo_id = response.json["todo"]["id"]

    # Step 2: Retrieve the created todo
    response = client.get(f'/api/todos/{todo_id}/')  # Added trailing slash
    assert response.status_code == 200
    assert response.json["title"] == "Integration Test Todo"

    # Step 3: Update the todo
    response = client.put(f'/api/todos/{todo_id}/', json={"title": "Updated Todo"})  # Added trailing slash
    assert response.status_code == 200
    assert response.json["todo"]["title"] == "Updated Todo"

    # Step 4: Delete the todo
    response = client.delete(f'/api/todos/{todo_id}/')  # Added trailing slash
    assert response.status_code == 200
    assert response.json["message"] == "Todo deleted"
