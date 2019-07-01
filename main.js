const { app, BrowserWindow } = require("electron");
require("./Server/index.js");
let win;
const serve = require("electron-serve");
const loadURL = serve({ directory: "./build" });

async function createWindow() {
  await app.whenReady();
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "POSine",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.maximize();
  await loadURL(mainWindow);
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
