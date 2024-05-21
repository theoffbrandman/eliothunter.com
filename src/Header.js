import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from '../eliothunter.com/logo.png"';

const Header = () => {
  return (
    <header className="fixed-header">
      <div className="container">
        <nav>
          <ul>
            <li><Link to="/home"><img className="logo" src={logo} alt="logo" /></Link></li>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;