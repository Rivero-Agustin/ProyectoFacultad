import { parseISO, format } from "date-fns";

export const formatearFecha = (fecha: string) => {
  return format(parseISO(fecha), "dd/MM/yyyy");
};
