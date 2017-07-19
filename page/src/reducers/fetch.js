import types from '../actions/types'

export const fetchReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.REQUEST_STATES:    return requestStatesReducer(action, state)
    case types.RECEIVE_STATES:    return receiveStatesReducer(action, state)
    case types.REQUEST_CASES:    return requestCasesReducer(action, state)
    case types.RECEIVE_CASES:    return receiveCasesReducer(action, state)

    default:                      return {...state}
  }
}

const requestStatesReducer = (action, state) => ({
  ...state,
  states: {
    data: state.states.data,
    meta: {
      ...state.states.meta,
      updating: true,
    }
  },
})

const receiveStatesReducer = (action, state) => ({
  ...state,
  states: {
    data: action.states,
    meta: {
      ...state.cases.meta,
      updating: false,
    }
  },
})

const requestCasesReducer = (action, state) => ({
  ...state,
  cases: {
    data: state.cases.data,
    meta: {
      ...state.cases.meta,
      updating: true,
    }
  },
})

const receiveCasesReducer = (action, state) => ({
  ...state,
  cases: {
    data: {
      ...state.cases.data,
      [action.courtSlug]: action.cases
    },
    meta: {
      ...state.cases.meta,
      updating: false,
    }
  },
})
