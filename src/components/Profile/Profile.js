import { useState } from 'react';
import './Profile.css';

function Profile() {

  // Иммитация возникшей ошибки, при редактировании профиля 
  const error = true;

  // Временные стейт переменные для проверки JSX верстки
  const [name, setName] = useState('Виталий');
  const [email, setEmail] = useState('pochta@yandex.ru');
  const [formIsEditing, setFormIsEditing] = useState(false);
  const [editingError, setEditingError] = useState(false);

  // Временные функции для проверки JSX верстки
  function editProfileForm() {
    setFormIsEditing(true);
  };

  function handleChangeName(evt) {
    setName(evt.target.value);
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  };

  function handleFormEditError() {
    if (error) {
      setEditingError(true)
    }
  }

  return (
    <main className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form'>
        <fieldset className='profile__fieldset'>
          <label className='profile__label'>
            <span className='profile__label-name'>Имя</span>
            <input
              className='profile__input'
              name='name'
              type='text'
              placeholder='Имя'
              required
              readOnly={!formIsEditing}
              value={name || ''}
              onChange={handleChangeName}>
            </input>
          </label>
          <label className='profile__label'>
            <span className='profile__label-name'>E-mail</span>
            <input
              className='profile__input'
              name='email'
              type='email'
              placeholder='E-mail'
              required
              readOnly={!formIsEditing}
              value={email || ''}
              onChange={handleChangeEmail}>
            </input>
          </label>
        </fieldset>
        {formIsEditing
          ? <>
            <p className={`profile__warning ${editingError && 'profile__warning_enabled'}`}>
              При обновлении профиля произошла ошибка.
            </p>
            <button
              className={`profile__button profile__button-save ${editingError && 'profile__button-save_disabled'}`}
              type='button'
              onClick={handleFormEditError}
              disabled={editingError}>
              Сохранить
            </button>
          </>
          : <div className='profile__buttons'>
            <button
              className='profile__button profile__button-edit'
              type='button'
              onClick={editProfileForm}>
              Редактировать
            </button>
            <button
              className='profile__button profile__button-exit'
              type='button'>
              Выйти из аккаунта
            </button>
          </div>
        }
      </form>
    </main>
  )
}

export default Profile;