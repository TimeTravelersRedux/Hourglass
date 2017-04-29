import _ from 'lodash'

// ACTION CREATORS

export const setHero = (id, x, y) => ({
  type: 'SET_HERO',
  id,
  x,
  y
})

export const updateState = (players) => ({
  type: 'UPDATE_STATE',
  players
})

// REDUCER

const initialState = {
  hero: {},
  players: []
}

const reducer = (state = initialState, action) => {
  const newState = _.merge({}, state)
  Object.freeze(state)

  switch (action.type) {
    case 'UPDATE_STATE':
      newState.players = action.players
      break
    case 'SET_HERO':
      newState.hero = { id: action.id, x: action.x, y: action.y }
      break
  }

  return newState
}

export default reducer
