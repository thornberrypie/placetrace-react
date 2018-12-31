import React from 'react';

const GameIntro = (props) => {
  return (
    <div className="game-intro">
      <h2 className={props.gameStarted ? "game-text" : "hidden"}>Guess the country</h2>
      <p>{props.countryName}</p>
      <p>{props.countryCode}</p>
    </div>
  )
}

export default GameIntro;
