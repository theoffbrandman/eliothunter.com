import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Footer = () => {
  return (
    <footer className="fixed-footer">
      <div className="container">
        <section className="ft-legal">
          <ul className="ft-legal-item">
            <li><Link to="/contact">Contact</Link></li>
            <li>&copy; 2021 Copyright BrunoandHunter LLC</li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;