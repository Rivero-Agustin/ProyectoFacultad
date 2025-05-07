const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

let mainWindow;
let port;
let parser;
let reconnectInterval;
let isTryingToReconnect = false;
let lastArduinoReady = false;
let reconnecting = false;

const ARDUINO_VENDOR_ID = "1A86";
const ARDUINO_PRODUCT_ID = "7523";
const DEVICE_READY_MESSAGE = "OK_ARDUINO";

function connectToArduino(path) {
  port = new SerialPort({ path, baudRate: 9600 });

  parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

  port.on("open", () => {
    setTimeout(() => {
      // Si es la primera conexion, el aviso del arduino ready ya se envio con ipcMain.on("frontend-ready".....
      if (reconnecting) {
        mainWindow.webContents.send("arduino-ready");
        reconnecting = false;
      }
    }, 1000);

    port.verified = false; //
  });

  parser.on("data", (data) => {
    const mensaje = data.trim();
    console.log("📡 Recibido:", mensaje);

    // Verificacion de que el dispositivo es el correcto, es decir, que el arduino tiene cargado el programa correcto
    if (!port.verified && mensaje === DEVICE_READY_MESSAGE) {
      port.verified = true;
      console.log("✅ Dispositivo verificado");
      mainWindow.webContents.send("arduino-data", mensaje);
    } else if (port.verified) {
      mainWindow.webContents.send("arduino-data", mensaje);
    }
  });

  port.on("close", () => {
    console.log("🔌 Arduino desconectado");
    mainWindow.webContents.send("arduino-disconnected"); //Notificacion
    startReconnectLoop();
  });

  port.on("error", (err) => {
    console.error("❗ Error en el puerto serial:", err.message);
  });
}

function setupDataListener() {
  parser.on("data", (data) => {
    console.log("📡 Datos recibidos de Arduino:", data);
    mainWindow.webContents.send("arduino-data", data.trim());
  });
}

function startReconnectLoop() {
  if (reconnectInterval || isTryingToReconnect) return;

  reconnecting = true;
  console.log("🔁 Iniciando reconexión...");
  reconnectInterval = setInterval(async () => {
    const ports = await SerialPort.list();
    const arduino = ports.find(
      (p) =>
        p.vendorId === ARDUINO_VENDOR_ID && p.productId === ARDUINO_PRODUCT_ID
    );

    if (arduino) {
      console.log("🔄 Arduino detectado nuevamente, reconectando...");
      clearInterval(reconnectInterval);
      reconnectInterval = null;
      isTryingToReconnect = false;
      connectToArduino(arduino.path);
    }
  }, 3000);
}

app.whenReady().then(async () => {
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

  const ports = await SerialPort.list();
  const arduino = ports.find(
    (p) =>
      p.vendorId === ARDUINO_VENDOR_ID && p.productId === ARDUINO_PRODUCT_ID
  );

  if (arduino) {
    connectToArduino(arduino.path);
  } else {
    console.log("⚠️ Arduino no detectado al iniciar.");
    startReconnectLoop();
  }
});

ipcMain.on("send-to-arduino", (event, message) => {
  if (port && port.isOpen) {
    port.write(message + "\n");
  } else {
    console.warn("⚠️ No se pudo enviar: el puerto no está abierto.");
  }
});

ipcMain.on("frontend-ready", () => {
  console.log("🌐 Frontend está listo");
  mainWindow.webContents.send("arduino-ready");

  if (lastArduinoReady) {
    console.log("send arduino-ready");
  }
});
