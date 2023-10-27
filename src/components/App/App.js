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

  // Стейт переменная сохраненных фильмов 
  const [savedMovies, setSavedMovies] = useState([]);

  // Cтейт переменная ошибок, отображения фильмов на роутах /movies
  const [moviesError, setMoviesError] = useState('');

  const [savedMoviesError, setSavedMoviesError] = useState('');

  // Cтейт переменная ошибок сервера для роутов  /signin, /signup и /profile
  const [serverError, setServerError] = useState('');

  // Сброс ошибок сервера при переходе на другой роут
  const resetErrorMessage = useCallback(() => {
    setServerError('')
  }, [])

  useEffect(() => {
    resetErrorMessage()
  }, [resetErrorMessage, navigate]);

  // Проверка авторизации пользователя и добавление информации о нем в глобальный контекст
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        if (err.message.includes('Failed to fetch')) {
          setServerError('Ошибка сервера! Пожалуйста повторите попытку позже.');
        } else if (err.includes('401')) {
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
        if (err.message.includes('Failed to fetch')) {
          setServerError('Ошибка сервера! Пожалуйста повторите попытку позже.');
        } else if (err.includes('409')) {
          setServerError('Пользователь с таким email уже зарегистрирован');
        } else if (err.includes('429')) {
          setServerError('Слишком много запросов, пожалуйста повторите попытку позже.');
        } else {
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
        if (err.message.includes('Failed to fetch')) {
          setServerError('Ошибка сервера! Пожалуйста повторите попытку позже.');
        } else if (err.includes('400')) {
          setServerError('Введена некорректная электронная почта');
        } else if (err.includes('429')) {
          setServerError('Слишком много запросов, пожалуйста повторите попытку позже.');
        }
        else {
          setServerError('Что-то пошло не так! Пожалуйста повторите попытку позже.');
        }
      })
  }

  // Получение сохраненных фильмов пользователя
  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getSavedMovies()
        .then((movies) => {
          setSavedMovies(movies.reverse())
        })
        .catch(() => {
          setSavedMoviesError(
            `Во время запроса произошла ошибка. 
            Возможно, проблема с соединением или сервер недоступен. 
            Подождите немного и попробуйте ещё раз`)
        });
    }
  }, [isLoggedIn]);

  // Функция удаления фильма
  function deleteMovie(movie) {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.movieId);
    mainApi.deleteMovie(savedMovie._id)
      .then(() => {
        const newSavedMoviesArray = savedMovies.filter((item) => item.movieId !== movie.movieId)
        setSavedMovies(newSavedMoviesArray);
      })
      .catch((err) => console.log(err));
  }

  // Функция сохранения фильма
  function saveMovie(movie) {
    mainApi.saveMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie])
      })
      .catch((err) => {
        console.log(err)
      });
  }

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
              setMoviesError={setMoviesError} />} />
          <Route path='/saved-movies' element=
            {<ProtectedRoute
              element={SavedMovies}
              isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              deleteMovie={deleteMovie}
              savedMoviesError={savedMoviesError}
              setSavedMoviesError={setSavedMoviesError} />} />
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