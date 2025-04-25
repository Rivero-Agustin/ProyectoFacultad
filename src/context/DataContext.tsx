"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

type Measurement = {
  value: number;
  unit: string;
  type: string; // Tipo de medición
  indexType: number; // Indice del tipo de medición
};

type DatosEnsayo = {
  dispositivo: string; // Dispositivo
  nombre: string; //Nombre del tecnico que realiza la medicion
  fecha: string;
  comentario: string; // Comentario adicional del ensayo
};

type DataContextProps = {
  measurements: Measurement[];
  addMeasurement: (measurement: Measurement) => void;
  clearMeasurements: () => void;
  datosEnsayo: DatosEnsayo; // Datos del ensayo
  setDatosEnsayo: (datos: Partial<DatosEnsayo>) => void; // Función para establecer los datos del ensayo
};

const DataContext = createContext<DataContextProps | undefined>(undefined);

//DataProvider: Es el componente que encapsula la aplicación y proporciona el contexto con el array de mediciones y funciones para agregar y limpiar datos

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [datosEnsayo, setDatosEnsayo] = useState<DatosEnsayo>({
    dispositivo: "",
    nombre: "",
    fecha: "",
    comentario: "",
  }); // Estado para almacenar los datos del ensayo

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
        datosEnsayo,
        setDatosEnsayo: (datos) =>
          setDatosEnsayo((prev) => ({ ...prev, ...datos })), // Actualiza los datos del ensayo, manteniendo los valores existentes
        // Permite actualizar solo algunos campos de los datos del ensayo
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
