import { useState } from 'react';
import './App.css';

import Header from '../Header/Header';

function App() {

  // Временая стейт переменная авторизованного пользователя для верстки JSX
  const [isLoggedIn] = useState(true);

  return (
    <div className="wrapper">
      <Header isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default App; 