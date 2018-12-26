import React, { Component } from 'react'
import CountryImage from './CountryImage'
import svgData from '../data/svgCountries.json'

class Game extends Component {
  render() {
    return (
      <section className="game">
        <h2>Guess the country</h2>
        <div className="country">{ this.getCountryImage() }</div>
      </section>
    )
  }

  getCountryImage() {
    return (
      svgData.map((svgData, index) => {
        return (
          <CountryImage
            key = {index}
            id = {svgData.id}
            svgPaths = {svgData.svg}
            size = "1024"
            color = "#79c050"
          />
        )
      })
    )
  }
}

export default Game
