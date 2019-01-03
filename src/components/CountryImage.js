import React, { Component } from 'react'

class CountryImage extends Component {
  render() {
    return (
      <div className="game-image">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width={this.getSvgSize()}
          height={this.getSvgSize()}
          viewBox={"0 0 "+this.getSvgSize()+" "+this.getSvgSize()}
          preserveAspectRatio="xMidYMid meet">
          <g
            transform={"translate(0,"+this.getSvgTranslate()+") scale("+this.getSvgScale()+")"}
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

  getSvgScale() {
    return this.props.countryCode === 'at' ? '0.5,-0.5' : '0.1,-0.1'
  }

  getSvgSize() {
    return 1024;
  }

  getSvgTranslate() {
    // Add exception for Austria, SVG paths are defined differently
    return this.props.countryCode === 'at' ? 750 : this.getSvgSize()
  }
}

export default CountryImage
