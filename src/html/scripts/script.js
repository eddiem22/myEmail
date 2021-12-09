const { ipcRenderer } = require('electron');

var form =  document.getElementById('ipcForm');
var autofill = document.getElementById('autofill');
var myEmail = document.getElementById('sender');
    var myPassword = document.getElementById('password');
    var myHost = document.getElementById('smtpHost');

autofill.addEventListener('change', async function(event){
    if(autofill.checked)
    {
        console.log('checked')
        
        ipcRenderer.send('onCheck')
        ipcRenderer.on('onErrorCheck', function(event, arg){
            if(arg==true){
                console.log('arg is true')
                ipcRenderer.on('onConfirm', function(event, smtp, email, password) {
                    myEmail.required = false;
                    myPassword.required = false;
                    myHost.required = false;
                    myPassword.placeholder = '**********'
                    myHost.placeholder = `smtp.mail.${smtp}.com`
                    myEmail.placeholder = `${email}`;
                    myEmail.value = email;
                    myPassword.value = password;
                    myHost.value = smtp;
                })
            }
            else
            {
                console.log('arg is false')
                myEmail.required = true;
                myPassword.required = true;
                myHost.required = true;
                myPassword.placeholder = 'Enter Password'
                myHost.placeholder = `smtp.mail.YOURHOST.com`
                myEmail.placeholder = 'Enter Your Email Address'
            }
        })
       
    }
    else
            {
                console.log('NOT Schecked')
                myEmail.required = true;
                myPassword.required = true;
                myHost.required = true;
                myPassword.placeholder = 'Enter Password'
                myHost.placeholder = `smtp.mail.YOURHOST.com`
                myEmail.placeholder = 'Enter Your Email Address'
                myEmail.value = ''
                myPassword.value = ''
                myHost.value = ''
            }
   

})

form.addEventListener('submit', async function(event) {
       //console.log('FORM SCRIPT IS ACTIVE')
        //event.preventDefault(
        var saveThis = document.getElementById('save');
       var myRecipient = document.getElementById('email').value
       var mySubject = document.getElementById('subject').value
       var myMessage = document.getElementById('message').value
       var myEmail = document.getElementById('sender').value
       var myPassword = document.getElementById('password').value
       var myHost = document.getElementById('smtpHost').value
       if(saveThis.checked)
       {   
           ipcRenderer.send('getAutofillInfo', myEmail, myPassword, myHost)
       }
       console.log(myRecipient)
       console.log(mySubject)
       console.log(myMessage)
       console.log(myEmail)
       console.log(myPassword)
       console.log(myHost)
       
        //console.log(inputs);
        ipcRenderer.send('send_email', myRecipient, mySubject, myMessage, myEmail, myPassword, myHost)
       })
  
