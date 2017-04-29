'use strict'
// built-in modules
const path = require('path')

// npm modules
const express = require('express')
const morgan = require('morgan')

// instantiate the express app
const app = express()

// instantiate web sockets
var server = require('http').Server(app)
var io = require('socket.io')(server)

// logging middleware
app.use(morgan('dev'))

// set up static routes
app.use('/', express.static(__dirname + '/dist'))
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

server.lastPlayerID = 0 // Keep track of the last id assigned to a new player

io.on('connection', function(socket) {
  socket.on('newplayer', function() {
    console.log('testEER')
    socket.player = {
      id: server.lastPlayerID++,
      x: randomInt(100, 400),
      y: randomInt(100, 400)
    }
    socket.emit('allplayers', getAllPlayers(socket.id))
    socket.broadcast.emit('newplayer', socket.player)
  })

  // socket.on('disconnect', function() {
  //   // io.emit('remove', socket.player.id)
  // })
})

function getAllPlayers(id) {
  var players = []
  Object.keys(io.sockets.connected).forEach(function(socketID) {
    if (socketID !== id) {
      var player = io.sockets.connected[socketID].player
      if (player) players.push(player)
    }
  })
  return players
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low)
}


server.listen(3000, function() {
  console.log('listening on port 3000')
})
