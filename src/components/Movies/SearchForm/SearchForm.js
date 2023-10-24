import { useState } from 'react';
import './SearchForm.css';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm({ onGetMovies, setIsNothingFound }) {

  // Переменная состояния инпута поиска по ключевым словам
  const [keyword, setKeyword] = useState('');
  // Переменная состояния чекбокса "короткометражки"
  const [isShort, setIsShort] = useState(false);
  // Переменная состояния ошибки инпута 
  const [errorInput, setErrorInput] = useState(false);

  function handleChangeKeyword(evt) {
    setKeyword(evt.target.value)
  }

  function handleChangeCheckbox() {
    // if (!keyword) {
    //   setErrorInput(true);
    //   return;
    // }
    setIsShort(!isShort);
    onGetMovies(keyword, !isShort);
  }

  function handleSearchMovies(evt) {
    evt.preventDefault();
    if (!keyword) {
      setErrorInput(true);
      return;
    }
    setErrorInput(false);
    onGetMovies(keyword, isShort)
  }

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