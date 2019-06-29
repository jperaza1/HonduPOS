const { app, BrowserWindow } = require("electron");
require("./Server/index.js");
let win;

app.on("ready", async () => {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "POSine",
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadURL("http://localhost:3000/");
  win.maximize();

  win.on("closed", () => {
    win = null;
  });
});

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
