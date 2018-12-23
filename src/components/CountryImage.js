import React, { Component } from 'react'

class CountryImage extends Component {
  render() {
    return (
      <div className="country-image">
        <p>{this.props.id}</p>
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
         width="1024.000000pt" height="1024.000000pt" viewBox="0 0 1024.000000 1024.000000"
         preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
        fill="#000000" stroke="none">
            {this.props.svg}
          </g>
        </svg>
      </div>
    )
  }
}

export default CountryImage
