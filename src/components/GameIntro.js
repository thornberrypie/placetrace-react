import React from 'react';

const GameIntro = (props) => {
  return (
    <div className="game-intro">
      <p>{props.countryName}</p>
      <p>{props.countryCode}</p>
    </div>
  )
}

export default GameIntro;
