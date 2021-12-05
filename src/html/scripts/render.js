

function sendForm(event) {
    event.preventDefault() // stop the form from submitting
    let recipient = document.getElementById("email").value
    //let recipient2 = document.getElementsByName("email")[0].value;
    //console.log(recipient2)
    let subject = document.getElementById("subject").value
    let message = document.getElementById("message").value
    console.log(recipient, subject, message)
    ipcRenderer.send('send_email', recipient, subject, message)
}