import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../css/Filters.css'

export default class FilterSelect extends Component 
{
  static propTypes = {
    filter: PropTypes.func,
    placeholder: PropTypes.string,
    options: PropTypes.array,
  }

  constructor(props) 
  {
    super(props)
    this.state = {
      selected: null,
    }
  }

  handleSelect = (option) => 
  {
    this.setState({
      selected: option
    })
    this.props.filter(option ? option.value : '')
  }

  render() 
  {
    const {options} = this.props
    const {selected} = this.state
    return ( 
      <Select
        className={'Filter'}
        value={selected ? selected.value : ''} 
        options={options}
        placeholder={`Select the ${this.props.placeholder}`}
        onChange={this.handleSelect}
      />
    )
  }
}
