const express = require('express');
const http = require("http");
const socket  = require("socket.io");
const app = express();
const { v4: uuidv4 } = require('uuid');

const httpServer = http.createServer(app);
const io = new socket.Server(httpServer, {
  cors: {
    origin: "*"
  }
});


let Users = []

io.on('connection', function(socket) {
  console.log('a user connected with id: ' + socket.id);

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('register-user', function(data) {
    let userId = uuidv4()
    Users = [...Users, {...data, userId}]
    socket.emit("recieve-user-id", userId)
  });
});

httpServer.listen(5000, function() {
  console.log('listening on *:5000');
});