const redux = require('redux')
const reduxLogger = require('redux-logger')

const {reducer} = require('./reducer.js')

const store = redux.createStore(
  reducer
);

module.exports = store
