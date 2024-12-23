# Commands

# VENV

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

pip freeze > requirements.txt


# Run App

python3 run.py

# Documentation

{base_url}/api/docs


# Scripts

python scripts/test_env_vars.py

python scripts/db_connection_check.py

python scripts/db_data_collection_and_export.py

python scripts/manual_endpoint_test.py


# Testing

pytest

pytest tests/routes

pytest tests/routes/test_todos.py

pytest --cov=app tests/

pytest --cov=app --cov-report=html tests/


# Migrations


flask db upgrade

flask db history

flask db stamp head
