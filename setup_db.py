#!/usr/bin/env python3
"""
Setup script to create the pets table in PostgreSQL
Run this to initialize the database: python setup_db.py
"""
import psycopg2
import sys

# Database connection details
DB_HOST = 'localhost'
DB_PORT = 5432
DB_NAME = 'petstore'
DB_USER = 'petstore_user'
DB_PASSWORD = 'petstore_pass'

SQL_CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS pets (
    id BIGSERIAL PRIMARY KEY,
    age INTEGER,
    description VARCHAR(255),
    image_url VARCHAR(255),
    name VARCHAR(255),
    price NUMERIC(38, 2),
    species VARCHAR(255)
);

-- Insert sample data if table is empty
INSERT INTO pets (name, species, age, description, image_url, price) 
VALUES 
  ('Buddy', 'Dog', 3, 'Friendly golden retriever.', 'https://placedog.net/400/300?id=1', 199.99),
  ('Mittens', 'Cat', 2, 'Curious tabby cat.', 'https://placekitten.com/400/300', 149.99),
  ('Polly', 'Bird', 1, 'Colorful parrot.', 'https://loremflickr.com/400/300/parrot', 89.99)
ON CONFLICT DO NOTHING;
"""

try:
    # Connect to PostgreSQL
    print(f"Connecting to PostgreSQL at {DB_HOST}:{DB_PORT}/{DB_NAME}...")
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    cursor = conn.cursor()
    
    # Execute the SQL
    print("Creating pets table and inserting sample data...")
    cursor.execute(SQL_CREATE_TABLE)
    conn.commit()
    cursor.close()
    conn.close()
    
    print("✓ Database setup completed successfully!")
    print("✓ The 'pets' table has been created with 3 sample pets.")
    print("✓ Refresh http://localhost:5173 to see the pets in your app!")
    
except psycopg2.Error as e:
    print(f"✗ Database error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"✗ Error: {e}")
    sys.exit(1)
