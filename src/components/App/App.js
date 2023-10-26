import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi';

import './App.css';

import CurrentUserContext from "../../contexts/CurrentUserContext";
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


function App() {

  const navigate = useNavigate();

  // Cтейт переменная авторизованного пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Глобальная стейт переменная текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт-переменные состояния попапа infoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipTitle, setInfoTooltipTitle] = useState('');

  // Cтейт переменная ошибок сервера
  const [serverError, setServerError] = useState('');

  // Сброс ошибок сервера при переходе на другой роут
  const resetErrorMessage = useCallback(() => {
    setServerError('')
  }, [])

  useEffect(() => {
    resetErrorMessage()
  }, [resetErrorMessage, navigate]);

  // Проверка авторизации пользователя и добавление информации о текущем пользователе в глобальный контекст
  const checkUserAuthorization = useCallback(() => {
    mainApi.getUserInfo()
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
          setCurrentUser({
            email: user.email,
            name: user.name
          });
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, [])

  // Проверка авторизации пользователя
  useEffect(() => {
    checkUserAuthorization()
  }, [checkUserAuthorization])

  // Обработка авторизации пользователя
  function handleSignIn(email, password) {
    mainApi.signin(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          setInfoTooltipTitle(res.message)
          setIsInfoTooltipOpen(true)
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.includes('401')) {
          setServerError('Неправильные почта или пароль');
        } else if (err.includes('429'))
          setServerError('Слишком много запросов, пожалуйста повторите попытку позже.');
        else {
          setServerError('Что-то пошло не так! Пожалуйста повторите попытку позже.');
        }
      });
  }

  // Обработка регистрации пользователя
  function handleSignUp(email, password, name) {
    mainApi.signup(email, password, name)
      .then((res) => {
        if (res) {
          handleSignIn(email, password);
        }
      })
      .catch((err) => {
        if (err.includes('409')) {
          setServerError('Пользователь с таким email уже зарегистрирован');
        } else if (err.includes('429')) {
          setServerError('Слишком много запросов, пожалуйста повторите попытку позже.');
        }
        else {
          setServerError('Что-то пошло не так! Пожалуйста повторите попытку позже.');
        }
      })
  }

  // Обработка обновления данных пользователя
  function handleUpdateUserInfo(email, name) {
    mainApi.updateUserInfo(email, name)
      .then(() => {
        setServerError('');
        setInfoTooltipTitle('Редактирование выполнено успешно!')
        setIsInfoTooltipOpen(true)
        setCurrentUser({ email, name });
      })
      .catch((err) => {
        if (err.includes('400')) {
          setServerError('Введена некорректная электронная почта');
        } else if (err.includes('429')) {
          setServerError('Слишком много запросов, пожалуйста повторите попытку позже.');
        }
        else {
          setServerError('Что-то пошло не так! Пожалуйста повторите попытку позже.');
        }
      })
  }


  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Main />} />
          <Route path='/movies' element=
            {
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn} />
            } />
          <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} />} />
          <Route path='/profile' element=
            {<ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              handleUpdateUserInfo={handleUpdateUserInfo}
              currentUser={currentUser}
              serverError={serverError}
              setServerError={setServerError} />
            } />
          <Route path='/signup' element=
            {<Register
              handleSignUp={handleSignUp}
              serverError={serverError} />
            } />
          <Route path='/signin' element=
            {<Login
              handleSignIn={handleSignIn}
              serverError={serverError} />
            } />
        </Routes>
        <Footer />
        <InfoTooltip
          setIsInfoTooltipOpen={setIsInfoTooltipOpen}
          isInfoTooltipOpen={isInfoTooltipOpen}
          infoTooltipTitle={infoTooltipTitle} />
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App; 