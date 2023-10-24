import { useState, useEffect } from 'react';
import './Profile.css';

import useValidation from '../../hooks/useValidation';

function Profile() {

  const [name] = useState('Данил');
  const [email] = useState('dan_shnai2001@mail.ru');

  const {
    inputValues,
    errorMessages,
    isValidForm,
    handleChangeValidation,
    resetValidation
  } = useValidation();

  const [formIsEditing, setFormIsEditing] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    resetValidation({ email: email, name: name });
  }, []);

  useEffect(() => {
    if (name !== inputValues.name || email !== inputValues.email) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [inputValues, isValidForm]);

  // Временные функции для проверки JSX верстки
  function editProfileForm() {
    setFormIsEditing(true);
  };

  return (
    <main className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form' noValidate>
        <fieldset className='profile__fieldset'>
          <div className='profile__label-container'>
            <label className='profile__label'>
              <span className='profile__label-name'>Имя</span>
              <input
                className='profile__input'
                name='name'
                placeholder='Имя'
                type='text'
                required
                minLength='2'
                maxLength='10'
                pattern="^[A-Za-zА-Яа-яЁё\-\s]+$"
                readOnly={!formIsEditing}
                value={inputValues.name || ''}
                onChange={handleChangeValidation}>
              </input>
            </label>
            <span
              className={`profile__input-error ${!isValidForm && 'profile__input-error_active'}`}>
              {errorMessages.name}
            </span>
          </div>
          <div className='profile__label-container'>
            <label className='profile__label'>
              <span className='profile__label-name'>E-mail</span>
              <input
                className='profile__input'
                name='email'
                placeholder='E-mail'
                type='email'
                required
                pattern="^[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-.]+$"
                readOnly={!formIsEditing}
                value={inputValues.email || ''}
                onChange={handleChangeValidation}>
              </input>
            </label>
            <span
              id='email' className={`profile__input-error ${!isValidForm && 'profile__input-error_active'}`}>
              {errorMessages.email}
            </span>
          </div>
        </fieldset>
        {
          formIsEditing
            ? <div className='profile__container'>
              <p className={`profile__warning ${!isValidForm && 'profile__warning_enabled'}`}>
              </p>
              <button
                className={`profile__button profile__button-save ${!isDisabled && 'profile__button-save_disabled'}`}
                type='submit'
                disabled={!isDisabled || !isValidForm}>
                Сохранить
              </button>
            </div>
            : <button
              className='profile__button profile__button-edit'
              type='button'
              onClick={editProfileForm}>
              Редактировать
            </button>
        }
        <button
          className='profile__button profile__button-exit'
          type='button'>
          Выйти из аккаунта
        </button>
      </form>
    </main>
  )
}

export default Profile;