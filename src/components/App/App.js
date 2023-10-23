import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

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


function App() {

  // Временая стейт переменная авторизованного пользователя, 
  // для изменения отображения jsx верстки компонента Header
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn}/> } />
        <Route path='/saved-movies' element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn}/>} />
        <Route path='/profile' element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn}/>} />
        <Route path='/signup' element={<Register />} />
        <Route path='/signin' element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App; 