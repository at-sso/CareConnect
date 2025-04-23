import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import {
  createAppointment,
  getAppointmentsByUserId,
} from "@/models/appointment";

export async function GET(request: Request) {
  try {
    // Verify authentication
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // Get appointments for the user
    const appointments = await getAppointmentsByUserId(decoded.id);

    return NextResponse.json({ appointments });
  } catch (error) {
    console.error("Error getting appointments:", error);
    return NextResponse.json(
      { error: "Error al obtener citas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Verify authentication
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    // Get request body
    const { especialidad, fecha, motivo } = await request.json();

    // Validate required fields
    if (!especialidad || !fecha || !motivo) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Create appointment
    const appointmentId = await createAppointment(
      decoded.id,
      especialidad,
      fecha,
      motivo
    );

    if (!appointmentId) {
      return NextResponse.json(
        { error: "Error al crear la cita" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cita creada exitosamente",
      appointmentId,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Error al crear la cita" },
      { status: 500 }
    );
  }
}
