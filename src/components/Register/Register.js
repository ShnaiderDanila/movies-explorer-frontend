import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';

import './Register.css';

import Logo from '../Logo/Logo';

function Register({ handleSignUp, serverError }) {
 
  const {
    inputValues,
    errorMessages,
    isValidForm,
    handleChangeValidation,
    resetValidation
  } = useValidation();

  useEffect(() => {
    resetValidation();
  }, [resetValidation]);

  function handleRegisterSubmit(evt) {
    evt.preventDefault();
    handleSignUp(inputValues.email, inputValues.password, inputValues.name);
  }

  return (
    <main className='register'>
      <div className='register__container'>
        <div className='register__box'>
          <Logo />
          <h2 className='register__title'>Добро пожаловать!</h2>
        </div>
        <form className='register__form' noValidate onSubmit={handleRegisterSubmit}>
          <fieldset className='register__fieldset'>
            <label className='register__label'>
              <span className='register__placeholder'>Имя</span>
              <input
                className='register__input'
                name='name'
                type='text'
                required
                minLength='2'
                maxLength='30'
                pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
                value={inputValues.name || ''}
                onChange={handleChangeValidation}>
              </input>
              <span className={`register__input-error ${!isValidForm && 'register__input-error_active'}`}>
                {errorMessages.name}
              </span>
            </label>
            <label className='register__label'>
              <span className='register__placeholder'>E-mail</span>
              <input
                className='register__input'
                name='email'
                type='email'
                required
                pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                value={inputValues.email || ''}
                onChange={handleChangeValidation}>
              </input>
              <span className={`register__input-error ${!isValidForm && 'register__input-error_active'}`}>
                {errorMessages.email}
              </span>
            </label>
            <label className='register__label'>
              <span className='register__placeholder'>Пароль</span>
              <input
                className='register__input'
                name='password'
                type='password'
                required
                minLength='6'
                value={inputValues.password || ''}
                onChange={handleChangeValidation}>
              </input>
              <span className={`register__input-error ${!isValidForm && 'register__input-error_active'}`}>
                {errorMessages.password}
              </span>
            </label>
          </fieldset>
          <div className='register__button-container'>
            <p className='register__error'>{serverError}</p>
            <button
              className={`register__signup-button ${!isValidForm && 'register__signup-button_disabled'}`}
              type='submit'
              disabled={!isValidForm}>
              Зарегистрироваться
            </button>
          </div>
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

