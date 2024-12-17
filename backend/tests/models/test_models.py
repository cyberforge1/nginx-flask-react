# tests/models/test_models.py

from app.models import Todo

def test_todo_model_creation():
    """Test that a Todo model can be created with valid data."""
    todo = Todo(title="Test Todo")
    assert todo.title == "Test Todo"
