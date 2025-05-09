// components/PopupDesconexion.tsx
"use client";
import { usePopupDesconexion } from "../context/PopupDesconexionContext";
import { AppButton } from "./AppButton";
import { useRouter, usePathname } from "next/navigation";
import { useDataContext } from "@/context/DataContext";
import { toast } from "sonner";

const PopupDesconexion = () => {
  const { isPopupDesconexionOpen, closePopupDesconexion } =
    usePopupDesconexion();
  const { clearMeasurements } = useDataContext(); // Función del contexto

  const router = useRouter();
  const pathname = usePathname();

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

  const handleReiniciarEnsayo = () => {
    router.push("/");
    clearMeasurements();
    toast.info("Ensayo reiniciado.");
  };

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <h2 className="text-xl text-gray-900 font-bold mb-4 text-center">
          Dispositivo desconectado
        </h2>

        {pathname !== "/" ? (
          <>
            <p className="text-gray-900">
              El dispositivo está desconectado. Puede verificar la conexión y
              esperar, o reiniciar el ensayo.
            </p>
            <div className="flex justify-center">
              <AppButton variant="buttonRed" onClick={handleReiniciarEnsayo}>
                Reiniciar ensayo y volver a inicio
              </AppButton>
            </div>
          </>
        ) : (
          <p className="text-gray-900">
            El dispositivo está desconectado. Verifique la conexión y espere.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopupDesconexion;
