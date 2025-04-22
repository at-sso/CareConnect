import Link from "next/link";
import Image from "next/image";

export default function ServiciosPage() {
  const servicios = [
    {
      nombre: "Odontología",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Fisiatría",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Cardiología",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Pediatría",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Ortopedia",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Nutricionista",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Psicología",
      imagen: "/placeholder.svg?height=80&width=80",
    },
    {
      nombre: "Próximamente",
      imagen: "/placeholder.svg?height=80&width=80",
      disabled: true,
    },
  ];

  return (
    <div className="bg-blue-50 min-h-screen flex items-center justify-center font-sans p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-10">
          <Image src="/images/logo.png" alt="Logo" width={64} height={64} />
          <h1 className="text-2xl font-bold text-blue-900 text-center w-full -ml-16">
            Especialidades Médicas
          </h1>
        </div>

        {/* Servicios */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {servicios.map((servicio, index) => (
            <div
              key={index}
              className={`${
                servicio.disabled ? "bg-gray-200" : "bg-blue-100"
              } rounded-2xl shadow p-4 flex flex-col items-center`}
            >
              <Image
                src={servicio.imagen || "/placeholder.svg"}
                alt={servicio.nombre}
                width={80}
                height={80}
                className="mb-2 rounded-full object-cover"
              />
              <p className="text-center font-medium">{servicio.nombre}</p>
            </div>
          ))}
        </div>

        {/* Botón regresar */}
        <div className="text-right">
          <Link
            href="/"
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-xl transition"
          >
            Regresar
          </Link>
        </div>
      </div>
    </div>
  );
}
