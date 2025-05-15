// components/Popup.tsx
"use client";
import React from "react";
import { useDataContext } from "@/context/DataContext";
import { AppButton } from "../AppButton";
import { toast } from "sonner";
import { BaseModal } from "./BaseModal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  // children?: React.ReactNode; // opcional
}

const PopupPerderDatos = ({ isOpen, onRequestClose }: Props) => {
  const { clearMeasurements } = useDataContext();

  const handleLimpiarMediciones = () => {
    clearMeasurements(); // Limpia las mediciones almacenadas
    onRequestClose(); // Cierra el popup
    toast.info("Ensayo reiniciado.");
    window.history.back(); // Vuelve a la página anterior
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PopUp de perdida de datos"
      title="Si vuelve atrás se perderan las mediciones ya realizadas"
      description="Está seguro que desea continuar?"
      footer={
        <div className="flex justify-center gap-20 w-full">
          <AppButton
            onClick={onRequestClose}
            variant="buttonRed"
            className="w-1/4"
          >
            Cancelar
          </AppButton>
          <AppButton onClick={handleLimpiarMediciones} className="w-1/4">
            Aceptar
          </AppButton>
        </div>
      }
    ></BaseModal>
  );
};

export default PopupPerderDatos;
