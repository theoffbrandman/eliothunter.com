import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';

const Header = () => {
  return (
    <header className="fixed-header">
      <div className="container">
        <nav>
          <ul>
            <li>
              <a href="/home" aria-label="home logo link">
                <img className="logo" src="logo.png" alt="logo" />
              </a>
            </li>
            <li>
              <a href="/home" aria-label="home text link">Home</a>
            </li>
            <li>
              <a href="/contact" aria-label="contact us link">Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;