export default {
  text: (searchText) => 
    true,
  
  year: (searchText) =>
    searchText === '' || (
      searchText.length === 4 &&
      !isNaN(searchText) && 
      Number(searchText) % 1 === 0
    )
}