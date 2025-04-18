import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart3, FileText, Settings, User, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-blue-600">
                Sistema de Autenticación
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <User className="h-6 w-6" />
              </Link>
              <Button variant="outline" asChild>
                <Link
                  href="/api/auth/logout"
                  className="flex items-center space-x-2"
                >
                  <span>Cerrar Sesión</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Bienvenido a su panel de control
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {/* Stat card 1 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg card-hover">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Total Usuarios
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          1
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link
                    href="/clients"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>

            {/* Stat card 2 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg card-hover">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Documentos
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          0
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link
                    href="/documents"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Ver todos
                  </Link>
                </div>
              </div>
            </div>

            {/* Stat card 3 */}
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg card-hover">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                        Actividad
                      </dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900 dark:text-white">
                          3 acciones
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                <div className="text-sm">
                  <Link
                    href="/activity"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Acciones Rápidas
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden card-hover">
                <div className="p-5">
                  <div className="flex items-center">
                    <User className="h-8 w-8 text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Perfil de Usuario
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Vea y edite su información personal
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/profile">Ver Perfil</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden card-hover">
                <div className="p-5">
                  <div className="flex items-center">
                    <Settings className="h-8 w-8 text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Configuración
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Ajuste las preferencias de su cuenta
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/change-password">Cambiar Contraseña</Link>
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden card-hover">
                <div className="p-5">
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
                      Documentación
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Acceda a la documentación del sistema
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#">Ver Documentación</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
