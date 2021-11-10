const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
	width: 1280,
	height: 720,
  })
  win.loadFile('index.html')
  win.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })
}

app.on('ready', async () => {
    createWindow()
    try {
      await session.defaultSession.loadExtension(path.join(os.homedir(), /* path to extension */))
    } catch (err) {
      console.log(err)
    }
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