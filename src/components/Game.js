import React, { Component } from 'react'
import CountryImage from './CountryImage'
import Currency from './_Currency'
import GameIntro from './_GameIntro'
import Select from 'react-select';
import SvgData from '../data/svgCountries.json'

const apiAllCountries = 'https://restcountries.eu/rest/v2/all'
const colorGreen = '#79c050'
const CountriesToIgnore = ['um']
const maxNumGuesses = 4
const Regions = [
    'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'
]

class Game extends Component {
  constructor() {
    super()
    this.countryMenu = React.createRef()
    this.state = {
      correctAnswer: false,
      countryArea: '',
      countryBorders: [],
      countryCapital: '',
      countryCode: '',
      countryCodes: '',
      countryCurrency: '',
      countryCurrencySymbol: '',
      countryLanguage: '',
      countryName: '',
      countryPopulation: '',
      countryRegion: '',
      countrySelectData: [],
      countrySubRegion: '',
      countriesData: [],
      forceCountry: '', // for testing a specific country
      gameDifficulty: 'easy',
      gameStarted: false,
      levelsPlayed: 0,
      numGuesses: 0,
      roundEnded: false,
      guessedCountries: [],
      roundsPlayed: 0,
      score: 0,
      selectPlaceholder: 'choose country...',
      selectedCountryCode: '',
      selectedRegion: '',
      totalNumGuesses: 0
    }
  }

  componentWillMount() {
    this.getCountriesFromAPI()
  }

  buildSelectMenu(selectedRegion) {
    const Countries = this.state.countriesData
    let countrySelectData = [];
    let moveToBottom = [];
    let selectedCountryCode = this.countryMenu.current.props.value.value
    let selectedCountryIsInRegion = false;

    // Create new array of objects for select menu
    Object.keys(Countries).forEach((key) => {
      let country = Countries[key]
      let countryLabel = country.name

      // Don't include countries that we have no map for
      if(this.isExcludedCountry(country.alpha2Code)) {
        return false
      }

      // If region is selected allow only that region's countries
      if(selectedRegion && selectedRegion !== country.region) {
        return
      }

      if(country.alpha2Code.toLowerCase() === selectedCountryCode) {
        selectedCountryIsInRegion = true;
      }

      // Move Virgin Island to bottom of list
      if(countryLabel.toLowerCase().indexOf('virgin islands') !== -1) {
        moveToBottom.push({
          value: country.alpha2Code.toLowerCase(),
          label: this.getCleanCountryName(countryLabel)
        })
        return
      }

      // Add to select menu if everything's cool
      countrySelectData.push({
        value: country.alpha2Code.toLowerCase(),
        label: this.getCleanCountryName(countryLabel)
      })
    })

    // Append any items we want at the bottom
    if(moveToBottom) {
      moveToBottom.forEach((c) => {
        countrySelectData.push({
          value: c.value,
          label: c.label
        })
      })
    }

    if(selectedRegion && !selectedCountryIsInRegion) {
      this.setPlaceholder(selectedRegion)
    }
    this.setState({
      countrySelectData: countrySelectData,
    })
  }

  clearSelectValue() {
    this.setState({
      selectedCountryCode: ''
    })
  }

  endRound() {
    let roundsPlayed = this.state.roundsPlayed + 1

    this.setState({
      guessedCountries: [],
      roundEnded: true,
      roundsPlayed: roundsPlayed,
      selectedCountryCode: ''
    })

    setTimeout(function(){
      document.getElementById('countryDisplayName').scrollIntoView()
    }, 333)

  }

  getArea(area) {
    return area ? area.toLocaleString('en') : <span className="italic">unknown</span>
  }

  getBorders() {
    let borders = this.state.countryBorders
    if(!this.state.roundEnded) {
      return borders.length
    }
    return borders.length ? borders.toString().replace(/,/g, ', ') : 'none'
  }

  getCapitalCity(capital) {
    return capital ? capital : <span class="italic">no official capital</span>
  }

  getCleanCountryName(n, suffix = false) {
    switch(n) {
      case "Côte d'Ivoire":
        n = suffix ? "Ivory Coast (Côte d'Ivoire)" : "Ivory Coast"
      break
      case "Heard Island and McDonald Islands":
        n = suffix ? "Heard Island and McDonald Islands" : "Heard Island"
      break
      case "Korea (Democratic People's Republic of)":
        n = suffix ? "North Korea (Democratic People's Republic of Korea)" : "North Korea"
      break
      case "Korea (Republic of)":
        n = suffix ? "South Korea (Republic of Korea)" : "South Korea"
      break
    }
    return n
  }

  getCountriesFromAPI() {
    fetch(apiAllCountries)
    .then(response => response.json())
    .then(data => {
      this.setState({
        countriesData: data
      })
      this.startNewRound()
    })
  }

