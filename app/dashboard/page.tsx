"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  User,
} from "lucide-react";

interface Cita {
  id: string;
  seguimiento: string;
  fecha: string;
  servicio: string;
  horario: string;
  doctor: string;
  estado: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "appointment" | "document" | "payment" | "system";
}

export default function DashboardPage() {
  const router = useRouter();
  const [cliente, setCliente] = useState({
    nombre: "",
    cedula: "",
    fechaNacimiento: "",
    sexo: "",
    email: "",
  });
  const [citas, setCitas] = useState<Cita[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user/profile");

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/login");
            return;
          }
          throw new Error("Error al cargar datos del usuario");
        }

        const data = await response.json();

        // Update client data
        setCliente({
          nombre: `${data.user.nombre} ${data.user.apellido}`,
          cedula: data.user.cedula,
          fechaNacimiento: data.user.fecha_de_nacimiento,
          sexo: "No especificado", // This field is not in our current user model
          email: data.user.email,
        });

        // Fetch appointments and notifications
        await fetchAppointments(data.user.id);
        await fetchNotifications(data.user.id);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos del usuario",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();

    // Set up a polling interval for notifications
    const notificationInterval = setInterval(() => {
      if (cliente.cedula) {
        checkNewNotifications(cliente.cedula);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(notificationInterval);
  }, [router, cliente.cedula]);

  // Count unread notifications
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications]);

  const fetchAppointments = async (userId: number) => {
    // In a real application, you would fetch appointments from your API
    // For now, we'll use mock data

    // Mock appointment data
    setCitas([
      {
        id: "1",
        seguimiento: "00123",
        fecha: "2025-04-22",
        servicio: "Consulta General",
        horario: "10:00 AM",
        doctor: "Dra. Gómez",
        estado: "Confirmada",
      },
    ]);
  };

  const fetchNotifications = async (userId: number) => {
    // In a real application, you would fetch notifications from your API
    // For now, we'll use mock data

    // Mock notification data
    setNotifications([
      {
        id: "1",
        title: "Cita confirmada",
        message:
          "Su cita para Consulta General ha sido confirmada para el 22/04/2025 a las 10:00 AM",
        date: "2025-04-15T14:30:00",
        read: false,
        type: "appointment",
      },
      {
        id: "2",
        title: "Documento recibido",
        message: "Hemos recibido su historial médico correctamente",
        date: "2025-04-14T09:15:00",
        read: true,
        type: "document",
      },
    ]);
  };

  const checkNewNotifications = async (cedula: string) => {
    // In a real application, you would check for new notifications from your API
    // For now, we'll simulate a new notification occasionally

    const shouldAddNotification = Math.random() > 0.8; // 20% chance of new notification

    if (shouldAddNotification) {
      const newNotification: Notification = {
        id: `new-${Date.now()}`,
        title: "Recordatorio de cita",
        message: "Recuerde su cita programada para mañana a las 10:00 AM",
        date: new Date().toISOString(),
        read: false,
        type: "appointment",
      };

      setNotifications((prev) => [newNotification, ...prev]);

      // Show toast notification
      toast({
        title: newNotification.title,
        description: newNotification.message,
      });
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const cerrarSesion = async () => {
    try {
      await fetch("/api/auth/logout");
      toast({
        title: "Sesión finalizada",
        description: "Has cerrado sesión correctamente.",
      });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const cancelAppointment = (appointmentId: string) => {
    // In a real application, you would call your API to cancel the appointment
    // For now, we'll just update the local state

    setCitas((prev) =>
      prev.map((cita) =>
        cita.id === appointmentId ? { ...cita, estado: "Cancelada" } : cita
      )
    );

    toast({
      title: "Cita cancelada",
      description: "Su cita ha sido cancelada correctamente",
    });
  };

  const rescheduleAppointment = (appointmentId: string) => {
    // In a real application, you would navigate to a rescheduling page
    // For now, we'll just show a toast

    toast({
      title: "Reagendar cita",
      description: "Funcionalidad en desarrollo",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">Cargando información del portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col">
      {/* Encabezado */}
      <header className="bg-white shadow-md p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Image src="/images/logo.png" alt="Logo" width={48} height={48} />
          <h1 className="text-2xl font-bold text-blue-600">
            CareConnect | Portal del Cliente
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <Bell className="h-6 w-6 text-gray-600" />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-10 max-h-96 overflow-y-auto">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-semibold">Notificaciones</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Marcar todas como leídas
                    </button>
                  )}
                </div>

                <div className="divide-y">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-3 hover:bg-gray-50 cursor-pointer ${
                          !notification.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() => markNotificationAsRead(notification.id)}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-3">
                            {notification.type === "appointment" && (
                              <Calendar className="h-5 w-5 text-blue-500" />
                            )}
                            {notification.type === "document" && (
                              <FileText className="h-5 w-5 text-green-500" />
                            )}
                            {notification.type === "payment" && (
                              <div className="h-5 w-5 text-purple-500">$</div>
                            )}
                            {notification.type === "system" && (
                              <Bell className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">
                              {notification.title}
                            </p>
                            <p className="text-xs text-gray-600">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(notification.date).toLocaleString()}
                            </p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No hay notificaciones
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <span id="nombreCliente" className="font-semibold">
            {cliente.nombre || "Cargando..."}
          </span>
          <button onClick={cerrarSesion} className="btn-danger">
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-blue-50 p-4 flex justify-center gap-6 text-blue-700 font-semibold">
        <Link
          href="/dashboard/solicitar-cita"
          className="hover:underline hover:text-blue-900 transition"
        >
          Solicitar Cita
        </Link>
        <Link
          href="/dashboard/documentos"
          className="hover:underline hover:text-blue-900 transition"
        >
          Documentos
        </Link>
        <Link
          href="/dashboard/estado-cuenta"
          className="hover:underline hover:text-blue-900 transition"
        >
          Estado de Cuenta
        </Link>
      </nav>

      {/** Información del Cliente */}
      <main className="p-6 space-y-8 flex-grow">
        <section className="card p-6">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Información del Cliente
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <p>
              <strong>Nombre:</strong>{" "}
              <span>{cliente.nombre || "Cargando..."}</span>
            </p>
            <p>
              <strong>Cédula:</strong>{" "}
              <span>{cliente.cedula || "Cargando..."}</span>
            </p>
            <p>
              <strong>Fecha de nacimiento:</strong>{" "}
              <span>{cliente.fechaNacimiento || "Cargando..."}</span>
            </p>
            <p>
              <strong>Sexo:</strong>{" "}
              <span>{cliente.sexo || "Cargando..."}</span>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <span>{cliente.email || "Cargando..."}</span>
            </p>
          </div>
        </section>

        {/* Historial de Citas */}
        <section className="card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">Mis Citas</h2>
            <Link
              href="/dashboard/solicitar-cita"
              className="btn-primary flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Nueva Cita
            </Link>
          </div>
          <div className="table-container">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="table-header">
                <tr>
                  <th className="table-cell"># Seguimiento</th>
                  <th className="table-cell">Fecha</th>
                  <th className="table-cell">Servicio</th>
                  <th className="table-cell">Horario</th>
                  <th className="table-cell">Doctor</th>
                  <th className="table-cell">Estado</th>
                  <th className="table-cell">Acción</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {citas.length > 0 ? (
                  citas.map((cita, index) => (
                    <tr key={cita.id} className="table-row">
                      <td className="table-cell">{cita.seguimiento}</td>
                      <td className="table-cell">{cita.fecha}</td>
                      <td className="table-cell">{cita.servicio}</td>
                      <td className="table-cell">{cita.horario}</td>
                      <td className="table-cell">{cita.doctor}</td>
                      <td className="table-cell">
                        <span
                          className={`status-badge ${
                            cita.estado === "Confirmada"
                              ? "status-badge-success"
                              : cita.estado === "Pendiente"
                              ? "status-badge-warning"
                              : "status-badge-danger"
                          }`}
                        >
                          {cita.estado === "Confirmada" && (
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {cita.estado === "Pendiente" && (
                            <Clock className="w-3 h-3 inline mr-1" />
                          )}
                          {cita.estado}
                        </span>
                      </td>
                      <td className="table-cell space-x-2">
                        {cita.estado !== "Cancelada" && (
                          <>
                            <button
                              onClick={() => rescheduleAppointment(cita.id)}
                              className="btn-warning text-sm px-3 py-1"
                            >
                              Reagendar
                            </button>
                            <button
                              onClick={() => cancelAppointment(cita.id)}
                              className="btn-danger text-sm px-3 py-1"
                            >
                              Cancelar
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="table-cell text-center text-gray-500"
                    >
                      No hay citas programadas
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Agendar Cita</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Solicite una nueva cita médica con nuestros especialistas
            </p>
            <Link
              href="/dashboard/solicitar-cita"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
            >
              Solicitar cita
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="card p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Mis Documentos</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Acceda a sus documentos médicos y recetas
            </p>
            <Link
              href="/dashboard/documentos"
              className="text-green-600 hover:text-green-800 font-medium flex items-center"
            >
              Ver documentos
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="card p-6 hover:shadow-lg transition">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="ml-3 text-lg font-semibold">Mi Perfil</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Actualice su información personal y preferencias
            </p>
            <Link
              href="/profile"
              className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            >
              Editar perfil
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Link>
          </div>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="bg-blue-50 text-center text-sm text-blue-600 p-4 mt-auto">
        <p>
          © 2025 CareConnect. Todos los derechos reservados. |
          support@careconnect.com | @CareConnect
        </p>
      </footer>
    </div>
  );
}
