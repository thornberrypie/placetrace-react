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
      countryCapital: '',
      countryCode: '',
      countryCurrency: '',
      countryLanguage: '',
      countryName: '',
      countryPopulation: '',
      countryRegion: '',
      countryData: {},
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
    .then(data => {
      this.setState({
        countryData: data
      })
      this.startNewRound()
    })
  }

  refreshCountry = event => {
    this.startNewRound()
  }

  startNewRound() {
    // Create random country code from SVG JSON data
    let randomIndex = Math.floor((Math.random() * SvgData.length))
    let randomCountryCode = SvgData[randomIndex].id

    // Match up random country code with data item from API
    let selectedIndex = -1;
    this.state.countryData.forEach(function(item, index){
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

    let country = this.state.countryData[selectedIndex]
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
