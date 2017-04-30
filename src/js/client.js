import Game from '../main.js'
import store from '../store.js'
import { updateState } from '../reducer.js'

function startClientGame(playersFromServer) {
  Hourglass.game = new Game()
  Hourglass.game.startGame('Boot', true, false, "../assets/data/level01.json")
}

startClientGame()

socket.on('serverUpdate', function(data) {
  if (!Hourglass.game.state.getCurrentState() || Hourglass.game.state.getCurrentState().key !== 'Game') {
    console.log('Loading')
  } else {
    const newPlayers = data.players;
    if (newPlayers.length) {
      newPlayers.forEach(player => {
        if (player.id !== socket.id) {
          Hourglass.game.state.getCurrentState().addNewPlayer(player)
          Hourglass.game.state.getCurrentState().moveOtherPlayer(player)
        }
      })
      store.dispatch(updateState(newPlayers))
    }
  }
})

socket.on('remove', function(socketId) {
  if (!Hourglass.game.state.getCurrentState() || Hourglass.game.state.getCurrentState().key !== 'Game') {
    console.log('Loading...')
  } else {
    Hourglass.game.state.getCurrentState().removePlayer(socketId)
  }
})

socket.on('gameover', function() {
  Hourglass.game.state.start('GameOver')
})

socket.on('restart', function() {
  Hourglass.game.state.start('Game')
})
