import types from './types'
import {fetchCourt} from './fetch'

export const updateCaseFilter = (filter, text) => {

  return {
    type: types.UPDATE_CASE_FILTER,
    filter,
    text
  }
}