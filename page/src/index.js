import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
import {lazyLoadMiddleware} from './middleware'
import './css/index.css'
import C from './constants'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import {reducer} from './reducers'

const initialState = {
  states: {
    data: {},
    meta: {updating: true},
  },
  cases: {
    data: {},
    meta: {updating: false},
  },
  results: [],
  filters: {
    [C.STATE]: '',
    [C.COURT]: '',
    [C.TITLE]: '',
    [C.START_YEAR]: '',
    [C.END_YEAR]: '',
  }
}

const middleware = applyMiddleware(
    createLogger(),
    lazyLoadMiddleware,
    thunkMiddleware,
)

const store  = createStore(reducer, initialState, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
