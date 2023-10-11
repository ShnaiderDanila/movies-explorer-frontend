import React from 'react';
import './Promo.css';

import promoLogo from '../../../images/promo-logo.svg';

function Promo() {
  return (
    <section className='promo'>
      <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
      <img className='promo__logo' src={promoLogo} alt='Логотип секции promo' />
    </section>
  )
}

export default Promo;