import React, { Component } from 'react'
import CountryImage from './CountryImage'
//import CountryDropdown from './CountryDropdown'
import GameIntro from './GameIntro'
import Select from 'react-select';
import RegionButtons from './RegionButtons'
import SvgData from '../data/svgCountries.json'

const regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
]

const countryList = [
  {value: 'ad', label: 'Andorra'},
  {value: 'ao', label: 'Angola'},
  {value: 'ag', label: 'Antigua and Barbuda'}
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
    this.getCountries()
  }

  getCountries() {
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

  clickStartButton = event => {
    this.startGame()
  }

  refreshCountry = event => {
    this.startNewRound()
  }

  render() {
    return (
      <section className="game">
        <button onClick={this.clickStartButton} className={this.state.gameStarted ? "hidden" : "button button--start"}>Start Game</button>
        <div className={this.state.gameStarted ? "country" : "hidden"}>
          <div className="game-buttons">
            <button onClick={this.refreshCountry} className="button button--refresh">Skip to next round &gt;&gt;</button>
          </div>
          <div className="game-area">
            {this.showCountryImage()}
          </div>
          <form className="game-form">
            <div className="game-regions">
              <p className="game-text">Which country is this?</p>
              <GameIntro
                countryName={this.state.countryName}
                countryCode={this.state.countryCode}
              />
              <Select
                value={this.state.selectedOption}
                //onChange={this.handleChange}
                options={countryList}
              />
              <RegionButtons regions={regions}/>
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export default Game
