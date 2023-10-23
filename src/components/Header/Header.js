import { useState } from "react";
import { useLocation } from "react-router-dom";
import './Header.css';

import Logo from "../Logo/Logo";
import Navigation from './Navigation/Navigation';

function Header({ isLoggedIn }) {

  const { pathname } = useLocation();

  const [burgerMenuIsOpen, setburgerMenuIsOpen] = useState(false);

  function handleBurgerMenu() {
    document.body.classList.toggle('no-scroll');
    setburgerMenuIsOpen(!burgerMenuIsOpen);
  }

  if (
    pathname === '/' ||
    pathname === '/movies' ||
    pathname === '/saved-movies' ||
    pathname === '/profile'
  ) {
    return (
      <header className={`header ${pathname !== '/' && 'header_white'} ${burgerMenuIsOpen && 'header-black-overlay'}`}>
        <Logo />
        {isLoggedIn &&
          <button
            className={`header__burger-menu-button 
            ${burgerMenuIsOpen
                ? 'header__burger-menu-button_close'
                : 'header__burger-menu-button_open'}`}
            onClick={handleBurgerMenu}>
          </button>
        }
        <Navigation isLoggedIn={isLoggedIn} burgerMenuIsOpen={burgerMenuIsOpen} />
      </header>
    )
  }
}

export default Header;
