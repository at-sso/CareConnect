"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";

interface RegistrationData {
  nombres: string;
  apellidos: string;
  fecha: string;
  cedula: string;
  email: string;
  password: string;
}

export default function RegistroPaso2Page() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState({
    cedula: null as File | null,
    recetas: null as File | null,
    historial: null as File | null,
  });
  const [fileErrors, setFileErrors] = useState({
    cedula: "",
    historial: "",
  });
  const [filePreview, setFilePreview] = useState({
    cedula: "",
    recetas: "",
    historial: "",
  });
  const [uploadProgress, setUploadProgress] = useState({
    cedula: 0,
    recetas: 0,
    historial: 0,
  });

  // Create refs for file inputs
  const cedulaInputRef = useRef<HTMLInputElement>(null);
  const recetasInputRef = useRef<HTMLInputElement>(null);
  const historialInputRef = useRef<HTMLInputElement>(null);

  // Check if registration data exists
  useEffect(() => {
    const registroData = sessionStorage.getItem("registroData");
    if (!registroData) {
      toast({
        title: "Error",
        description: "Por favor complete el primer paso del registro",
        variant: "destructive",
      });
      router.push("/registro");
    }
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;

    // Clear error when user selects a file
    if (fileErrors[name as keyof typeof fileErrors]) {
      setFileErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "El archivo no debe superar los 5MB",
        }));
        return;
      }

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
      ];
      if (!allowedTypes.includes(file.type)) {
        setFileErrors((prev) => ({
          ...prev,
          [name]: "Solo se permiten imágenes (JPG, PNG, GIF) y PDF",
        }));
        return;
      }

      // Set file
      setFiles((prev) => ({
        ...prev,
        [name]: file,
      }));

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview((prev) => ({
            ...prev,
            [name]: e.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);
      } else {
        // For PDFs, just show an icon or text
        setFilePreview((prev) => ({
          ...prev,
          [name]: "pdf",
        }));
      }

      // Simulate upload progress
      simulateUploadProgress(name);
    }
  };

  const simulateUploadProgress = (fieldName: string) => {
    setUploadProgress((prev) => ({ ...prev, [fieldName]: 0 }));

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev[fieldName as keyof typeof prev] + 10;

        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [fieldName]: 100 };
        }

        return { ...prev, [fieldName]: newProgress };
      });
    }, 200);
  };

  const validateFiles = (): boolean => {
    let isValid = true;
    const newErrors = { ...fileErrors };

    // Validate required files
    if (!files.cedula) {
      newErrors.cedula = "La foto de cédula es requerida";
      isValid = false;
    }

    if (!files.historial) {
      newErrors.historial = "El historial médico es requerido";
      isValid = false;
    }

    setFileErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateFiles()) return;

    setIsLoading(true);

    try {
      // Get registration data from session storage
      const registroDataStr = sessionStorage.getItem("registroData");
      if (!registroDataStr) {
        throw new Error("No se encontraron los datos del registro");
      }

      const registroData = JSON.parse(registroDataStr) as RegistrationData;

      // Register the user
      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cedula: registroData.cedula,
          password: registroData.password,
          nombre: registroData.nombres,
          apellido: registroData.apellidos,
          fecha_de_nacimiento: registroData.fecha,
          email: registroData.email,
        }),
      });

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        throw new Error(errorData.error || "Error al registrar usuario");
      }

      // Upload files to server
      await uploadFiles(registroData.cedula);

      // Clear registration data from session storage
      sessionStorage.removeItem("registroData");

      toast({
        title: "Registro completado",
        description: "Tus documentos han sido cargados correctamente.",
      });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error al completar el registro",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to upload files
  const uploadFiles = async (cedula: string) => {
    // In a real application, you would upload the files to your server
    // This is a placeholder for file upload logic

    // Create FormData objects for each file
    const formData = new FormData();

    if (files.cedula) {
      formData.append("cedula", files.cedula);
    }

    if (files.recetas) {
      formData.append("recetas", files.recetas);
    }

    if (files.historial) {
      formData.append("historial", files.historial);
    }

    formData.append("userId", cedula);

    // For now, we'll just log the files and simulate a successful upload
    console.log("Files to upload:", files);
    console.log("FormData prepared for upload:", formData);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // In a real application, you would make an API call like this:
    /*
    const response = await fetch('/api/upload-documents', {
      method: 'POST',
      body: formData,
    })
    
    if (!response.ok) {
      const data = await response.json()
      throw new Error(data.error || 'Error al subir los documentos')
    }
    
    return await response.json()
    */

    // Return mock successful response
    return { success: true };
  };

  // Handlers for clicking the upload areas
  const handleCedulaClick = () => {
    if (cedulaInputRef.current) {
      cedulaInputRef.current.click();
    }
  };

  const handleRecetasClick = () => {
    if (recetasInputRef.current) {
      recetasInputRef.current.click();
    }
  };

  const handleHistorialClick = () => {
    if (historialInputRef.current) {
      historialInputRef.current.click();
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-2xl">
        {/* Encabezado */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Subir Documentos
          </h1>
          <p className="text-gray-600">
            Por favor adjunta los documentos requeridos para completar tu
            registro.
          </p>
        </div>

        {/* Formulario de archivos */}
        <form id="registro-docs" onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Cedula */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Foto de Cédula / ID <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-4 transition-colors relative ${
                  fileErrors.cedula
                    ? "border-red-400 bg-red-50"
                    : files.cedula
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 bg-gray-50"
                }`}
                onClick={handleCedulaClick}
              >
                <div className="flex flex-col items-center justify-center py-3">
                  {filePreview.cedula ? (
                    <div className="mb-3 text-center">
                      {filePreview.cedula === "pdf" ? (
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                          </svg>
                          <p className="mt-1 text-sm text-gray-700">
                            Documento PDF
                          </p>
                        </div>
                      ) : (
                        <img
                          src={filePreview.cedula || "/placeholder.svg"}
                          alt="Vista previa"
                          className="h-32 object-contain rounded-lg"
                        />
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {files.cedula?.name} (
                        {(files.cedula?.size || 0) / 1024 < 1000
                          ? `${Math.round((files.cedula?.size || 0) / 1024)} KB`
                          : `${
                              Math.round(
                                ((files.cedula?.size || 0) / 1024 / 1024) * 10
                              ) / 10
                            } MB`}
                        )
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Haga clic para seleccionar o arrastre un archivo
                      </p>
                      <p className="text-xs text-gray-400">
                        JPG, PNG, GIF o PDF (máx. 5MB)
                      </p>
                    </>
                  )}

                  {uploadProgress.cedula > 0 && uploadProgress.cedula < 100 && (
                    <div className="w-full mt-2">
                      <div className="bg-gray-200 rounded-full h-2.5 w-full">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${uploadProgress.cedula}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-1">
                        {uploadProgress.cedula}% subido
                      </p>
                    </div>
                  )}

                  {uploadProgress.cedula === 100 && (
                    <div className="flex items-center mt-2 text-green-500">
                      <CheckCircle2 className="w-5 h-5 mr-1" />
                      <span className="text-sm">Archivo listo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="cedula"
                  ref={cedulaInputRef}
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {fileErrors.cedula && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{fileErrors.cedula}</span>
                </div>
              )}
            </div>

            {/* Recetas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recetas Médicas (si aplica)
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-4 transition-colors relative ${
                  files.recetas
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 bg-gray-50"
                }`}
                onClick={handleRecetasClick}
              >
                <div className="flex flex-col items-center justify-center py-3">
                  {filePreview.recetas ? (
                    <div className="mb-3 text-center">
                      {filePreview.recetas === "pdf" ? (
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                          </svg>
                          <p className="mt-1 text-sm text-gray-700">
                            Documento PDF
                          </p>
                        </div>
                      ) : (
                        <img
                          src={filePreview.recetas || "/placeholder.svg"}
                          alt="Vista previa"
                          className="h-32 object-contain rounded-lg"
                        />
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {files.recetas?.name} (
                        {(files.recetas?.size || 0) / 1024 < 1000
                          ? `${Math.round(
                              (files.recetas?.size || 0) / 1024
                            )} KB`
                          : `${
                              Math.round(
                                ((files.recetas?.size || 0) / 1024 / 1024) * 10
                              ) / 10
                            } MB`}
                        )
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Haga clic para seleccionar o arrastre un archivo
                      </p>
                      <p className="text-xs text-gray-400">
                        JPG, PNG, GIF o PDF (máx. 5MB)
                      </p>
                    </>
                  )}

                  {uploadProgress.recetas > 0 &&
                    uploadProgress.recetas < 100 && (
                      <div className="w-full mt-2">
                        <div className="bg-gray-200 rounded-full h-2.5 w-full">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress.recetas}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                          {uploadProgress.recetas}% subido
                        </p>
                      </div>
                    )}

                  {uploadProgress.recetas === 100 && (
                    <div className="flex items-center mt-2 text-green-500">
                      <CheckCircle2 className="w-5 h-5 mr-1" />
                      <span className="text-sm">Archivo listo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="recetas"
                  ref={recetasInputRef}
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Historial Médico */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Historial Médico <span className="text-red-500">*</span>
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-4 transition-colors relative ${
                  fileErrors.historial
                    ? "border-red-400 bg-red-50"
                    : files.historial
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-blue-400 bg-gray-50"
                }`}
                onClick={handleHistorialClick}
              >
                <div className="flex flex-col items-center justify-center py-3">
                  {filePreview.historial ? (
                    <div className="mb-3 text-center">
                      {filePreview.historial === "pdf" ? (
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 text-red-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z"></path>
                            <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"></path>
                          </svg>
                          <p className="mt-1 text-sm text-gray-700">
                            Documento PDF
                          </p>
                        </div>
                      ) : (
                        <img
                          src={filePreview.historial || "/placeholder.svg"}
                          alt="Vista previa"
                          className="h-32 object-contain rounded-lg"
                        />
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {files.historial?.name} (
                        {(files.historial?.size || 0) / 1024 < 1000
                          ? `${Math.round(
                              (files.historial?.size || 0) / 1024
                            )} KB`
                          : `${
                              Math.round(
                                ((files.historial?.size || 0) / 1024 / 1024) *
                                  10
                              ) / 10
                            } MB`}
                        )
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        Haga clic para seleccionar o arrastre un archivo
                      </p>
                      <p className="text-xs text-gray-400">
                        JPG, PNG, GIF o PDF (máx. 5MB)
                      </p>
                    </>
                  )}

                  {uploadProgress.historial > 0 &&
                    uploadProgress.historial < 100 && (
                      <div className="w-full mt-2">
                        <div className="bg-gray-200 rounded-full h-2.5 w-full">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${uploadProgress.historial}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-1">
                          {uploadProgress.historial}% subido
                        </p>
                      </div>
                    )}

                  {uploadProgress.historial === 100 && (
                    <div className="flex items-center mt-2 text-green-500">
                      <CheckCircle2 className="w-5 h-5 mr-1" />
                      <span className="text-sm">Archivo listo</span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  name="historial"
                  ref={historialInputRef}
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {fileErrors.historial && (
                <div className="flex items-center mt-1 text-red-500">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  <span className="text-xs">{fileErrors.historial}</span>
                </div>
              )}
            </div>
          </div>

          {/* Botón Finalizar */}
          <div className="text-right mt-10">
            <button type="submit" disabled={isLoading} className="btn-primary">
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
                "Finalizar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
