const { ipcRenderer } = require('electron');
var saveThis = document.getElementById('save');
var myRecipient = document.getElementById('email')
var mySubject = document.getElementById('subject')
var myMessage = document.getElementById('message')
var myEmail = document.getElementById('sender')
var myPassword = document.getElementById('password')
var myHost = document.getElementById('smtpHost')
var form =  document.getElementById('ipcForm');
var autofill = document.getElementById('autofill');


class thisEmail {
    constructor(subject, recipient, message, email, password, host, saved, autofilled) {
        this.subject = subject;
        this.recipient = recipient;
        this.message = message;
        this.email = email;
        this.password = password;
        this.host = host;
        this.save = saved;
        this.autofill = autofilled;
    }
}

let emailObject = new thisEmail(mySubject, myRecipient, myMessage, myEmail, myPassword, myHost, saveThis, autofill)


autofill.addEventListener('change', async function(event){
    if(autofill.checked)
    {
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
                    myEmail.placeholder = `${email}`
                    myEmail.value = `${email}`
                    myPassword.value = `${password}`
                    myHost.value = `${smtp}`
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
                console.log('NOT checked')
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
    if(saveThis.checked)
    {   
        ipcRenderer.send('getAutofillInfo', myEmail.value, myPassword.value, myHost.value)
    }
    console.log(emailObject)
        ipcRenderer.send('send_email', myRecipient.value, mySubject.value, myMessage.value, myEmail.value, myPassword.value, myHost.value)
       })
