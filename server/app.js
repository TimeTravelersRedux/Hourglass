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

let connectCounter = 0
app.get('/*', function(req, res, next) {
  if (connectCounter > 1) {
    res.status(503).send("Please wait your turn...")
  } else {
    res.sendFile(path.resolve(__dirname, '..', 'index.html'))
  }
})

io.on('connect', function(socket) {
  connectCounter++
  socket.on('clientUpdate', (data) => {
    store.dispatch(updatePlayer(data));
  })

  socket.on('gameover', (winnerPickupCount) => {
    io.emit('gameover', winnerPickupCount)
  })

  socket.on('restart', () => {
    io.emit('restart')
  })

  socket.on('disconnect', function() {
    connectCounter--
    io.emit('remove', socket.id)
    store.dispatch(removePlayer(socket.id))
  })
})

broadcastGameState(io)


server.listen(3000, function() {
  console.log('listening on port 3000')
})
