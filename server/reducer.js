const _ = require('lodash')

// ACTION CREATORS

const newPlayer = (player) => ({
  type: 'NEW_PLAYER',
  player
});

const removePlayer = (socketId) => ({
  type: 'REMOVE_PLAYER',
  socketId
});

const updatePlayer = (player) => ({
  type: 'UPDATE_OR_CREATE_PLAYER',
  player
});

// REDUCER

const initialState = {
  players: []
}

const reducer = (state = initialState, action) => {
  var newState = _.merge({}, state);
  Object.freeze(state);

  switch (action.type) {
    case 'REMOVE_PLAYER':
      newState.players = newState.players.filter((player) => {
        player.id !== action.id
      })
      break
    case 'UPDATE_OR_CREATE_PLAYER':
      if (newState.players.some(player => player.id === action.player.id)) {
        newState.players = newState.players.map((player) => {
          if (player.id === action.player.id) {
            return action.player
          }
          return player
        })
      } else {
        newState.players = newState.players.concat(action.player)
      }
      break
  }

  return newState;
}

module.exports = {
  reducer,
  updatePlayer,
  newPlayer,
  removePlayer
}
