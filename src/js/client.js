import Game from '../main.js'
import store from '../store.js'
import { updateState } from '../reducer.js'

function startClientGame(playersFromServer) {
  Hourglass.game = new Game()
  Hourglass.game.startGame('Boot', true, false, "../assets/data/level01.json")
}

startClientGame()

socket.on('serverUpdate', function(data) {
  const newPlayers = data.players;
  if (newPlayers.length) {
    newPlayers.forEach(player => {
      Hourglass.game.state.getCurrentState().addNewPlayer(player)
      if(player.id !== socket.id){
        Hourglass.game.state.getCurrentState().moveOtherPlayer(player)
      }
    })
    store.dispatch(updateState(newPlayers))
  }
})
