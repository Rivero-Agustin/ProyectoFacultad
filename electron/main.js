const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const SerialPort = require("serialport").SerialPort;
const { ReadlineParser } = require("@serialport/parser-readline"); // Corrección aquí

let mainWindow;
let port;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  mainWindow.loadURL("http://localhost:3000");

  port = new SerialPort({ path: "COM9", baudRate: 9600 }); // Verifica el puerto correcto

  const parser = port.pipe(new ReadlineParser({ delimiter: "\n" })); // Parser corregido

  parser.on("data", (data) => {
    console.log("Datos recibidos de Arduino:", data);
    mainWindow.webContents.send("arduino-data", data);
  });
});

ipcMain.on("send-to-arduino", (event, message) => {
  if (port && port.isOpen) {
    port.write(message + "\n");
  }
});
