import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useWindowResize from '../../../hooks/useWindowResize';

import './MoviesCardList.css';

import { cards, savedCards } from '../../../utils/constants'

import Preloader from '../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({isLoading}) {
  
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

  if (isLoading) {
    return <Preloader />
  } else {
    return (
      <section className='movies-card-list'>
        <ul className='movies-card-list__list'>
          {pathname === '/saved-movies'
            ? savedCards.map((card, i) => {
              return (
                i < limit &&
                <MoviesCard key={i} card={card} />
              )
            })
            : cards.map((card, i) => {
              return (
                i < limit &&
                <MoviesCard key={i} card={card} />
              )
            })}
        </ul>
        <button className='movies-card-list__button-more'>Ещё</button>
      </section>
    )
  }
}

export default MoviesCardList;