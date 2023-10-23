import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Navigation.css';

function Navigation({ isLoggedIn, burgerMenuIsOpen }) {

  if (isLoggedIn) {
    return (
      <nav className={`navigation ${burgerMenuIsOpen && 'navigation-white-overlay'}`}>
        <ul className='navigation__menu'>
          {burgerMenuIsOpen &&
            <li className='navigation__menu-item'>
              <NavLink
                to='/'
                className={({ isActive }) => `navigation__link navigation__link-home ${isActive && 'navigation__link_active'}`}>
                Главная
              </NavLink>
            </li>
          }
          <li className="navigation__menu-item">
            <NavLink
              to='/movies'
              className={({ isActive }) => `navigation__link ${isActive && 'navigation__link_active'}`}>
              Фильмы
            </NavLink>
          </li>
          <li className="navigation__menu-item">
            <NavLink
              to='/saved-movies'
              className={({ isActive }) => `navigation__link ${isActive && 'navigation__link_active'}`}>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <Link to='/profile' className="navigation__profile-button"></Link>
      </nav >
    )
  } else {
    return (
      <nav className="auth-navigation">
        <Link to='/signup' className='auth-navigation__link'>Регистрация</Link>
        <Link to='/signin' className="auth-navigation__button">Войти</Link>
      </nav>
    )
  }
}

export default Navigation;
