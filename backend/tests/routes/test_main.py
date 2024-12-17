# tests/routes/test_main.py

def test_main(client):
    """Test the /api/ endpoint."""
    response = client.get('/api/')
    assert response.status_code == 200
    assert response.json == {"message": "Welcome to the Todo Management API!"}
