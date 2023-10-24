import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowResize from '../../../hooks/useWindowResize';

import './MoviesCardList.css';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ filteredMovies, moviesListError }) {

  const { pathname } = useLocation();

  // Переменная для отслеживания ширины окна
  const { width } = useWindowResize();

  // Временая стейт переменная, для сокращения количества отображаемых карточек-фильмов
  const [limit, setLimit] = useState(16)

  useEffect(() => {
    if (width > 1007) {
      setLimit(16)
    } else if (width <= 1007 && width >= 650) {
      setLimit(8)
    } else {
      setLimit(5)
    }
  }, [width]);

  return (
    <section className='movies-card-list'>
      {moviesListError
        ? <p className='movies-card-list__error'>{moviesListError}</p>
        : <>
          {
            filteredMovies.length !== 0  &&
            <>
              <ul className='movies-card-list__list'>
                {filteredMovies.map((movie, i) => {
                  return (
                    i < limit &&
                    <MoviesCard key={movie.id} movie={movie} />
                  )
                })}
              </ul>
              <button className='movies-card-list__button-more'>Ещё</button>
            </>
          }
        </>
      }
    </section>
  )
}

export default MoviesCardList;