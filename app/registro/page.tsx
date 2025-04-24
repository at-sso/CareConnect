"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { Calendar, LockKeyhole, Mail, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cedula: "",
    password: "",
    nombre: "",
    apellido: "",
    fecha_de_nacimiento: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al registrar usuario");
      }

      toast({
        title: "Registro exitoso",
        description: "Su cuenta ha sido creada correctamente",
      });

      // Redirect to login page
      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Error al registrar usuario",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md border-none shadow-xl">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-32 h-32 relative">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={128}
            height={128}
            className="rounded-2xl shadow-md"
          />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold text-blue-600">
            Registro de Usuario
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Complete el formulario para crear su cuenta
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="Ingrese su nombre"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="apellido" className="form-label">
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                value={formData.apellido}
                onChange={handleChange}
                className="input-field"
                placeholder="Ingrese su apellido"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cedula" className="form-label">
              Cédula
            </label>
            <input
              id="cedula"
              name="cedula"
              type="text"
              value={formData.cedula}
              onChange={handleChange}
              className="input-field"
              placeholder="Ingrese su número de cédula"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Ingrese su contraseña"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="fecha_de_nacimiento" className="form-label">
              Fecha de Nacimiento
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fecha_de_nacimiento"
                name="fecha_de_nacimiento"
                type="date"
                value={formData.fecha_de_nacimiento}
                onChange={handleChange}
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Ingrese su correo electrónico"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-all duration-200 mt-4"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                Registrando...
              </div>
            ) : (
              "Registrarse"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2 border-t pt-4 mt-2">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tiene una cuenta?{" "}
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
          >
            Iniciar Sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
