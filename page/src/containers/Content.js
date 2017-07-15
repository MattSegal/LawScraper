import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCaseFilter} from '../actions/caseFilter'
import C from '../constants'
import filters from '../filters'
import validator from '../validators'
import '../css/Content.css'
import HyperLink from '../components/HyperLink'
import FilterInput from '../components/FilterInput'
import CentredWrapper from '../components/CentredWrapper'

const filterCases = (cases, filterText) => 
  Object.keys(cases)
      .map(stateSlug => 
        Object.keys(cases[stateSlug].courts)
        .map(courtSlug =>
          Object.values(cases[stateSlug].courts[courtSlug].years)
          .map(year =>
            year.map(courtCase => ({
              ...courtCase,
              court: cases[stateSlug].courts[courtSlug].name,
              state: cases[stateSlug].name,
            })
          )
        .filter(courtCase => filters[C.COURT](courtCase, filterText[C.COURT]))
        .filter(courtCase => filters[C.TITLE](courtCase,  filterText[C.TITLE]))
        .filter(courtCase => filters[C.START_YEAR](courtCase,  filterText[C.START_YEAR]))
        .filter(courtCase => filters[C.END_YEAR](courtCase,  filterText[C.END_YEAR]))
        .reduce((acc, val) => acc.concat(val), [])
        ).reduce((acc, val) => acc.concat(val), [])
      ).reduce((acc, val) => acc.concat(val), [])
    ).reduce((acc, val) => acc.concat(val), [])

class Content extends Component {
  render() {
    const {cases, filterText, updateFilter} = this.props
    const filteredCases = filterCases(cases, filterText)
    const visibleCases = filteredCases.slice(0,100)

    return (
      <div className="Content">
        <CentredWrapper maxWidth={600}>
          {/*TODO: Select state*/}
          <FilterInput 
            filter={updateFilter(C.COURT)}
            validator={validator.text}
            placeholder="Court" />
          <FilterInput 
            filter={updateFilter(C.TITLE)}
            validator={validator.text}
            placeholder="Case title"/>
          <FilterInput 
            filter={updateFilter(C.START_YEAR)}
            validator={validator.year}
            placeholder="Start year"/>
          <FilterInput 
            filter={updateFilter(C.END_YEAR)}
            validator={validator.year}
            placeholder="End year"/>
          <p style={{fontSize: 'x-small', color: '#888', marginTop: '0'}}>
            Showing {visibleCases.length} of {filteredCases.length} results.
          </p>
          {visibleCases.map((c, idx) => 
            <HyperLink key={idx} link={c} />
          )}
        </CentredWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
    cases: state.cases,
    filterText: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  updateFilter: filter =>  text => dispatch(updateCaseFilter(filter, text)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)