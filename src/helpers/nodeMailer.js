let Nodemailer = require('nodemailer');
const { app, BrowserWindow, ipcMain, net, remote, ipcRenderer} = require('electron');
const { indexOf } = require('lodash');
let sendMail = async function(Subject, Recipient, Body) 
{
    let testAccount = await Nodemailer.createTestAccount();

    var mySubject = Subject;
    var myRecipient = Recipient;
    var myBody = Body;


    let transporter = Nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    let info = await transporter.sendMail(
      {
      from: testAccount.user, 
      to: myRecipient, 
      subject: mySubject, 
      text: myBody, 
    });
  
    
  
    console.log("Message sent: %s", info.messageId);

    
    console.log("Preview URL: %s", Nodemailer.getTestMessageUrl(info));

  }
  


  module.exports = sendMail;
