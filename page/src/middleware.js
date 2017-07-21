import C from './constants'
import {fetchCourt} from './actions/fetch'
import types from './actions/types'

export const lazyLoadMiddleware = store => next => action => {

  // Fetch the court data if we don't have it already
  if (action.type === types.UPDATE_CASE_FILTER && action.filter === C.COURT) {
    const state = store.getState()
    const court = action.text
    const courtData = state.cases.data.court
    // Check if the court data is already present
    if (court && !courtData) {
      // Figure out what state we need for the URL
      const ausStates = state.states.data
      const ausState = Object.keys(ausStates)
        .find(stateSlug =>  
          Object.keys(ausStates[stateSlug].courts).includes(court)
        )
      // Fetch the court data from S3
      fetchCourt(ausState, court)(store.dispatch)
    }
  }
  return next(action)
} 