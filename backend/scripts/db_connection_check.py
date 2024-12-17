# scripts/db_connection_check.py

import os
from sqlalchemy import create_engine, text, inspect
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Fetch environment variables
database_uri = os.getenv("SQLALCHEMY_DATABASE_URI")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")
db_host = os.getenv("DB_HOST")
db_port = os.getenv("DB_PORT")

def print_env_variables():
    print("Environment Variables:")
    print(f"SQLALCHEMY_DATABASE_URI: {database_uri}")
    print(f"DB_USER: {db_user}")
    print(f"DB_PASSWORD: {db_password}")
    print(f"DB_NAME: {db_name}")
    print(f"DB_HOST: {db_host}")
    print(f"DB_PORT: {db_port}")

def check_db_connection_and_tables():
    try:
        # Create a SQLAlchemy engine
        engine = create_engine(database_uri)
        
        # Connect to the database
        with engine.connect() as connection:
            print("Database connection successful!")

            # Get the current database name
            result = connection.execute(text("SELECT DATABASE();"))
            current_db = result.fetchone()[0]
            print(f"Connected to database: {current_db}")

            # Inspect the database to list all tables
            inspector = inspect(engine)
            tables = inspector.get_table_names()

            if not tables:
                print("No tables found in the database.")
                return

            print(f"Tables in the database: {', '.join(tables)}")
            
            # Query and print a result from each table
            for table in tables:
                print(f"\nFetching data from table: {table}")
                query = text(f"SELECT * FROM {table} LIMIT 1;")
                result = connection.execute(query).fetchall()
                if result:
                    print(f"Sample row from {table}: {result[0]}")
                else:
                    print(f"No data found in table: {table}")
    except Exception as e:
        print("Database connection failed!")
        print(f"Error: {e}")

if __name__ == "__main__":
    print_env_variables()
    check_db_connection_and_tables()
