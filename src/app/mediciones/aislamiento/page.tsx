"use client";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import Parrafo from "@/components/Parrafo";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import { AppButton } from "@/components/AppButton";
import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation
import { set } from "date-fns";

export default function Aislamiento() {
  const { datosEnsayo } = useDataContext();
  const [paso, setPaso] = useState(1);
  const router = useRouter(); // Inicializa el router

  if (datosEnsayo.claseProteccion === "Clase II") {
    setPaso(2);
  }

  const handleClick = () => {
    if (datosEnsayo.claseProteccion === "Clase I") {
      if (paso < 6) {
        setPaso(paso + 1);
      } else {
        router.push("/mediciones/fugaequipo");
      }
    } else if (datosEnsayo.claseProteccion === "Clase II") {
      switch (paso) {
        case 2:
          setPaso(paso + 1);
          break;
        case 3:
          setPaso(paso + 1);
          break;
        case 4:
          setPaso(6);
        case 6:
          setPaso(paso + 1);
          break;
        case 7:
          router.push("/mediciones/fugaequipo");
          break;
      }
    }
  };

  let contenido = null;
  switch (datosEnsayo.claseProteccion) {
    case "Clase I":
      contenido = (
        <>
          {paso === 1 && (
            <>
              <Parrafo>
                Se mide la resistencia entre la PARTE ALIMENTADA DESDE LA RED y
                la TIERRA DE PROTECCIÓN.
              </Parrafo>
              <Parrafo>
                El valor de la medición debe ser mayor o igual a 2 MΩ.
              </Parrafo>

              <Image
                className="flex mx-auto"
                src="/Figura 3-a.JPG"
                alt="Figura 3-a"
                width={300}
                height={300}
              />
              <MeasurementFlowContainer unidad="mA" sendParam="5" />
            </>
          )}
        </>
      );
  }

  return (
    <>
      <TitleCard title="Resistencia de Aislación" />

      <Parrafo>
        El dispositivo es de{" "}
        <span className="font-bold">{datosEnsayo.claseProteccion}</span>
      </Parrafo>

      {contenido}

      <AppButton
        className="flex mx-auto"
        variant="buttonCyan"
        onClick={handleClick}
      >
        Siguiente
      </AppButton>
    </>
  );
}
