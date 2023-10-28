import React from 'react';

import './AboutMe.css';

import myPhoto from '../../../images/my-photo.webp'

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title main__subtitle'>Студент</h2>
      <div className='about-me__title-line main__subtitle-line'></div>
      <article className='about-me__info'>
        <div className='about-me__container'>
          <h3 className='about-me__name'>Данила</h3>
          <p className='about-me__job'>Фронтенд-разработчик, 22 года</p>
          <blockquote className='about-me__quote'>
            Я родился и живу в Новосибирске, закончил факультет менеджмента в НГУЭУ, 
            по специальности «Интернет-маркетинг и бизнес-коммуникации».
            Мне нравится творческий процесс создания чего-то нового, своими руками. 
            Уже успел попробовать себя в роли интернет-маркетолога, начинающего фотографа, видеомонтажера-фрилансера и саунд-инженера. 
            Теперь же я твердо уверен, что профессия Front-end разработчика это то, что я искал. 
            В данной профессии меня увлекают интерактивный процесс взаимодействия с дизайном сайта, 
            безграничные возможности для творчества и большое количество современных технологий.
            В качестве хобби учусь играть на аккустической гитаре и синтезаторе, 
            а также люблю следить за музыкальными новинками, смотреть блоги и слушать подкасты.
          </blockquote>
          <a className='about-me__github-link' href='https://github.com/Shnd3r' target='_blank' rel="noreferrer">
            Github
          </a>
        </div>
        <img className='about-me__photo' src={myPhoto} alt='Моя фотография' />
      </article>
    </section>
  )
}

export default AboutMe;