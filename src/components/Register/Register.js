import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

import Logo from '../Logo/Logo';

function Register() {

  // Временная стейт переменная для отображения ошибкок инпутов в JSX разметке
  const [inputError] = useState(false);

  return (
    <main className='register'>
      <div className='register__container'>
        <div className='register__box'>
          <Logo />
          <h2 className='register__title'>Добро пожаловать!</h2>
        </div>
        <form className='register__form'>
          <fieldset className='register__fieldset'>
            <label className='register__label'>
              <span className='register__placeholder'>Имя</span>
              <input
                className={`register__input ${inputError && 'register__input_invalid'}`}
                name='name'
                type='text'
                required
                minLength='2'
                maxLength='30'>
              </input>
              <span
                className={`register__input-error ${inputError && 'register__input-error_active'}`}>
                Что-то пошло не так...
              </span>
            </label>
            <label className='register__label'>
              <span className='register__placeholder'>E-mail</span>
              <input
                className={`register__input ${inputError && 'register__input_invalid'}`}
                name='email'
                type='email'
                required>
              </input>
              <span
                className={`register__input-error ${inputError && 'register__input-error_active'}`}>
                Что-то пошло не так...
              </span>
            </label>
            <label className='register__label'>
              <span className='register__placeholder'>Пароль</span>
              <input
                className={`register__input ${inputError && 'register__input_invalid'}`}
                name='password'
                type='password'
                required>
              </input>
              <span
                className={`register__input-error ${inputError && 'register__input-error_active'}`}>
                Что-то пошло не так...
              </span>
            </label>
          </fieldset>
          <button
            className={`register__signup-button ${inputError && 'register__signup-button_disabled'}`}
            type='submit'
            disabled={inputError}>
            Зарегистрироваться
          </button>
          <div className='register__signin'>
            <span className='register__signin-signature'>Уже зарегистрированы?</span>
            <Link to='/signin' className="register__signin-button">Войти</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Register;