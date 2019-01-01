import React, { Component } from 'react'
import CountryImage from './CountryImage'
import GameIntro from './GameIntro'
import RegionButtons from './RegionButtons'
import SvgData from '../data/svgCountries.json'

const Regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
]

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
      score: 0
    }
  }

  clickStartButton = event => {
    this.startGame()
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
            console.log('not that one')
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

  startGame() {
    this.setState({
      gameStarted: true
    })
  }

  render() {
    return (
      <section className="game">
        <button onClick={this.clickStartButton} className={this.state.gameStarted ? "hidden" : "button button--start"}>Start Game</button>
        <div className={this.state.gameStarted ? "country" : "hidden"}>
          <GameIntro
            countryName={this.state.countryName}
            countryCode={this.state.countryCode}
          />
          <button onClick={this.refreshCountry} className="button button--refresh">Refresh</button>
          <div className="game-area">
            {this.showCountryImage()}
          </div>
          <div className="game-form">
          <div className="game-regions">
            <p className="game-text">Which country is this?</p>
            <RegionButtons regions={Regions}/>
          </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Game
