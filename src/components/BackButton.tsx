"use client";

import { useRouter, usePathname } from "next/navigation";
import { useBackButton } from "@/context/BackButtonContext";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { onBack } = useBackButton();

  // No mostrar el botón en la página principal
  if (pathname === "/") {
    return null;
  }

  const handleBack = () => {
    // Si esta la funcion onBack, la ejecuta, sino:
    // Si hay un historial de navegación, vuelve a la página anterior
    // Si no, redirige a la página principal
    if (onBack) {
      onBack();
    } else {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  return (
    <button
      onClick={handleBack}
      className="bg-primary-navigation hover:bg-primary-navigation-hover flex items-center justify-center h-8 w-8 rounded-xl absolute top-1/2 transform -translate-y-1/2"
    >
      <ArrowLeftIcon className="h-5 w-5 text-black font-black" />
    </button>
  );
};

export default BackButton;
