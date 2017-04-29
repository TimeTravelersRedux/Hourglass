// ACTION CREATORS

export const newPlayer = (id, x, y) => ({
    type: 'NEW_PLAYER',
    id,
    x,
    y
});

export const removePlayer = (id) => ({
    type: 'REMOVE_PLAYER',
    id
});



export const moveHero = (id, x, y) => ({
  type: 'MOVE_HERO',
  id,
  x,
  y
});

// REDUCER

const initialState = {
  playerMap: {}
}

const reducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
    case 'NEW_PLAYER':
      newState.playerMap[action.id] = [action.x, action.y]
    case 'REMOVE_PLAYER':
      // need to actually destroy the sprite, but not within redux?
      delete newState.playerMap[action.id];
    case 'MOVE_HERO':
      newState.playerMap[action.id] = [action.x, action.y]
  }

  return newState;
}

export default reducer