  getCountryCodes(c) {
    let codes = ''
    codes += c.alpha2Code ? c.alpha2Code+', ' : ''
    codes += c.alpha3Code ? c.alpha3Code+', ' : ''
    codes += c.numericCode ? c.numericCode : ''

    if(c.callingCodes) {
      c.callingCodes.forEach((cc) => {
        codes+= ', +'+cc
      })
    }

    if(c.topLevelDomain) {
      c.topLevelDomain.forEach((tld) => {
        codes+= ', '+tld
      })
    }

    return codes
  }

  getCountryName(n, suffix = false) {
    return n ? this.getCleanCountryName(n, suffix) : <span class="italic">no name</span>
  }

  getGameClass() {
    let gameClass = 'game'
    if(this.state.roundEnded) {
      gameClass += ' game--finished'
    } else {
      gameClass += this.state.gameStarted ? ' game--started' : ' game--ready'
    }

    gameClass += this.state.gameDifficulty === 'easy' ? ' game--easy' : ' game-hard'
    return gameClass
  }

  getGuessesLeft() {
    let g = parseInt(maxNumGuesses) - parseInt(this.state.numGuesses)
    g += g === 1 ? ' guess' : ' guesses'
    return g
  }

  getPopulation() {
    return this.state.countryPopulation.toLocaleString('en')
  }

  getRegion(region) {
    return region ? region : <span className="italic">no region</span>
  }

  getScore() {
    let score = this.state.roundsPlayed / this.state.totalNumGuesses * 100
    score = Math.round( score * 10 ) / 10
    return score.toString() + '%'
  }

  isExcludedCountry(code) {
    if(CountriesToIgnore.includes(code.toLowerCase())) {
      return true
    }
    return false
  }

  setPlaceholder(region) {
    if(region === 'Americas') {
      region = 'the Americas'
    }
    if(region === 'Polar') {
      region = 'the Polar regions'
    }
    this.setState({
      selectedCountryCode: '',
      selectPlaceholder: 'choose country in ' + region
    })
  }

  setCountryState(index) {
    let country = this.state.countriesData[index]
    let currency = ''
    let currencySymbol = ''
    let language = ''

    country.currencies.forEach((item, index) => {
      // Ignore currencies that don't have a code
      if(item.code && item.code !== '(none)') {
        // Add symbol if different from previous
        if(currencySymbol && currencySymbol !== '' && currencySymbol.indexOf(item.symbol) === -1) {
          currencySymbol += ' '+item.symbol
        } else {
          currencySymbol = item.symbol
        }

        // Hard code Manat symbol (doesn't seem to work from API)
        if (item.name.indexOf(' manat') !== -1) {
          currencySymbol = 'm';
        }

        currency += item.name + ', '
      }
    })
    currency = currency !== '' ? currency.slice(0, -2) : ''

    country.languages.forEach((item) => {
      language += item.name + ', '
    })
    language = language !== '' ? language.slice(0, -2) : ''

    this.setState({
      countryArea: country.area,
      countryBorders: country.borders,
      countryCapital: country.capital,
      countryCode: country.alpha2Code.toLowerCase(),
      countryCodes: this.getCountryCodes(country),
      countryCurrency: currency,
      countryCurrencySymbol: currencySymbol,
      countryLanguage: language,
      countryName: country.name,
      countryPopulation: country.population,
      countryRegion: country.region,
      countrySubRegion: country.subregion,
      numGuesses: 0,
      roundEnded: false,
      selectedRegion: this.state.gameDifficulty === 'easy' ? country.region : ''
    })
  }

