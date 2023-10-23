import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {

  const { pathname } = useLocation();
  
  if (pathname === '/' || pathname === '/movies' || pathname === '/saved-movies') {
    return (
      <footer className='footer'>
        <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className='footer__copyright'>
          <p className='footer__text'>© 2023</p>
          <nav className='footer__nav'>
            <a className='footer__link' href='https://practicum.yandex.ru' target='_blank' rel="noreferrer">
              Яндекс.Практикум
            </a>
            <a className='footer__link' href='https://github.com/Shnd3r' target='_blank' rel="noreferrer">
              Github
            </a>
          </nav>
        </div>
      </footer>
    )
  }
}

export default Footer;