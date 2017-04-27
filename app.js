'use strict';
// built-in modules
const path = require('path');

// npm modules
const express = require('express');
const morgan = require('morgan');

// instantiate the express app
const app = express();

// instantiate web sockets
var server = require('http').Server(app);
var io = require('socket.io')(server);

// logging middleware
app.use(morgan('dev'));

// set up static routes
app.use('/images', express.static(__dirname + '/start/images'))
app.use('/js', express.static(__dirname + '/start/js'))
app.use('/data', express.static(__dirname + '/start/data'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/start/index.html')
})


server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

io.on('connection', function(socket) {
  socket.on('newplayer', function() {
    socket.player = {
      id: server.lastPlayderID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400)
    };
    socket.emit('allplayers', getAllPlayers());
    socket.broadcast.emit('newplayer', socket.player);
  });
});

function getAllPlayers() {
  var players = [];
  Object.keys(io.sockets.connected).forEach(function(socketID) {
    var player = io.sockets.connected[socketID].player;
    if (player) players.push(player);
  });
  return players;
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}


server.listen(3000, function() {
  console.log('listening on port 3000')
})
