export {};

declare global {
  interface Window {
    electron: {
      sendToArduino: (message: string) => void;
      onArduinoData: (callback: (data: string) => void) => void;
      removeArduinoDataListener?: (callback: (data: string) => void) => void;
    };
  }
}
