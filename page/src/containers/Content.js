import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fetchStates} from '../actions/fetch'
import C from '../constants'
import searchFilters from '../searchFilters'
import '../css/Content.css'
import SearchBox from '../containers/SearchBox'
import HyperLink from '../components/HyperLink'
import CentredWrapper from '../components/CentredWrapper'
import LoadingSpinner from '../components/LoadingSpinner'


// TODO: filter by selected state
// TODO: filter by selected court
const filterCases = (cases, filterText) => []
  // Object.keys(cases)
  //     .map(stateSlug => 
  //       Object.keys(cases[stateSlug].courts)
  //       .map(courtSlug =>
  //         Object.values(cases[stateSlug].courts[courtSlug].years)
  //         .map(year =>
  //           year.map(courtCase => ({
  //             ...courtCase,
  //             court: cases[stateSlug].courts[courtSlug].name,
  //             state: cases[stateSlug].name,
  //           })
  //         )
  //       .filter(courtCase => searchFilters[C.COURT](courtCase, filterText[C.COURT]))
  //       .filter(courtCase => searchFilters[C.TITLE](courtCase,  filterText[C.TITLE]))
  //       .filter(courtCase => searchFilters[C.START_YEAR](courtCase,  filterText[C.START_YEAR]))
  //       .filter(courtCase => searchFilters[C.END_YEAR](courtCase,  filterText[C.END_YEAR]))
  //       .reduce((acc, val) => acc.concat(val), [])
  //       ).reduce((acc, val) => acc.concat(val), [])
  //     ).reduce((acc, val) => acc.concat(val), [])
  //   ).reduce((acc, val) => acc.concat(val), [])

class Content extends Component {
  static propTypes = {
    states: PropTypes.object,
    statesLoading:  PropTypes.bool,
    cases: PropTypes.object,
    casesLoading:  PropTypes.bool,
    filterText: PropTypes.object,
  }

  componentWillMount() {
    this.props.fetchStates()
  }

  render() {
    const {cases, filterText, updateFilter, states, statesLoading, casesLoading} = this.props

    if (statesLoading) {
      return <LoadingSpinner />
    }

    const filteredCases = cases ? filterCases(cases, filterText) : []  // Necessary?
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
    states: state.states.data,
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