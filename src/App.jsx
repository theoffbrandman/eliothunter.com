import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CV from "./pages/CV";
import MartialArts from "./pages/MartialArts";
import Projects from "./pages/Projects";
import Thesis from "./pages/Thesis";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import VideoLibrary from "./pages/VideoLibrary";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="page-root">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cv" element={<CV />} />
          <Route path="/martial-arts" element={<MartialArts />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/thesis" element={<Thesis />} />
          <Route path="/projects/thesis" element={<Navigate to="/thesis" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/videos/6f3a91c8d247b5e0" element={<VideoLibrary />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;