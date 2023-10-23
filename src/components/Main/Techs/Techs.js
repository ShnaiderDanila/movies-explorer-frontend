import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className='techs' id='techs'>
      <h2 className='techs__title main__subtitle'>Технологии</h2>
      <div className='techs__title-line main__subtitle-line'></div>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
      </p>
      <ul className='techs__elements'>
        <li className='techs__element'>HTML</li>
        <li className='techs__element'>CSS</li>
        <li className='techs__element'>JS</li>
        <li className='techs__element'>React</li>
        <li className='techs__element'>Git</li>
        <li className='techs__element'>Express.js</li>
        <li className='techs__element'>mongoDB</li>
      </ul>
    </section>
  )
}

export default Techs;