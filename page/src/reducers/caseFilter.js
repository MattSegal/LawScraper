import types from '../actions/types'

export const caseFilterReducer = (action) => (state) =>
{
  switch(action.type)
  {
    case types.UPDATE_CASE_FILTER: return updateFilter(action, state)
    default: return {...state}
  }
}
    
const updateFilter = (action, state) =>  ({
  ...state,
  filters: {
    ...state.filters,
    [action.filter]: action.text
  }
})
