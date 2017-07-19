import C from './constants'

export default {
  [C.STATE]: (state, searchText) => 
    searchText === '' || searchText === state,

  [C.COURT]: (courtCase, searchText) => 
    true,
  
  [C.TITLE]: (courtCase, searchText) =>
    // TODO - move parsing out of here - pure logic only 
    searchText === '' || searchText.split(' ')
    .reduce((acc, val) => 
      acc || courtCase.name.toLowerCase().includes(val.toLowerCase()), 
      false
    ),
  
  [C.START_YEAR]: (courtCase, searchText) =>
    // TODO - move parsing out of here - pure logic only 
    searchText === '' ||
    Number(searchText) <= Number(courtCase.date.split('/')[2]),
  
  [C.END_YEAR]: (courtCase, searchText) => 
    // TODO - move parsing out of here - pure logic only 
    searchText === '' ||
    Number(searchText) >= Number(courtCase.date.split('/')[2]),
}