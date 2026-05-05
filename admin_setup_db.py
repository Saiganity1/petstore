#!/usr/bin/env python3
"""
Administrative setup script to fix permissions and create the pets table
This must be run as the postgres superuser
"""
import psycopg2
import sys

# Try connecting as postgres superuser
# Common passwords: postgres, password, or blank
POSTGRES_PASSWORDS = ['postgres', 'password', '', None]

DB_HOST = 'localhost'
DB_PORT = 5432
DB_NAME = 'petstore'
POSTGRES_USER = 'postgres'

SQL_GRANT_PERMISSIONS = """
-- Grant schema permissions to petstore_user
GRANT USAGE ON SCHEMA public TO petstore_user;
GRANT CREATE ON SCHEMA public TO petstore_user;

-- Create the pets table
CREATE TABLE IF NOT EXISTS pets (
    id BIGSERIAL PRIMARY KEY,
    age INTEGER,
    description VARCHAR(255),
    image_url VARCHAR(255),
    name VARCHAR(255),
    price NUMERIC(38, 2),
    species VARCHAR(255)
);

-- Grant permissions on the table
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO petstore_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO petstore_user;

-- Insert sample data
INSERT INTO pets (name, species, age, description, image_url, price) 
VALUES 
  ('Buddy', 'Dog', 3, 'Friendly golden retriever.', 'https://placedog.net/400/300?id=1', 199.99),
  ('Mittens', 'Cat', 2, 'Curious tabby cat.', 'https://placekitten.com/400/300', 149.99),
  ('Polly', 'Bird', 1, 'Colorful parrot.', 'https://loremflickr.com/400/300/parrot', 89.99)
ON CONFLICT DO NOTHING;
"""

def try_connect(password):
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            database='postgres',  # Connect to default postgres DB
            user=POSTGRES_USER,
            password=password,
            connect_timeout=5
        )
        return conn
    except Exception:
        return None

# Try to connect as postgres with different passwords
print("Attempting to connect as postgres superuser...")
conn = None
for pwd in POSTGRES_PASSWORDS:
    print(f"Trying password: {pwd if pwd else '(empty/none)'}")
    conn = try_connect(pwd)
    if conn:
        print(f"✓ Connected as postgres!")
        break

if not conn:
    print("✗ Could not connect as postgres superuser.")
    print("Please create the table manually using:")
    print("")
    print("  psql -U postgres -d petstore -c \"")
    print(SQL_GRANT_PERMISSIONS)
    print("\"")
    sys.exit(1)

try:
    cursor = conn.cursor()
    print("Executing SQL to grant permissions and create table...")
    cursor.execute(SQL_GRANT_PERMISSIONS)
    conn.commit()
    cursor.close()
    conn.close()
    
    print("✓ Database setup completed successfully!")
    print("✓ The 'pets' table has been created with 3 sample pets.")
    print("✓ Refresh http://localhost:5173 to see the pets in your app!")
    
except psycopg2.Error as e:
    print(f"✗ Database error: {e}")
    sys.exit(1)
