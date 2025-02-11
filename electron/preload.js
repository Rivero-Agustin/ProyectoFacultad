const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  sendToArduino: (message) => ipcRenderer.send("send-to-arduino", message),
  onArduinoData: (callback) =>
    ipcRenderer.on("arduino-data", (event, data) => callback(data)),
});
