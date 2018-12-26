import React, { Component } from 'react'

class CountryImage extends Component {
  render() {
    return (
      <div className="country-image">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width={this.props.size}
          height={this.props.size}
          viewBox={"0 0 "+this.props.size+" "+this.props.size}
          preserveAspectRatio="xMidYMid meet">
          <g
            transform={"translate(0.000000,"+this.props.size+") scale(0.100000,-0.100000)"}
            fill={this.props.color}
            stroke="none"
            dangerouslySetInnerHTML={this.displayPaths()}>
          </g>
        </svg>
      </div>
    )
  }

  displayPaths() {
    return {__html: this.props.svgPaths};
  }
}

export default CountryImage
