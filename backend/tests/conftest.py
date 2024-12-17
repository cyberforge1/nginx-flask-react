# tests/conftest.py

import pytest
from app import create_app, db

@pytest.fixture
def app():
    """Flask application for testing."""
    app = create_app(config_class="app.config.TestingConfig")
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    """Flask test client."""
    return app.test_client()
