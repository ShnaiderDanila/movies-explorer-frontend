import { useState, useEffect, useCallback } from 'react';
import useWindowResize from '../../hooks/useWindowResize';

import './Movies.css';

import {
  MOVIES_NOT_FOUND_ERR,
  DATA_PROCESSING_ERR,
  WIDTH_16_MOVIES,
  WIDTH_12_MOVIES,
  WIDTH_8_MOVIES,
  MOVIES_LIMIT_16,
  MOVIES_LIMIT_12,
  MOVIES_LIMIT_8,
  MOVIES_LIMIT_5,
  MOVIES_LIMIT_STEP_4,
  MOVIES_LIMIT_STEP_3,
  MOVIES_LIMIT_STEP_2,
} from '../../constants/constants';

import { moviesApi } from '../../utils/MoviesApi';
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

  // Лимит отображения фильмов
  const [moviesLimit, setMoviesLimit] = useState(0);
  // Лимиты отображения карточек фильмов, при нажатии кнопки "Еще"
  const [moviesLimitStep, setMoviesLimitStep] = useState(0);
  // // Переменная для отслеживания ширины окна
  const { width } = useWindowResize();

  // Устанавливаем лимиты в зависимости от ширины окна
  const resizeMovieList = useCallback(() => {
    if (width >= WIDTH_16_MOVIES) {
      setMoviesLimit(MOVIES_LIMIT_16);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_4);
    } else if (width >= WIDTH_12_MOVIES) {
      setMoviesLimit(MOVIES_LIMIT_12);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_3);
    } else if (width >= WIDTH_8_MOVIES) {
      setMoviesLimit(MOVIES_LIMIT_8);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_2);
    }
    else {
      setMoviesLimit(MOVIES_LIMIT_5);
      setMoviesLimitStep(MOVIES_LIMIT_STEP_2);
    }
  }, [width])

  useEffect(() => {
    resizeMovieList()
  }, [width, resizeMovieList]);

  // Обработчик фильтрации фильмов на роуте /movies
  function handleFilterMovies(initialMovies, searchQuery, isShort) {
    // Сбрасываем ошибки в списке фильмов
    setMoviesError('')
    const filteredMovies = filterMovies(initialMovies, searchQuery, isShort)
    if (filteredMovies.length === 0) {
      setMoviesError(MOVIES_NOT_FOUND_ERR);
    } else {
      setFilteredMovies(filteredMovies)
    }
  }

  // Обработчик поиска фильмов по роуту /movies
  function handleSearchMovies(searchQuery, isShort) {
    // Запускаем Preloader
    setIsLoading(true);
    // Отображаем правильное количество карточек в зависимости от разрешения
    resizeMovieList();
    // Проверяем наличие фильмов с API beatFilms
    const storedMovies = JSON.parse(localStorage.getItem('movies'));
    // Если нет фильмов в localStorage, запрашиваем их с API и потом запускаем фильтр
    if (!storedMovies) {
      moviesApi.getMovies()
        .then((inititalMovies) => {
          localStorage.setItem('movies', JSON.stringify(inititalMovies));
          handleFilterMovies(inititalMovies, searchQuery, isShort)
        })
        .catch((err) => {
          console.error(`Ошибка: ${err}`);
          setMoviesError(DATA_PROCESSING_ERR);
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

  // Обработчик кнопки "Еще"
  function handleShowMoreMovies() {
    setMoviesLimit(moviesLimit + moviesLimitStep);
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
        : (
          <MoviesCardList
            isLoading={isLoading}
            filteredMovies={filteredMovies}
            moviesError={moviesError}
            toggleSaveMovie={toggleSaveMovie}
            savedMovies={savedMovies}
            handleShowMoreMovies={handleShowMoreMovies}
            moviesLimit={moviesLimit} />
        )
      }
    </main>
  )
};

export default Movies;