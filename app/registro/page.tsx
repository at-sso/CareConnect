"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export default function RegistroPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    fecha: "",
    cedula: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    nombres: "",
    apellidos: "",
    fecha: "",
    cedula: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Validate nombres
    if (!formData.nombres.trim()) {
      newErrors.nombres = "El nombre es requerido";
      isValid = false;
    }

    // Validate apellidos
    if (!formData.apellidos.trim()) {
      newErrors.apellidos = "El apellido es requerido";
      isValid = false;
    }

    // Validate fecha
    if (!formData.fecha) {
      newErrors.fecha = "La fecha de nacimiento es requerida";
      isValid = false;
    }

    // Validate cedula
    if (!formData.cedula.trim()) {
      newErrors.cedula = "La cédula es requerida";
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El email no es válido";
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";
      isValid = false;
    }

    // Validate confirmPassword
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Store form data in session storage to use in next step
      sessionStorage.setItem("registroData", JSON.stringify(formData));

      // Navigate to next step
      router.push("/registro/paso-2");
    } catch (error) {
      console.error("Error storing registration data:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar el formulario",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl">
        {/* Encabezado */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={56}
              height={56}
              className="mr-3"
            />
            <h1 className="text-2xl font-bold text-blue-900">Registro</h1>
          </div>
          <h2 className="text-xl font-semibold text-black">
            Tu salud es nuestra prioridad
          </h2>
        </div>

        {/* Formulario */}
        <form id="registroPaso1" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="col-span-1 md:col-span-1">
              <label className="form-label">Nombres</label>
              <input
                name="nombres"
                type="text"
                value={formData.nombres}
                onChange={handleChange}
                className={`input-field ${
                  errors.nombres ? "border-red-500" : ""
                }`}
                placeholder="Juan Carlos"
              />
              {errors.nombres && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.nombres}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Apellidos</label>
              <input
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                className={`input-field ${
                  errors.apellidos ? "border-red-500" : ""
                }`}
                placeholder="Pérez"
              />
              {errors.apellidos && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.apellidos}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Fecha de Nacimiento</label>
              <input
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleChange}
                className={`input-field ${
                  errors.fecha ? "border-red-500" : ""
                }`}
              />
              {errors.fecha && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.fecha}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Cédula / ID</label>
              <input
                name="cedula"
                type="text"
                value={formData.cedula}
                onChange={handleChange}
                className={`input-field ${
                  errors.cedula ? "border-red-500" : ""
                }`}
                placeholder="123456789"
              />
              {errors.cedula && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.cedula}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <div>
              <label className="form-label">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="correo@ejemplo.com"
              />
              {errors.email && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.email}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Contraseña</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`input-field ${
                  errors.password ? "border-red-500" : ""
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.password}</span>
                </div>
              )}
            </div>
            <div>
              <label className="form-label">Confirmar Contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-field ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{errors.confirmPassword}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botón */}
          <div className="text-right">
            <button type="submit" className="btn-primary">
              {isLoading ? "Procesando..." : "Siguiente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
