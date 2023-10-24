import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({ value, onChange }) {

  return (
    <label className='filter-checkbox'>
      <input className='filter-checkbox__switch-input'
        id='switch'
        type='checkbox'
        checked={value}
        onChange={onChange}>
      </input>
      <span className='filter-checkbox__switch-slider'></span>
    </label>
  )
}

export default FilterCheckbox;