const socket = io('/games')
let userName;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    userName = prompt('Please enter your name: ')
} while(!userName)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''

    // Send message to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages from server
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})

