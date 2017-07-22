import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchStates} from '../actions/fetch'
import C from '../constants'
import '../css/Content.css'
import SearchBox from '../containers/SearchBox'
import HyperLink from '../components/HyperLink'
import CentredWrapper from '../components/CentredWrapper'
import LoadingSpinner from '../components/LoadingSpinner'


const getDate = dateString => {
    const dateParts = dateString.split("/")
    return new Date(dateParts[2], dateParts[1], dateParts[0])
}


const filterCases = (cases, filterText) =>
  Object.keys(cases)
    // Filter by start year
    .filter(year =>  
      filterText[C.START_YEAR] === '' || Number(filterText[C.START_YEAR]) <= Number(year))
    // Filter by end year
    .filter(year =>  
      filterText[C.END_YEAR] === '' || Number(filterText[C.END_YEAR]) >= Number(year))
    .map(year => cases[year])
    .reduce((acc, val) => acc.concat(val), [])
    // Filter by title
    .filter(courtCase => 
      filterText[C.TITLE] === '' || 
      filterText[C.TITLE].split(' ')
        .reduce((acc, val) => 
          acc || (val && courtCase.name.toLowerCase().includes(val.toLowerCase())),
          false
        )
    )
    // Order by date
    .sort((courtCase1, courtCase2) => 
      getDate(courtCase2.date) - getDate(courtCase1.date)
    )


class Content extends Component {
  static propTypes = {
    statesLoading:  PropTypes.bool,
    cases: PropTypes.object,
    casesLoading:  PropTypes.bool,
    filterText: PropTypes.object,
  }

  componentWillMount() {
    this.props.fetchStates()
  }

  render() {
    const {cases, filterText, statesLoading, casesLoading} = this.props

    if (statesLoading) {
      return <LoadingSpinner />
    }

    const filteredCases = cases[filterText[C.COURT]] 
      ? filterCases(cases[filterText[C.COURT]] , filterText) 
      : []
    const visibleCases = filteredCases.slice(0,100)

    return (
      <div className="Content">
        <CentredWrapper maxWidth={600}>
          <SearchBox />
          <p style={{fontSize: 'x-small', color: '#888', marginTop: '0'}}>
            Showing {visibleCases.length} of {filteredCases.length} results.
          </p>
          {casesLoading 
              ? <LoadingSpinner />
              : visibleCases.map((c, idx) => <HyperLink key={idx} link={c} />)
          }
        </CentredWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    statesLoading: state.states.meta.updating,
    cases: state.cases.data,
    casesLoading: state.cases.meta.updating,
    filterText: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  fetchStates: () => dispatch(fetchStates()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)