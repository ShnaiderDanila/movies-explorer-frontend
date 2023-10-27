import { useEffect, useState } from 'react';

import './SavedMovies.css';

import filterMovies from '../../utils/FilterMovies';

import SearchForm from '../Movies/SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function SavedMovies({ savedMovies, deleteMovie, savedMoviesError, setSavedMoviesError }) {

  // Для поисковой строки по роуту /saved-movies
  // Переменная состояния чекбокса "короткометражки"
  const [isShort, setIsShort] = useState(false);
  // Переменная состояния инпута поиска по ключевым словам
  const [searchQuery, setSearchQuery] = useState('');

  // Cтейт переменная для отображения Прелоадера
  const [isLoading, setIsLoading] = useState(false);

  // Cтейт переменная отфильтрованных фильмов
  const [filteredMovies, setFilteredMovies] = useState([]);

  // Отрисовываем сохраненные фильмы в самом начале монтирования компонента и при измении массива savedMovies
  useEffect(() => {
    handleSearchSavedMovies(searchQuery, isShort)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies])

  // Обработчик поиска фильмов по роуту /saved-movies
  function handleSearchSavedMovies(searchQuery, isShort) {
    setIsLoading(true);
    // Сбрасываем ошибки списка фильмов
    setSavedMoviesError('')
    const filteredMovies = filterMovies(savedMovies, searchQuery, isShort)
    if (filteredMovies.length === 0) {
      setSavedMoviesError('Сохраненные фильмы не найдены');
    } else {
      setFilteredMovies(filteredMovies)
    }
    setIsLoading(false);
  }

  return (
    <main className='saved-movies'>
      <SearchForm
        handleSearchMovies={handleSearchSavedMovies}
        isShort={isShort}
        setIsShort={setIsShort}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery} />
      {isLoading
        ? (<Preloader />)
        : (
          <MoviesCardList
            filteredMovies={filteredMovies}
            moviesError={savedMoviesError}
            deleteMovie={deleteMovie} />
        )
      }
    </main>
  )
}

export default SavedMovies;