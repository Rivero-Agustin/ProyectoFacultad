"use client";

export const sendToArduino = (option: any) => {
  if (window.electron) {
    window.electron.sendToArduino(option);
    console.log("Enviado al arduino: ", option);
  }
};
