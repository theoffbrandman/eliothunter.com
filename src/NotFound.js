import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="title">
        <h1>404</h1>
        <p>Page Not Found</p>
        <Link to="/home">Go to Home</Link>
      </div>
    </div>
  );
}

export default NotFound;