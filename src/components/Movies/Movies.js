import { useState } from 'react';
import { moviesApi } from '../../utils/MoviesApi';

import './Movies.css';

import filterMovies from '../../utils/FilterMovies';

import SearchForm from './SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies({ savedMovies, toggleSaveMovie, moviesError, setMoviesError }) {

  // Для поисковой строки по роуту /movies
  // Переменная состояния чекбокса "короткометражки"
  const [isShort, setIsShort] = useState(false);
  // Переменная состояния инпута поиска по ключевым словам
  const [searchQuery, setSearchQuery] = useState('');

  // Cтейт переменная для отображения Прелоадера
  const [isLoading, setIsLoading] = useState(false);
  
   // Cтейт переменная отфильтрованных фильмов
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Обработчик фильтрации фильмов на роуте /movies
  function handleFilterMovies(initialMovies, searchQuery, isShort) {
    // Сбрасываем ошибки в списке фильмов
    setMoviesError('')
    const filteredMovies = filterMovies(initialMovies, searchQuery, isShort)
    if (filteredMovies.length === 0) {
      setMoviesError('По вашему запросу ничего не найдено');
    } else {
      setFilteredMovies(filteredMovies)
    }
  }

  // Обработчик поиска фильмов по роуту /movies
  function handleSearchMovies(searchQuery, isShort) {
    // Запускаем Preloader
    setIsLoading(true);
    // Проверяем наличие фильмов с API beatFilms
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    // Если нет фильмов в localStorage, запрашиваем их с API и потом запускаем фильтр
    if (!storedMovies) {
      moviesApi.getMovies()
        .then((inititalMovies) => {
          // Устанавливаем найденные фильмы beatFilms в localStorage
          localStorage.setItem('movies', JSON.stringify(inititalMovies));
          // Запускаем фильтр
          handleFilterMovies(inititalMovies, searchQuery, isShort)
        })
        .catch(() => {
          setMoviesError(
          `Во время запроса произошла ошибка. 
          Возможно, проблема с соединением или сервер недоступен. 
          Подождите немного и попробуйте ещё раз`)
        })
        // Выключаем Preloader
        .finally(() => {
          setIsLoading(false)
        })
      // Если есть фильмы в localStorage, просто запускаем фильтр
    } else {
      handleFilterMovies(storedMovies, searchQuery, isShort)
      setIsLoading(false);
    }
  }

  return (
    <main className='movies'>
      <SearchForm
        handleSearchMovies={handleSearchMovies}
        isShort={isShort}
        setIsShort={setIsShort}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {isLoading
        ? (<Preloader />)
        :
        (
          <MoviesCardList
            isLoading={isLoading}
            filteredMovies={filteredMovies}
            moviesError={moviesError}
            toggleSaveMovie={toggleSaveMovie}
            savedMovies={savedMovies} />
        )
      }
    </main>
  )
};

export default Movies;