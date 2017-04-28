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

export const reducer = (initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'NEW_PLAYER':
      newState.playerMap[action.id] = [action.x, action.y]
    case 'REMOVE_PLAYER':
      // need to actually destroy the sprite, but not within redux?
      delete newState.playerMap[id];
    case 'MOVE_PLAYER':
      newState.playerMap[action.id] = [x, y]
  }

  return newState;
}
