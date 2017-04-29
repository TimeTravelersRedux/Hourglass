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

const { broadcastGameState } = require('./updateClientLoop')

// Import Store
const store = require('./store.js')
const { updatePlayer, removePlayer } = require('./reducer.js')
// Store Dispatchers
// const {updatePlayer, removePlayer} = require('./reducers/players.js')

// Import helper functions
// const {startGame, endGame} = require('./engine/updateClientLoop.js')

// logging middleware
app.use(morgan('dev'))

// set up static routes
app.use('/', express.static(path.resolve(__dirname, '..', 'dist')))
app.use('/assets', express.static(path.resolve(__dirname, '..', 'assets')))

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

server.lastPlayerID = 0 // Keep track of the last id assigned to a new player

io.on('connection', function(socket) {
  // socket.on('getAllPlayers', function(data) {
  //   socket.emit('allplayers', getAllPlayersButMe(socket.id))
  //   socket.broadcast.emit('newplayer', socket.player)
  // })

  socket.on('clientUpdate', (data) => {
    console.log('new client data: ', data)
    store.dispatch(updatePlayer(data));
  })

  socket.on('disconnect', function() {
    io.emit('remove', socket.id)
    store.dispatch(removePlayer(socket.id))
  })
})

broadcastGameState(io)


// function getAllPlayersButMe(id) {
//   var players = []
//   Object.keys(io.sockets.connected).forEach(function(socketID) {
//     if (socketID !== id) {
//       var player = io.sockets.connected[socketID].player
//       if (player) players.push(player)
//     }
//   })
//   return players
// }
//
// function randomInt(low, high) {
//   return Math.floor(Math.random() * (high - low) + low)
// }


server.listen(3000, function() {
  console.log('listening on port 3000')
})
