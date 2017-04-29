// createStore, applyMiddleware
const redux = require('redux');
// createLogger
const createLogger = require('redux-logger');
const thunkMiddleware = require('redux-thunk');

// ACTION CREATORS
const newPlayer = (id, x, y) => ({
    type: 'NEW_PLAYER',
    id,
    x,
    y
});

const removePlayer = (id) => ({
    type: 'REMOVE_PLAYER',
    id
});



const movePlayer = (id, x, y) => ({
  type: 'MOVE_PLAYER',
  id,
  x,
  y
});


// REDUCER

const initialState = {
  playerMap: {}
}

function reducer(state = initialState, action){
  const newState = Object.assign({}, initialState);
  switch (action.type) {
    case 'NEW_PLAYER':
      newState.playerMap[action.id] = [action.x, action.y];
      break;
    case 'REMOVE_PLAYER':
      // need to actually destroy the sprite, but not within redux?
      delete newState.playerMap[id];
      break;
    case 'MOVE_PLAYER':
      newState.playerMap[action.id] = [action.x, action.y];
      console.log('store pos: ', newState.playerMap[action.id])
      break;
  }

  return newState;
}

// STORE

const store = redux.createStore(
  reducer,
  redux.applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);
