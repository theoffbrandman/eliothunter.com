import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <nav className="footer-nav" aria-label="Footer">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cv">Curriculum Vitae</Link></li>
            <li><Link to="/martial-arts">Martial Arts</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* Optional: quick link to test your Not Found route */}
            {/* <li className="footer-aux"><Link to="/404">404</Link></li> */}
          </ul>
        </nav>
        {/* <small>© {new Date().getFullYear()} BrunoandHunter LLC</small> */}
      </div>
    </footer>
  );
}