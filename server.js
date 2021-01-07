const express = require('express');
const app = express();
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket connection
const io = require('socket.io')(http)
const nsp = io.of('/games') // custom namespace
nsp.on('connection', (socket) => {
    console.log('A new User is Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})

