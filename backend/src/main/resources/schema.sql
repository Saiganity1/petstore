-- Create pets table if it doesn't exist
CREATE TABLE IF NOT EXISTS pets (
    id BIGSERIAL PRIMARY KEY,
    age INTEGER,
    description VARCHAR(255),
    image_url VARCHAR(255),
    name VARCHAR(255),
    price NUMERIC(38, 2),
    species VARCHAR(255)
);
