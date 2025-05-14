CREATE TABLE users (
           id SERIAL PRIMARY KEY,
           name VARCHAR(255) NOT NULL,
           email VARCHAR(255) NOT NULL UNIQUE,
           password_hash VARCHAR(255) NOT NULL,
           role VARCHAR(50) NOT NULL CHECK (role IN ('buyer', 'seller')),
           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       );