import React, { useEffect } from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/homePage/home';
import DatePage from './pages/datePage/datePage';
import ChangeLogPage from './pages/changeLogsPage/changeLogsPage';

function App() {
  useEffect(() => {
    const images = import.meta.glob('/public/backgrounds/*.{jpg,jpeg,png,gif}');
    const imagePaths = Object.keys(images);

    const randomImagePath = imagePaths[Math.floor(Math.random() * imagePaths.length)];

    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/budi6969420/viviana_records/main${randomImagePath})`;
  }, []);

  return (
    <Router>
      <div
        className="app"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/changes" element={<ChangeLogPage />} />
          <Route path="/:selectedDate" element={<DatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
