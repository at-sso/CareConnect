/**
 * Utility Functions
 *
 * This module provides general utility functions used throughout the application:
 * 1. Class name merging with Tailwind
 * 2. Date formatting
 * 3. Random token generation
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS classes
 * @param {...ClassValue[]} inputs - Class names to merge
 * @returns {string} Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to YYYY-MM-DD
 * @param {Date | string} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toISOString().split("T")[0];
}

/**
 * Generate a random string for tokens
 * @param {number} length - Length of the token
 * @returns {string} Random token string
 */
export function generateToken(length = 32): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
