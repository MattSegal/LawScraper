import React from 'react'
import ReactDOM from 'react-dom'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import {createLogger} from 'redux-logger'
import './css/index.css'
import C from './constants'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import {reducer} from './reducers'


// Dummy test data
import testData from './testData'

const initialState = {
  cases: testData,
  filters: {
    [C.COURT]: '',
    [C.TITLE]: '',
    [C.START_YEAR]: '',
    [C.END_YEAR]: '',
  }
}

const middleware = applyMiddleware(
    createLogger(),
)

const store  = createStore(reducer, initialState, middleware)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
)
registerServiceWorker()
