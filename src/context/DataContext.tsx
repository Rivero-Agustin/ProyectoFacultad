"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface Measurement {
  value: number;
  unit: string;
  type: string; // Tipo de medición
}

interface DataContextProps {
  measurements: Measurement[];
  addMeasurement: (measurement: Measurement) => void;
  clearMeasurements: () => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

//DataProvider: Es el componente que encapsula la aplicación y proporciona el contexto con el array de mediciones y funciones para agregar y limpiar datos

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [measurements, setMeasurements] = useState<Measurement[]>([]);

  // Función para agregar una nueva medición al array
  const addMeasurement = (measurement: Measurement) => {
    setMeasurements((prev) => [...prev, measurement]);
  };

  // Función para reiniciar o limpiar las mediciones almacenadas
  const clearMeasurements = () => {
    setMeasurements([]);
  };

  return (
    <DataContext.Provider
      value={{ measurements, addMeasurement, clearMeasurements }}
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
