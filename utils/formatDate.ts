export function formatDate(dateStr: string): string {
  if (!dateStr) return "";

  const fecha = new Date(dateStr);
  const dia = String(fecha.getUTCDate()).padStart(2, "0");
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
  const anio = fecha.getUTCFullYear();
  return `${dia}-${mes}-${anio}`;
}