import React, { Component } from 'react';
import './App.css';
import logo from './images/logo.svg';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header title="Place-Trace" logo={logo} />
        <main className="main">

        </main>
      </div>
      /*
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
      */
    );
  }
}

export default App;
