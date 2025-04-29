const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendToArduino: (message) => ipcRenderer.send("send-to-arduino", message),
  onArduinoData: (callback) =>
    ipcRenderer.on("arduino-data", (event, data) => callback(data)),
  removeArduinoDataListener: (callback) =>
    ipcRenderer.removeListener("arduino-data", callback),
  checkArduinoConnection: () => ipcRenderer.invoke("check-arduino-connection"),
  onArduinoDisconnected: (callback) =>
    ipcRenderer.on("arduino-disconnected", callback),
  onArduinoReady: (callback) => ipcRenderer.on("arduino-ready", callback), // ✅ nuevo
  notifyFrontendReady: () => ipcRenderer.send("frontend-ready"),
});
