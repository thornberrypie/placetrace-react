import React, { Component } from 'react';
import CountryImage from './CountryImage';

class Game extends Component {
  render() {
    return (
      <section className="game">
        <h2>Guess the country</h2>
        <div className="country">
          <CountryImage name="Andorra" code="ad" />
        </div>
      </section>
    )
  }
}

export default Game;
