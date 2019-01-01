import React from 'react';

const RegionButtons = (props) => {
  return (
    <ul className="region-buttons">
      {props.regions.map(function(region, index){
        return(
          <li className="region-button" key={index}>
            {region}
          </li>
        )
      })}
    </ul>
  )
}

export default RegionButtons
