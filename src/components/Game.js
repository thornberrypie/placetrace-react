import React, { Component } from 'react'
import CountryImage from './CountryImage'
import svgData from '../data/svgCountries.json'

class Game extends Component {

  constructor() {
    super();
    this.state = {
      countryCode: '',
      countryName: ''
    }
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(data =>
        this.setCountryState(data)
      )
  }

  getCountryImage() {
    return (
      svgData.map((svgData, index) => {
        if(svgData.id === this.state.countryCode) {
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

  setCountryState(data) {
    //let currentIndex = Math.floor((Math.random() * data.length))
    let currentIndex = Math.floor((Math.random() * 5))
    let country = data[currentIndex]
    this.setState({
      countryCode: country.alpha2Code.toLowerCase(),
      countryName: country.name
    })
  }

  render() {
    return (
      <section className="game">
        <h2>Guess the country</h2>
        <p>{this.state.countryName}</p>
        <p>{this.state.countryCode}</p>
        <div className="country">
          {this.getCountryImage()}
        </div>
      </section>
    )
  }
}

export default Game
