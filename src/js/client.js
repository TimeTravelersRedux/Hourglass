import Game from '../main.js'
import store from '../store.js'
import { moveHero } from '../reducer.js'



//We attach all functions to a socket in here
const attachFunctions = (socket) => {
  // socket.on('playerUpdate', dispatchPlayerUpdates);
  // socket.on('currentLobbyer', dispatchCurrentLobbyer);
  // socket.on('messagesUpdate', dispatchNewMessage);
  // socket.on('startGame', startClientGame)
  // socket.on('askNewPl', dispatchScoreUpdate);
  // socket.on('lobbyUpdate', dispatchLobbyState);
  // socket.on('serverUpdate', dispatchServerState);
  // socket.on('gamePlayingUpdate', dispatchGamePlayingUpdate);
  // socket.on('resetGame', dispatchReducerReset);
};

function startClientGame(playersFromServer) {
  // let state = store.getState();
  Hourglass.game = new Game()
    // store.dispatch(loadPlayers(playersFromServer));
  Hourglass.game.startGame('Boot', true, false, "../assets/data/level01.json")
}

// We could call
attachFunctions(socket)
startClientGame()

// // var Client = {}
// // Client.socket = io.connect()

socket.askNewPlayer = function() {
  socket.emit('newplayer')
}

socket.getGameState = function() {
  socket.emit('getGameState')
}

socket.on('serverUpdate', function(data){
  store.dispatch(moveHero(data))
})

socket.on('newplayer', function(data) {
  Hourglass.game.state.getCurrentState().addNewPlayer(data.id, data.x, data.y)
})

socket.on('allplayers', function(data) {
  for (var i = 0; i < data.length; i++) {
    Hourglass.game.state.getCurrentState().addNewPlayer(data[i].id, data[i].x, data[i].y)
  }
})

socket.on('remove', function(id) {
  Hourglass.game.state.getCurrentState().removePlayer(id)
})
