const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app)
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log("new user connected! ")

  //admin text: Welcome to the chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))
  //admin text: New user joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('This is from the server! ');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // })
  });

  socket.on('disconnect', () => {
    console.log("user was disconnected!");
  })
})

server.listen(port, () => {
  console.log('Server is up on port 3000')
})