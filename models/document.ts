/**
 * Document Model
 *
 * This module provides:
 * 1. Type definition for documents
 * 2. Database table creation
 * 3. CRUD operations for documents
 */
import { query } from "@/lib/db";

/**
 * Document interface defining the structure of document data
 */
export interface Document {
  id: number;
  user_id: number;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  mime_type: string;
  created_at: Date;
}

/**
 * Create the documents table if it doesn't exist
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function createDocumentsTable(): Promise<boolean> {
  try {
    await query(`
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
      )
    `);
    console.log("Documents table created or already exists");
    return true;
  } catch (error) {
    console.error("Error creating documents table:", error);
    return false;
  }
}

/**
 * Save a document to the database
 * @param {number} userId - User ID
 * @param {string} fileName - Original file name
 * @param {string} filePath - Path where file is stored
 * @param {string} fileType - Type of document (e.g., "cedula", "historial")
 * @param {number} fileSize - Size of file in bytes
 * @param {string} mimeType - MIME type of file
 * @returns {Promise<number | null>} The new document ID or null if failed
 */
export async function saveDocument(
  userId: number,
  fileName: string,
  filePath: string,
  fileType: string,
  fileSize: number,
  mimeType: string
): Promise<number | null> {
  try {
    const result = await query(
      `INSERT INTO documents (user_id, file_name, file_path, file_type, file_size, mime_type)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, fileName, filePath, fileType, fileSize, mimeType]
    );

    if (Array.isArray(result) || !result.insertId) {
      return null;
    }

    return result.insertId as number;
  } catch (error) {
    console.error("Error saving document:", error);
    return null;
  }
}

/**
 * Get all documents for a user
 * @param {number} userId - User ID
 * @returns {Promise<Document[]>} Array of documents
 */
export async function getDocumentsByUserId(
  userId: number
): Promise<Document[]> {
  try {
    const documents = await query(
      `SELECT * FROM documents WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    if (!Array.isArray(documents)) {
      return [];
    }

    return documents as Document[];
  } catch (error) {
    console.error("Error getting documents:", error);
    return [];
  }
}

/**
 * Get a specific document by ID
 * @param {number} id - Document ID
 * @returns {Promise<Document | null>} The document or null if not found
 */
export async function getDocumentById(id: number): Promise<Document | null> {
  try {
    const documents = await query(`SELECT * FROM documents WHERE id = ?`, [id]);

    if (!Array.isArray(documents) || documents.length === 0) {
      return null;
    }

    return documents[0] as Document;
  } catch (error) {
    console.error("Error getting document:", error);
    return null;
  }
}

/**
 * Delete a document by ID
 * @param {number} id - Document ID
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function deleteDocument(id: number): Promise<boolean> {
  try {
    const result = await query(`DELETE FROM documents WHERE id = ?`, [id]);

    return true;
  } catch (error) {
    console.error("Error deleting document:", error);
    return false;
  }
}
