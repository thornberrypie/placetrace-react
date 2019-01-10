import React, { Component } from 'react'
import './scss/App.scss'
import Header from './components/_Header'
import Game from './components/Game'
import Footer from './components/_Footer'


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header title="Place-Trace"/>
        <main className="main">
          <Game/>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App
