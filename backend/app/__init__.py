# app/__init__.py

from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restx import Api
from .config import Config

db = SQLAlchemy()
migrate = Migrate()

def create_app(config_class=Config):
    """Application factory for creating Flask app instances."""
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Validate configuration
    if hasattr(config_class, "validate"):
        config_class.validate()

    print("DEBUG (create_app): SQLALCHEMY_DATABASE_URI in config:", app.config.get("SQLALCHEMY_DATABASE_URI"))

    # Enable Cross-Origin Resource Sharing (CORS)
    CORS(app)

    # Initialize database
    db.init_app(app)

    # Import models here to ensure they're registered with SQLAlchemy before initializing migrations
    from .models import Todo  # Import all models here

    # Initialize migrations after models are imported
    migrate.init_app(app, db)

    # Initialize Flask-RESTx API
    api = Api(
        app,
        version='1.0',
        title='Todo Management API',
        description='API documentation for Todo Management System',
        doc='/api/docs',  # Swagger UI available at /api/docs
        strict_slashes=False  # Disable strict slash enforcement globally
    )

    # Import and register namespaces
    from .routes.main import main_bp
    from .routes.helloworld import helloworld_bp
    from .routes.todos import todos_bp

    # Register namespaces with specific paths
    api.add_namespace(main_bp, path='/api')  # Main route
    api.add_namespace(helloworld_bp, path='/api/helloworld')  # Hello World route
    api.add_namespace(todos_bp, path='/api/todos')  # Todos routes

    return app
