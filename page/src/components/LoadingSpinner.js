import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class LoadingSpinner extends Component {
  static propTypes = {
    maxWidth: PropTypes.number
  }

  render() {
    return (
      <img 
        className="LoadingSpinner" 
        src="./loading_spinner.gif"
        alt="Loading..."
        style={{
          width: '100px',
          height: '100px',
          display: 'block',
          margin: '0 auto',
        }} />
    )
  }
}
