// components/PopupDesconexion.tsx
"use client";
import { usePopupDesconexion } from "../context/PopupDesconexionContext";

const PopupDesconexion = () => {
  const { isPopupDesconexionOpen, closePopupDesconexion } =
    usePopupDesconexion();

  if (!isPopupDesconexionOpen) return null;

  const modalStyles = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modalContentStyles = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "500px",
    width: "90%",
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2 className="text-xl text-gray-900 font-bold mb-4 text-center">
          Dispositivo Desconectado
        </h2>
        <p className="mb-4 text-gray-900">
          El dispositivo ha sido desconectado. Por favor, verifique la conexión.
        </p>
      </div>
    </div>
  );
};

export default PopupDesconexion;
