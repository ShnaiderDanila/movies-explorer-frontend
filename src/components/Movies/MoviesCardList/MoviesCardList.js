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
} from '../../../utils/constants';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ filteredMovies, moviesListError }) {

  const [moviesLimit, setMoviesLimit] = useState(0);
  const [moviesLimitStep, setMoviesLimitStep] = useState(0);

  const { pathname } = useLocation();

  // // Переменная для отслеживания ширины окна
  const { width } = useWindowResize();

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

  function showMoreMovies() {
    setMoviesLimit(moviesLimit + moviesLimitStep);
  }

  return (
    <section className='movies-card-list'>
      {moviesListError
        ? <p className='movies-card-list__error'>{moviesListError}</p>
        : <>
          {
            filteredMovies.length !== 0 &&
            <>
              <ul className='movies-card-list__list'>
                {filteredMovies.map((movie, i) => {
                  return (
                    i < moviesLimit &&
                    <MoviesCard key={movie.id} movie={movie} />
                  )
                })}
              </ul>
              {filteredMovies.length > moviesLimit && (
                <button className='movies-card-list__button-more' type='button' onClick={showMoreMovies}>Ещё</button>
              )}
            </>
          }
        </>
      }
    </section>
  )
}

export default MoviesCardList;