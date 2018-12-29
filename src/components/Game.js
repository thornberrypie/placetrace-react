import React, { Component } from 'react'
import CountryImage from './CountryImage'
import svgData from '../data/svgCountries.json'

class Game extends Component {

  constructor() {
    super()
    this.state = {
      countryCode: "",
      countryColor: "#79c050",
      countryName: "",
      score: 0
    }
  }

  componentDidMount() {
    this.getCountries()
  }

  getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data =>
      this.setCountryState(data)
    )
  }

  getCountryImage() {
    return (
      svgData.map((svgData, index) => {
        let countryCode = this.state.countryCode
        let svgScale = "0.1,-0.1"
        let svgSize = "1024"
        let svgTranslate = svgSize

        if(countryCode === 'at') {
          svgScale = "0.5,-0.5"
          svgTranslate = 750
        }

        if(svgData.id === countryCode) {
          return (
            <CountryImage
              key = {index}
              id = {svgData.id}
              svgPaths = {svgData.svg}
              svgScale = {svgScale}
              svgTranslate = {svgTranslate}
              size = {svgSize}
              color = {this.state.countryColor}
            />
          )
        } else {
          return null
        }
      })
    )
  }

  setCountryState(data) {
    //let currentIndex = Math.floor((Math.random() * data.length))
    let currentIndex = Math.floor((Math.random() * svgData.length))
    let country = data[currentIndex]
    this.setState({
      countryCode: country.alpha2Code.toLowerCase(),
      countryName: country.name
    })
  }

  refreshCountry = event => {
    this.setState({'countryCode':''})
    this.getCountries()
  };

  render() {
    return (
      <section className="game">
        <h2>Guess the country</h2>
        <p>{this.state.countryName}</p>
        <p>{this.state.countryCode}</p>
        <div className="country">
          {this.getCountryImage()}
          <button onClick={this.refreshCountry}>Refresh</button>
        </div>
      </section>
    )
  }
}

export default Game
