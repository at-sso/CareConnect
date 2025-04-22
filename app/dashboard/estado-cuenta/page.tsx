"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Download, Mail } from "lucide-react";

interface ServicioDetalle {
  id: string;
  fecha: string;
  servicio: string;
  medico: string;
  monto: number;
  estado: "Pagado" | "Pendiente";
}

export default function EstadoCuentaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [resumen, setResumen] = useState({
    totalServicio: 0,
    totalPagado: 0,
    saldoPendiente: 0,
  });
  const [servicios, setServicios] = useState<ServicioDetalle[]>([]);
  const [paciente, setPaciente] = useState({
    nombre: "",
    id: "",
    fechaCorte: "",
  });

  useEffect(() => {
    fetchEstadoCuenta();
  }, []);

  const fetchEstadoCuenta = async () => {
    try {
      // In a real application, you would fetch account status from your API
      // For now, we'll use mock data

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock patient data
      setPaciente({
        nombre: "Kemi",
        id: "0001",
        fechaCorte: "12/04/2025",
      });

      // Mock services data
      const mockServicios: ServicioDetalle[] = [
        {
          id: "1",
          fecha: "10/04/2025",
          servicio: "Consulta General",
          medico: "Dr. López",
          monto: 200,
          estado: "Pagado",
        },
        {
          id: "2",
          fecha: "11/04/2025",
          servicio: "Odontología",
          medico: "Dra. Ramos",
          monto: 250,
          estado: "Pendiente",
        },
      ];

      setServicios(mockServicios);

      // Calculate summary
      const totalServicio = mockServicios.reduce(
        (sum, item) => sum + item.monto,
        0
      );
      const totalPagado = mockServicios
        .filter((item) => item.estado === "Pagado")
        .reduce((sum, item) => sum + item.monto, 0);

      setResumen({
        totalServicio,
        totalPagado,
        saldoPendiente: totalServicio - totalPagado,
      });
    } catch (error) {
      console.error("Error fetching account status:", error);
      toast({
        title: "Error",
        description: "No se pudo cargar el estado de cuenta",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    // In a real application, you would generate and download a PDF
    // For now, we'll just show a toast
    toast({
      title: "Descarga iniciada",
      description: "El estado de cuenta se está descargando",
    });
  };

  const sendByEmail = () => {
    // In a real application, you would send the account status by email
    // For now, we'll just show a toast
    toast({
      title: "Correo enviado",
      description:
        "El estado de cuenta ha sido enviado a su correo electrónico",
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
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
          <p className="text-gray-600">Cargando estado de cuenta...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-6 bg-blue-50">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-6xl">
        {/* Encabezado */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-800">Estado de Cuenta</h1>
        </div>

        {/* Información del paciente */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
          <p>
            <strong>Paciente:</strong> {paciente.nombre}
          </p>
          <p>
            <strong>ID paciente:</strong> {paciente.id}
          </p>
          <p>
            <strong>Fecha de Corte:</strong> {paciente.fechaCorte}
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Resumen General */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Resumen General
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Total de servicio prestado:</strong> $
                {resumen.totalServicio}
              </li>
              <li>
                <strong>Total Pagado:</strong> ${resumen.totalPagado}
              </li>
              <li>
                <strong>Saldo Pendiente:</strong> ${resumen.saldoPendiente}
              </li>
            </ul>
          </div>

          {/* Detalle de Servicios */}
          <div>
            <h2 className="text-lg font-semibold text-blue-600 mb-4">
              Detalle de Servicios
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-blue-100 text-blue-700">
                  <tr>
                    <th className="px-4 py-2">Fecha</th>
                    <th className="px-4 py-2">Servicio</th>
                    <th className="px-4 py-2">Médico</th>
                    <th className="px-4 py-2">Monto</th>
                    <th className="px-4 py-2">Estado</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {servicios.map((servicio) => (
                    <tr key={servicio.id} className="border-t">
                      <td className="px-4 py-2">{servicio.fecha}</td>
                      <td className="px-4 py-2">{servicio.servicio}</td>
                      <td className="px-4 py-2">{servicio.medico}</td>
                      <td className="px-4 py-2">${servicio.monto}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            servicio.estado === "Pagado"
                              ? "bg-green-100 text-green-600 font-semibold"
                              : "bg-red-100 text-red-600 font-semibold"
                          }`}
                        >
                          {servicio.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-between">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition text-center"
          >
            Volver al Portal
          </Link>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={downloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar Estado de Cuenta en PDF
            </button>
            <button
              onClick={sendByEmail}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-xl transition flex items-center justify-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              Enviar por Correo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
