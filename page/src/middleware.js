import {fetchCourt} from './actions/fetch'
import types from './actions/types'

export const lazyLoadMiddleware = store => next => action => {

  // TODO: Only load if court is not already present
  if (action.type === types.UPDATE_CASE_FILTER) {
    fetchCourt('vic', 'VicCorC')(store.dispatch)
  }
  return next(action)
} 