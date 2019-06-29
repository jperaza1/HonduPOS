const { app, BrowserWindow } = require("electron");
require("./Server/index.js");
const path = require("path");
const url = require("url");
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
  const startUrl = url.format({
    pathname: path.join(__dirname, "./Client/build/index.html"),
    protocol: "file:",
    slashes: true
  });
  console.log(startUrl);
  win.loadURL(startUrl);
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
