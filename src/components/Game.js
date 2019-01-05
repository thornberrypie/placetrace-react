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
      countryArea: 'km<sup>2</sup>',
      countryCapital: '',
      countryCode: '',
      countryCurrency: '',
      countryLanguage: '',
      countryName: '',
      countryPopulation: '',
      countryRegion: '',
      countrySelectData: [],
      countriesData: [],
      gameStarted: false,
      levelsPlayed: 0,
      numGuesses: 0,
      score: 0,
      selectedRegion: ''
    }
  }

  componentWillMount() {
    this.getCountriesFromAPI()
  }

  buildSelectMenu(selectedRegion) {
    const countries = this.state.countriesData
    let countrySelectData = [];
    // Create new array of objects for select menu
    Object.keys(countries).forEach(function(key) {
      let country = countries[key]
      // If region is selected allow only that region's countries
      if(selectedRegion && selectedRegion !== country.region) {
        return
      }
      countrySelectData.push({
        value: country.alpha2Code.toLowerCase(),
        label: country.name
      })
    })
    this.setState({
      countrySelectData: countrySelectData
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

  setCountryState(index) {
    let country = this.state.countriesData[index]
    this.setState({
      countryCapital: country.capital,
      countryCode: country.alpha2Code.toLowerCase(),
      //countrycurrency: country.currency.
      //countrylanguage: country.language.
      countryName: country.name,
      countrypopulation: country.population,
      countryRegion: country.region
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
    var selectedCountry = e.value
    var currentCode = this.state.countryCode
    console.log(selectedCountry)
  }

  handleRegionClick = e => {
    e.preventDefault();
    let selectedRegion = e.target.innerText

    this.setState({
      selectedRegion: selectedRegion === this.state.selectedRegion ? '' : selectedRegion
    })
    // Use this syntax for functional child components that have props
    // this.setState((prevState, props) => ({
    //   selectedRegion: selectedRegion === prevState.selectedRegion ? '' : selectedRegion
    // }));

    this.countryMenu.current.focus()

    this.buildSelectMenu(selectedRegion)
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
                <li id="cluePopulation"></li>
                <li id="clueArea"></li>
                <li id="clueCurrency"></li>
                <li id="clueLanguage"></li>
                <li id="clueCapital"></li>
              </ul>
            </div>
            <p className="form-text game-text alignWithMenu"><span className="text-icon">&larr;</span> Which country is this?</p>
            <div className="game-select">
              <div className="form-select">
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleCountryChange}
                  options={this.state.countrySelectData}
                  ref={this.countryMenu}
                />
              </div>
              <div className="game-filter">
                <div className="game-filter-buttons alignWithMenu">
                  <p className="game-text">Filter countries by region</p>
                  <div className="game-filter-list">
                    {this.showRegions()}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="game-buttons">
          <button onClick={this.clickStartButton} className="button button--start">Start Game</button>
          <button onClick={this.refreshCountry} className="button button--refresh">Skip to next round &gt;&gt;</button>
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
