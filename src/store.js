import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'

import reducer from './reducer.js'
import thunkMiddleware from 'redux-thunk';

export default createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed: true})
  )
);

export default store
