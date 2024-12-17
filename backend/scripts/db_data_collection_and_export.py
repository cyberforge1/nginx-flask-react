# scripts/db_data_collection_and_export.py

import os
import json
from sqlalchemy import create_engine, text, inspect
from dotenv import load_dotenv
from decimal import Decimal
from datetime import date

# Load environment variables from .env file
load_dotenv()

# Fetch environment variables
database_uri = os.getenv("SQLALCHEMY_DATABASE_URI")

# Custom JSON encoder to handle Decimal and date objects
class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        elif isinstance(obj, date):
            return obj.isoformat()  # Serialize date as ISO 8601 string
        return super().default(obj)

def collect_first_ten_records():
    """Collects the first 10 records from each table and saves to a JSON file."""
    try:
        # Create a SQLAlchemy engine
        engine = create_engine(database_uri)

        # Connect to the database
        with engine.connect() as connection:
            print("Database connection successful!")

            # Inspect the database to list all tables
            inspector = inspect(engine)
            tables = inspector.get_table_names()

            if not tables:
                print("No tables found in the database.")
                return

            results = {}

            # Query the first 10 records from each table
            for table in tables:
                print(f"Fetching first 10 records from table: {table}")
                query = text(f"SELECT * FROM {table} LIMIT 10;")
                result = connection.execute(query).fetchall()

                # Convert SQLAlchemy row objects to dictionaries
                results[table] = [dict(row._mapping) for row in result] if result else []

            # Save results to a JSON file
            output_file = os.path.join(os.path.dirname(__file__), "first_ten_records.json")
            with open(output_file, "w") as f:
                json.dump(results, f, indent=4, cls=CustomJSONEncoder)

            print(f"First 10 records successfully saved to {output_file}")

    except Exception as e:
        print("An error occurred while collecting records!")
        print(f"Error: {e}")

if __name__ == "__main__":
    collect_first_ten_records()
