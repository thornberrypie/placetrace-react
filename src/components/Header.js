import React, { Component } from 'react';

function Header(props) {
  return (
    <header className="header">
      <h1>{props.title}</h1>
      <img src={props.logo} className="logo" alt="logo" />
    </header>
  )
}

export default Header;
