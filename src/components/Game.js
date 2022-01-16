import React, { Component } from 'react'
import Select from 'react-select'
import clsx from 'clsx'

import CountryImage from './CountryImage'
import GameIntro from './_GameIntro'
import Clues from './gameComponents/Clues'
import SvgData from '../data/svgCountries.json'

const ApiAllCountries = 'https://restcountries.com/v3.1/all'
const MAX_NUM_GUESSES = 3

class Game extends Component {
  constructor() {
    super()
    this.countryMenu = React.createRef()
    this.state = {
      country: null,
      allCountries: [],
      forceCountry: '', // for testing a specific country
      gameStarted: false,
      levelsPlayed: 0,
      numGuesses: 0,
      roundEnded: false,
      guessedCountries: [],
      roundsPlayed: 0,
      score: 0,
      selectedCountryCode: '',
      totalNumGuesses: 0
    }
  }

  componentWillMount() {
    this.getCountriesFromAPI()
  }
  
  countryCode = () => {
    const { country } = this.state
    return country ? country.cca2.toLowerCase() : null
  } 

  countrySelectData = () => {
    const { allCountries, country } = this.state
    const countriesInRegion = []

    const sortedCountries = allCountries.sort(
      (a,b) => a.name.common.localeCompare(b.name.common)
    )

    Object.keys(sortedCountries).forEach((key) => {
      let c = sortedCountries[key]

      if(c.region === country.region) {
        countriesInRegion.push(
          {
            value: c.cca2.toLowerCase(),
            label: c.name.common
          }
        )
      }
    })

    return countriesInRegion
  }

  clearSelectValue() {
    this.setState({
      selectedCountryCode: ''
    })
  }

  getCountriesFromAPI() {
    fetch(ApiAllCountries)
    .then(response => response.json())
    .then(data => {
      this.setState({
        allCountries: data
      })
      this.startNewRound()
    })
  }

  getCountryCodes() {
    let c = this.state.country
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

  getScore() {
    const { roundsPlayed, totalNumGuesses } = this.state
    let score = roundsPlayed / totalNumGuesses * 100
    score = Math.round( score * 10 ) / 10
    return score.toString() + '%'
  }

  showCountryImage() {
    return (
      SvgData.map((data, index) => {
        return data.id === this.countryCode() ? (
          <CountryImage key={data.id} svgPaths={data.svg} />
        ) : null
      })
    )
  }

  startNewRound = () => {
    const { allCountries, forceCountry } = this.state
    // Create random country code from SVG JSON data
    let randomIndex = Math.floor((Math.random() * SvgData.length))
    let randomCountryCode = SvgData[randomIndex].id

    if(forceCountry) {
      randomCountryCode = forceCountry
    }

    // Match up random country code with data item from API
    let selectedIndex = -1
    allCountries.forEach((item, index) => {
      if(randomCountryCode === item.cca2.toLowerCase()) {
        selectedIndex = index
      }
    })

    // Start again if we can't find a match
    if(selectedIndex === -1) {
      this.startNewRound()
      return false
    }

    this.setState({
      country: allCountries[selectedIndex],
      guessedCountries: [],
      numGuesses: 0,
      roundEnded: false,
    })
  }

  handleStartButtonClick = e => {
    this.setState({
      gameStarted: true,
    })
  }

  userGuessedCorrectly = () => {
    const { country, guessedCountries } = this.state
    return guessedCountries.includes(country.name.common)
  }

  handleCountryChange = (event) => {
    const { guessedCountries, roundsPlayed, totalNumGuesses } = this.state

    // Don't do anything if this country has already been chosen
    if(guessedCountries.length > 0 && guessedCountries.includes(event.label)) {
      this.clearSelectValue()
      return
    }

    const selectedCountryCode = event.value
    const updatedGuessedCountries = [...guessedCountries, event.label]

    // Finish round if user has selected the correct answer or player has run out of guesses
    if(selectedCountryCode === this.countryCode() || updatedGuessedCountries.length >= MAX_NUM_GUESSES) {
      this.setState({
        roundEnded: true,
        roundsPlayed: roundsPlayed + 1,
      })
    }

    this.setState({
      guessedCountries: updatedGuessedCountries,
      totalNumGuesses: totalNumGuesses + 1
    })
  }

  startNextRound = () => {
    this.setState({
      guessedCountries: [],
      selectedCountryCode: '',
    })

    this.startNewRound()
  }

  guesses = () => {
    const { guessedCountries } = this.state
    const numGuesses = guessedCountries.length
    const guessesLeft = MAX_NUM_GUESSES - numGuesses
    const guessText = guessesLeft === 1 ? 'guess' : 'guesses'

    return <p><b>{guessesLeft}</b>{` ${guessText} left`}</p>
  }

  render() {
    const { country, gameStarted, guessedCountries, roundEnded, roundsPlayed } = this.state
    const selectPlaceholder = 'Choose country...'
    const numGuesses = guessedCountries.length

    if(!gameStarted) {
      return (
        <section className="game">
          <GameIntro />
          <button onClick={this.handleStartButtonClick} className="button button--start">Start Game</button>
        </section>
      )
    }

    return (
      <section className={clsx(roundEnded ? 'game game--roundEnded' : 'game')}>
        {country && (
          <div className="game-zone">
            <div className="game-area">
              <div className="game-country">
                {this.showCountryImage()}
                {country.flags && (
                  <div className={country.flags ? "game-flag" : "hidden"}>
                  <img
                    src={country.flags.svg}
                    alt=""
                    width="180" height="120"
                  />
                </div>
                )}
              </div>
              <form className="form game-form" id="game-form">
                {!roundEnded && (
                  <>
                    <label className="hide" htmlFor="countrySelectMenu">{selectPlaceholder}</label>
                    <Select
                      inputId="countrySelectMenu"
                      onChange={this.handleCountryChange}
                      options={this.countrySelectData()}
                      placeholder={selectPlaceholder}
                      ref={this.countryMenu}
                      value={this.countryCode()}
                    />
                  </>
                )}
                <div className="game-clues">
                  <Clues country={country} numGuesses={numGuesses} roundEnded={roundEnded} />
                </div>
                {!numGuesses && !roundsPlayed ? <p className="text text--brown">More clues will appear here after each&nbsp;guess</p> : ''}
                {roundEnded ? <div className="game-countryname" id="countryDisplayName">{country.name.common}</div> : ''}
                {this.userGuessedCorrectly() ? <h2 className="text-green text-large">is correct!</h2> : ''}
                {roundEnded ? <div onClick={this.startNextRound} className="button">Next Round &gt;</div> : ''}
                {guessedCountries.length > 0 && (
                  <div className="game-guesses">
                    <p>You guessed: </p>
                    <ul className="list">
                      {
                        guessedCountries.map((item, key) => (
                          <li
                            key={key}
                            className={item === country.name.common ? 'item item--correct' : 'item'}
                          >
                            {item}
                          </li>
                        ))
                      }
                    </ul>
                    {!roundEnded && this.guesses()}
                  </div>
                )}
              </form>
            </div>
            <div className={roundsPlayed > 0 ? 'game-stats' : 'hidden'}>
              <ul className="flex flex--around flex--nopadding">
                <li><span className="label">Rounds played: </span><span className="value">{roundsPlayed}</span></li>
                <li><span className="label">Total guesses: </span><span className="value">{this.state.totalNumGuesses}</span></li>
                <li><span className="label">Overall score: </span><span className="value">{this.getScore()}</span></li>
              </ul>
            </div>
          </div>
        )}
      </section>
    )
  }
}

export default Game
