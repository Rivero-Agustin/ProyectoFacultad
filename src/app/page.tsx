"use client"; // Indica que este componente se ejecuta en el cliente
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
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

  const sendToArduino = () => {
    if (window.electron) {
      window.electron.sendToArduino("Hello Arduino!");
    }
  };

  return (
    <>
      <div>
        <p className="text-center">*Agregar indicaciones*</p>
        <p>
          Conecte el dispositivo -- Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Amet, non ullam perspiciatis possimus fugiat commodi
          sint vitae, at eaque similique impedit. Nihil aspernatur corrupti
          voluptas, nemo laboriosam beatae unde natus?
        </p>
        <p>Agregado para git</p>
        <h1>Datos de Arduino: {arduinoData}</h1>
        <button onClick={sendToArduino}>Enviar a Arduino</button>
      </div>
      <div className="flex flex-col items-center">
        <Link
          className="bg-cyan-700 p-2 m-5 hover:bg-cyan-900 rounded-lg"
          href="/iniciar"
        >
          Iniciar Medición
        </Link>
      </div>
    </>
  );
};

export default Home;
