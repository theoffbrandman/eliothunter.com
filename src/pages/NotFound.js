import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page-root notfound-wrap">
      <main className="notfound-main" role="main">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-sub">Page Not Found</p>
        <p className="notfound-desc">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <Link to="/" className="btn-primary notfound-btn">
          Return Home
        </Link>
      </main>
    </div>
  );
}
