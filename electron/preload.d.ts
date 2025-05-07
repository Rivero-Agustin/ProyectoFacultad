export {};

declare global {
  interface Window {
    electron: {
      sendToArduino: (message: string) => void;

      onArduinoData: (callback: (data: string) => void) => void;
      removeArduinoDataListener: (callback: (data: string) => void) => void;

      onArduinoReady: (callback: () => void) => void;
      removeArduinoReadyListener: (callback: () => void) => void;

      onArduinoDisconnected: (callback: () => void) => void;
      removeArduinoDisconnectedListener: (callback: () => void) => void;

      checkArduinoConnection: () => Promise<boolean>;
      notifyFrontendReady: () => void;
    };
  }
}
