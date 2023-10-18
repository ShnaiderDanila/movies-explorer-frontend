import React from "react";
import { useLocation } from "react-router-dom";
import './Header.css';

import Logo from "../Logo/Logo";
import Navigation from './Navigation/Navigation';

function Header({ isLoggedIn }) {

  const { pathname } = useLocation();
  
  if (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies' ||
    pathname === '/profile'
  ) {
    return (
      <header className={`header ${pathname !== '/' && 'header_white'}`}>
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
      </header>
    )
  }
}

export default Header;
