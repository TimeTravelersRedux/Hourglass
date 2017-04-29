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



const updatePlayer = (socketId, data) => ({
  type: 'UPDATE_PLAYER',
  socketId: socketId,
  x: data[0],
  y: data[1]
});

// REDUCER

const initialState = {
  playerMap: {
  }
}

const reducer = (state = initialState, action) => {
  var newState = _.merge({}, state);
  Object.freeze(state);

  switch (action.type) {
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
