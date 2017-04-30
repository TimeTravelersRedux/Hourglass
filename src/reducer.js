import _ from 'lodash'
import stateHistory from './stateHistory'
// ACTION CREATORS

export const setHero = (id, x, y) => ({
  type: 'SET_HERO',
  id,
  x,
  y
})

export const setKeyHolderId = (keyHolderId) => ({
  type: 'SET_KEY_HOLDER_ID',
  keyHolderId
})

export const updateState = (players) => ({
  type: 'UPDATE_STATE',
  players
})

// REDUCER

const initialState = {
  hero: {},
  players: [],
  keyHolderId: ''
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
    case 'SET_KEY_HOLDER_ID':
      newState.keyHolderId = action.keyHolderId
      break
  }

  return newState
}

const undo = reducer => (state = stateHistory.present, action) => {
  switch (action.type) {
    case 'UNDO':
      stateHistory.undo();
      break;

    case 'REDO':
      stateHistory.redo();
      break;

    case 'GOTO':
      stateHistory.gotoState(action.stateIndex);
      break;

    default:
      const newState = reducer(state, action);
      stateHistory.push(newState);
  }

  return stateHistory.present;
}

// Combine reducers

export default undo(reducer)
