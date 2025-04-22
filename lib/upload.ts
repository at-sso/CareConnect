import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

// Define the upload directory
const UPLOAD_DIR = path.join(process.cwd(), "uploads");

// Ensure the upload directory exists
export function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

// Create a user directory
export function createUserDir(userId: string) {
  const userDir = path.join(UPLOAD_DIR, userId);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  return userDir;
}

// Save a file to the user's directory
export async function saveFile(
  userId: string,
  file: File,
  fileType: string
): Promise<string> {
  ensureUploadDir();
  const userDir = createUserDir(userId);

  // Generate a unique filename
  const fileExt = file.name.split(".").pop() || "unknown";
  const fileName = `${fileType}_${uuidv4()}.${fileExt}`;
  const filePath = path.join(userDir, fileName);

  // Convert file to buffer and save it
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return filePath;
}

// Get all files for a user
export function getUserFiles(userId: string): string[] {
  const userDir = path.join(UPLOAD_DIR, userId);
  if (!fs.existsSync(userDir)) {
    return [];
  }

  return fs.readdirSync(userDir);
}

// Delete a file
export function deleteFile(filePath: string): boolean {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    return true;
  }
  return false;
}
