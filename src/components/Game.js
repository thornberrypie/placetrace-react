import React, { Component } from 'react'
import CountryImage from './CountryImage'
import GameIntro from './GameIntro'
import RegionButton from './RegionButton'
import SvgData from '../data/svgCountries.json'

class Game extends Component {

  constructor() {
    super()
    this.state = {
      countryCapital: '',
      countryCode: '',
      countryCurrency: '',
      countryLanguage: '',
      countryName: '',
      countryPopulation: '',
      countryRegion: '',
      gameStarted: false,
      mapColor: '#79c050',
      regions: [
          'Africa',
          'Americas',
          'Asia',
          'Europe',
          'Oceania'
      ],
      score: 0
    }
  }

  clickStartButton = event => {
    this.startGame()
  }

  componentDidMount() {
    //this.getCountries()
  }

  getCountries() {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data =>
      this.setCountryState(data)
    )
  }

  refreshCountry = event => {
    this.getCountries()
  }

  setCountryState(data) {
    //let currentIndex = Math.floor((Math.random() * data.length))
    let currentIndex = Math.floor((Math.random() * SvgData.length))
    let country = data[currentIndex]
    this.setState({
      countryCapital: country.capital,
      countryCode: country.alpha2Code.toLowerCase(),
      countryName: country.name,
      countryRegion: country.region
    })
  }

  showCountryImage() {
    return (
      SvgData.map((data, index) => {
        let code = this.state.countryCode
        let region = this.state.countryRegion
        let svgScale = "0.1,-0.1"
        let svgSize = "1024"
        let svgTranslate = svgSize

        if(data.id === code) {
          // Add exception for Austria, SVG paths are defined differently
          if(code === 'at') {
            svgScale = "0.5,-0.5"
            svgTranslate = 750
          }

          // Add exceptions for countries where the SVG data is missing,
          // or countries that have no region,
          // and Antarctica, as it's the only country in the 'Polar' region
          const countriesToIgnore = ['aq','um']
          if(countriesToIgnore.includes(code) || region === '') {
            this.getCountries()
          }

          return (
            <CountryImage
              key = {index}
              id = {data.id}
              svgPaths = {data.svg}
              svgScale = {svgScale}
              svgTranslate = {svgTranslate}
              size = {svgSize}
              color = {this.state.mapColor}
            />
          )
        } else {
          return null
        }
      })
    )
  }

  showRegionButton(regionName) {
    console.log(regionName)
    return <RegionButton regionName={regionName}/>
  }

  showRegionButtons() {
    this.state.regions.forEach(this.showRegionButton)
  }

  startGame() {
    this.setState({
      gameStarted: true
    })
  }

  render() {
    return (
      <section className="game">
        <GameIntro
          countryName={this.state.countryName}
          countryCode={this.state.countryCode}
          gameStarted={this.state.gameStarted}
        />
        <button onClick={this.clickStartButton} className={this.state.gameStarted ? "hidden" : "button button--start"}>Start Game</button>
        <button onClick={this.refreshCountry} className={this.state.gameStarted ? "button button--refresh" : "hidden"}>Refresh</button>
        <div className="country">
          {this.showCountryImage()}
          <div className="region">
            {this.showRegionButtons()}
          </div>
        </div>
      </section>
    )
  }
}

export default Game
