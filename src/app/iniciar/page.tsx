"use client";
import { AppLink } from "@/components/AppLink";
import Card from "@/components/Card";
import EstructuraMediciones from "@/components/EstructuraMediciones";
import GeneratePDFButton from "@/components/GeneratePDFButton";
import MedicionRealizada from "@/components/MedicionRealizada";
import { useEffect, useState } from "react";
import { useBackButton } from "@/context/BackButtonContext";
import { useDataContext } from "@/context/DataContext";
import { formatearFecha } from "@/utils/formatearFecha";
import PopupPerderDatos from "@/components/PopupPerderDatos";

export default function Iniciar() {
  const { measurements, datosEnsayo } = useDataContext(); // Función del contexto
  const { setOnBack } = useBackButton();
  const [showModal, setShowModal] = useState(false);

  let medicionesRealizadas = [false, false, false, false, false, false]; // Array para verificar si la medición fue realizada o no
  //Actualiza el array de mediciones ya realizadas
  measurements.forEach((element) => {
    medicionesRealizadas[element.indexType] = true;
  });

  // Funcion para BackButton, si hay mediciones relizadas, abre el popup
  useEffect(() => {
    setOnBack(() => () => {
      if (medicionesRealizadas.some((m) => m) === true) {
        setShowModal(true); // Abre el popup ya que se pueden borrar mediciones
      } else {
        window.history.back();
      }
    });

    return () => setOnBack(undefined); // Limpia la función al salir
  }, [setOnBack]);

  return (
    <>
      <PopupPerderDatos
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <div>
          <h2 className="mt-2 text-2xl font-bold text-black">
            Si vuelve atrás se perderan las mediciones ya realizadas
          </h2>
          <p className="mt-4 text-black text-center">
            Está seguro que desea continuar?
          </p>
        </div>
      </PopupPerderDatos>
      <div className="grid grid-cols-3 gap-2 mx-2">
        <Card title="Dispositivo" info={datosEnsayo.dispositivo}></Card>
        <Card title="Técnico laboratorista" info={datosEnsayo.nombre}></Card>
        <Card title="Fecha" info={formatearFecha(datosEnsayo.fecha)}></Card>
      </div>
      <h2 className="text-center mt-2">Seleccione la medición a realizar</h2>
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
