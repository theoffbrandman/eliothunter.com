import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="title">
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/" className="back-home-link">
          Go to Home
        </Link>
      </div>
    </div>
  );
}