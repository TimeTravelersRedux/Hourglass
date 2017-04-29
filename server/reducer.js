const _ = require('lodash')

// ACTION CREATORS

const newPlayer = (socketId, x, y) => ({
    type: 'NEW_PLAYER',
    socketId,
    x,
    y
});

const removePlayer = (socketId) => ({
    type: 'REMOVE_PLAYER',
    socketId
});



const updatePlayer = (socketId, x, y) => ({
  type: 'UPDATE_PLAYER',
  socketId,
  x,
  y
});

// REDUCER

const initialState = {
  playerMap: {
    1: [250, 150]
  }
}

const reducer = (state = initialState, action) => {
  Object.freeze(state);
  const newState = _.merge({}, state);

  switch (action.type) {
    case 'NEW_PLAYER':
      newState.playerMap[action.socketId] = [action.x, action.y]
    case 'REMOVE_PLAYER':
      // need to actually destroy the sprite, but not within redux?
      delete newState.playerMap[action.socketId];
    case 'UPDATE_PLAYER':
      newState.playerMap[action.socketId] = [action.x, action.y]
  }

  return newState;
}

module.exports = {
  reducer,
  updatePlayer,
  newPlayer,
  removePlayer
}