  regionClick(event) {
    event.preventDefault()

    //Disable region clicking for easy game
    if(this.state.gameDifficulty === 'easy') {
      return false;
    }
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

  countryChange(event) {
    let selectedCountryName = event.label
    let guessedCountries = this.state.guessedCountries

    // Don't do anything if this country has already been chosen
    if(guessedCountries.includes(selectedCountryName)) {
      this.clearSelectValue()
      return false
    }

    let selectedCountryCode = event.value
    let correctAnswer = selectedCountryCode === this.state.countryCode ? true : false
    let numGuesses = this.state.numGuesses + 1
    let totalNumGuesses = this.state.totalNumGuesses + 1
    guessedCountries.push(event.label)

    this.setState({
      correctAnswer: correctAnswer,
      guessedCountries: guessedCountries,
      numGuesses: numGuesses,
      selectedCountryCode: '',
      totalNumGuesses: totalNumGuesses
    })

    //Finish round if user has selected the correct answer
    if(correctAnswer) {
      // Ensure all stats are showing
      this.setState({
        numGuesses: maxNumGuesses
      })
      this.endRound()
    }

    // Finish round if player has no more guesses left and hasn't guessed correctly
    if(numGuesses >= maxNumGuesses) {
      this.endRound()
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
              color = {colorGreen}
            />
          )
        } else {
          return null
        }
      })
    )
  }

  showGuessedCountries() {
    let guesses = this.state.guessedCountries.map((item, key) =>
        <li key={key} className="item">{item}</li>
    )
    return guesses
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

    if(this.state.forceCountry) {
      randomCountryCode = this.state.forceCountry
    }

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

    let country = this.state.countriesData[selectedIndex]

    this.setCountryState(selectedIndex)

    // Filter by region already if easy game
    if(this.state.gameDifficulty === 'easy') {
      this.buildSelectMenu(country.region)
    } else {
      this.buildSelectMenu()
    }
  }

  startGame() {
    this.setState({
      gameStarted: true
    })
  }

  refreshCountry(event) {
    this.startNewRound()
  }

  clickStartButton = e => {
    this.startGame()
  }

  handleCountryChange = e => {
    this.countryChange(e)
  }

  handleRegionClick = e => {
    this.regionClick(e)
  }

  handleRefreshCountry = e => {
    this.refreshCountry(e)
  }

  render() {
    return (
      <section className={this.getGameClass()}>
        <GameIntro/>
        <div className="game-zone">
          <div className="game-area">
            <div className="game-country">
              {this.showCountryImage()}
            </div>
            <form className="form game-form" id="game-form">
              {this.state.roundEnded || this.state.roundsPlayed ? '' : <h3 className="text--green"><span className="text-icon">&larr;</span><span className="text-icon text-icon--mobile">&uarr;</span> Which country is this?</h3>}
              <div className="game-clues">
                <ul>
                  {this.state.gameDifficulty === 'easy' ? <li><span className="label">Region: </span><span className="value">{this.getRegion(this.state.countryRegion)}</span></li> : ''}
                  {this.state.roundEnded && this.state.countrySubRegion ? <li><span className="label">Sub-region: </span><span className="value">{this.state.countrySubRegion}</span></li> : ''}
                  {this.state.gameDifficulty === 'easy' ? <li><span className="label">Population: </span><span className="value">{this.getPopulation()}</span></li> : ''}
                  {this.state.gameDifficulty === 'easy' ? <li><span className="label">Area (km<sup>2</sup>): </span><span className="value">{this.getArea(this.state.countryArea)}</span></li> : ''}
                  {this.state.roundEnded ? <li><span className="label">Codes: </span><span className="value">{this.state.countryCodes}</span></li> : ''}
                  {this.state.gameDifficulty === 'easy' ? <li><span className="label">Borders: </span><span className="value">{this.getBorders()}</span></li> : ''}
                  {this.state.numGuesses > 0 ? <Currency symbol={this.state.countryCurrencySymbol} currency={this.state.countryCurrency} roundEnded={this.state.roundEnded} /> : ''}
                  {this.state.numGuesses > 1 ? <li><span className="label">Language: </span><span className="value">{this.state.countryLanguage}</span></li> : ''}
                  {this.state.numGuesses > 2 ? <li><span className="label">Capital City: </span><span className="value">{this.getCapitalCity(this.state.countryCapital)}</span></li> : ''}
                </ul>
                {!this.state.numGuesses && !this.state.roundsPlayed ? <p className="text text--green">More clues will appear here after each&nbsp;guess</p> : ''}
              </div>
              <div className={this.state.roundEnded ? 'hidden' : 'game-section game-filter'}>
                <div className="game-filter-buttons">
                  <p className="text text--green hard">Filter countries by region:</p>
                  <div className="game-filter-list clearfix">
                    {this.showRegions()}
                  </div>
                </div>
              </div>
              <div className={this.state.roundEnded ? 'hidden' : 'game-select'}>
                <Select
                  value={this.state.selectedCountryCode}
                  onChange={this.handleCountryChange}
                  options={this.state.countrySelectData}
                  placeholder={this.state.selectPlaceholder}
                  ref={this.countryMenu}
                />
              </div>
              {this.state.roundEnded ? <div className="game-countryname" id="countryDisplayName">{this.getCountryName(this.state.countryName, true)}</div> : ''}
              {this.state.correctAnswer && this.state.roundEnded ? <h2 className="text-green">is correct!</h2> : ''}
              <div className="game-buttons">
                {this.state.roundEnded ? <button onClick={this.handleRefreshCountry} className="button button--refresh">Next Round &gt;</button> : ''}
              </div>
              <div className={this.state.numGuesses > 0 && !this.state.roundEnded ? 'game-guesses' : 'hidden'}>
                <p>You guessed: </p>
                <ul className="list">{this.showGuessedCountries()}</ul>
                {!this.state.roundEnded ? <p><b>{this.getGuessesLeft()}</b> left</p> : ''}
              </div>
            </form>
          </div>
          <div className="game-buttons">
            <button onClick={this.clickStartButton} className="button button--start">Start Game</button>
          </div>
          <div className={this.state.roundsPlayed > 0 ? 'game-stats' : 'hidden'}>
            <ul className="flex flex--around flex--nopadding">
              <li><span className="label">Rounds played: </span><span className="value">{this.state.roundsPlayed}</span></li>
              <li><span className="label">Total guesses: </span><span className="value">{this.state.totalNumGuesses}</span></li>
              <li><span className="label">Score: </span><span className="value">{this.getScore()}</span></li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
}

export default Game
