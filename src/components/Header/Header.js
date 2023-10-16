import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Header.css';

import logo from '../../images/logo.svg';

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
        <Link to='/' className='header__logo-link'><img src={logo} className="header__logo" alt="Логотип" /></Link>
        <Navigation isLoggedIn={isLoggedIn} />
      </header>
    )
  }
}

export default Header;
