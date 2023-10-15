import React from 'react';
import './MoviesCardList.css';

import movieImage from '../../../images/movie-image.jpg';

import MoviesCard from '../MoviesCard/MoviesCard';

// Временный массив карточек, без использования API
const cards = [
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  },
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  },
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  },
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  },
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  },
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  },
  {
    image: movieImage,
    name: '33 слова о дизайне',
    duration: '1ч42м',
  }
]

function MoviesCardList() {
  return (
    <section className='movies-card-list'>

    </section>
  )
}

export default MoviesCardList;