import React from 'react';

const RegionButton = (props) => {
  return (
    <li className="button button--region">
      {props.regionName}
    </li>
  )
}

export default RegionButton
