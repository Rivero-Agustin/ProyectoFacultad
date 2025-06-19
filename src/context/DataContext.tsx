"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type Measurement = {
  value: number;
  unit: string;
  type: string; // Tipo de medición
  indexType: number; // Indice del tipo de medición
};

export type ClaseProteccion = "Clase I" | "Clase II";
export type TipoEnsayo =
  | "Antes de poner en servicio"
  | "Recurrente"
  | "Después de la reparación";
export type TipoAlimentacion =
  | "Conexion a red"
  | "Batería"
  | "Conexión a red y batería";
export type TipoParteAplicable = "0" | "B" | "BF" | "CF";
export type ConexionRed =
  | "Permanentemente instalado"
  | "Cordón de alimentación no desmontable"
  | "Cordón de alimentación desconectable";

type DatosEnsayo = {
  organizacionEnsayo: string; // Organización que realiza el ensayo
  nombrePersona: string; //Nombre de la persona que realiza el ensayo
  tipoEnsayo: TipoEnsayo;
  organizacionResponsable: string; // Organización responsable
  dispositivo: string; // Dispositivo
  numeroIdentificacion: string; // Número de identificación del dispositivo
  tipoDispositivo: string; // Tipo de dispositivo
  numeroSerie: string; // Número de serie del dispositivo
  fabricante: string; // Fabricante del dispositivo
  tipoAlimentacion: TipoAlimentacion; // Tipo de alimentación del dispositivo: red || Batería || Batería y red
  claseProteccion: ClaseProteccion; // Clase de protección del dispositivo
  tipoParteAplicable: TipoParteAplicable; // Tipo de parte aplicable: 0 || B || BF || CF
  conexionRed: ConexionRed; // Conexión a red: API || CAND || CAD
  accesorios: string; // Accesorios del dispositivo
  fecha: string;

  comentario: string; // Comentario adicional del ensayo
  inspeccionVisual: string; // Comentario de inspección visual
};

type DataContextProps = {
  measurements: Measurement[];
  addMeasurement: (measurement: Measurement) => void;
  clearMeasurements: () => void;
  datosEnsayo: DatosEnsayo; // Datos del ensayo
  setDatosEnsayo: (datos: Partial<DatosEnsayo>) => void; // Función para establecer los datos del ensayo
  esPrimeraConexion: boolean;
  setEsPrimeraConexion: (value: boolean) => void;
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

//DataProvider: Es el componente que encapsula la aplicación y proporciona el contexto con el array de mediciones y funciones para agregar y limpiar datos

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  // Permite undefined solo en el estado inicial
  const [datosEnsayo, setDatosEnsayo] = useState<
    Omit<
      DatosEnsayo,
      | "tipoEnsayo"
      | "claseProteccion"
      | "tipoAlimentacion"
      | "tipoParteAplicable"
      | "conexionRed"
    > & {
      tipoEnsayo?: TipoEnsayo;
      claseProteccion?: ClaseProteccion;
      tipoAlimentacion?: TipoAlimentacion;
      tipoParteAplicable?: TipoParteAplicable;
      conexionRed?: ConexionRed;
    }
  >({
    organizacionEnsayo: "",
    nombrePersona: "",
    tipoEnsayo: undefined,
    organizacionResponsable: "",
    dispositivo: "",
    numeroIdentificacion: "",
    tipoDispositivo: "",
    numeroSerie: "",
    fabricante: "",
    tipoAlimentacion: undefined,
    claseProteccion: undefined,
    tipoParteAplicable: undefined,
    conexionRed: undefined,
    accesorios: "",
    fecha: "",

    comentario: "",
    inspeccionVisual: "", // Comentario de inspección visual
  }); // Estado para almacenar los datos del ensayo
  const [esPrimeraConexion, setEsPrimeraConexion] = useState(true);

  // Función para agregar una nueva medición al array
  const addMeasurement = (measurement: Measurement) => {
    setMeasurements(
      (prev) => [...prev, measurement].sort((a, b) => a.indexType - b.indexType) // Ordena las mediciones por el índice del tipo de medición
    );
  };

  // Función para reiniciar o limpiar las mediciones almacenadas
  const clearMeasurements = () => {
    setMeasurements([]);
  };

  return (
    <DataContext.Provider
      value={{
        measurements,
        addMeasurement,
        clearMeasurements,
        datosEnsayo: datosEnsayo as DatosEnsayo, // Type assertion, asegúrate de validar antes de usar
        setDatosEnsayo: (datos) =>
          setDatosEnsayo((prev) => ({ ...prev, ...datos })), // Actualiza los datos del ensayo, manteniendo los valores existentes
        // Permite actualizar solo algunos campos de los datos del ensayo
        esPrimeraConexion,
        setEsPrimeraConexion,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// Un hook personalizado para acceder fácilmente al contexto desde cualquier componente
export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context)
    throw new Error("useDataContext must be used within a DataProvider");
  return context;
};

export const OPCIONES_TIPO_ENSAYO: TipoEnsayo[] = [
  "Antes de poner en servicio",
  "Recurrente",
  "Después de la reparación",
];

export const OPCIONES_CLASE_PROTECCION: ClaseProteccion[] = [
  "Clase I",
  "Clase II",
];
export const OPCIONES_TIPO_ALIMENTACION: TipoAlimentacion[] = [
  "Conexion a red",
  "Batería",
  "Conexión a red y batería",
];
export const OPCIONES_TIPO_PARTE_APLICABLE: TipoParteAplicable[] = [
  "0",
  "B",
  "BF",
  "CF",
];
export const OPCIONES_CONEXION_RED: ConexionRed[] = [
  "Permanentemente instalado",
  "Cordón de alimentación no desmontable",
  "Cordón de alimentación desconectable",
];
