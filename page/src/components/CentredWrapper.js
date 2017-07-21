import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CenterWrapper extends Component {
  static propTypes = {
    maxWidth: PropTypes.number
  }

  render() {
    const outerStyle = {padding: '0 10px'}
    const innerStyle = {
        margin: '0 auto',
        maxWidth: this.props.maxWidth + 'px'
      }
    return (
      <div className="CentredWrapper" style={outerStyle}>
        <div style={innerStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
