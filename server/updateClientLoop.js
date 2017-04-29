const store = require('./store.js');
const {reducer} = require('./reducer.js');

const SERVER_UPDATE_RATE = 5000 ;

let io;
let broadcastInterval;

// let playerMap = [250, 150]

const broadcastGameState = (io) => {
  console.log('broadcasting')
  broadcastInterval = setInterval(() => {
    let state = store.getState();
    console.log('dispatching state: ', state);
      io.emit('serverUpdate', state);
    }, SERVER_UPDATE_RATE);
}


module.exports = { broadcastGameState };
