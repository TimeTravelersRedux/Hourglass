const {combineReducers} = require('redux')
const players = require('./players.js').playerReducers
const game = require('./engine.js').engineReducers

const mainReducer = combineReducers({
  players,
  game
})

module.exports = mainReducer
