"use client";

import { useState, useEffect } from "react";

export default function MeasurementButton() {
  const [arduinoData, setArduinoData] = useState("");

  useEffect(() => {
    if (window.electron) {
      window.electron.onArduinoData((data) => {
        setArduinoData(data);
      });
    }

    return () => {
      if (window.electron) {
        window.electron.onArduinoData(() => {}); // Limpia el listener al desmontar
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {typeof arduinoData === "string" ? (
        <p className="text-orange-500 text-xl">Realizando medición...</p>
      ) : (
        <p className="text-green-600 text-xl">Resultado: {arduinoData} Ω</p>
      )}
    </div>
  );
}
