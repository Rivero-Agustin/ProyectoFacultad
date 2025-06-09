// components/Popup.tsx
"use client";
import React from "react";
import { useEffect } from "react";
import { useDataContext } from "@/context/DataContext";

import Modal from "react-modal";
import { AppButton } from "../AppButton";
import { toast } from "sonner";

// Configurar el elemento raíz para accesibilidad

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  children?: React.ReactNode;
}

const PopupPerderDatos = ({ isOpen, onRequestClose, children }: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
      // Asegura que el modal se vincule correctamente al elemento raíz
    }
  }, []);

  const { clearMeasurements } = useDataContext(); // Función del contexto

  const handleLimpiarMediciones = () => {
    clearMeasurements(); // Limpia las mediciones almacenadas
    onRequestClose(); // Cierra el popup
    toast.info("Ensayo reiniciado.");
    window.history.back(); // Vuelve a la página anterior
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PopUp de perdida de datos"
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: "2rem",
          borderRadius: "1rem",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      {children}
      <div className="flex justify-center gap-4 mt-2">
        <AppButton
          onClick={onRequestClose}
          className="bg-red-500 hover:bg-red-800"
        >
          Cancelar
        </AppButton>
        <AppButton onClick={handleLimpiarMediciones}>Aceptar</AppButton>
      </div>
    </Modal>
  );
};

export default PopupPerderDatos;
