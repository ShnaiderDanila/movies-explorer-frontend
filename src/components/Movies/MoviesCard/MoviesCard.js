import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

import { BASE_URL_BEATFILM_API } from '../../../constants/constants';

import convertDurationMovie from '../../../utils/convertDurationMovie';

function MoviesCard({ movie, savedMovies, deleteMovie, toggleSaveMovie}) {

  const { pathname } = useLocation();

  function handleToggleSaveMovie() {
    toggleSaveMovie({
      ...movie,
      image: `${BASE_URL_BEATFILM_API}${movie.image.url}`,
      thumbnail: `${BASE_URL_BEATFILM_API}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id
    });
  };

  function handleDeleteMovie() {
    deleteMovie(movie);
  };

  // Проверка состояния сохранения фильма
  const isSavedMovie = savedMovies ? savedMovies.find((item) => item.movieId === movie.id) : '';

  return (
    <li className='movies-card'>
      <a className='movies-card__image-link' href={movie.trailerLink} target="_blank" rel="noreferrer">
        <img className='movies-card__image'
          src={pathname === '/movies' ? `${BASE_URL_BEATFILM_API}${movie.image.url}` : movie.image}
          alt={movie.nameRU}
        />
      </a>
      <div className='movies-card__description'>
        <div className='movies-card__container'>
          <h3 className='movies-card__title'>{movie.nameRU}</h3>
          {pathname === '/saved-movies'
            ? <button
              className='movies-card__delete-button'
              type='button' 
              onClick={handleDeleteMovie} />
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