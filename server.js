const express = require('express')
const app = express()
const path = require('path')
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(process.cwd(), 'public')))
app.get("/", (req, res) =>{
    res.sendFile(path.join(process.cwd(), 'index.html'))
} )

http.listen(PORT, () => {
    console.log(`listening at ${PORT}`)
})

// socket.io

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
    console.log('connected...')
    socket.on('message', (msg) =>{
        socket.broadcast.emit('message', msg)
    })
})