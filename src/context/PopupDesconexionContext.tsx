// context/ModalContext.js
"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type PopupDesconexionContextType = {
  isPopupDesconexionOpen: boolean;
  openPopupDesconexion: () => void;
  closePopupDesconexion: () => void;
};

const PopupDesconexionContext = createContext<PopupDesconexionContextType>({
  isPopupDesconexionOpen: false,
  openPopupDesconexion: () => {},
  closePopupDesconexion: () => {},
});

export const usePopupDesconexion = () => useContext(PopupDesconexionContext);

export const PopupDesconexionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isPopupDesconexionOpen, setIsPopupDesconexionOpen] = useState(false);

  const openPopupDesconexion = () => setIsPopupDesconexionOpen(true);
  const closePopupDesconexion = () => setIsPopupDesconexionOpen(false);

  return (
    <PopupDesconexionContext.Provider
      value={{
        isPopupDesconexionOpen,
        openPopupDesconexion,
        closePopupDesconexion,
      }}
    >
      {children}
    </PopupDesconexionContext.Provider>
  );
};
