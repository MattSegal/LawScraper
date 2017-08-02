import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import C from '../constants'
import validator from '../validators'
import FilterInput from '../components/FilterInput'
import FilterSelect from '../components/FilterSelect'
import ColumnWrapper from '../components/ColumnWrapper'
import {updateCaseFilter} from '../actions/caseFilter'
import {callGoogleAnalytics} from '../analytics'

class SearchBox extends Component {
  static propTypes = {
    cases: PropTypes.object,
    filterText: PropTypes.object,
    updateFilter: PropTypes.func,
  }

  getStates = (states) =>  Object.keys(states)
    .map(stateSlug =>  ({value: stateSlug, label: states[stateSlug].name}))

  getCourts = (states) => Object.keys(states)
    .filter(state => this.props.filterText[C.STATE] === '' || this.props.filterText[C.STATE] === state)
    .map(stateSlug => 
      Object.keys(states[stateSlug].courts)
      .map(courtSlug => 
        ({value: courtSlug, label: states[stateSlug].courts[courtSlug].name})
      ).reduce((acc, val) => acc.concat(val), [])
    ).reduce((acc, val) => acc.concat(val), [])

  updateFilterWithAnalytics = filterName => filterText => {
    this.props.updateFilter(filterName, filterText)
    callGoogleAnalytics('send', 'event', 'Search', 'select', filterName, filterText)
  }

  updateFilter = filterName => filterText =>
    this.props.updateFilter(filterName, filterText)

  render() {
    const {states} = this.props
    const stateOptions = this.getStates(states)
    const courtOptions = this.getCourts(states)
    // TODO: Info buttons next to each search bar
    return (
      <div className="SearchBox">
        <FilterSelect
          filter={this.updateFilterWithAnalytics(C.STATE)}
          options={stateOptions}
          placeholder="state" />
        <FilterSelect
          filter={this.updateFilterWithAnalytics(C.COURT)}
          options={courtOptions}
          placeholder="court" />
        <FilterInput 
          filter={this.updateFilter(C.TITLE)}
          validator={validator.text}
          placeholder="Case title"/>
        <ColumnWrapper margin="0">
          <FilterInput 
            className="col"
            filter={this.updateFilter(C.START_YEAR)}
            validator={validator.year}
            placeholder="Start year"/>
          <FilterInput 
            className="col"
            filter={this.updateFilter(C.END_YEAR)}
            validator={validator.year}
            placeholder="End year"/>
        </ColumnWrapper>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
    states: state.states.data,
    cases: state.cases.data,
    filterText: state.filters
})

const mapDispatchToProps = (dispatch) => ({
  updateFilter: (filter, text) => dispatch(updateCaseFilter(filter, text)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchBox)