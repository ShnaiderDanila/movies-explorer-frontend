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

  // Cтейт переменная авторизованного пользователя, 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});

  // Стейт-переменные состояния попапа infoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoTooltipTitle, setInfoTooltipTitle] = useState('');

  const [serverError, setServerError] = useState('');

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
          <Route path='/profile' element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element= {<Login />} />
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