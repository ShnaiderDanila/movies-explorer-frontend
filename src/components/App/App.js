import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import NotFound from '../NotFound/NotFound';


function App() {

  // Временая стейт переменная авторизованного пользователя, 
  // для изменения отображения jsx верстки компонента Header
  const [isLoggedIn] = useState(true);

  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App; 