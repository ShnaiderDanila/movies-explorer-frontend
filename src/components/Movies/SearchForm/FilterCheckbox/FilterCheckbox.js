import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__switch-input' id='switch' type='checkbox'></input>
      <span className='filter-checkbox__switch-slider'></span>
    </label>
  )
}

export default FilterCheckbox;