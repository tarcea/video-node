const express = require('express');
const http = require('http');
// const socket = require('socket.io');
const { v4: uuidV4 } = require('uuid');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
});

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
});

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('user-connected', userId)
  })
});

server.listen(3000);