CREATE DATABASE IF NOT EXISTS downtown_donuts_data;

USE downtown_donuts_data;

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL UNIQUE,
    price DECIMAL(5,2) NOT NULL,
    product_type VARCHAR(32),
    product_description TEXT,
    product_image TEXT DEFAULT "../images/coming_soon.png",
    average_rating DECIMAL(3,2)
);

-- UNIMPLEMENTED: LOGIN SYSTEM
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    -- user_email VARCHAR(256) NOT NULL,
    join_date DATETIME DEFAULT CURRENT_TIMESTAMP
    -- password_hash VARCHAR(255) NOT NULL,
    -- password_salt VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT, 
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5), 
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    review_content VARCHAR(300),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS shop_reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    rating TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5), 
    review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    review_content VARCHAR(300),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

