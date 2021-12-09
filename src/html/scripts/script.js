const { ipcRenderer } = require('electron')

var form =  document.getElementById('ipcForm')
form.addEventListener('submit', async function(event) {
       //console.log('FORM SCRIPT IS ACTIVE')
        //event.preventDefault()
       var myRecipient = document.getElementById('email').value
       var mySubject = document.getElementById('subject').value
       var myMessage = document.getElementById('message').value
       var myEmail = document.getElementById('sender').value
       var myPassword = document.getElementById('password').value
       var myHost = document.getElementById('smtpHost').value
       console.log(myRecipient)
       console.log(mySubject)
       console.log(myMessage)
       console.log(myEmail)
       console.log(myPassword)
       console.log(myHost)
       
        //console.log(inputs);
        ipcRenderer.send('send_email', myRecipient, mySubject, myMessage, myEmail, myPassword, myHost)
       })
  
