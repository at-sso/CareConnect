-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS care_connect;
USE care_connect;
-- Create users table based on the schema diagram
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  fecha_de_nacimiento DATE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  reset_token VARCHAR(255) NULL,
  reset_expires DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(20) NOT NULL,
  doctor VARCHAR(100),
  reason TEXT NOT NULL,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  tracking_number VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Insert a test user
INSERT INTO users (
    cedula,
    password,
    nombre,
    apellido,
    fecha_de_nacimiento,
    email
  )
VALUES (
    '123456789',
    '$2b$10$6jXzJPHLKNq/VSfJ/kA3xOqEwxwVnhbxNZ.uXk5.LS8vz/HLc4W4e',
    'John',
    'Doe',
    '1990-01-01',
    'john@example.com'
  );
-- Note: The password hash above is for 'password123'