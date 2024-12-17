# tests/routes/test_helloworld.py

def test_helloworld(client):
    """Test the /api/helloworld/ endpoint."""
    response = client.get('/api/helloworld/')
    assert response.status_code == 200
    assert response.json == {"message": "Hello, World!"}
