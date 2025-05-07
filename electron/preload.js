const { contextBridge, ipcRenderer } = require("electron");

const arduinoDataListeners = new Map();
const arduinoReadyListeners = new Map();
const arduinoDisconnectedListeners = new Map();

contextBridge.exposeInMainWorld("electron", {
  sendToArduino: (message) => ipcRenderer.send("send-to-arduino", message),

  onArduinoData: (callback) => {
    const listener = (_event, data) => callback(data);
    arduinoDataListeners.set(callback, listener);
    ipcRenderer.on("arduino-data", listener);
  },
  removeArduinoDataListener: (callback) => {
    const listener = arduinoDataListeners.get(callback);
    if (listener) {
      ipcRenderer.removeListener("arduino-data", listener);
      arduinoDataListeners.delete(callback);
    }
  },

  onArduinoReady: (callback) => {
    arduinoReadyListeners.set(callback, callback);
    ipcRenderer.on("arduino-ready", callback);
  },
  removeArduinoReadyListener: (callback) => {
    const listener = arduinoReadyListeners.get(callback);
    if (listener) {
      ipcRenderer.removeListener("arduino-ready", listener);
      arduinoReadyListeners.delete(callback);
    }
  },

  onArduinoDisconnected: (callback) => {
    arduinoDisconnectedListeners.set(callback, callback);
    ipcRenderer.on("arduino-disconnected", callback);
  },
  removeArduinoDisconnectedListener: (callback) => {
    const listener = arduinoDisconnectedListeners.get(callback);
    if (listener) {
      ipcRenderer.removeListener("arduino-disconnected", listener);
      arduinoDisconnectedListeners.delete(callback);
    }
  },

  checkArduinoConnection: () => ipcRenderer.invoke("check-arduino-connection"),
  notifyFrontendReady: () => ipcRenderer.send("frontend-ready"),
});
