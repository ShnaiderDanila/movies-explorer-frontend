import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import useWindowResize from '../../../hooks/useWindowResize';

import './MoviesCardList.css';

import {
  MOVIES_LIMIT_16,
  MOVIES_LIMIT_12,
  MOVIES_LIMIT_8,
  MOVIES_LIMIT_5,
  MOVIES_LIMIT_STEP_4,
  MOVIES_LIMIT_STEP_3,
  MOVIES_LIMIT_STEP_2,
} from '../../../constants/constants';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ filteredMovies, moviesError, savedMovies, toggleSaveMovie, deleteMovie }) {

  // Лимит отображения фильмов
  const [moviesLimit, setMoviesLimit] = useState(0);

  // Лимиты отображения карточек фильмов, при нажатии кнопки "Еще"
  const [moviesLimitStep, setMoviesLimitStep] = useState(0);

  const { pathname } = useLocation();

  // // Переменная для отслеживания ширины окна
  const { width } = useWindowResize();

  // Устанавливаем лимиты в зависимости от ширины окна
  useEffect(() => {
    if (width >= 1200) {
      setMoviesLimit(MOVIES_LIMIT_16);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_4);
    } else if (width >= 1008) {
      setMoviesLimit(MOVIES_LIMIT_12);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_3);
    } else if (width >= 650) {
      setMoviesLimit(MOVIES_LIMIT_8);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_2);
    }
    else {
      setMoviesLimit(MOVIES_LIMIT_5);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_2);
    }
  }, [width])

  // Обработчик кнопки "Еще"
  function showMoreMovies() {
    setMoviesLimit(moviesLimit + moviesLimitStep);
  }

  return (
    <section className='movies-card-list'>
      {moviesError
        ? <p className='movies-card-list__error'>{moviesError}</p>
        : <>
          {filteredMovies.length !== 0 &&
            <>
              <ul className='movies-card-list__list'>
                {filteredMovies.map((movie, i) => {
                  // Разделяем дальнейшую разметку по роуту, так как условие i < moviesLimit не нужно в /saved-movies
                  if (pathname === '/movies') {
                    return (
                      i < moviesLimit &&
                      <MoviesCard
                        key={movie.id || movie.movieId}
                        movie={movie}
                        toggleSaveMovie={toggleSaveMovie}
                        savedMovies={savedMovies}
                        deleteMovie={deleteMovie} />
                    )
                  }
                  else {
                    return (
                      <MoviesCard
                        key={movie.id || movie.movieId}
                        movie={movie}
                        toggleSaveMovie={toggleSaveMovie}
                        savedMovies={savedMovies}
                        deleteMovie={deleteMovie} />
                    )
                  }
                })}
              </ul>
              { // Показываем кнопку "Ещё" только на роуте /movies
              filteredMovies.length > moviesLimit && pathname === '/movies' && (
                <button
                  className='movies-card-list__button-more'
                  type='button'
                  onClick={showMoreMovies}>
                  Ещё
                </button>
              )}
            </>
          }
        </>
      }
    </section >
  )
}

export default MoviesCardList;