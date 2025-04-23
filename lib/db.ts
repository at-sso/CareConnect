/**
 * Database Connection Module
 *
 * This module provides utilities for:
 * 1. Connecting to the MariaDB/MySQL database
 * 2. Executing SQL queries with parameterized statements
 * 3. Testing database connection with retry logic
 */
import mysql from "mysql2/promise";
import type { QueryResult } from "@/types";

// Database connection configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER || "care_connect_user",
  password: process.env.DB_PASSWORD || "Admin123",
  database: process.env.DB_NAME || "care_connect",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10 seconds
};

// Create a connection pool for better performance
const pool = mysql.createPool(dbConfig);

/**
 * Execute a SQL query with optional parameters
 * @param {string} sql - The SQL query to execute
 * @param {unknown[]} params - The parameters to bind to the query
 * @returns {Promise<QueryResult>} The query results
 * @throws {Error} If the query fails
 */
export async function query(
  sql: string,
  params: unknown[] = []
): Promise<QueryResult> {
  try {
    // Execute the query with parameters to prevent SQL injection
    const [results] = await pool.execute(sql, params);
    return results as QueryResult;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Test database connection with retry logic
 * @param {number} retries - Number of connection attempts
 * @param {number} delay - Delay between retries in milliseconds
 * @returns {Promise<boolean>} True if connection successful, false otherwise
 */
export async function testConnection(
  retries: number = 5,
  delay: number = 2000
): Promise<boolean> {
  let currentTry = 0;

  while (currentTry < retries) {
    try {
      // Attempt to get a connection from the pool
      const connection = await pool.getConnection();
      console.log("Database connection successful");
      connection.release();
      return true;
    } catch (error) {
      currentTry++;
      console.error(
        `Database connection failed (attempt ${currentTry}/${retries}):`,
        error
      );

      if (currentTry >= retries) {
        console.error(
          "Maximum connection attempts reached. Could not connect to database."
        );
        return false;
      }

      // Wait before retrying
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  return false;
}
