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
const {getCreds, fillCreds} = require('./src/autofill/getList');


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
	width: 1600,
	height: 850,
  webPreferences: {
    nodeIntegration: true, 
      contextIsolation: false, 
      enableRemoteModule: true, 
  }
  })

  win.loadURL(path.join('file://', webPagePath, webPage));
};


app.on('ready', async () => {
  createWindow('index.html');
});

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('index.html')
    }
  });

  ipcMain.on('getAutofillInfo', async function (event, myEmail, myPassword, myHost) {
    fillCreds(myEmail, myPassword, myHost)
    //console.log(getCreds())
    //console.log(`auto fill working, ${myEmail}, ${myPassword}, ${myHost}`)
  });

  ipcMain.on('onCheck', function(event, arg){
    let autofill = true;
    var creds = getCreds();
    console.log(creds)
    //try
    //{
      if(creds == 'EMPTY') 
      {autofill = false; console.log('nothing to be autofilled'); event.sender.send('onErrorCheck', false);}
      else{
      let smtp = creds[0];
      let email = creds[1];
      let password = creds[2];
      console.log(`autofill test ${smtp}, ${email} ,${password}`)   
      event.sender.send('onErrorCheck', true)
event.sender.send('onConfirm', smtp, email, password)
      
      }
  
    //}
   // catch(err) {
      
   

    //if(autofill) {
      
  //}
    //else{console.log('autofill log is empty');}
  });

ipcMain.on('send_email',  async function (event, recipient, subject, message, email, password, host) {
  console.log(recipient, subject, message, email, password, host)
  let window = BrowserWindow.getAllWindows()[0]
  let errorStatus = false
        try{
          await sendMail(subject, recipient, message, email, password, host) 
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


  
