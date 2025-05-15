// components/Popup.tsx
"use client";
import React from "react";
import { useEffect } from "react";
import { useDataContext } from "@/context/DataContext";

import Modal from "react-modal";
import { AppButton } from "../AppButton";
import { toast } from "sonner";
import { BaseModal } from "./BaseModal";

// Configurar el elemento raíz para accesibilidad

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  type: number; // Tipo de medición
  newValue: string; // Valor de la medición
}

const PopupSobreescritura = ({
  isOpen,
  onRequestClose,
  type,
  newValue,
}: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
      // Asegura que el modal se vincule correctamente al elemento raíz
    }
  }, []);

  const { measurements } = useDataContext(); // Función del contexto

  const handleSobreescribir = () => {
    const index = measurements.findIndex((m) => m.indexType == type); // Encuentra el índice de la medición existente
    if (index != -1) {
      measurements[index].value = parseFloat(newValue); // Sobreescribe el valor de la medición existente
    }
    toast.success("Medición sobreescrita correctamente"); // Muestra un mensaje de éxito
    onRequestClose(); // Cierra el popup
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PopUp de sobreescritura de medición"
      title="Esta medición ya se ha guardado"
      description="Desea sobreescribir la medición anterior?"
      footer={
        <div className="flex justify-around">
          <AppButton onClick={onRequestClose} variant="buttonRed">
            Cancelar
          </AppButton>
          <AppButton onClick={handleSobreescribir}>Aceptar</AppButton>
        </div>
      }
    ></BaseModal>
  );
};

export default PopupSobreescritura;
