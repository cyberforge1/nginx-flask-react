# app/config.py

import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default-secret-key')
    DEBUG = os.getenv('DEBUG', 'True') == 'True'
    SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    @classmethod
    def validate(cls):
        print("DEBUG (Config): SQLALCHEMY_DATABASE_URI loaded:", cls.SQLALCHEMY_DATABASE_URI)
        if not cls.SQLALCHEMY_DATABASE_URI:
            raise ValueError(
                "SQLALCHEMY_DATABASE_URI is not set. Ensure it's defined in the .env file "
                "or as an environment variable. Check the .env file's location and syntax."
            )

class TestingConfig(Config):
    """Configuration for testing."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"  # Use in-memory SQLite database
    SQLALCHEMY_TRACK_MODIFICATIONS = False
