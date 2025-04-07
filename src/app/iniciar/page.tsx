"use client";
import { AppLink } from "@/components/AppLink";
import EstructuraMediciones from "@/components/EstructuraMediciones";
import GeneratePDFButton from "@/components/GeneratePDFButton";
import MedicionRealizada from "@/components/MedicionRealizada";
import { useDataContext } from "@/context/DataContext";

export default function Iniciar() {
  const { measurements } = useDataContext(); // Función del contexto

  let medicionesRealizadas = [false, false, false, false, false, false]; // Array para verificar si la medición fue realizada o no

  //Actualiza el array de mediciones ya realizadas
  measurements.forEach((element) => {
    medicionesRealizadas[element.indexType] = true;
  });

  return (
    <>
      <h2 className="text-center">Seleccione la medición a realizar</h2>
      <div className="grid grid-cols-[1fr_auto] mx-20">
        <div className="contents">
          <AppLink className="w-full" href="/iniciar/fugaequipo">
            Corriente de fuga del equipo
          </AppLink>
          <MedicionRealizada
            realizada={medicionesRealizadas[1] || medicionesRealizadas[2]}
          ></MedicionRealizada>
        </div>
        <div className="contents">
          <AppLink className="w-full" href="/iniciar/fugapartes">
            Corriente de fuga de partes aplicables
          </AppLink>
          <MedicionRealizada
            realizada={medicionesRealizadas[3] || medicionesRealizadas[4]}
          ></MedicionRealizada>
        </div>
        <div className="contents">
          <AppLink className="w-full" href="/iniciar/aislamiento">
            Resistencia de aislamiento
          </AppLink>
          <MedicionRealizada
            realizada={medicionesRealizadas[5]}
          ></MedicionRealizada>
        </div>
        <div className="contents">
          <AppLink className="w-full" href="/iniciar/tierra">
            Resistencia de tierra de protección
          </AppLink>
          <MedicionRealizada
            realizada={medicionesRealizadas[6]}
          ></MedicionRealizada>
        </div>
      </div>
      <GeneratePDFButton />

      <div className="grid grid-cols-2">
        <div>
          <h1 className="font-bold">
            Vector de verificacion de mediciones realizadas
          </h1>
          <p>1: {medicionesRealizadas[1] ? "true" : "false"}</p>
          <p>2: {medicionesRealizadas[2] ? "true" : "false"}</p>
          <p>3: {medicionesRealizadas[3] ? "true" : "false"}</p>
          <p>4: {medicionesRealizadas[4] ? "true" : "false"}</p>
          <p>5: {medicionesRealizadas[5] ? "true" : "false"}</p>
          <p>6: {medicionesRealizadas[6] ? "true" : "false"}</p>
        </div>
        <EstructuraMediciones></EstructuraMediciones>
      </div>
    </>
  );
}
