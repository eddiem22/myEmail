const { ipcRenderer } = require('electron')

var form =  document.getElementById('ipcForm')
console.log
       form.addEventListener('submit', async function(event) {
        //event.preventDefault()
       //var inputs = document.getElementById("emailform").elements
       console.log("do something you piece of shit")
       var myRecipient = document.getElementById('email').value
       var mySubject = document.getElementById('subject').value
       var myMessage = document.getElementById('message').value
       console.log(myRecipient)
       console.log(mySubject)
       console.log(myMessage)
       
        //console.log(inputs);
        ipcRenderer.send('send_email', myRecipient, mySubject, myMessage)
       })
    
       
       
       /*
    document.querySelector('#ipcForm').addEventListener('submit', () => {
        sendForm();
    });

    document.querySelector('#sendbutton').addEventListener('click', () => {
        sendForm();
    });
    
*/
