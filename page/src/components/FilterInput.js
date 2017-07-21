import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../css/Filters.css'


export default class FilterInput extends Component 
{
  static propTypes = {
    filter: PropTypes.func,
    validator: PropTypes.func,
    placeholder: PropTypes.string,
    className: PropTypes.string,
  }

  constructor(props) 
  {
    super(props)
    this.state = {
      text: '',
      isValid: true,
    }
  }

  handleTextChange = (event) => 
  {
    const newText = event.target.value
    this.setState({
      text: newText
    })
    let isValid
    if (this.props.validator(newText)) 
    {
      this.props.filter(newText)
      isValid = true
    }
    else {
      isValid = newText === ''
    }
    this.setState({
      isValid: isValid
    })
    
  }

  render() 
  {
    const {className} = this.props
    const {isValid} = this.state
    return (
      <input 
        className={`Filter FilterInput ${isValid ? 'valid' : 'invalid'} ${className}`}
        autoFocus
        type="text" 
        placeholder={this.props.placeholder}
        value={this.state.text} 
        onChange={this.handleTextChange}
    />
    )
  }
}
