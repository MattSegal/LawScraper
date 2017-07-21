import React, {PureComponent} from 'react';
import '../css/HyperLink.css'
import PropTypes from 'prop-types'

export default class HyperLink extends PureComponent {
  static propTypes = {
    link: PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      date: PropTypes.string,
    })
  }

  render()
  {
    const {link} = this.props
    return (
      <li className="HyperLink">
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
          <p className="details">
            {link.date}
          </p>
      </li>
    )
  }
}