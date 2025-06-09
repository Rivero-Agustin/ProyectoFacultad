"use client";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import Parrafo from "@/components/Parrafo";
import TitleCard from "@/components/TitleCard";
import Image from "next/image";

import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import { AppButton } from "@/components/AppButton";
import { useRouter } from "next/navigation"; // Importa el hook useRouter de next/navigation

export default function Tierra() {
  const router = useRouter(); // Inicializa el router
  const { datosEnsayo } = useDataContext();
  const [paso, setPaso] = useState(0);

  const handleClick = () => {
    if (
      datosEnsayo.conexionRed === "Cordón de alimentación desconectable" &&
      paso < 2
    ) {
      setPaso(paso + 1);
    } else {
      // Si no es el caso del cordón desconectable o ya se completaron los pasos de esta, redirige a la siguiente página
      router.push("/mediciones/aislamiento");
    }
  };

  let contenidoExtra = null;
  switch (datosEnsayo.conexionRed) {
    case "Permanentemente instalado":
      contenidoExtra = (
        <>
          <Parrafo>
            Se mide la resistencia entre el TERMINAL DE TIERRA DE PROTECCIÓN del
            aparato y las PARTES CONDUCTORAS ACCESIBLES puestas a tierra de
            protección del aparato.
          </Parrafo>
          <Parrafo>
            El valor de la medición debe ser menor o igual a 300 mΩ.
          </Parrafo>

          <div className="flex flex-col items-center m-1">
            <Image
              src="/Figura 2.JPG"
              alt="Circuito de Tierra de Protección"
              width={600}
              height={600}
            />
            <MeasurementFlowContainer unidad="mΩ" sendParam="6" />
          </div>
        </>
      );
      break;
    case "Cordón de alimentación no desmontable":
      contenidoExtra = (
        <>
          <Parrafo>
            Se mide la resistencia entre el conector de tierra de protección de
            la FICHA DE RED y las PARTES CONDUCTORAS ACCESIBLES puestas a tierra
            de protección del aparato.
          </Parrafo>
          <Parrafo>
            El valor de la medición debe ser menor o igual a 300 mΩ.
          </Parrafo>
          <div className="flex flex-col items-center m-1">
            <Image
              src="/Figura 1.JPG"
              alt="Circuito de Tierra de Protección"
              width={600}
              height={600}
            />
            <MeasurementFlowContainer unidad="mΩ" sendParam="6" />
          </div>
        </>
      );
      break;
    case "Cordón de alimentación desconectable":
      contenidoExtra = (
        <>
          {paso === 0 && (
            <>
              <Parrafo>
                Se mide la resistencia entre el conector de tierra de protección
                del TOMACORRIENTES y las PARTES CONDUCTORAS ACCESIBLES puestas a
                tierra de protección del aparato.
              </Parrafo>
              <Parrafo>
                El valor de la medición debe ser menor o igual a 200 mΩ.
              </Parrafo>
              <MeasurementFlowContainer unidad="mΩ" sendParam="6" paso={paso} />
            </>
          )}
          {paso === 1 && (
            <>
              <Parrafo>
                Se mide la resistencia entre las conexiones de tierra de cada
                extremo del CORDÓN DE ALIMENTACIÓN en sí.
              </Parrafo>
              <Parrafo>
                El valor de la medición debe ser menor o igual a 100 mΩ.
              </Parrafo>
              <MeasurementFlowContainer unidad="mΩ" sendParam="6" paso={paso} />
            </>
          )}
          {paso === 2 && (
            <>
              <Parrafo>
                Se mide la resistencia del CORDÓN DE ALIMENTACIÓN y el APARATO
                EM juntos.
              </Parrafo>
              <Parrafo>
                El valor de la medición debe ser menor o igual a 300 mΩ.
              </Parrafo>
              <MeasurementFlowContainer unidad="mΩ" sendParam="6" paso={paso} />
            </>
          )}
          <div className="flex flex-col items-center m-1 gap-2">
            <Image
              src="/Figura 1.JPG"
              alt="Circuito de Tierra de Protección"
              width={600}
              height={600}
            />
          </div>
        </>
      );
      break;
    default:
      contenidoExtra = <Parrafo>Tipo de conexión no especificado.</Parrafo>;
  }

  return (
    <>
      <TitleCard title="Resistencia de Tierra de Protección" />

      <Parrafo>
        El tipo de alimentación del dispositivo es{" "}
        <span className="font-bold">{datosEnsayo.conexionRed}</span>
      </Parrafo>
      {contenidoExtra}
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
