import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import DatePage from './pages/datePage/datePage';

function App() {
  useEffect(() => {
    const images = import.meta.glob('/public/backgrounds/*.{jpg,jpeg,png,gif}');
    const imagePaths = Object.keys(images);

    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    document.body.style.backgroundImage = `url(${randomImagePath})`;
  }, []);

  return (
    <Router>
      <div
        className="app"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:selectedDate" element={<DatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
