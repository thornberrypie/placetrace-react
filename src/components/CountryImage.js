import React from 'react'

export default function CountryImage({ svgPaths }) {
  const svgSize = 1024

  return (
    <div className="game-image">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width={svgSize}
        height={svgSize}
        viewBox={`0 0 ${svgSize} ${svgSize}`}
        preserveAspectRatio="xMidYMid meet">
        <g
          transform={`translate(0, ${svgSize}) scale(0.1,-0.1)`}
          fill="#79c050"
          stroke="none"
          dangerouslySetInnerHTML={{__html: svgPaths}}>
        </g>
      </svg>
    </div>
  )
}
