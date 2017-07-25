import React, { Component } from 'react'
import Header from '../components/Header'
import Content from '../containers/Content'
import {callGoogleAnalytics} from '../analytics'

export default class App extends Component {

  componentDidMount() {
    callGoogleAnalytics('create', 'UA-103174696-1', 'auto')
    callGoogleAnalytics('send', 'pageview')
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    )
  }
}
