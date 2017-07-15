import React, { Component } from 'react'
import Header from '../components/Header'
import Content from '../containers/Content'

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
      </div>
    )
  }
}
