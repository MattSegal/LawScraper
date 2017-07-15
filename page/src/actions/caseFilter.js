import types from './types'

export const updateCaseFilter = (filter, text) => ({
  type: types.UPDATE_CASE_FILTER,
  filter,
  text
})