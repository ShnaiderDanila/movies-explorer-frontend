import { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import './App.css';

import {
  SERVER_ERR,
  FAILED_TO_FETCH_ERR,
  FAILED_TO_FETCH_ERR_MESSAGE,
  BAD_REQUEST_ERR_CODE,
  BAD_REQUEST_ERR_MESSAGE,
  UNAUTHORIZED_ERR_CODE,
  UNAUTHORIZED_ERR_MESSAGE,
  CONFLICT_ERR_CODE,
  CONFLICT_ERR_MESSAGE,
  TOO_MANY_REQUESTS_ERR_CODE,
  TOO_MANY_REQUESTS_ERR_MESSAGE,
  SAVED_MOVIES_NOT_FOUND_ERR,
  SUCCESS_UPDATE_PROFILE,

} from '../../constants/constants';

import { mainApi } from '../../utils/MainApi';

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
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') || false);

  // Глобальная стейт переменная текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт-переменные состояния попапа infoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipTitle, setInfoTooltipTitle] = useState('');

  // Стейт переменная сохраненных фильмов 
  const [savedMovies, setSavedMovies] = useState([]);

  // Cтейт переменная ошибок, отображения фильмов на роуте /movies
  const [moviesError, setMoviesError] = useState('');

  // Cтейт переменная ошибок, отображения фильмов на роуте /saved-movies
  const [savedMoviesError, setSavedMoviesError] = useState('');

  // Cтейт переменная ошибок сервера для роутов  /signin, /signup и /profile
  const [serverError, setServerError] = useState('');

  // Стейт переменная блокировки инпутов формы во время отправки запроса
  const [isInputsDisabled, setIsInputsDisabled] = useState(false)

  // Сброс ошибок сервера для роутов /signin, /signup и /profile
  const resetErrorMessage = useCallback(() => {
    setServerError('')
  }, [])

  useEffect(() => {
    resetErrorMessage()
  }, [resetErrorMessage, navigate]);

  // Проверка авторизации пользователя и добавление информации о нем в глобальный контекст
  useEffect(() => {
    mainApi.getUserInfo()
      .then((user) => {
        localStorage.setItem('isLoggedIn', true);
        setCurrentUser({
          email: user.email,
          name: user.name
        });
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  }, [isLoggedIn])

  // Обработка авторизации пользователя
  function handleSignIn(email, password) {
    setIsInputsDisabled(true);
    mainApi.signin(email, password)
      .then((res) => {
        if (res) {
          setIsInputsDisabled(false);
          setIsLoggedIn(true)
          setInfoTooltipTitle(res.message)
          setIsInfoTooltipOpen(true)
          navigate('/movies', { replace: true });
        }
      })
      .catch((err) => {
        setIsInputsDisabled(false);
        if (err.message) {
          err.message.includes(FAILED_TO_FETCH_ERR) &&
            setServerError(FAILED_TO_FETCH_ERR_MESSAGE);
        }
        if (err.includes(UNAUTHORIZED_ERR_CODE)) {
          setServerError(UNAUTHORIZED_ERR_MESSAGE);
        }
        else if (err.includes(TOO_MANY_REQUESTS_ERR_CODE)) {
          setServerError(TOO_MANY_REQUESTS_ERR_MESSAGE);
        }
        else {
          setServerError(SERVER_ERR);
        }
      });
  };

  // Обработка регистрации пользователя
  function handleSignUp(email, password, name) {
    setIsInputsDisabled(true);
    mainApi.signup(email, password, name)
      .then((res) => {
        if (res) {
          setIsInputsDisabled(false);
          handleSignIn(email, password);
        }
      })
      .catch((err) => {
        setIsInputsDisabled(false);
        if (err.message) {
          err.message.includes(FAILED_TO_FETCH_ERR) &&
            setServerError(FAILED_TO_FETCH_ERR_MESSAGE);
        }
        if (err.includes(BAD_REQUEST_ERR_CODE)) {
          setServerError(BAD_REQUEST_ERR_MESSAGE);
        }
        else if (err.includes(CONFLICT_ERR_CODE)) {
          setServerError(CONFLICT_ERR_MESSAGE);
        }
        else if (err.includes(TOO_MANY_REQUESTS_ERR_CODE)) {
          setServerError(TOO_MANY_REQUESTS_ERR_MESSAGE);
        }
        else {
          setServerError(SERVER_ERR);
        }
      });
  };

  // Обработка выхода из аккаунта
  function signOut() {
    setIsInputsDisabled(true);
    mainApi.signOut()
      .then(() => {
        setIsInputsDisabled(false);
        localStorage.clear();
        setIsLoggedIn(false);
        setSavedMovies([])
        setSavedMoviesError('');
        setCurrentUser({
          name: '',
          email: '',
        });
      })
      .catch((err) => {
        setIsInputsDisabled(false);
        if (err.message) {
          err.message.includes(FAILED_TO_FETCH_ERR) &&
            setServerError(FAILED_TO_FETCH_ERR_MESSAGE);
        }
        else {
          setServerError(SERVER_ERR);
        }
      });
  };

  // Обработка обновления данных пользователя
  function handleUpdateUserInfo(email, name) {
    setIsInputsDisabled(true);
    mainApi.updateUserInfo(email, name)
      .then(() => {
        setIsInputsDisabled(false);
        setServerError('');
        setInfoTooltipTitle(SUCCESS_UPDATE_PROFILE)
        setIsInfoTooltipOpen(true)
        setCurrentUser({ email, name });
      })
      .catch((err) => {
        setIsInputsDisabled(false);
        if (err.message) {
          err.message.includes(FAILED_TO_FETCH_ERR) &&
            setServerError(FAILED_TO_FETCH_ERR_MESSAGE);
        }
        if (err.includes(BAD_REQUEST_ERR_CODE)) {
          setServerError(BAD_REQUEST_ERR_MESSAGE);
        }
        else if (err.includes(TOO_MANY_REQUESTS_ERR_CODE)) {
          setServerError(TOO_MANY_REQUESTS_ERR_MESSAGE);
        }
        else {
          setServerError(SERVER_ERR);
        }
      });
  };

  // Получение сохраненных фильмов пользователя при входе в аккаунт
  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse())
          setSavedMoviesError('');
        })
        .catch((err) => {
          setSavedMoviesError(SAVED_MOVIES_NOT_FOUND_ERR);
          console.error(`Ошибка: ${err}`);
        });
    };
  }, [isLoggedIn]);

  // Функция сохранения фильма
  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie])
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  // Функция удаления фильма
  function deleteMovie(movie) {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.movieId);
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newSavedMoviesArray = savedMovies.filter((item) => item.movieId !== movie.movieId)
        setSavedMovies(newSavedMoviesArray);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      });
  };

  // Переключатель сохранения фильма для роута /movies
  function toggleSaveMovie(movie) {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.movieId);
    if (!isMovieSaved) {
      saveMovie(movie)
    } else {
      deleteMovie(movie)
    }
  };

  return (
    <div className="wrapper">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Main />} />
          <Route path='/movies' element=
            {<ProtectedRoute
              element={Movies}
              isLoggedIn={isLoggedIn}
              toggleSaveMovie={toggleSaveMovie}
              savedMovies={savedMovies}
              moviesError={moviesError}
              setMoviesError={setMoviesError} />
            } />
          <Route path='/saved-movies' element=
            {<ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
              savedMoviesError={savedMoviesError}
              setSavedMoviesError={setSavedMoviesError} />
            } />
          <Route path='/profile' element=
            {<ProtectedRoute
              element={Profile}
              isLoggedIn={isLoggedIn}
              handleUpdateUserInfo={handleUpdateUserInfo}
              currentUser={currentUser}
              serverError={serverError}
              setServerError={setServerError}
              signOut={signOut}
              isInputsDisabled={isInputsDisabled} />
            } />
          {isLoggedIn
            ? <Route path='/signup' element={<Navigate to="/" />} />
            : <Route path='/signup' element=
              {<Register handleSignUp={handleSignUp} serverError={serverError} isInputsDisabled={isInputsDisabled} />} />
          }
          {isLoggedIn
            ? <Route path='/signin' element={<Navigate to="/" />} />
            : <Route path='/signin' element=
              {<Login handleSignIn={handleSignIn} serverError={serverError} isInputsDisabled={isInputsDisabled} />} />
          }
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