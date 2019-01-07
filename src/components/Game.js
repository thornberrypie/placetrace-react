import React, { Component } from 'react'
import CountryImage from './CountryImage'
import GameIntro from './_GameIntro'
import Select from 'react-select';
import SvgData from '../data/svgCountries.json'

const Regions = [
    'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
]

class Game extends Component {
  constructor() {
    super()
    this.countryMenu = React.createRef()
    this.state = {
      colorGreen: '#79c050',
      correctAnswer: false,
      countryArea: '',
      countryCapital: '',
      countryCode: '',
      countryCurrency: '',
      countryCurrencySymbol: '',
      countryLanguage: '',
      countryName: '',
      countryPopulation: '',
      countryRegion: '',
      countrySelectData: [],
      countriesData: [],
      gameStarted: false,
      levelsPlayed: 0,
      numGuesses: 0,
      roundEnded: false,
      score: 0,
      selectPlaceholder: 'Select a country...',
      selectedCountryCode: '',
      selectedRegion: ''
    }
  }

  componentWillMount() {
    this.getCountriesFromAPI()
  }

  buildSelectMenu(selectedRegion) {
    const countries = this.state.countriesData
    let selectedCountryCode = this.countryMenu.current.props.value.value
    let selectedCountryIsInRegion = false;
    let countrySelectData = [];

    // Create new array of objects for select menu
    Object.keys(countries).forEach((key) => {
      let country = countries[key]

      // If region is selected allow only that region's countries
      if(selectedRegion && selectedRegion !== country.region) {
        return
      }
      if(country.alpha2Code.toLowerCase() === selectedCountryCode) {
        selectedCountryIsInRegion = true;
      }

      countrySelectData.push({
        value: country.alpha2Code.toLowerCase(),
        label: country.name
      })
    })

    if(selectedRegion && !selectedCountryIsInRegion) {
      this.setPlaceholder(selectedRegion)
    }
    this.setState({
      countrySelectData: countrySelectData,
    })
  }

  getCountriesFromAPI() {
    fetch('https://restcountries.eu/rest/v2/all')
    .then(response => response.json())
    .then(data => {
      this.setState({
        countriesData: data
      })
      this.buildSelectMenu()
      this.startNewRound()
    })
  }

  getCurrency() {
    let c = this.state.countryCurrency
    if(c.indexOf(' dollar') !== -1) c = 'Dollar'
    if(c.indexOf(' franc') !== -1) c = 'Franc'
    if(c.indexOf(' mark') !== -1) c = 'Mark'
    if(c.indexOf(' pound') !== -1) c = 'Pound'
    return c
  }

  setPlaceholder(region) {
    if(region === 'Americas') {
      region = 'the Americas'
    }
    this.setState({
      selectedCountryCode: '',
      selectPlaceholder: 'Select a country in ' + region
    })
  }

  setCountryState(index) {
    let country = this.state.countriesData[index]
    let currency = ''
    let currencySymbol = country.currencies[0].symbol
    let language = ''

    country.currencies.forEach((item) => {
      currency += item.name + ', '
    })
    currency = currency !== '' ? currency.slice(0, -2) : ''

    country.languages.forEach((item) => {
      language += item.name + ', '
    })
    language = language !== '' ? language.slice(0, -2) : ''

    this.setState({
      countryArea: country.area,
      countryCapital: country.capital,
      countryCode: country.alpha2Code.toLowerCase(),
      countryCurrency: currency,
      countryCurrencySymbol: currencySymbol,
      countryLanguage: language,
      countryName: country.name,
      countryPopulation: country.population,
      countryRegion: country.region
    })
  }

  setRegionState(event) {
    event.preventDefault()
    let selectedRegion = event.target.innerText

    this.setState({
      selectedRegion: selectedRegion === this.state.selectedRegion ? '' : selectedRegion
    })

    if(selectedRegion === this.state.selectedRegion) {
      this.buildSelectMenu()
    } else {
      this.buildSelectMenu(selectedRegion)
    }

    this.countryMenu.current.focus()
  }

  setSelectedCountryState(event) {
    let numGuesses = this.state.numGuesses + 1
    let selectedCountryCode = event.value
    let correctAnswer = selectedCountryCode === this.state.countryCode ? true : false
    this.setState({
      correctAnswer: correctAnswer,
      numGuesses: numGuesses,
      selectedCountryCode: event,
    })
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

  showRegions() {
    return(
      Regions.map(function(region, index){
        return(
          <button
            key={index}
            className={this.state.selectedRegion === region ? "button button--filter button--selected" : "button button--filter"}
            onClick={this.handleRegionClick}
          >{region}</button>
        )
      }, this)
    )
  }

  startNewRound() {
    // Create random country code from SVG JSON data
    let randomIndex = Math.floor((Math.random() * SvgData.length))
    let randomCountryCode = SvgData[randomIndex].id

    // Match up random country code with data item from API
    let selectedIndex = -1;
    this.state.countriesData.forEach((item, index) => {
      if(randomCountryCode === item.alpha2Code.toLowerCase()) {
        selectedIndex = index;
      }
    })

    // Start again if we can't find a match
    if(selectedIndex === -1) {
      this.startNewRound()
      return false
    }

    this.setCountryState(selectedIndex)
  }

  startGame() {
    this.setState({
      gameStarted: true
    })
  }

  clickStartButton = e => {
    this.startGame()
  }

  handleCountryChange = e => {
    this.setSelectedCountryState(e)
  }

  handleRegionClick = e => {
    this.setRegionState(e)
  }

  refreshCountry = e => {
    this.startNewRound()
  }

  render() {
    return (
      <section className={this.state.gameStarted ? "game game--started" : "game game--ready"}>
        <GameIntro/>
        <div className="game-area">
          <div className="game-country">
            {this.showCountryImage()}
          </div>
          <form className="form game-form">
            <div className="game-clues">
              <ul>
                {this.state.numGuesses > 0 ? <li><span className="label">Population: </span>{this.state.countryPopulation.toLocaleString('en')}</li> : ''}
                {this.state.numGuesses > 1 ? <li><span className="label">Area (km<sup>2</sup>): </span>{this.state.countryArea.toLocaleString('en')}</li> : ''}
                {this.state.numGuesses > 2 ? <li><span className="label">Currency: </span><span className="symbol">{this.state.countryCurrencySymbol}</span>{this.getCurrency()}</li> : ''}
                {this.state.numGuesses > 3 ? <li><span className="label">Language: </span>{this.state.countryLanguage}</li> : ''}
                {this.state.numGuesses > 4 ? <li><span className="label">Capital City: </span>{this.state.countryCapital}</li> : ''}
              </ul>
            </div>
            <div className="game-select">
              <p className="form-text game-text"><span className="text-icon">&larr;</span> Which country is this?</p>
              <div className="game-filter">
                <div className="game-filter-buttons">
                  <p className="game-text">Filter countries by region</p>
                  <div className="game-filter-list clearfix">
                    {this.showRegions()}
                  </div>
                </div>
              </div>
              <div className="form-select">
                <Select
                  value={this.state.selectedCountryCode}
                  onChange={this.handleCountryChange}
                  options={this.state.countrySelectData}
                  placeholder={this.state.selectPlaceholder}
                  ref={this.countryMenu}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="game-buttons">
          <button onClick={this.clickStartButton} className="button button--start">Start Game</button>
          <button onClick={this.refreshCountry} className="button button--refresh">Skip to next round &gt;&gt;</button>
        </div>
      </section>
    )
  }
}

export default Game
