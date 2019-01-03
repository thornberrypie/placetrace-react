import React, { Component } from 'react'

class RegionButtons extends Component {
  filterCountryMenu(e) {
    console.log(e.target.value)
  }

  handleButtonClick = e => {
    e.preventDefault();
    this.filterCountryMenu(e)
  }

  render(){
    return (
      <div className="game-filter-buttons">
        <p className="game-text">Filter the menu by region</p>
        <div className="game-filter-list">
          {this.props.regions.map(function(region, index){
            return(
              <button
                key={index}
                className="button button--filter"
                onClick={this.handleButtonClick}
              >
                {region}
              </button>
            )
          }, this)}
        </div>
      </div>
    )
  }
}

export default RegionButtons
