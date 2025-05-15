// components/PopupDesconexion.tsx
"use client";
import { usePopupDesconexion } from "../../context/PopupDesconexionContext";
import { AppButton } from "../AppButton";
import { useRouter, usePathname } from "next/navigation";
import { useDataContext } from "@/context/DataContext";
import { toast } from "sonner";
import { BaseModal } from "./BaseModal";

const PopupDesconexion = () => {
  const { isPopupDesconexionOpen, closePopupDesconexion } =
    usePopupDesconexion();
  const { clearMeasurements } = useDataContext(); // Función del contexto

  const router = useRouter();
  const pathname = usePathname();

  if (!isPopupDesconexionOpen) return null;

  const handleReiniciarEnsayo = () => {
    router.push("/");
    clearMeasurements();
    toast.info("Ensayo reiniciado.");
  };

  return (
    <BaseModal
      isOpen={isPopupDesconexionOpen}
      onRequestClose={closePopupDesconexion}
      contentLabel="Dispositivo desconectado"
      title="Dispositivo desconectado"
      description={
        pathname !== "/"
          ? "El dispositivo está desconectado. Puede verificar la conexión y esperar, o reiniciar el ensayo."
          : "El dispositivo está desconectado. Verifique la conexión y espere."
      }
      footer={
        pathname !== "/" && (
          <div className="flex justify-center">
            <AppButton variant="buttonRed" onClick={handleReiniciarEnsayo}>
              Reiniciar ensayo y volver a inicio
            </AppButton>
          </div>
        )
      }
    ></BaseModal>
  );
};

export default PopupDesconexion;
