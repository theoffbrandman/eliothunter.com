import React from 'react';
import './App.css';
import logo from './logo.png';

const Header = () => {
  return (
    <header className="fixed-header">
      <div className="container">
        <nav>
          <ul>
            <li><a href="home.html"><img className="logo" src={logo} alt="logo" /></a></li>
            <li><a href="home.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="more.html">More</a></li>
            <li><a href="contact.html">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;