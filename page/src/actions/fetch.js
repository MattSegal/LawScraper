import types from './types'
import axios from 'axios'

const STATES_URL = 'https://s3-ap-southeast-2.amazonaws.com/austlii/state-courts.json'

const getCourtUrl = (stateSlug, courtSlug) => 
  `https://s3-ap-southeast-2.amazonaws.com/austlii/${stateSlug}/${courtSlug}.json`

export const fetchStates = () => (dispatch) => {
    dispatch(requestStates())
    return axios.get(STATES_URL)
      .then(response => response.data)
      .then(stateData => dispatch(receiveStates(stateData)))
}

const requestStates = () => ({
    type: types.REQUEST_STATES,
})

const receiveStates = (stateData) => ({
    type: types.RECEIVE_STATES,
    states: stateData
})

export const fetchCourt = (stateSlug, courtSlug) => (dispatch) => {
    dispatch(requestCourt(courtSlug))
    return axios.get(getCourtUrl(stateSlug, courtSlug))
      .then(response => response.data)
      .then(courtData => dispatch(receiveCourt(courtSlug, courtData)))
}

const requestCourt = (courtSlug) => ({
    type: types.REQUEST_CASES,
    court: courtSlug,
})

const receiveCourt = (courtSlug, courtData) => ({
    type: types.RECEIVE_CASES,
    courtSlug,
    cases: courtData
})