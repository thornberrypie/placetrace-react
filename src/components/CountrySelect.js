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
    this.countryMenu = React.createRef()
    this.state = {
      countrySelectData: [],
      selectedRegion: ''
    }
  }

  componentWillReceiveProps() {
    this.buildSelectMenu();
  }

  buildSelectMenu(selectedRegion) {
    const Countries = this.props.countries
    let countrySelectData = [];
    // Create new array of objects for select menu
    Object.keys(Countries).forEach(function(key) {
      let country = Countries[key]
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

  handleCountryChange = e => {
    console.log(e.value)
  }

  handleRegionClick = e => {
    e.preventDefault();
    let selectedRegion = e.target.innerText

    if(selectedRegion === this.state.selectedRegion) {
      selectedRegion = '';
    }

    this.setState({
      selectedRegion: selectedRegion
    })

    this.countryMenu.current.focus()

    this.buildSelectMenu(selectedRegion)
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

  render() {
    return (
      <div className="game-select">
        <div className="form-select">
          <Select
            value={this.props.value}
            onChange={this.handleCountryChange}
            options={this.state.countrySelectData}
            ref={this.countryMenu}
          />
        </div>
        <div className="game-filter">
          <div className="game-filter-buttons">
            <p className="game-text">Filter countries by region</p>
            <div className="game-filter-list">
              {this.showRegions()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CountrySelect;
