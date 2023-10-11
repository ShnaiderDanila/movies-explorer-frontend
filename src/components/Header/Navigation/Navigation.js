import React from "react";
import { NavLink, Link } from "react-router-dom";
import './Navigation.css';

function Navigation({ isLoggedIn }) {

  if (isLoggedIn) {
    return (
      <nav className="navigation">
        <ul className="navigation__menu">
          <li className="navigation__menu-item">
            <NavLink to='/movies' className='navigation__link'>Фильмы</NavLink>
          </li>
          <li className="navigation__menu-item">
            <NavLink to='/saved-movies' className='navigation__link'>Сохранённые фильмы</NavLink>
          </li>
        </ul>
        <Link to='/profile' className="navigation__profile-button"></Link>
      </nav>
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
