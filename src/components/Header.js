import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import logo from "../logo.png";

export default function Header() {
  return (
    <header className="fixed-header">
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/" aria-label="home logo link">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </li>
            <li>
              <Link to="/home" aria-label="home text link">Home</Link>
            </li>
            <li>
              <Link to="/contact" aria-label="contact us link">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}