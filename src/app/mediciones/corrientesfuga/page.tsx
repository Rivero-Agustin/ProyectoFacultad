"use client";
import { AppButton } from "@/components/AppButton";
import DoubleCard from "@/components/DoubleCard";
import MeasurementFlowContainer from "@/components/MeasurementFlowContainer";
import Parrafo from "@/components/Parrafo";
import PopupConfirm from "@/components/popups/PopupConfirm";
import SubtitleCard from "@/components/SubtitleCard";
import TitleCard from "@/components/TitleCard";

import { useDataContext } from "@/context/DataContext";
import { set } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Corrientesfuga() {
  const [showPopupTierraOk, setshowPopupTierraOk] = useState(false);
  const [reparar, setReparar] = useState<boolean | undefined>();
  const [figura, setFigura] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const { datosEnsayo } = useDataContext();

  useEffect(() => {
    if (datosEnsayo.claseProteccion === "Clase I") {
      setshowPopupTierraOk(true);
    }

    if (datosEnsayo.tipoAlimentacion === "Batería") {
      setSubtitle("Corriente de fuga de la Parte Aplicable - Método Directo");
      setFigura("Figura 11.JPG");
    } else {
      switch (datosEnsayo.conexionRed) {
        case "Permanentemente instalado":
          setSubtitle(
            "Corriente de contacto de Partes Conductoras accesibles que no están a tierra"
          );
          break;
        case "Cordón de alimentación desconectable":
          setSubtitle("Corriente de fuga del aparato");
          break;
        case "Cordón de alimentación no desmontable":
          setSubtitle("Corriente de fuga del aparato");
          break;
      }
    }
  }, []);

  return (
    <>
      <TitleCard title="Corrientes de Fuga" />

      <DoubleCard
        text={`Tipo de alimentación: ${datosEnsayo.tipoAlimentacion}`}
        subtitle={subtitle}
      ></DoubleCard>

      <PopupConfirm
        isOpen={showPopupTierraOk}
        title="El dispositivo es de Clase I"
        message="Pasó el ensayo de Tierra de Protección?"
        confirmText="Sí"
        onConfirm={() => {
          setshowPopupTierraOk(false);
          setReparar(false);
        }}
        cancelText="No"
        onCancel={() => {
          setshowPopupTierraOk(false);
          setReparar(true);
        }}
      />

      {reparar && (
        <>
          <Parrafo>
            Se debe reparar el dispositivo y pasar el ensayo de Tierra de
            Protección para poder continuar con el ensayo de Corrientes de Fuga.
          </Parrafo>
        </>
      )}

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

      <MeasurementFlowContainer unidad="mA" sendParam="3" />

      <AppButton className="flex mx-auto mt-2">Siguiente</AppButton>
    </>
  );
}
