import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class ColumnWrapper extends Component {
  static propTypes = {
    margin: PropTypes.string,
  }

  render() {
    return (
      <div className="ColumnWrapper" style={{
        margin: this.props.margin,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        {this.props.children}
      </div>
    )
  }
}
