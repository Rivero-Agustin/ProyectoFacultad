"use client";
import React from "react";
import { useDataContext } from "@/context/DataContext"; // Ajusta la ruta según tu estructura

export default function EstructuraMediciones() {
  const { measurements } = useDataContext(); // Función del contexto
  return (
    <>
      <div className="mt-6">
        <h2 className="text-lg font-bold">Mediciones</h2>
        {measurements.length > 0 ? (
          <ul>
            {measurements.map((m, index) => (
              <li key={index}>
                {m.indexType}: {m.type} - {m.value.toFixed(2)} {m.unit}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay mediciones aún.</p>
        )}
      </div>
    </>
  );
}
