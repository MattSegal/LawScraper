import types from '../actions/types'
import C from '../constants'

export const caseFilterReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.UPDATE_CASE_FILTER: return updateFilter(action, state)
    default: return {...state}
  }
}
    
const updateFilter = (action, state) =>  {
  // If a state is selected
  if (action.filter === C.STATE) {
    const ausState = state.states.data[action.text]
    const courtShouldBeSelected = ausState
      ? Object.keys(ausState).includes(state.filters[C.COURT])
      : false 
    return {
      ...state,
      filters: {
        ...state.filters,
        [C.STATE]: action.text,
        [C.COURT]: courtShouldBeSelected
          ? state.filters[C.COURT] : '',
      }
    }
  }
  // Normal case
  return {
    ...state,
    filters: {
      ...state.filters,
      [action.filter]: action.text
    }
  }
}
