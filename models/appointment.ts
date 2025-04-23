/**
 * Appointment Model
 *
 * This module provides:
 * 1. Type definition for appointments
 * 2. Database table creation
 * 3. CRUD operations for appointments
 */
import { query } from "@/lib/db";

/**
 * Appointment interface defining the structure of appointment data
 */
export interface Appointment {
  id: number;
  user_id: number;
  specialty: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
  status: "pending" | "confirmed" | "cancelled";
  tracking_number: string;
  created_at: Date;
}

/**
 * Create the appointments table if it doesn't exist
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function createAppointmentsTable() {
  try {
    await query(`
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
      )
    `);
    console.log("Appointments table created or already exists");
    return true;
  } catch (error) {
    console.error("Error creating appointments table:", error);
    return false;
  }
}

/**
 * Create a new appointment
 * @param {number} userId - User ID
 * @param {string} specialty - Medical specialty
 * @param {string} date - Appointment date
 * @param {string} reason - Reason for appointment
 * @returns {Promise<number | null>} The new appointment ID or null if failed
 */
export async function createAppointment(
  userId: number,
  specialty: string,
  date: string,
  reason: string
): Promise<number | null> {
  try {
    // Generate a random tracking number
    const trackingNumber = Math.floor(10000 + Math.random() * 90000).toString();

    // Assign a random time slot
    const timeSlots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ];
    const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];

    // Assign a random doctor based on specialty
    let doctor = "Dr. Asignado";
    switch (specialty) {
      case "Medicina General":
        doctor = "Dr. López";
        break;
      case "Fisiatría":
        doctor = "Dr. Martínez";
        break;
      case "Cardiología":
        doctor = "Dra. Rodríguez";
        break;
      case "Ortopedia":
        doctor = "Dr. Sánchez";
        break;
      case "Nutricionista":
        doctor = "Lic. Gómez";
        break;
      case "Psicología":
        doctor = "Lic. Pérez";
        break;
      case "Odontología":
        doctor = "Dra. Ramírez";
        break;
      case "Pediatría":
        doctor = "Dra. Torres";
        break;
    }

    // Insert the appointment into the database
    const result = await query(
      `INSERT INTO appointments (user_id, specialty, date, time, doctor, reason, tracking_number)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, specialty, date, randomTime, doctor, reason, trackingNumber]
    );

    if (Array.isArray(result) || !result.insertId) {
      return null;
    }

    return result.insertId as number;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
}

/**
 * Get all appointments for a user
 * @param {number} userId - User ID
 * @returns {Promise<Appointment[]>} Array of appointments
 */
export async function getAppointmentsByUserId(
  userId: number
): Promise<Appointment[]> {
  try {
    const appointments = await query(
      `SELECT * FROM appointments WHERE user_id = ? ORDER BY date DESC, time ASC`,
      [userId]
    );

    if (!Array.isArray(appointments)) {
      return [];
    }

    return appointments as Appointment[];
  } catch (error) {
    console.error("Error getting appointments:", error);
    return [];
  }
}

/**
 * Get a specific appointment by ID
 * @param {number} id - Appointment ID
 * @returns {Promise<Appointment | null>} The appointment or null if not found
 */
export async function getAppointmentById(
  id: number
): Promise<Appointment | null> {
  try {
    const appointments = await query(
      `SELECT * FROM appointments WHERE id = ?`,
      [id]
    );

    if (!Array.isArray(appointments) || appointments.length === 0) {
      return null;
    }

    return appointments[0] as Appointment;
  } catch (error) {
    console.error("Error getting appointment:", error);
    return null;
  }
}

/**
 * Update the status of an appointment
 * @param {number} id - Appointment ID
 * @param {string} status - New status (pending, confirmed, cancelled)
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function updateAppointmentStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled"
): Promise<boolean> {
  try {
    await query(`UPDATE appointments SET status = ? WHERE id = ?`, [
      status,
      id,
    ]);

    return true;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    return false;
  }
}
