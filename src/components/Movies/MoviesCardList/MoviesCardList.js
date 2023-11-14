import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  filteredMovies,
  moviesError,
  savedMovies,
  toggleSaveMovie,
  deleteMovie,
  handleShowMoreMovies,
  moviesLimit }) {

  const { pathname } = useLocation();

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
                    onClick={handleShowMoreMovies}>
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