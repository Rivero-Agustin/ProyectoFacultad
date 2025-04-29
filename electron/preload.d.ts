export {};

declare global {
  interface Window {
    electron: {
      sendToArduino: (message: string) => void;
      onArduinoData: (callback: (data: string) => void) => void;
      removeArduinoDataListener: (callback: () => void) => void;
      checkArduinoConnection: () => Promise<boolean>;
      onArduinoDisconnected: (callback: () => void) => void;
      onArduinoReady: (callback: () => void) => void;
      notifyFrontendReady: () => void;
    };
  }
}
