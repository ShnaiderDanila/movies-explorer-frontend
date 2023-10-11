import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__line'></div>
      <section className='about-project__info'>
        <div className='about-project__description'>
          <h3 className='about-project__description-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description-text'>
            Составление плана, работу над бэкендом,
            вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__description'>
          <h3 className='about-project__description-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description-text'>
            У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </section>
      <section className='about-project__time-line'>
        <div className='about-project__time-line-blue'>1 неделя</div>
        <div className='about-project__time-line-grey'>4 недели</div>
        <span className='about-project__time-line-signature'>Back-end</span>
        <span className='about-project__time-line-signature'>Front-end</span>  
      </section>
    </section>
  )
}

export default AboutProject;