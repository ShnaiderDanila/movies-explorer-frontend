import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';


function App() {

  // Временая стейт переменная авторизованного пользователя, 
  // для изменения отображения jsx верстки компонента Header
  const [isLoggedIn] = useState(false);

  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/movies' element={<Movies/>} />
        <Route path='/saved-movies' element={<SavedMovies/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App; 