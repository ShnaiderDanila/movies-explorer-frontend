import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

function MoviesCard({ card }) {

  const { pathname } = useLocation();
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function handleMovieSave() {
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <li className='movies-card'>
      <img className='movies-card__image' src={card.image} alt='Обложка фильма' />
      <div className='movies-card__description'>
        <div className='movies-card__container'>
          <h3 className='movies-card__title'>{card.name}</h3>
          {pathname === '/saved-movies'
            ? <button
              className='movies-card__delete-button'
              type='button' />
            : <button
              className={`movies-card__save-button ${isMovieSaved && 'movies-card__save-button_enabled'}`}
              type='button'
              onClick={handleMovieSave} />}
        </div>
        <p className='movies-card__duration'>{card.duration}</p>
      </div>
    </li>
  )
}

export default MoviesCard;