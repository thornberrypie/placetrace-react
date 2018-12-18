import React from 'react';
import logo from '../images/world.png';

const Header = (props) => {
  return (
    <header className="header">
      <a href="/" className="header-logolink">
        <img src={logo} className="header-logo" alt="logo" />
        <h1 className="header-title">{props.title}</h1>
      </a>
    </header>
  )
}

export default Header;
