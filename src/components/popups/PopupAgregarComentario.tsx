// components/Popup.tsx
"use client";
import React from "react";
import { useState } from "react";
import { useDataContext } from "@/context/DataContext";
import { FiArrowLeft } from "react-icons/fi";

import { AppButton } from "../AppButton";
import { BaseModal } from "./BaseModal";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  setShowPreview: (show: boolean) => void; // Prop para manejar la vista previa
}

const PopupAgregarComentario = ({
  isOpen,
  onRequestClose,
  setShowPreview,
}: Props) => {
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
    <BaseModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="PopUp para agregar comentario"
      title="Desea agregar un comentario del ensayo?"
    >
      {/* Botón de volver atrás con icono de react-icons */}
      <button
        type="button"
        onClick={onRequestClose}
        className="absolute left-2 top-2 text-2xl text-gray-700 hover:text-black focus:outline-none "
        aria-label="Volver"
        style={{ zIndex: 10 }}
      >
        <FiArrowLeft />
      </button>
      <div className="flex flex-col gap-3 w-full">
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
            <AppButton className="w-1/3" type="submit">
              Aceptar
            </AppButton>
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default PopupAgregarComentario;
