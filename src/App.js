import React, { Component } from 'react';
import './scss/App.scss';
import Header from './components/Header';
import Country from './components/Country';


class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header title="Place-Trace" />
        <main className="main">
          <Country/>
        </main>
      </div>
    );
  }
}

export default App;
