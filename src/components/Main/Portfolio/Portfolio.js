import React from 'react';
import './Portfolio.css';

import pointerIcon from '../../../images/pointer-icon.svg';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__list-item'>
          <a className='portfolio__link' href='https://shnd3r.github.io/how-to-learn/' target='_blank' rel="noreferrer">
            Статичный сайт
            <img className='portfolio__link-icon' src={pointerIcon} alt='Иконка стрелки'></img>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__link' href='https://shnd3r.github.io/russian-travel/' target='_blank' rel="noreferrer">
            Адаптивный сайт
            <img className='portfolio__link-icon' src={pointerIcon} alt='Иконка стрелки'></img>
          </a>
        </li>
        <li className='portfolio__list-item'>
          <a className='portfolio__link' href='https://mesto.shnd3r.nomoredomainsicu.ru/' target='_blank' rel="noreferrer">
            Одностраничное приложение
            <img className='portfolio__link-icon' src={pointerIcon} alt='Иконка стрелки'></img>
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;