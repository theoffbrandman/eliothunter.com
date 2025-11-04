import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import logo from "../logo.png";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand: logo + name */}
        <Link to="/" aria-label="Home" className="brand">
          <img className="logo-img" src={logo} alt="Site logo" />
          <span className="brand-name">Eliot Hunter</span>
        </Link>

        {/* Primary nav */}
        <nav className="main-nav" aria-label="Primary">
          <ul>
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/cv">Curriculum Vitae</NavLink></li>
            <li><NavLink to="/martial-arts">Martial Arts</NavLink></li>
            <li><NavLink to="/projects">Projects</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
