import React from 'react';

const RegionButtons = (props) => {
  return (
    <ul className="game-filter-buttons">
      {props.regions.map(function(region, index){
        return(
          <li className="button button--filter" key={index}>
            {region}
          </li>
        )
      })}
    </ul>
  )
}

export default RegionButtons
