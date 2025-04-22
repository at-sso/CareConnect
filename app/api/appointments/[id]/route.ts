import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import {
  getAppointmentById,
  updateAppointmentStatus,
} from "@/models/appointment";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const token = cookies().get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }

    const id = Number.parseInt(params.id);

    // Get appointment to verify ownership
    const appointment = await getAppointmentById(id);

    if (!appointment) {
      return NextResponse.json(
        { error: "Cita no encontrada" },
        { status: 404 }
      );
    }

    if (appointment.user_id !== decoded.id) {
      return NextResponse.json({ error: "No autorizado" }, { status: 403 });
    }

    // Get request body
    const { status } = await request.json();

    // Validate status
    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Estado inválido" }, { status: 400 });
    }

    // Update appointment status
    const success = await updateAppointmentStatus(
      id,
      status as "pending" | "confirmed" | "cancelled"
    );

    if (!success) {
      return NextResponse.json(
        { error: "Error al actualizar la cita" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Estado de cita actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Error al actualizar la cita" },
      { status: 500 }
    );
  }
}
