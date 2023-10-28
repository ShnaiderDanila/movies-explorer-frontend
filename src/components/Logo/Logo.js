import { Link } from 'react-router-dom';

import './Logo.css';

import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to='/' className='logo-link'><img src={logo} className="logo" alt="Логотип Movies Explorer" /></Link>
  );
}

export default Logo; 