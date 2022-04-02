const { ipcRenderer } = require('electron');

var form =  document.getElementById('ipcForm');

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

let emailObject = new thisEmail(mySubject, 
    document.getElementById('subject'), 
    document.getElementById('message'),
    document.getElementById('email'), 
    document.getElementById('password'), 
    document.getElementById('smtpHost'), 
    document.getElementById('save'), 
    document.getElementById('autofill'))


autofill.addEventListener('change', async function(event){
    if(emailObject.saved.checked)
    {
        ipcRenderer.send('onCheck')
        ipcRenderer.on('onErrorCheck', function(event, arg){
            if(arg==true){
                console.log('arg is true')
                ipcRenderer.on('onConfirm', function(event, smtp, email, password) {
                    emailObject.email.required = false;
                    emailObject.password.required = false;
                    emailObject.host.required = false;
                    emailObject.password.placeholder = '**********'
                    emailObject.host.placeholder = `smtp.mail.${smtp}.com`
                    emailObject.email.placeholder = `${email}`;
                    emailObject.email.value = email;
                    emailObject.password.value = password;
                    emailObject.host.value = smtp;
                })
            }
            else
            {
                console.log('arg is false')
                emailObject.email.required = true;
                emailObject.password.required = true;
                emailObject.host.required = true;
                emailObject.password.placeholder = 'Enter Password'
                emailObject.host.placeholder = `smtp.mail.YOURHOST.com`
                emailObject.email.placeholder = 'Enter Your Email Address'
            }
        })
       
    }
    else
            {
                console.log('NOT Schecked')
                emailObject.email.required = true;
                emailObject.password.required = true;
                emailObject.host.required = true;
                emailObject.password.placeholder = 'Enter Password'
                emailObject.host.placeholder = `smtp.mail.YOURHOST.com`
                emailObject.email.placeholder = 'Enter Your Email Address'
                emailObject.email.value = ''
                emailObject.password.value = ''
                emailObject.host.value = ''
            }
   

})

form.addEventListener('submit', async function(event) {

       if(emailObject.save.checked)
       {   
           ipcRenderer.send('getAutofillInfo', emailObject.email.value, emailObject.password.value, emailObject.host.value)
       }
       console.log(emailObject)
       
        //console.log(inputs);
        ipcRenderer.send('send_email', mySubjectValue, emailObject.subject.value, emailObject.message.value, myEmailValue, myPasswordValue, myHostValue )
       })
  
