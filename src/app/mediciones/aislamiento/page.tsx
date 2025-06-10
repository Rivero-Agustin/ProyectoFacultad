"use client";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import Parrafo from "@/components/Parrafo";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useDataContext } from "@/context/DataContext";
import { AppButton } from "@/components/AppButton";
import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation
import { set } from "date-fns";

export default function Aislamiento() {
  const { datosEnsayo } = useDataContext();
  const [paso, setPaso] = useState(1);
  const [parte1, setParte1] = useState("la PARTE ALIMENTADA DESDE LA RED");
  const [parte2, setParte2] = useState("la TIERRA DE PROTECCIÓN");
  const [valorLimite, setValorLimite] = useState("1 MΩ");
  const [figura, setFigura] = useState("Figura 3-a.JPG");
  const router = useRouter(); // Inicializa el router

  //Para clase I inicia en paso 1
  // Para clase II inicia en paso 2
  if (datosEnsayo.claseProteccion === "Clase II") {
    setPaso(2);
  }

  useEffect(() => {
    switch (paso) {
      case 2:
        setParte1("parte1");
        setParte2("parte2");
        setValorLimite("nextvalue");
        setFigura("Figura 3-b.JPG");
        break;
    }
  }, [paso]);

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

  contenido = (
    <>
      <Parrafo>
        Se mide la resistencia entre {parte1} y {parte2}.
      </Parrafo>
      <Parrafo>
        El valor de la medición debe ser mayor o igual a {valorLimite}.
      </Parrafo>

      <div
        className="relative mx-auto my-4"
        style={{ width: 500, height: 200 }}
      >
        <Image
          src={`/${figura}`}
          alt="Figura"
          fill
          style={{ objectFit: "contain" }}
          className="flex"
        />
      </div>
      <MeasurementFlowContainer unidad="mA" sendParam="5" />
    </>
  );

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
