import types from './types'

export const updateCaseFilter = (filter, text) => {

  return {
    type: types.UPDATE_CASE_FILTER,
    filter,
    text
  }
}