import React from 'react';
import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({isLoading}) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList isLoading={isLoading} />
    </main>
  )
}

export default Movies;