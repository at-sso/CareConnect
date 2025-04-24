/**
 * Login API Route
 *
 * This API endpoint handles user authentication:
 * 1. Validates user credentials (cedula and password)
 * 2. Generates a JWT token upon successful authentication
 * 3. Sets the token in an HTTP-only cookie
 * 4. Returns user information (excluding sensitive data)
 */
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";
import type { JWTPayload, DatabaseResult } from "@/types";

// Get JWT secret from environment variables or use a default (for development only)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

/**
 * POST handler for login requests
 * @param {Request} request - The incoming request object
 * @returns {Promise<NextResponse>} The response with user data or error
 */
export async function POST(request: Request) {
  try {
    // Extract credentials from request body
    const { cedula, password } = await request.json();

    // Validate required fields
    if (!cedula || !password) {
      return NextResponse.json(
        { error: "Cédula y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // Find user by cedula
    const users = await query("SELECT * FROM users WHERE cedula = ?", [cedula]);

    // Check if user exists
    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const user = users[0] as DatabaseResult;

    // Compare provided password with stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // Create JWT payload with user information (excluding sensitive data)
    const payload: JWTPayload = {
      id: user.id,
      cedula: user.cedula,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
    };

    // Sign JWT token with secret and expiration
    const token = sign(payload, JWT_SECRET, { expiresIn: "1d" });

    // Set JWT token in HTTP-only cookie
    (await cookies()).set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
    });

    // Return success response with user data (excluding password)
    return NextResponse.json(
      {
        message: "Login exitoso",
        user: {
          id: user.id,
          cedula: user.cedula,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    // Log error and return generic error message
    console.error("Error logging in:", error);
    return NextResponse.json(
      { error: "Error al iniciar sesión" },
      { status: 500 }
    );
  }
}
