import React, { useState } from 'react';
import './Movies.css';

import { moviesApi } from '../../utils/MoviesApi';


import SearchForm from './SearchForm/SearchForm';
import Preloader from './Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {

  // Cтейт переменная для отображения Прелоадера
  const [isLoading, setIsLoading] = useState(false);

  const [filteredMovies, setFilteredMovies] = useState([]);

  const [moviesListError, setMoviesListError] = useState('');

  function filterKeyword(movie, keyword) {
    return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
  }

  function filterShortfilm(movie) {
    return movie.duration <= 40;
  }

  function filterMovies(inititalMovies, keyword, isShort) {
    if (!inititalMovies) {
      return [];
    } else if (isShort) {
      return inititalMovies
        .filter((movie) => filterShortfilm(movie))
        .filter((movie) => filterKeyword(movie, keyword));
    } else {
      return inititalMovies
        .filter((movie) => filterKeyword(movie, keyword));
    }
  }

  function handleFilterMovies(movies, keyword, isShort) {
    // Сбрасываем ошибки в списке фильмов
    setMoviesListError('')
    const filteredMovies = filterMovies(movies, keyword, isShort)
    if (filteredMovies.length === 0) {
      setMoviesListError('По вашему запросу ничего не найдено');
    }
    setFilteredMovies(filteredMovies)
    setIsLoading(false);
  }

  // обработчик кнопки найти фильм
  function handleGetMovies(keyword, isShort) {
    setIsLoading(true);
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    // Проверяем если фильмы в localStorage
    if (!storedMovies) {
      moviesApi
        .getMovies()
        .then((inititalMovies) => {
          // Устанавливаем найденные фильмы в localStorage
          localStorage.setItem('movies', JSON.stringify(inititalMovies));
          // Запускаем фильтр фильмов
          handleFilterMovies(inititalMovies, keyword, isShort)
        })
        .catch(() => {
          setMoviesListError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
        })
    } else {
      // Запускаем фильтр фильмов
      handleFilterMovies(storedMovies, keyword, isShort)
    }
  }

  return (
    <main className='movies'>
      <SearchForm onGetMovies={handleGetMovies} />
      {isLoading
        ? (<Preloader />)
        :
        (
          <MoviesCardList isLoading={isLoading} filteredMovies={filteredMovies} moviesListError={moviesListError} />
        )
      }
    </main>
  )
};




export default Movies;