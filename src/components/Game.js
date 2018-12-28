import React, { Component } from 'react'
import CountryImage from './CountryImage'
import svgData from '../data/svgCountries.json'

class Game extends Component {

  constructor() {
    super();
    this.state = {
      countryCode: 'ad',
      countryName: 'Andorra'
    }
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data =>
        console.log(data.length + ' countries')
      )
  }

  getCountryImage(countryCode) {
    return (
      svgData.map((svgData, index) => {
        if(svgData.id === countryCode) {
          return (
            <CountryImage
              key = {index}
              id = {svgData.id}
              svgPaths = {svgData.svg}
              size = "1024"
              color = "#79c050"
            />
          )
        }
      })
    )
  }

  render() {
    return (
      <section className="game">
        <h2>Guess the country</h2>
        { this.state.data }
        <div className="country">
          { this.getCountryImage(this.state.countryCode) }
        </div>
      </section>
    )
  }
}

export default Game
