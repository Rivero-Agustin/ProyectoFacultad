"use client";

import React from "react";
import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import EstructuraMediciones from "./EstructuraMediciones";
import { toast } from "sonner";
import { AppButton } from "./AppButton";

type SaveMeasurementButtonProps = {
  saveValue: string; // Valor a guardar
  unit: string; // Unidad de medida
  type: number; // Tipo de medición
  setIsOpen: (isOpen: boolean) => void; // Función para abrir el popup
  paso: number;
  disabledSave?: boolean;
  onGuardar?: () => void;
  textoFicha?: string;
  setSobreescribirFichaIsOpen?: (sobreEscribirFichaIsOpen: boolean) => void;
  setNoSobreescribirFichaIsOpen?: (sobreEscribirFichaIsOpen: boolean) => void;
  [key: string]: any; // Para otras props como onClick, id, etc.
};

export default function SaveMeasurementButton({
  saveValue,
  unit,
  type,
  setIsOpen,
  paso,
  disabledSave,
  onGuardar,
  textoFicha,
  setSobreescribirFichaIsOpen,
  setNoSobreescribirFichaIsOpen,
  ...props
}: SaveMeasurementButtonProps) {
  const { addMeasurement, measurements } = useDataContext(); // Función del contexto
  const value = parseFloat(saveValue); //Convierte el valor ingresado en numero
  let sobreescribirFicha = false;

  let tipoMedicion;
  //Se busca el mayor indice entre 30 y 39 (fuga partes directo)
  let maxIndexType = measurements
    .map((obj) => obj.indexType)
    .filter(
      (indexType) =>
        typeof indexType === "number" && indexType >= 31 && indexType <= 39
    )
    .reduce((max, curr) => Math.max(max, curr), -Infinity);

  switch (type) {
    case 1:
      if (textoFicha) {
        tipoMedicion = `Corriente de fuga del equipo - Método directo - Ficha: ${textoFicha}`;

        //Si el valor ya guardado es MAYOR que el nuevo, no hay que sobreescribirlo
        if (measurements.some((m) => m.indexType === 1 && m.value > value)) {
          sobreescribirFicha = false;
        } else {
          sobreescribirFicha = true;
        }
      } else {
        tipoMedicion = "Corriente de fuga del equipo - Método directo";
      }

      break;

    case 2:
      tipoMedicion = "Corriente de fuga del equipo - Método alternativo";
      break;
    case 3:
      if (textoFicha) {
        tipoMedicion = `Corriente de fuga de partes aplicables - Método directo - Ficha: ${textoFicha}`;
      } else {
        tipoMedicion =
          "Corriente de fuga de partes aplicables - Método directo";
      }

      //Logica para incrementar los indices y guardar mas de una medicion para distintas posiciones
      if (maxIndexType === -Infinity) {
        type = 31;
      } else {
        type = maxIndexType + 1;
      }
      break;
    case 4:
      tipoMedicion = "Corriente de partes aplicables - Método alternativo";
      break;
    case 5:
      tipoMedicion = "Resistencia de aislamiento";
      switch (paso) {
        case 1:
          tipoMedicion =
            "Resistencia entre la PARTE ALIMENTADA DESDE LA RED y la TIERRA DE PROTECCIÓN";
          type = 51;
          break;
        case 2:
          tipoMedicion =
            "Resistencia entre la PARTE ALIMENTADA DESDE LA RED y PARTES CONDUCTORAS ACCESIBLES (no puestas a tierra)";
          type = 52;
          break;
        case 3:
          tipoMedicion =
            "Resistencia entre la PARTE ALIMENTADA DESDE LA RED y las PARTES APLICABLES con todas las PARTES APLICABLES DEL TIPO B a ensayar conectadas juntas";
          type = 53;
          break;
        case 4:
          tipoMedicion =
            "Resistencia entre la PARTE ALIMENTADA DESDE LA RED y las PARTES APLICABLES con todas las PARTES APLICABLES DEL TIPO F a ensayar conectadas juntas";
          type = 54;
          break;
        case 5:
          tipoMedicion =
            "Resistencia entre las PARTES APLICABLES DEL TIPO F que hacen una conexión al paciente y la TIERRA DE PROTECCIÓN";
          type = 55;
          break;
        case 6:
          tipoMedicion =
            "Resistencia entre las PARTES APLICABLES DEL TIPO F que hacen una conexión al paciente y las PARTES CONDUCTORAS ACCESIBLES (que no están puestas a tierra)";
          type = 56;
          break;
        case 7:
          tipoMedicion =
            "Resistencia entre las PARTES APLICABLES DEL TIPO F y la TIERRA FUNCIONAL";
          type = 57;
          break;
        default:
          tipoMedicion = "Resistencia de aislamiento";
      }
      break;
    case 6:
      switch (paso) {
        case 0:
          tipoMedicion =
            "Resistencia entre conector de tierra de protección del TOMACORRIENTES y las PARTES CONDUCTORAS ACCESIBLES puestas a tierra";
          type = 60;
          break;
        case 1:
          tipoMedicion =
            "Resistencia entre las conexiones de tierra de cada extremo del CORDÓN DE ALIMENTACIÓN";
          type = 61;
          break;
        case 2:
          tipoMedicion =
            "Resistencia del CORDÓN DE ALIMENTACIÓN y el APARATO EM juntos";
          type = 62;
          break;
        default:
          tipoMedicion = "Resistencia de tierra de protección";
          break;
      }
      break;
    default:
      tipoMedicion = "Tipo de medición no definido";
      break;
  }

  const handleAddMeasurement = () => {
    //Si la medicion se repite
    if (measurements.some((e) => e.indexType == type)) {
      //Abre el popup de sobreescritura normal para las mediciones != a la 1
      if (type !== 1) {
        setIsOpen(true); // Abre el popup de sobreescritura si la medicion ya se ha guardado
      } else {
        // Para la medicion 1, segun si hay que sobreescribir abre los respectivos popup
        if (sobreescribirFicha) {
          setSobreescribirFichaIsOpen?.(true);
        } else {
          setNoSobreescribirFichaIsOpen?.(true);
        }
      }
    } else {
      //Si la medicion no esta repetida se guarda normalmente
      if (!isNaN(value)) {
        addMeasurement({
          // Agregar la medición al contexto
          value,
          unit,
          type: tipoMedicion,
          indexType: type, // Agregar el índice del tipo de medición
        });
        toast.success("Medición guardada correctamente"); // Notificacion de éxito
      }
    }
    onGuardar?.(); //Ejecuta el callback al presionar guardar
  };

  return (
    <>
      <AppButton
        variant="saveButton"
        onClick={handleAddMeasurement}
        disabled={disabledSave}
        {...props}
      >
        Guardar
      </AppButton>
    </>
  );
}
