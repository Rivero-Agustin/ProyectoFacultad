"use client";

import { useState } from "react";
import { useDataContext } from "@/context/DataContext"; // Ajusta la ruta según tu estructura

const AddMeasurementButton = () => {
  const { addMeasurement, measurements } = useDataContext(); // Función del contexto
  const [valueMeasured, setValue] = useState("");

  const handleAddMeasurement = () => {
    const value = parseFloat(valueMeasured); //Convierte el valor ingresado en numero
    if (!isNaN(value)) {
      addMeasurement({ timestamp: Date.now(), value });
      setValue(""); // Limpiar el input después de agregar
    } else {
      alert("Ingrese un número válido.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="number"
        value={valueMeasured}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ingrese valor"
        className="border p-2 rounded-lg text-black"
      />
      <button
        onClick={handleAddMeasurement}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Agregar Valor
      </button>
      Mostrar las mediciones acumuladas
      <div className="mt-6">
        <h2 className="text-lg font-bold">Mediciones</h2>
        {measurements.length > 0 ? (
          <ul>
            {measurements.map((m, index) => (
              <li key={index}>
                {new Date(m.timestamp).toLocaleTimeString()} -{" "}
                {m.value.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay mediciones aún.</p>
        )}
      </div>
    </div>
  );
};

export default AddMeasurementButton;
