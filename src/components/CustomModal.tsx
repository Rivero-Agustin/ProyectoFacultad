// components/CustomModal.tsx
"use client";

import Modal from "react-modal";
import { useEffect } from "react";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  className?: string;
  [key: string]: any; // Para otras props
};

// Modal.setAppElement("#__next"); // Esto es importante para la accesibilidad en Next.js

export default function CustomModal({
  isOpen,
  onClose,
  title,
  message,
  className = "",
  ...props
}: CustomModalProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
      // Asegura que el modal se vincule correctamente al elemento raíz
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Mensaje"
      className={`bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-40 outline-none text-black ${className}`}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      {...props}
    >
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="mb-4">{message}</p>
      <div className="flex justify-end">
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Aceptar
        </button>
      </div>
    </Modal>
  );
}
