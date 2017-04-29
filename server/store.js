const { createStore, applyMiddleware } = require('redux')
const thunk = require('redux-thunk').default

// reducers
const mainReducer = require('./reducers/index.js')

module.exports = createStore(mainReducer, applyMiddleware(thunk))
