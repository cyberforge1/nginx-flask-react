# backend/wsgi.py

from dotenv import load_dotenv
import os

# Specify the path to the .env file
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

# Debugging: Print SQLALCHEMY_DATABASE_URI to ensure it's loaded
print("DEBUG (wsgi.py): SQLALCHEMY_DATABASE_URI loaded:", os.getenv("SQLALCHEMY_DATABASE_URI"))

from app import create_app

# Create the Flask application
application = create_app()
