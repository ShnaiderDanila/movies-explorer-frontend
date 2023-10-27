import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ handleSearchMovies, isShort, setIsShort, searchQuery, setSearchQuery }) {

  const { pathname } = useLocation();

  // Переменная состояния ошибки пустого инпута (при поиске фильмов с пустым запросом)
  const [errorInput, setErrorInput] = useState(false);

  // Восстанавливаем результаты предыдущего поиска на роуте /movies
  useEffect(() => {
    if (pathname === '/movies') {
      // Достаем все данные предущего поиска из localStorage
      const searchQuery = localStorage.getItem('searchQuery');
      const isShort = JSON.parse(localStorage.getItem('isShort'));
      // Устанавливаем их в соответствующие поля формы
      searchQuery && setSearchQuery(searchQuery);
      isShort && setIsShort(isShort);
      // И производим поиск в соответствии с текущими полями
      if (searchQuery || isShort) {
        handleSearchMovies(searchQuery, isShort);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Функция для редактирования инпута SearchQuery 
  function handleChangeSearchQuery(evt) {
    setSearchQuery(evt.target.value)
  }

  // Функция для редактирования чекбокса "короткометражек" 
  function handleChangeCheckbox() {
    setErrorInput(false)
    setIsShort(!isShort);
    handleSearchMovies(searchQuery, !isShort);
    if (pathname === '/movies') {
      localStorage.setItem('isShort', !isShort);
      localStorage.setItem('searchQuery', searchQuery);
    } 
  }

  // Обработка кнопки поиска отфильтрованных фильмов
  function handleSubmitSearchMovies(evt) {
    evt.preventDefault();
    // Если происходит поиск с пустым запросом, выдавать ошибку
    if (!searchQuery) {
      setErrorInput(true);
      return;
    } else {
      setErrorInput(false);
      handleSearchMovies(searchQuery, isShort)
      pathname === '/movies' && localStorage.setItem('searchQuery', searchQuery);
    }
  }

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmitSearchMovies} noValidate>
        <div className='search-form__box'>
          <input className='search-form__input'
            id='searchQuery'
            name='searchQuery'
            type='text'
            placeholder='Фильм'
            value={searchQuery || ''}
            onChange={handleChangeSearchQuery}
            required
          />
          <button className='search-form__button' type='submit' />
        </div>
        <hr className='search-form__line' />
        <div className='search-form__container'>
          <FilterCheckbox value={isShort} onChange={handleChangeCheckbox} />
          <label className='search-form__text' htmlFor='switch'>Короткометражки</label>
        </div>
      </form>
      <p className={`search-form__error ${errorInput && 'search-form__error_visible'}`}>Нужно ввести ключевое слово</p>
      <hr className='search-form__underline'></hr>
    </section>
  )
}

export default SearchForm;