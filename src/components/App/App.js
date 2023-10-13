import { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {

  // Временая стейт переменная авторизованного пользователя для верстки JSX
  const [isLoggedIn] = useState(false);

  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />

      <Main />
      <Footer />
    </div>
  );
}

export default App; 