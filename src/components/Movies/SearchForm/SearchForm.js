import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SearchForm.css';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ onGetMovies }) {

  // Переменная состояния инпута поиска по ключевым словам
  const [keyword, setKeyword] = useState('');
  // Переменная состояния чекбокса "короткометражки"
  const [isShort, setIsShort] = useState(false);
  // Переменная состояния ошибки инпута 
  const [errorInput, setErrorInput] = useState(false);

  const { pathname } = useLocation();

  function handleChangeKeyword(evt) {
    setKeyword(evt.target.value)
  }

  function handleChangeCheckbox() {
    setIsShort(!isShort);
    onGetMovies(keyword, !isShort);
    if (pathname === '/movies') {
      localStorage.setItem('isShort', !isShort);
      localStorage.setItem('keyword', keyword);
    }
  }

  // Обработка кнопки поиска фильмов
  function handleSearchMovies(evt) {
    evt.preventDefault();
    if (!keyword) {
      setErrorInput(true);
      return;
    }
    setErrorInput(false);
    if (pathname === '/movies') {
      localStorage.setItem('keyword', keyword);
    }
    onGetMovies(keyword, isShort)
  }

  // Восстановление результатов предыдущего поиска на странице всех фильмов
  useEffect(() => {
    if (pathname === '/movies') {
      const keyword = localStorage.getItem('keyword');
      const isShort = JSON.parse(localStorage.getItem('isShort'));
      keyword && setKeyword(keyword);
      isShort && setIsShort(isShort);
      if (keyword || isShort) {
        onGetMovies(keyword, isShort);
      }
    }
  }, []);

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSearchMovies} noValidate>
        <div className='search-form__box'>
          <input className='search-form__input'
            id='keyword'
            name='keyword'
            type='text'
            placeholder='Фильм'
            value={keyword || ''}
            onChange={handleChangeKeyword}
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