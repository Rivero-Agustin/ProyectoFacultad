"use client";

import React from "react";
import { useState } from "react";
import { useDataContext } from "@/context/DataContext"; // Ajusta la ruta según tu estructura
import { AppButton } from "./AppButton";
import EstructuraMediciones from "./EstructuraMediciones";

type SaveMeasurementButtonProps = {
  saveValue: string; // Valor a guardar
  unit: string; // Unidad de medida
  type: number; // Tipo de medición
};

export default function SaveMeasurementButton({
  saveValue,
  unit,
  type,
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
    if (!isNaN(value)) {
      addMeasurement({
        value,
        unit,
        type: tipoMedicion,
        indexType: type, // Agregar el índice del tipo de medición
      }); // Agregar la medición al contexto
    }
  };

  return (
    <>
      <button
        className="p-2 m-5 rounded-lg text-xl transition text-center bg-cyan-700 hover:bg-cyan-900"
        onClick={handleAddMeasurement}
      >
        Guardar
      </button>
      <EstructuraMediciones></EstructuraMediciones>
    </>
  );
}
