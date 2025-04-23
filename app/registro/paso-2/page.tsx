"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Upload, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function RegisterStep2() {
  const router = useRouter();
  const { toast } = useToast();

  // Separate file states for each document type
  const [idCardFile, setIdCardFile] = useState<File | null>(null);
  const [insuranceCardFile, setInsuranceCardFile] = useState<File | null>(null);
  const [medicalHistoryFile, setMedicalHistoryFile] = useState<File | null>(
    null
  );

  // Separate preview states
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [insuranceCardPreview, setInsuranceCardPreview] = useState<
    string | null
  >(null);
  const [medicalHistoryPreview, setMedicalHistoryPreview] = useState<
    string | null
  >(null);

  // Separate file input refs
  const idCardInputRef = useRef<HTMLInputElement>(null);
  const insuranceCardInputRef = useRef<HTMLInputElement>(null);
  const medicalHistoryInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle file selection for ID Card
  const handleIdCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setIdCardFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setIdCardPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file selection for Insurance Card
  const handleInsuranceCardChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setInsuranceCardFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInsuranceCardPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle file selection for Medical History
  const handleMedicalHistoryChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setMedicalHistoryFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMedicalHistoryPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click for ID Card
  const triggerIdCardUpload = () => {
    idCardInputRef.current?.click();
  };

  // Trigger file input click for Insurance Card
  const triggerInsuranceCardUpload = () => {
    insuranceCardInputRef.current?.click();
  };

  // Trigger file input click for Medical History
  const triggerMedicalHistoryUpload = () => {
    medicalHistoryInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that all required files are uploaded
    if (!idCardFile || !insuranceCardFile || !medicalHistoryFile) {
      setError("Por favor, suba todos los documentos requeridos");
      toast({
        title: "Error",
        description: "Por favor, suba todos los documentos requeridos",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create FormData to send files
      const formData = new FormData();
      formData.append("idCard", idCardFile);
      formData.append("insuranceCard", insuranceCardFile);
      formData.append("medicalHistory", medicalHistoryFile);

      const response = await fetch("/api/upload-documents", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Registro completado",
          description: "Su cuenta ha sido creada exitosamente",
        });
        router.push("/login");
      } else {
        setError(data.message || "Error al subir documentos");
        toast({
          title: "Error",
          description: data.message || "Error al subir documentos",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading documents:", error);
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
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-400">CareConnect</h1>
          <h2 className="mt-2 text-xl font-bold text-gray-100">
            Documentación Requerida
          </h2>
          <p className="mt-2 text-gray-400">
            Por favor, suba los siguientes documentos para completar su registro
          </p>
        </div>

        <div className="card">
          {error && (
            <div className="bg-red-900/30 text-red-400 p-3 rounded-md mx-6 mt-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* ID Card Upload */}
              <div className="space-y-2">
                <label className="form-label">Cédula de Identidad</label>
                <input
                  type="file"
                  ref={idCardInputRef}
                  onChange={handleIdCardChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                <div
                  onClick={triggerIdCardUpload}
                  className={`file-upload-area ${
                    idCardFile
                      ? "file-upload-area-success"
                      : "file-upload-area-default"
                  } flex flex-col items-center justify-center h-40`}
                >
                  {idCardPreview ? (
                    <>
                      <img
                        src={idCardPreview || "/placeholder.svg"}
                        alt="Vista previa de cédula"
                        className="h-24 object-contain mb-2"
                      />
                      <div className="flex items-center text-green-400">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">Archivo cargado</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400 text-center">
                        Haga clic para subir su cédula
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Insurance Card Upload */}
              <div className="space-y-2">
                <label className="form-label">Tarjeta de Seguro</label>
                <input
                  type="file"
                  ref={insuranceCardInputRef}
                  onChange={handleInsuranceCardChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                <div
                  onClick={triggerInsuranceCardUpload}
                  className={`file-upload-area ${
                    insuranceCardFile
                      ? "file-upload-area-success"
                      : "file-upload-area-default"
                  } flex flex-col items-center justify-center h-40`}
                >
                  {insuranceCardPreview ? (
                    <>
                      <img
                        src={insuranceCardPreview || "/placeholder.svg"}
                        alt="Vista previa de tarjeta de seguro"
                        className="h-24 object-contain mb-2"
                      />
                      <div className="flex items-center text-green-400">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">Archivo cargado</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400 text-center">
                        Haga clic para subir su tarjeta de seguro
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Medical History Upload */}
              <div className="space-y-2">
                <label className="form-label">Historial Médico</label>
                <input
                  type="file"
                  ref={medicalHistoryInputRef}
                  onChange={handleMedicalHistoryChange}
                  accept="image/*,.pdf"
                  className="hidden"
                />
                <div
                  onClick={triggerMedicalHistoryUpload}
                  className={`file-upload-area ${
                    medicalHistoryFile
                      ? "file-upload-area-success"
                      : "file-upload-area-default"
                  } flex flex-col items-center justify-center h-40`}
                >
                  {medicalHistoryPreview ? (
                    <>
                      <img
                        src={medicalHistoryPreview || "/placeholder.svg"}
                        alt="Vista previa de historial médico"
                        className="h-24 object-contain mb-2"
                      />
                      <div className="flex items-center text-green-400">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-sm">Archivo cargado</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400 text-center">
                        Haga clic para subir su historial médico
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-800/30 rounded-md p-4 text-blue-300 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium mb-1">Información importante</p>
                <p>
                  Todos los documentos deben estar en formato JPG, PNG o PDF y
                  no deben exceder 5MB cada uno. Sus documentos serán tratados
                  con confidencialidad según nuestra política de privacidad.
                </p>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Link href="/registro" className="btn-secondary">
                Volver
              </Link>
              <button type="submit" disabled={loading} className="btn-primary">
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
                    Finalizando...
                  </>
                ) : (
                  "Finalizar Registro"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
