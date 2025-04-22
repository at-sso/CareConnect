"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle } from "lucide-react";

export default function SolicitarCitaPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    especialidad: "",
    fecha: "",
    motivo: "",
  });
  const [errors, setErrors] = useState({
    especialidad: "",
    fecha: "",
    motivo: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [minDate, setMinDate] = useState("");

  // Set minimum date (3 days from today)
  useEffect(() => {
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 3);
    const minDateStr = hoy.toISOString().split("T")[0];
    setMinDate(minDateStr);

    // Set the min attribute on the date input
    const fechaInput = document.getElementById("fecha") as HTMLInputElement;
    if (fechaInput) {
      fechaInput.min = minDateStr;
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
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

    // Validate especialidad
    if (!formData.especialidad) {
      newErrors.especialidad = "Debe seleccionar una especialidad";
      isValid = false;
    }

    // Validate fecha
    if (!formData.fecha) {
      newErrors.fecha = "La fecha es requerida";
      isValid = false;
    } else {
      const selectedDate = new Date(formData.fecha);
      const minAllowedDate = new Date(minDate);

      if (selectedDate < minAllowedDate) {
        newErrors.fecha = "La fecha debe ser al menos 3 días después de hoy";
        isValid = false;
      }
    }

    // Validate motivo
    if (!formData.motivo.trim()) {
      newErrors.motivo = "El motivo es requerido";
      isValid = false;
    } else if (formData.motivo.length < 10) {
      newErrors.motivo = "Por favor proporcione más detalles sobre su motivo";
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
      // Here you would send the appointment data to your API
      // This is a placeholder for the API call
      console.log("Appointment data:", formData);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Show success message
      toast({
        title: "Cita Agendada",
        description: "Tu cita ha sido registrada exitosamente.",
      });

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al agendar la cita",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Image src="/images/logo.png" alt="Logo" width={56} height={56} />
          <h2 className="text-2xl font-bold text-blue-700">
            Formulario para Agendar Cita
          </h2>
        </div>

        <form id="form-cita" className="space-y-6" onSubmit={handleSubmit}>
          {/* Especialidad */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Especialidad médica
            </label>
            <select
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.especialidad ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione una especialidad</option>
              <option>Medicina General</option>
              <option>Fisiatría</option>
              <option>Cardiología</option>
              <option>Ortopedia</option>
              <option>Nutricionista</option>
              <option>Psicología</option>
              <option>Odontología</option>
              <option>Pediatría</option>
            </select>
            {errors.especialidad && (
              <div className="flex items-center mt-1 text-red-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{errors.especialidad}</span>
              </div>
            )}
          </div>

          {/* Fecha */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Fecha de la cita
            </label>
            <input
              type="date"
              name="fecha"
              id="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.fecha ? "border-red-500" : "border-gray-300"
              }`}
            />
            <p className="text-xs text-gray-500 mt-1">
              Solo se puede agendar a partir de 3 días desde hoy
            </p>
            {errors.fecha && (
              <div className="flex items-center mt-1 text-red-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{errors.fecha}</span>
              </div>
            )}
          </div>

          {/* Motivo */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Motivo o Síntomas
            </label>
            <textarea
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className={`w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.motivo ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
              placeholder="Describa brevemente el motivo de su consulta..."
            ></textarea>
            {errors.motivo && (
              <div className="flex items-center mt-1 text-red-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-xs">{errors.motivo}</span>
              </div>
            )}
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 pt-4">
            <Link
              href="/dashboard"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-xl transition text-center"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition disabled:opacity-70"
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
                  Procesando...
                </div>
              ) : (
                "Confirmar Cita"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
