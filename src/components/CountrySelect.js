import React, { Component } from 'react'
import Select from 'react-select';

const Regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
]

class CountrySelect extends Component {
  constructor() {
    super()

    this.state = {
      countrySelectData: []
    }


  }

  componentWillReceiveProps() {
    this.buildSelectMenu();

  }

  buildSelectMenu() {
    const countries = this.props.countries
    let countrySelectData = [];

    // Create new array of objects for select menu
    Object.keys(countries).forEach(function(key) {
      var country = countries[key]
      countrySelectData.push({
        value: country.alpha2Code.toLowerCase(),
        label: country.name
      })

    })
    this.setState({
      countrySelectData: countrySelectData
    })
  }

  filterCountryMenu(region) {
    console.log(region)
  }

  handleCountryChange = event => {
    console.log(event.value)
  }

  handleRegionClick = e => {
    e.preventDefault();
    this.filterCountryMenu(e.target.innerText)
  }

  render() {
    return (
      <div className="game-select">
        <Select
          value={this.props.value}
          onChange={this.handleCountryChange}
          options={this.state.countrySelectData}
        />
        <div className="game-filter">
          <div className="game-filter-buttons">
            <p className="game-text">Filter list by region</p>
            <div className="game-filter-list">
              {Regions.map(function(region, index){
                return(
                  <button
                    key={index}
                    className="button button--filter"
                    onClick={this.handleRegionClick}
                  >
                    {region}
                  </button>
                )
              }, this)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CountrySelect;
