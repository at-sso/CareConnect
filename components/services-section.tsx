/**
 * Services Section Component
 *
 * This component displays the three main services offered by the platform:
 * 1. Appointment Management
 * 2. Medical Documents
 * 3. Payments and Billing
 *
 * Each service includes an icon, title, description, and a link to learn more.
 */
import Link from "next/link";
import { Calendar, FileText, CreditCard } from "lucide-react";
import { JSX } from "react/jsx-runtime";

/**
 * ServicesSection component
 * @returns {JSX.Element} The services section component
 */
export default function ServicesSection(): JSX.Element {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-12 text-center text-blue-400">
          Nuestros Servicios
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service 1 - Appointment Management */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <Calendar className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Gestión de Citas</h3>
            <p className="text-gray-400 mb-4">
              Programe, reprograme o cancele sus citas médicas en línea sin
              complicaciones.
            </p>
            <Link
              href="/servicios"
              className="text-blue-400 hover:text-blue-300"
            >
              Saber más →
            </Link>
          </div>

          {/* Service 2 - Medical Documents */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <FileText className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Documentos Médicos</h3>
            <p className="text-gray-400 mb-4">
              Acceda a sus recetas, resultados de laboratorio e historial médico
              en cualquier momento.
            </p>
            <Link
              href="/servicios"
              className="text-blue-400 hover:text-blue-300"
            >
              Saber más →
            </Link>
          </div>

          {/* Service 3 - Payments and Billing */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <CreditCard className="h-10 w-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Pagos y Facturación</h3>
            <p className="text-gray-400 mb-4">
              Revise su estado de cuenta, realice pagos y descargue facturas
              fácilmente.
            </p>
            <Link
              href="/servicios"
              className="text-blue-400 hover:text-blue-300"
            >
              Saber más →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
