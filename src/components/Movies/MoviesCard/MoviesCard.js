import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import convertDurationMovie from '../../../utils/convertDurationMovie';

function MoviesCard({ movie }) {

  const { pathname } = useLocation();
  const [isMovieSaved, setIsMovieSaved] = useState(false);

  function handleMovieSave() {
    setIsMovieSaved(!isMovieSaved);
  }

  return (
    <li className='movies-card'>
      <a className='movies-card__image-link' href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className='movies-card__image' src={`https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} />
      </a>
      <div className='movies-card__description'>
        <div className='movies-card__container'>
          <h3 className='movies-card__title'>{movie.nameRU}</h3>
          {pathname === '/saved-movies'
            ? <button
              className='movies-card__delete-button'
              type='button' />
            : <button
              className={`movies-card__save-button ${isMovieSaved && 'movies-card__save-button_enabled'}`}
              type='button'
              onClick={handleMovieSave} />}
        </div>
        <p className='movies-card__duration'>{convertDurationMovie(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;