import Game from '../main.js'


//We attach all functions to a socket in here
// const attachFunctions = (socket) => {
  // socket.on('playerUpdate', dispatchPlayerUpdates);
  // socket.on('currentLobbyer', dispatchCurrentLobbyer);
  // socket.on('messagesUpdate', dispatchNewMessage);
  // socket.on('startGame', startClientGame)
  // socket.on('updateLeaderboard', dispatchScoreUpdate);
  // socket.on('lobbyUpdate', dispatchLobbyState);
  // socket.on('serverUpdate', dispatchServerState);
  // socket.on('gamePlayingUpdate', dispatchGamePlayingUpdate);
  // socket.on('resetGame', dispatchReducerReset);
// };


// function startClientGame(playersFromServer) {
  // let state = store.getState();
  console.log(Hourglass);
  Hourglass.game = new Game()
  // store.dispatch(loadPlayers(playersFromServer));
  Hourglass.game.startGame('BootState', true, false, "../assets/levels/main.json");
// }

// attachFunctions(socket)
// // var Client = {}
// // Client.socket = io.connect()

// // Client.askNewPlayer = function() {
// //   Client.socket.emit('newplayer')
// // }

// // Client.socket.on('newplayer', function(data) {
// //   console.log("window.game", window.game);
// //   window.game.state.addNewPlayer(data.id, data.x, data.y)
// // })

// // Client.socket.on('allplayers', function(data) {
// //   for (var i = 0; i < data.length; i++) {
// //     GameInstance.addNewPlayer(data[i].id, data[i].x, data[i].y)
// //   }
// // })

// // Client.socket.on('remove', function(id) {
// //   GameInstance.removePlayer(id)
// // })

// export default Client;
