# tests/config/test_config.py

import pytest
from app.config import Config

def test_config_class():
    """Test that the Config class loads necessary attributes."""
    config = Config()
    assert hasattr(config, "SECRET_KEY")
    assert hasattr(config, "SQLALCHEMY_DATABASE_URI")
    assert hasattr(config, "SQLALCHEMY_TRACK_MODIFICATIONS")
