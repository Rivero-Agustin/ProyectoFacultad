"use client";

import React from "react";
import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import EstructuraMediciones from "./EstructuraMediciones";

type SaveMeasurementButtonProps = {
  saveValue: string; // Valor a guardar
  unit: string; // Unidad de medida
  type: number; // Tipo de medición
  setIsOpen: (isOpen: boolean) => void; // Función para abrir el popup
  [key: string]: any; // Para otras props como onClick, id, etc.
};

export default function SaveMeasurementButton({
  saveValue,
  unit,
  type,
  setIsOpen,
  ...props
}: SaveMeasurementButtonProps) {
  const { addMeasurement, measurements } = useDataContext(); // Función del contexto

  let tipoMedicion;

  switch (type) {
    case 1:
      tipoMedicion = "Corriente de fuga del equipo - Método directo";
      break;
    case 2:
      tipoMedicion = "Corriente de fuga del equipo - Método alternativo";
      break;
    case 3:
      tipoMedicion = "Corriente de partes aplicables - Método directo";
      break;
    case 4:
      tipoMedicion = "Corriente de partes aplicables - Método alternativo";
      break;
    case 5:
      tipoMedicion = "Resistencia de aislamiento";
      break;
    case 6:
      tipoMedicion = "Resistencia de tierra de protección";
      break;
    default:
      tipoMedicion = "Tipo de medición no definido";
      break;
  }

  const handleAddMeasurement = () => {
    const value = parseFloat(saveValue); //Convierte el valor ingresado en numero

    if (measurements.some((e) => e.indexType == type)) {
      setIsOpen(true); // Abre el popup si la medicion ya se ha guardado
    } else {
      if (!isNaN(value)) {
        addMeasurement({
          // Agregar la medición al contexto
          value,
          unit,
          type: tipoMedicion,
          indexType: type, // Agregar el índice del tipo de medición
        });
      }
    }
  };

  return (
    <>
      <button
        className="p-2 m-5 rounded-lg text-xl transition text-center bg-cyan-700 hover:bg-cyan-900"
        onClick={handleAddMeasurement}
        {...props}
      >
        Guardar
      </button>
      <EstructuraMediciones></EstructuraMediciones>
    </>
  );
}
