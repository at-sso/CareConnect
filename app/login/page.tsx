"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Redirigiendo al dashboard...",
        });
        router.push("/dashboard");
      } else {
        setError(data.message || "Error al iniciar sesión");
        toast({
          title: "Error",
          description: data.message || "Error al iniciar sesión",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      toast({
        title: "Error",
        description: "Error al conectar con el servidor",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-400">CareConnect</h1>
          <h2 className="mt-2 text-xl font-bold text-gray-100">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-gray-400">
            Ingrese sus credenciales para acceder a su cuenta
          </p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-900/30 text-red-400 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div className="form-group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <Link
                  href="/reset-password"
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex justify-center items-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </div>
          </form>

          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-gray-400">
              ¿No tiene una cuenta?{" "}
              <Link
                href="/registro"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Regístrese aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400">
          <Link href="/" className="text-blue-400 hover:text-blue-300">
            &larr; Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
