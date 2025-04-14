// components/Popup.tsx
"use client";
import React from "react";
import { useEffect } from "react";
import { useDataContext } from "@/context/DataContext";

import Modal from "react-modal";
import { AppButton } from "./AppButton";

// Configurar el elemento raíz para accesibilidad

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  type: number; // Tipo de medición
  newValue: string; // Valor de la medición
}

const PopupSobreescritura = ({
  isOpen,
  onRequestClose,
  children,
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
    onRequestClose(); // Cierra el popup
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PopUp de sobreescritura de medición"
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
        <AppButton onClick={handleSobreescribir}>Aceptar</AppButton>
      </div>
    </Modal>
  );
};

export default PopupSobreescritura;
