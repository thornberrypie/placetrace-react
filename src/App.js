import React, { Component } from 'react'
import './scss/App.scss'
import Header from './components/_Header'
import Game from './components/Game'


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header title="Place-Trace"/>
        <main className="main">
          <Game/>
        </main>
      </div>
    );
  }
}

export default App
