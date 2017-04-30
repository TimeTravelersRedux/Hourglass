import Game from '../main.js'
import store from '../store.js'
import { updateState,setKeyHolderId } from '../reducer.js'
import { gotoState } from '../historyActions'
import stateHistory from '../stateHistory'

function startClientGame(playersFromServer) {
  Hourglass.game = new Game()
  Hourglass.game.startGame('Boot', true, false, "../assets/data/level01.json")
}

startClientGame()

socket.on('serverUpdate', function(data) {
  if (!Hourglass.game.state.getCurrentState() || Hourglass.game.state.getCurrentState().key !== 'Game') {
    return
  } else {
    const newPlayers = data.players;
    const keyHolderId = data.keyHolderId
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
  } else {
    Hourglass.game.state.getCurrentState().removePlayer(socketId)
  }
})

socket.on('hourglass', function() {
  const pastCount = stateHistory.past.length
  const halfway = Math.floor(pastCount/2)
  const oldHero = stateHistory.past[halfway].hero
  Hourglass.game.state.getCurrentState().moveHero(oldHero)
  Hourglass.game.state.getCurrentState()._handleKey()
  store.dispatch(setKeyHolderId(''))
})

socket.on('gameover', function() {
  Hourglass.game.state.start('GameOver')
})

socket.on('restart', function() {
  Hourglass.game.state.start('Game')
})
