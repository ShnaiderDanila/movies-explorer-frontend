import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

import Logo from '../Logo/Logo';

function Login() {

  // Временная стейт переменная для имитации ошибкок инпутов в JSX разметке
  const [inputError] = useState(false);

  return (
    <main className='login'>
      <div className='login__container'>
        <div className='login__box'>
          <Logo />
          <h2 className='login__title'>Рады видеть!</h2>
        </div>
        <form className='login__form'>
          <fieldset className='login__fieldset'>
            <label className='login__label'>
              <span className='login__placeholder'>E-mail</span>
              <input
                className={`login__input ${inputError && 'login__input_invalid'}`}
                name='email'
                type='email'
                required>
              </input>
              <span
                className={`login__input-error ${inputError && 'login__input-error_active'}`}>
                Что-то пошло не так...
              </span>
            </label>
            <label className='login__label'>
              <span className='login__placeholder'>Пароль</span>
              <input
                className={`login__input ${inputError && 'login__input_invalid'}`}
                name='password'
                type='password'
                required>
              </input>
              <span
                className={`login__input-error ${inputError && 'login__input-error_active'}`}>
                Что-то пошло не так...
              </span>
            </label>
          </fieldset>
          <button
            className={`login__signin-button ${inputError && 'login__signin-button_disabled'}`}
            type='submit'
            disabled={inputError}>
            Войти
          </button>
          <div className='login__signup'>
            <span className='login__signup-signature'>Ещё не зарегистрированы?</span>
            <Link to='/signup' className="login__signup-button">Регистрация</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default Login;