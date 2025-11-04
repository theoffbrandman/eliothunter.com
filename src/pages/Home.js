import React from "react";
import "../App.css";

export default function Home() {
  return (
    <div className="page-root">
      <main className="hero">
        {/* Collage background */}
        <div className="collage">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="tile" />
          ))}
        </div>

        {/* Intro overlay card */}
        <section className="intro-card">
          <h1 className="intro-title">Hello!</h1>
          <p className="intro-text">
            I’m Eliot — an engineer and researcher focused on energy systems,
            thermal management, and the intersection of engineering and policy.
            Explore my projects, CV, and interests in martial arts.
          </p>
        </section>
      </main>
    </div>
  );
}