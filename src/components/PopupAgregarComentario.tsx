// components/Popup.tsx
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useDataContext } from "@/context/DataContext";

import Modal from "react-modal";
import { AppButton } from "./AppButton";

// Configurar el elemento raíz para accesibilidad

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
  setShowPreview: (show: boolean) => void; // Prop para manejar la vista previa
}

const PopupAgregarComentario = ({
  isOpen,
  onRequestClose,
  children,
  setShowPreview,
}: Props) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
      // Asegura que el modal se vincule correctamente al elemento raíz
    }
  }, []);

  const [comment, setComment] = useState("");
  const { setDatosEnsayo } = useDataContext(); // Función del contexto

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target; // Desestructura el evento
    setComment(value); // Actualiza el estado del comentario
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario
    setDatosEnsayo({ comentario: comment }); // Guarda el valor del comentario
    setComment(""); // Limpia la variable de comentario
    onRequestClose(); // Cierra el popup para agregar comentario
    setShowPreview(true); // Muestra la vista previa del PDF
  };

  const handleSkip = () => {
    setComment(""); // Limpia el campo de comentario
    setDatosEnsayo({ comentario: "" }); // Guarda un comentario vacío
    onRequestClose(); // Cierra el popup para agregar comentario
    setShowPreview(true); // Muestra la vista previa del PDF
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PopUp para agregar comentario"
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
          width: "50%",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      {children}

      <div className="grid-cols-1 gap-4 mt-2 w-full">
        <form onSubmit={handleSubmit} className="">
          <textarea
            className="border-2 rounded-lg text-black p-2 w-full h-28"
            value={comment}
            onChange={handleChange}
            placeholder="Agregue el comentario aquí..."
          ></textarea>

          <div className="flex justify-around w-full">
            <AppButton
              onClick={handleSkip}
              className="w-1/3"
              variant="buttonRed"
            >
              Omitir
            </AppButton>
            <AppButton
              className="w-1/3"
              type="submit" /*onClick={handleAgregarComentario}*/
            >
              Aceptar
            </AppButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PopupAgregarComentario;
