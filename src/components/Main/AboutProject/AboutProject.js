import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title main__subtitle'>О проекте</h2>
      <div className='about-project__title-line main__subtitle-line'></div>
      <ul className='about-project__info'>
        <li className='about-project__description'>
          <h3 className='about-project__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description-text'>
            Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__description'>
          <h3 className='about-project__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className='about-project__time-line'>
        <p className='about-project__time-line-text about-project__time-line-blue'>1 неделя</p>
        <p className='about-project__time-line-text about-project__time-line-grey'>4 недели</p>
        <span className='about-project__time-line-signature'>Back-end</span>
        <span className='about-project__time-line-signature'>Front-end</span>  
      </div>
    </section>
  )
}

export default AboutProject;