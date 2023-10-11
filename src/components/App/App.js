import { useState } from 'react';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';

function App() {

  // Временая стейт переменная авторизованного пользователя для верстки JSX
  const [isLoggedIn] = useState(false);

  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />
      <Main />
    </div>
  );
}

export default App; 