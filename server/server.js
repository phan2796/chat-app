const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("new user connected! ")

  socket.emit('newMessage', {
    from: 'phan2796@gmail.com',
    text: 'Hello!!!!',
    createAt: 123
  })

  socket.on('createMessage', (message) => {
    console.log('createMessage', message)
  });

  socket.on('disconnect', () => {
    console.log("user was disconnected!");
  })
})

server.listen(port, () => {
  console.log('Server is up on port 3000')
})