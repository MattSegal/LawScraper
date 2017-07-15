import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class CenterWrapper extends Component {
  static propTypes = {
    maxWidth: PropTypes.number
  }

  render() {
    return (
      <div className="CentredWrapper" style={{
        margin: "0 auto",
        maxWidth: this.props.maxWidth + 'px'
      }}>
        {this.props.children}
      </div>
    )
  }
}
