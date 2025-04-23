import Link from "next/link";
import {
  Shield,
  Clock,
  Users,
  FileText,
  CreditCard,
  Calendar,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-400">
            CareConnect
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link-active">
              Inicio
            </Link>
            <Link href="/servicios" className="nav-link">
              Servicios
            </Link>
            <Link href="#contacto" className="nav-link">
              Contacto
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="btn-secondary">
              Iniciar Sesión
            </Link>
            <Link href="/registro" className="btn-primary">
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-400">
            Cuidado de salud simplificado
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-300">
            Gestione sus citas médicas, documentos y pagos en un solo lugar.
            Acceso fácil y seguro a todos sus servicios de salud.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/registro" className="btn-primary text-lg px-8 py-3">
              Comenzar ahora
            </Link>
            <Link href="/servicios" className="btn-secondary text-lg px-8 py-3">
              Conocer más
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">
            Nuestros Servicios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card card-hover">
              <div className="p-6">
                <Calendar className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Gestión de Citas</h3>
                <p className="text-gray-400 mb-4">
                  Programe, reprograme o cancele sus citas médicas en línea sin
                  complicaciones.
                </p>
                <Link href="/servicios" className="nav-link flex items-center">
                  Saber más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="card card-hover">
              <div className="p-6">
                <FileText className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Documentos Médicos
                </h3>
                <p className="text-gray-400 mb-4">
                  Acceda a sus recetas, resultados de laboratorio e historial
                  médico en cualquier momento.
                </p>
                <Link href="/servicios" className="nav-link flex items-center">
                  Saber más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>

            <div className="card card-hover">
              <div className="p-6">
                <CreditCard className="h-12 w-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Pagos y Facturación
                </h3>
                <p className="text-gray-400 mb-4">
                  Revise su estado de cuenta, realice pagos y descargue facturas
                  fácilmente.
                </p>
                <Link href="/servicios" className="nav-link flex items-center">
                  Saber más <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <Shield className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Seguridad Garantizada
              </h3>
              <p className="text-gray-400">
                Sus datos médicos están protegidos con la más alta seguridad y
                encriptación.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <Clock className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Disponible 24/7</h3>
              <p className="text-gray-400">
                Acceda a nuestros servicios en cualquier momento, desde
                cualquier lugar.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <Users className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Atención Personalizada
              </h3>
              <p className="text-gray-400">
                Nuestro equipo está siempre disponible para ayudarle con sus
                necesidades.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <FileText className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Historial Completo</h3>
              <p className="text-gray-400">
                Mantenga un registro completo de todas sus consultas y
                tratamientos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-400">
            Comience a gestionar su salud hoy mismo
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto text-gray-300">
            Únase a miles de pacientes que ya disfrutan de nuestros servicios
            digitales de salud.
          </p>
          <Link href="/registro" className="btn-primary text-lg px-8 py-3">
            Crear una cuenta
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-400">
            Contáctenos
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">
                Información de Contacto
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong className="text-blue-400">Dirección:</strong> Av.
                  Principal #123, Ciudad
                </p>
                <p>
                  <strong className="text-blue-400">Teléfono:</strong> (123)
                  456-7890
                </p>
                <p>
                  <strong className="text-blue-400">Email:</strong>{" "}
                  info@careconnect.com
                </p>
                <p>
                  <strong className="text-blue-400">Horario:</strong> Lunes a
                  Viernes, 8:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">
                Envíenos un Mensaje
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="input-field"
                      placeholder="Su nombre"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="input-field"
                      placeholder="Su email"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="input-field"
                    placeholder="Asunto del mensaje"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="input-field"
                    placeholder="Su mensaje"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                CareConnect
              </h3>
              <p className="text-gray-400">
                Simplificando el cuidado de la salud para todos nuestros
                pacientes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                Enlaces Rápidos
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-blue-400">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Servicios
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Iniciar Sesión
                  </Link>
                </li>
                <li>
                  <Link
                    href="/registro"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Registrarse
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                Servicios
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/servicios"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Citas Médicas
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Documentos Médicos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/servicios"
                    className="text-gray-400 hover:text-blue-400"
                  >
                    Pagos y Facturación
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-blue-400">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-blue-400">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-blue-400">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 CareConnect. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
