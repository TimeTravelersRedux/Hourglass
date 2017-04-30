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
  if (server.playerCount > 1) {
    res.status(503).send("Please wait your turn...")
  }
  res.sendFile(path.resolve(__dirname, '..', 'index.html'))
})

server.playerCount = 0 // Keep track of the last id assigned to a new player

io.on('connection', function(socket) {
  server.playerCount++

  socket.on('clientUpdate', (data) => {
    store.dispatch(updatePlayer(data));
  })

  socket.on('disconnect', function() {
    server.playerCount--
      io.emit('remove', socket.id)
    store.dispatch(removePlayer(socket.id))
  })
})

broadcastGameState(io)


server.listen(3000, function() {
  console.log('listening on port 3000')
})
