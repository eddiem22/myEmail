const { app, BrowserWindow, ipcMain, remote, net, ipcRenderer} = require('electron');
const express = require("express");
const Express = express();
const PORT = 3000;
const path = require ('path');
const fs = require('fs');
const os = require('os');
const render= require('./src/html/scripts/render');
const sendMail = require('./src/helpers/nodeMailer');
const webPagePath = path.join(__dirname, '/src/html');


Express.listen(PORT, () => {
  console.log(`Server is chilling at ${PORT}`);
});

/*
Express.use(express.json());

Express.use(express.urlencoded({ extended: true}));

const htmlpath = path.resolve(__dirname, './src/html');

Express.use(express.static(htmlpath + 'index.html'));
*/


const createWindow = (webPage) => {
  const win = new BrowserWindow({
	width: 1280,
	height: 720,
  webPreferences: {
    nodeIntegration: true, // is default value after Electron v5
      contextIsolation: false, // protect against prototype pollution
      enableRemoteModule: true, // turn off remote
  }
  })

  win.loadURL(path.join('file://', webPagePath, webPage));
};


app.on('ready', async () => {
  createWindow('index.html');
})

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('index.html')
    }
  })


ipcMain.on('send_email',  async function (event, recipient, subject, message) {
  console.log(recipient, subject, message)
  let window = BrowserWindow.getAllWindows()[0]
  let errorStatus = false
        try{
          await sendMail(subject, recipient, message) 
        }
        catch(err){
              //console.log('message: error occured');
              errorStatus = true
              console.log(`ERROR OCCURRED: ${err}`)
               createWindow('failure.html')
                window.close()
               ipcMain.on('onFailureRequest', function(event, arg){
                 event.sender.send('onFailure', err)
               })
                window.reload();

              //return false;
            }
             if(!errorStatus){console.log('message: email has been sent'); createWindow('success.html'); window.close();}
        });


  
