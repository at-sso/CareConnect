"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cedula: "",
    birthdate: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido";
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    if (!formData.cedula.trim()) {
      newErrors.cedula = "La cédula es requerida";
    }

    if (!formData.birthdate) {
      newErrors.birthdate = "La fecha de nacimiento es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          cedula: formData.cedula,
          birthdate: formData.birthdate,
          gender: formData.gender,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Registro exitoso",
          description: "Por favor, complete el segundo paso del registro",
        });
        router.push("/registro/paso-2");
      } else {
        toast({
          title: "Error",
          description: data.message || "Error al registrar usuario",
          variant: "destructive",
        });
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
            Registro de Usuario
          </h2>
          <p className="mt-2 text-gray-400">
            Complete el formulario para crear su cuenta
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="Juan Pérez"
              />
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

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
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                placeholder="correo@ejemplo.com"
              />
              {errors.email && <p className="form-error">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="form-error">{errors.password}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar Contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="form-error">{errors.confirmPassword}</p>
                )}
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
                required
                value={formData.cedula}
                onChange={handleChange}
                className="input-field"
                placeholder="123456789"
              />
              {errors.cedula && <p className="form-error">{errors.cedula}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="birthdate" className="form-label">
                  Fecha de Nacimiento
                </label>
                <input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  required
                  value={formData.birthdate}
                  onChange={handleChange}
                  className="input-field"
                />
                {errors.birthdate && (
                  <p className="form-error">{errors.birthdate}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Género
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </select>
              </div>
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
                    Registrando...
                  </>
                ) : (
                  "Continuar"
                )}
              </button>
            </div>
          </form>

          <div className="px-6 pb-6 text-center">
            <p className="text-sm text-gray-400">
              ¿Ya tiene una cuenta?{" "}
              <Link
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Inicie sesión aquí
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
