import React, { useState } from 'react';
import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {

  // Cтейт переменная для отображения Прелоадера
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList isLoading={isLoading} />
    </main>
  )
}

export default Movies;