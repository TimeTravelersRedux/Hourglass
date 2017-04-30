const redux = require('redux')
const reduxLogger = require('redux-logger')

const {reducer} = require('./reducer.js')

console.dir(reducer)

const store = redux.createStore(
  reducer
  // redux.applyMiddleware(
  //   reduxLogger.createLogger({collapsed: true})
  // )
);

module.exports = store
