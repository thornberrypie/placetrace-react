import React, { Component } from 'react'
import CountryImage from './CountryImage'
import CountrySelect from './CountrySelect'
import GameIntro from './_GameIntro'
import RegionButtons from './_RegionButtons'
import SvgData from '../data/svgCountries.json'

const regions = [
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
      colorGreen: '#79c050',
      countryCapital: '',
      countryCode: '',
      countryCurrency: '',
      countryLanguage: '',
      countryName: '',
      countryPopulation: '',
      countryRegion: '',
      countriesData: {},
      gameStarted: false,
      score: 0
    }
  }

  showCountryImage() {
    return (
      SvgData.map((data, index) => {
        if(data.id === this.state.countryCode) {
          return (
            <CountryImage
              key = {index}
              id = {data.id}
              countryCode = {this.state.countryCode}
              svgPaths = {data.svg}
              color = {this.state.colorGreen}
            />
          )
        } else {
          return null
        }
      })
    )
  }

  componentDidMount() {
    this.getCountriesFromAPI()
  }

  getCountriesFromAPI() {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
      this.setState({
        countriesData: data
      })
      this.startNewRound()
    })
  }

  startNewRound() {
    // Create random country code from SVG JSON data
    let randomIndex = Math.floor((Math.random() * SvgData.length))
    let randomCountryCode = SvgData[randomIndex].id

    // Match up random country code with data item from API
    let selectedIndex = -1;
    this.state.countriesData.forEach(function(item, index){
      //console.log(item.alpha2Code.toLowerCase())
      if(randomCountryCode === item.alpha2Code.toLowerCase()) {
        selectedIndex = index;
      }
    })

    // Start again if we can't find a match
    if(selectedIndex === -1) {
      this.startNewRound()
      return false
    }

    let country = this.state.countriesData[selectedIndex]
    this.setState({
      countryCapital: country.capital,
      countryCode: country.alpha2Code.toLowerCase(),
      countryName: country.name,
      countryRegion: country.region
    })
  }

  startGame() {
    this.setState({
      gameStarted: true
    })
  }

  clickStartButton = e => {
    this.startGame()
  }

  refreshCountry = e => {
    this.startNewRound()
  }

  render() {
    return (
      <section className={this.state.gameStarted ? "game game--started" : "game game--ready"}>
        <div className="game-buttons">
          <button onClick={this.clickStartButton} className="button button--start">Start Game</button>
          <button onClick={this.refreshCountry} className="button button--refresh">Skip to next round &gt;&gt;</button>
        </div>
        <GameIntro/>
        <div className="game-area">
          <div className="game-country">
            {this.showCountryImage()}
          </div>
          <form className="game-form">
            <p className="game-text">Which country is this?</p>
            <div className="game-select">
              <CountrySelect
                value={this.state.selectedOption}
                countries ={this.state.countriesData}
              />
            </div>
            <div className="game-filter">
              <RegionButtons regions={regions}/>
            </div>

          </form>
        </div>
        <div>
          <p>{this.state.countryName}</p>
          <p>{this.state.countryCode}</p>
        </div>
      </section>
    )
  }
}

export default Game
