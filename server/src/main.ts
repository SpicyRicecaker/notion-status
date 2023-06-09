import { app, BrowserWindow, screen } from "electron"
import * as path from "path"

function createWindow() {
  const development = process.env.NODE_ENV === "development"
  console.log(development)

  const primaryDisplay = screen.getPrimaryDisplay()
  const { width: displayWidth, height: displayHeight } =
    primaryDisplay.workAreaSize

  const width = displayWidth * (8 / 100)
  const height = displayHeight * (1 / 15)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width,
    height,
    x: Math.round(displayWidth / 2 - width - width),
    y: Math.round(displayHeight - height),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
    alwaysOnTop: !development,
    transparent: true,
    frame: false,
    // color format is in #AARRGGBB
    // keep in mind that this value doesn't matter so long as transparent is
    // true
    backgroundColor: development ? "FFF" : "#00000000",
  })

  // and load the index.html of the app.

  // load the development server in development mode, otherwise load the built version in production
  if (development) {
    mainWindow.loadURL("http://localhost:3000/")
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  } else {
    // this breaks when trying to load other files in the directory
    mainWindow.loadFile(
      path.join(__dirname, "..", "..", "front", "dist", "index.html")
    )
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
