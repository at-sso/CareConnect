/**
 * JWT Authentication Utilities
 *
 * This module provides functions for:
 * 1. Verifying JWT tokens
 * 2. Extracting user information from tokens
 */
import { verify } from "jsonwebtoken";
import type { JWTPayload } from "@/types";

// Get JWT secret from environment variables or use a default (for development only)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * Verify a JWT token and extract the payload
 * @param {string} token - The JWT token to verify
 * @returns {JWTPayload | null} The decoded payload or null if invalid
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    // Verify the token signature and expiration
    return verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    console.error("Token verification error:", error);
    return null;
  }
}
