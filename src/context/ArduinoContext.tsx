"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { usePopupDesconexion } from "./PopupDesconexionContext";
import { sendToArduino } from "@/utils/arduino";

type ArduinoContextProps = {
  arduinoData: string;
};

const ArduinoContext = createContext<ArduinoContextProps | undefined>(
  undefined
);

export const ArduinoProvider = ({ children }: { children: ReactNode }) => {
  const [arduinoData, setArduinoData] = useState("");
  const esPrimeraConexion = useRef(true); // es una referencia mutable que siempre mantiene su valor actualizado sin importar el ciclo de render o el scope del useEffect
  const { openPopupDesconexion, closePopupDesconexion } = usePopupDesconexion();
  const router = useRouter();
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);
  const routerRef = useRef(router);

  useEffect(() => {
    if (window.electron && window.electron.notifyFrontendReady) {
      window.electron.notifyFrontendReady();
    }
  }, []);

  useEffect(() => {
    const handleArduinoData = (data: string) => {
      console.log("Recibido de arduino: ", data);
      setArduinoData(data);

      if (esPrimeraConexion.current) {
        if (data.trim() === "OK_ARDUINO") {
          toast.success("Dispositivo conectado");
          closePopupDesconexion();
          esPrimeraConexion.current = false; //falso porque ya paso la verificacion
        } else {
          toast.error("Hay un problema con el dispositivo conectado");
        }
      }
    };

    const handleArduinoReady = () => {
      console.log("📣 Arduino listo. Enviando '0' desde el frontend...");
      setTimeout(() => {
        sendToArduino("0");
      }, 1000);
    };

    const handleArduinoDisconnected = () => {
      toast.error("Dispositivo desconectado");

      const currentPath = pathnameRef.current;
      const currentRouter = routerRef.current;

      if (currentPath !== "/" && currentPath !== "/iniciar") {
        //si no esta en la pag de inicio y si tampoco esta en la pag de iniciar
        currentRouter.push("/iniciar"); // redirige a la pag de iniciar
      } //si esta en la pag de inicio o en la pag de iniciar, no se redirige
      openPopupDesconexion();
      esPrimeraConexion.current = true; // <- Reset si se desconecta
    };

    window.electron?.onArduinoData(handleArduinoData);
    window.electron?.onArduinoReady(handleArduinoReady);
    window.electron?.onArduinoDisconnected(handleArduinoDisconnected);

    return () => {
      window.electron?.removeArduinoDataListener(handleArduinoData);
      window.electron?.removeArduinoReadyListener(handleArduinoReady);
      window.electron?.removeArduinoDisconnectedListener(
        handleArduinoDisconnected
      );
    };
  }, []);

  useEffect(() => {
    // se necesita useRef porque con eventos externos como los de electron, los hooks de next no se actualizan automaticamente (router o pathname)
    pathnameRef.current = pathname;
    routerRef.current = router;
  }, [pathname, router]);

  return (
    <ArduinoContext.Provider value={{ arduinoData }}>
      {children}
    </ArduinoContext.Provider>
  );
};

export const useArduino = () => {
  const context = useContext(ArduinoContext);
  if (!context)
    throw new Error("useArduino must be used within an ArduinoProvider");
  return context;
};
