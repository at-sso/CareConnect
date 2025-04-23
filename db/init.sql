-- Database Initialization Script
--
-- This script:
-- 1. Creates the database if it doesn't exist
-- 2. Creates tables for users, documents, and appointments
-- 3. Inserts a test user for development
-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS care_connect;
USE care_connect;
-- Create users table based on the schema diagram
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cedula VARCHAR(20) UNIQUE NOT NULL,
  -- National ID (unique identifier)
  password VARCHAR(255) NOT NULL,
  -- Hashed password
  nombre VARCHAR(100) NOT NULL,
  -- First name
  apellido VARCHAR(100) NOT NULL,
  -- Last name
  fecha_de_nacimiento DATE NOT NULL,
  -- Date of birth
  email VARCHAR(100) UNIQUE NOT NULL,
  -- Email address (unique)
  reset_token VARCHAR(255) NULL,
  -- Password reset token
  reset_expires DATETIME NULL,
  -- Password reset token expiration
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Record creation timestamp
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record update timestamp
);
-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  -- Foreign key to users table
  file_name VARCHAR(255) NOT NULL,
  -- Original file name
  file_path VARCHAR(255) NOT NULL,
  -- Path where file is stored
  file_type VARCHAR(50) NOT NULL,
  -- Type of document (e.g., "cedula", "historial")
  file_size INT NOT NULL,
  -- Size of file in bytes
  mime_type VARCHAR(100) NOT NULL,
  -- MIME type of file
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Record creation timestamp
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Delete documents when user is deleted
);
-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  -- Foreign key to users table
  specialty VARCHAR(100) NOT NULL,
  -- Medical specialty
  date DATE NOT NULL,
  -- Appointment date
  time VARCHAR(20) NOT NULL,
  -- Appointment time
  doctor VARCHAR(100),
  -- Doctor name
  reason TEXT NOT NULL,
  -- Reason for appointment
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  -- Appointment status
  tracking_number VARCHAR(20) NOT NULL,
  -- Unique tracking number
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  -- Record creation timestamp
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE -- Delete appointments when user is deleted
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