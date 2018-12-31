import React from 'react';

const RegionButton = (props) => {
  return (
    <button className="button button--region">
      {props.regionName}
    </button>
  )
}

export default RegionButton
