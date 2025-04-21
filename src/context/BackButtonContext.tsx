// context/BackButtonContext.tsx
"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type BackButtonContextType = {
  onBack?: () => void;
  setOnBack: (fn?: () => void) => void;
};

const BackButtonContext = createContext<BackButtonContextType | null>(null);

export const useBackButton = () => {
  const ctx = useContext(BackButtonContext);
  if (!ctx)
    throw new Error("useBackButton must be used within BackButtonProvider");
  return ctx;
};

export const BackButtonProvider = ({ children }: { children: ReactNode }) => {
  const [onBack, setOnBack] = useState<() => void>();

  return (
    <BackButtonContext.Provider value={{ onBack, setOnBack }}>
      {children}
    </BackButtonContext.Provider>
  );
};
