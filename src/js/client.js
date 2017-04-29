import Game from '../main.js'
import store from '../store.js'
import { updateState } from '../reducer.js'

function startClientGame(playersFromServer) {
  Hourglass.game = new Game()
  Hourglass.game.startGame('Boot', true, false, "../assets/data/level01.json")
}

startClientGame()

socket.getAllPlayers = function(player) {
  socket.emit('getallplayers', player)
}

socket.getGameState = function() {
  socket.emit('getGameState')
}

socket.on('serverUpdate', function(data) {
  const newPlayers = data;
  if (newPlayers.length) {
    newPlayers.forEach(player => (Hourglass.game.state.getCurrentState().addNewPlayer(player)))
    store.dispatch(updateState(newPlayers))
  }
})

// socket.on('newplayer', function(data) {
//   console.log('new player data: ', data)
//   Hourglass.game.state.getCurrentState().addNewPlayer(data.id, data.x, data.y)
// })

// socket.on('allplayers', function(data) {
//   console.log('all players data: ', data)
//   for (var i = 0; i < data.length; i++) {
//     Hourglass.game.state.getCurrentState().addNewPlayer(data[i].id, data[i].x, data[i].y)
//   }
// })

socket.on('remove', function(id) {
  console.log("id", id);
  console.log('player map: ', Hourglass.game.state.getCurrentState().playerMap)
  Hourglass.game.state.getCurrentState().removePlayer(id)
})
