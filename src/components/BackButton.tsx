"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  // No mostrar el botón en la página principal
  if (pathname === "/") {
    return null;
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="bg-white flex items-center justify-center h-8 w-8 rounded-xl absolute top-1/2 transform -translate-y-1/2"
    >
      <ArrowLeftIcon className="h-5 w-5 text-black font-black" />
    </button>
  );
};

export default BackButton;
