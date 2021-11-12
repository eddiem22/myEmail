const { app, BrowserWindow, ipcMain} = require('electron');
const express = require("express");
const Express = express();
const PORT = 3000;

Express.listen(PORT, () => {
  console.log(`Server is 🏃‍♂️ on port ${PORT}`);
});

const createWindow = () => {
  const win = new BrowserWindow({
	width: 1280,
	height: 720,
  
  })

  win.loadFile('./html/index.html')
  win.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })
}

app.on('ready', async () => {
  createWindow();
})

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })