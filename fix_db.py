#!/usr/bin/env python3
"""
Quick script to verify and fix database setup
"""
import psycopg2

# First, connect to petstore database and check/create table
try:
    print("Connecting to petstore database...")
    conn = psycopg2.connect(
        host='localhost',
        port=5432,
        database='petstore',
        user='petstore_user',
        password='petstore_pass'
    )
    cursor = conn.cursor()
    
    # Create table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pets (
        id BIGSERIAL PRIMARY KEY,
        age INTEGER,
        description VARCHAR(255),
        image_url VARCHAR(255),
        name VARCHAR(255),
        price NUMERIC(38, 2),
        species VARCHAR(255)
    );
    """)
    
    # Insert sample data
    cursor.execute("""
    INSERT INTO pets (name, species, age, description, image_url, price) 
    VALUES 
      ('Buddy', 'Dog', 3, 'Friendly golden retriever.', 'https://placedog.net/400/300?id=1', 199.99),
      ('Mittens', 'Cat', 2, 'Curious tabby cat.', 'https://placekitten.com/400/300', 149.99),
      ('Polly', 'Bird', 1, 'Colorful parrot.', 'https://loremflickr.com/400/300/parrot', 89.99)
    ON CONFLICT DO NOTHING;
    """)
    
    conn.commit()
    
    # Verify data
    cursor.execute("SELECT COUNT(*) FROM pets;")
    count = cursor.fetchone()[0]
    print(f"✓ Table created successfully!")
    print(f"✓ {count} pets in database")
    
    cursor.close()
    conn.close()
    print("✓ All set! Refresh your browser now.")
    
except Exception as e:
    print(f"✗ Error: {e}")
