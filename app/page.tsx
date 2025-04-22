import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="font-sans bg-blue-50 text-gray-800 min-h-screen">
      <header className="flex justify-between items-center px-5 py-8 bg-white shadow-sm">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="mr-4"
          />
          <span className="text-2xl font-bold text-blue-600">CareConnect</span>
        </div>
        <nav className="flex gap-6">
          <Link
            href="/registro"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Únete
          </Link>
          <Link
            href="/servicios"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Servicios
          </Link>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Portal Cliente
          </Link>
        </nav>
      </header>

      <section className="flex flex-col md:flex-row justify-between items-center px-5 py-16 max-w-6xl mx-auto">
        <div className="md:max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Recibe asistencia medica inmediata &amp;
            <br />
            <span className="text-purple-600">
              Agenda tus citas en un instante.
            </span>
          </h1>
          <p className="text-gray-600 mb-8">
            Somos lideres proveedores de servicio personalizado y agendado de
            citas rapidas para todas tus necesidades medicas.
          </p>
          <div>
            <Link
              href="/registro"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Comenzar
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/placeholder.svg?height=400&width=500"
            alt="Medical Team"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 py-16 bg-white">
        <div className="text-center p-6 rounded-lg hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-purple-600 mb-3">
            Diagnóstico Exhaustivo
          </h3>
          <p className="text-gray-600">
            Profesionales expertos que ofrecen evaluaciones médicas completas y
            apoyo especializado.
          </p>
        </div>
        <div className="text-center p-6 rounded-lg hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-purple-600 mb-3">
            Citas Inmediatas
          </h3>
          <p className="text-gray-600">
            Reserva citas de forma rápida y eficiente con nuestro sistema
            inteligente de agenda.
          </p>
        </div>
        <div className="text-center p-6 rounded-lg hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-purple-600 mb-3">
            Atención Personalizada
          </h3>
          <p className="text-gray-600">
            Asesoramiento y monitoreo personalizado para garantizar los mejores
            resultados médicos.
          </p>
        </div>
        <div className="text-center p-6 rounded-lg hover:shadow-md transition">
          <h3 className="text-xl font-semibold text-purple-600 mb-3">
            Portal de Pacientes
          </h3>
          <p className="text-gray-600">
            Accede de forma segura a tus documentos médicos, prescripciones y
            reportes de consulta.
          </p>
        </div>
      </section>
    </div>
  );
}
