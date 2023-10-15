import React from 'react';
import './SearchForm.css';

import FilterCheckbox from './FilterCheckbox/FilterCheckbox';

function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <input className='search-form__input' id='film' name='film' type='text' placeholder='Фильм' />
        <div className='search-form__container'>
          <button className='search-form__button' type='submit' />
          <hr className='search-form__line' />
          <FilterCheckbox />
          <label className='search-form__text' htmlFor='switch'>Короткометражки</label>
        </div>
      </form>
      <hr className='search-form__underline'></hr>
    </section>
  )
}

export default SearchForm;