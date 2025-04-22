"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Download, Eye, Upload } from "lucide-react";

interface Documento {
  id: string;
  tipo: string;
  fecha: string;
  formato: string;
  url: string;
}

export default function DocumentosPage() {
  const router = useRouter();
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchDocumentos();
  }, []);

  const fetchDocumentos = async () => {
    try {
      // In a real application, you would fetch documents from your API
      // For now, we'll use mock data

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock documents data
      setDocumentos([
        {
          id: "1",
          tipo: "Cédula / ID",
          fecha: "18/04/2025",
          formato: "PDF",
          url: "#",
        },
        {
          id: "2",
          tipo: "Historial Médico",
          fecha: "18/04/2025",
          formato: "Imagen",
          url: "#",
        },
        {
          id: "3",
          tipo: "Receta Médica",
          fecha: "18/04/2025",
          formato: "PDF",
          url: "#",
        },
      ]);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los documentos",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "El archivo no debe superar los 5MB",
        variant: "destructive",
      });
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
      toast({
        title: "Error",
        description: "Solo se permiten imágenes (JPG, PNG, GIF) y PDF",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          return prev + 5;
        });
      }, 100);

      // In a real application, you would upload the file to your server
      // This is a placeholder for file upload logic
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tipo", "Documento adicional");

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Complete the progress
      setUploadProgress(100);

      // Add the new document to the list
      const newDoc: Documento = {
        id: `new-${Date.now()}`,
        tipo: "Documento adicional",
        fecha: new Date().toLocaleDateString(),
        formato: file.type.includes("pdf") ? "PDF" : "Imagen",
        url: "#",
      };

      setDocumentos((prev) => [...prev, newDoc]);

      toast({
        title: "Documento subido",
        description: "El documento se ha subido correctamente",
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      toast({
        title: "Error",
        description: "No se pudo subir el documento",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const viewDocument = (id: string) => {
    // In a real application, you would open the document in a new tab
    // For now, we'll just show a toast
    toast({
      title: "Ver documento",
      description: `Visualizando documento ID: ${id}`,
    });
  };

  const downloadDocument = (id: string) => {
    // In a real application, you would download the document
    // For now, we'll just show a toast
    toast({
      title: "Descargar documento",
      description: `Descargando documento ID: ${id}`,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-blue-50">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-blue-600 mb-4"
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
          <p className="text-gray-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-6 bg-blue-50">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-5xl">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-800">Mis Documentos</h1>
            <p className="text-gray-600">
              Aquí puedes ver los documentos que has subido a tu perfil.
            </p>
          </div>

          {/* Upload button */}
          <div className="relative">
            <button
              className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center ${
                isUploading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Subiendo..." : "Subir documento"}
            </button>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Upload progress */}
        {isUploading && (
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">
              {uploadProgress}% completado
            </p>
          </div>
        )}

        {/* Tabla de Documentos */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-blue-100 text-blue-700">
              <tr>
                <th className="px-4 py-3">📄 Tipo de Documento</th>
                <th className="px-4 py-3">🕓 Fecha de Subida</th>
                <th className="px-4 py-3">📁 Formato</th>
                <th className="px-4 py-3">🔗 Acción</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {documentos.length > 0 ? (
                documentos.map((documento) => (
                  <tr key={documento.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{documento.tipo}</td>
                    <td className="px-4 py-3">{documento.fecha}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          documento.formato === "PDF"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {documento.formato}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => viewDocument(documento.id)}
                        className="text-blue-600 hover:text-blue-800 mr-4 inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </button>
                      <button
                        onClick={() => downloadDocument(documento.id)}
                        className="text-green-600 hover:text-green-800 inline-flex items-center"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No hay documentos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Botón de regreso */}
        <div className="mt-10 text-center">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            Volver al Portal del Cliente
          </Link>
        </div>
      </div>
    </div>
  );
}
