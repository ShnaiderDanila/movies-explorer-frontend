import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import convertDurationMovie from '../../../utils/convertDurationMovie';

function MoviesCard({ movie, savedMovies, handleSaveMovie }) {

  const { pathname } = useLocation();

  const remasteredMovie =
  {
    ...movie,
    image: `https://api.nomoreparties.co${movie.image.url}`,
    thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
    movieId: movie.id
  }

  function handleToggleSaveMovie() {
    handleSaveMovie(remasteredMovie);
  }

  // Проверка состояния сохранения фильма
  const isSavedMovie = savedMovies ? savedMovies.find((item) => item.movieId === remasteredMovie.movieId) : '';

  return (
    <li className='movies-card'>
      <a className='movies-card__image-link' href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className='movies-card__image' src={remasteredMovie.image} alt={movie.nameRU} />
      </a>
      <div className='movies-card__description'>
        <div className='movies-card__container'>
          <h3 className='movies-card__title'>{movie.nameRU}</h3>
          {pathname === '/saved-movies'
            ? <button
              className='movies-card__delete-button'
              type='button' />
            : <button
              className={`movies-card__save-button ${isSavedMovie && 'movies-card__save-button_enabled'}`}
              type='button'
              onClick={handleToggleSaveMovie} />}
        </div>
        <p className='movies-card__duration'>{convertDurationMovie(movie.duration)}</p>
      </div>
    </li>
  )
}

export default MoviesCard;