"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

import {
  ArrowLeft,
  Calendar,
  Mail,
  Save,
  User,
  BarChart3,
  FileText,
  Settings,
  HandCoins,
  CircleDollarSign,
  Menu,
} from "lucide-react";

import { formatDate } from "@/utils/formatDate";
import type { User as UserType } from "@/types";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fechaNacimientoFormateada = user?.fecha_de_nacimiento
    ? formatDate(user.fecha_de_nacimiento)
    : "";

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/user/profile");

        if (!response.ok) {
          if (response.status === 401) {
            router.push("/");
            return;
          }
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error al cargar el usuario en dashboard:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar la información del usuario",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      {/* Encabezado */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="relative w-full flex items-center justify-between h-16 px-4">
          {/* Título del sistema */}
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo CareConnect" className="h-10 w-15" />
            <h1 className="text-2xl font-extrabold text-blue-600">CareConnect</h1>
          </div>

          {/* Título centrado */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              PORTAL DE PACIENTE
            </h2>
          </div>

          {/* Usuario + menú */}
          <div className="flex items-center gap-8">
            <div className="text-right">
              <Link
                href="/profile"
                className="text-sm text-gray-800 dark:text-gray-200 font-medium hover:underline"
              >
                {user.nombre} {user.apellido}
              </Link>
              <div className="mt-1">
                <Button
                  variant="link"
                  className="text-xs p-0 h-auto text-blue-600 hover:underline"
                  asChild
                >
                  <Link href="/api/auth/logout">Cerrar Sesión</Link>
                </Button>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="p-2">
                  <Menu className="h-5 w-5 text-gray-700 dark:text-white" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones Rápidas</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="w-full">Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/change-password" className="w-full">Configuración</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/documentacion" className="w-full">Documentación</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="mt-6 py-10">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Bienvenida */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Bienvenido a su panel de control
            </p>
          </div>

          {/* Opciones */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            <StatCard
              title="Solicitar Citas"
              value="1"
              icon={<User className="h-6 w-6 text-white" />}
              href="/clients"
              color="bg-blue-500"
            />
            <StatCard
              title="Documentos"
              value="0"
              icon={<FileText className="h-6 w-6 text-white" />}
              href="/documents"
              color="bg-purple-500"
            />
            <StatCard
              title="Estado de Cuenta"
              value="B./10,500.00"
              icon={<CircleDollarSign className="h-6 w-6 text-white" />}
              href="/activity"
              color="bg-green-500"
            />
          </div>

          {/* Información Personal */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 space-y-6">
              <h2 className="text-2xl font-bold text-center text-blue-600">
                Información Personal
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoItem label="Nombre" value={user.nombre} />
                <InfoItem label="Apellido" value={user.apellido} />
                <InfoItem label="Cédula" value={user.cedula} />
                <InfoItem
                  label="Fecha de Nacimiento"
                  value={fechaNacimientoFormateada}
                />
                <div className="sm:col-span-2">
                  <InfoItem label="Correo Electrónico" value={user.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// COMPONENTES AUXILIARES
function StatCard({
  title,
  value,
  icon,
  href,
  color,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 ${color} rounded-md p-3`}>{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {title}
              </dt>
              <dd>
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {value}
                </div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-700 px-5 py-3">
        <div className="text-sm">
          <Link
            href={href}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-500">{label}</label>
      <p className="text-base font-medium text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}
