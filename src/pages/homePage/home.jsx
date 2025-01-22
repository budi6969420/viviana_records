import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from '../../components/calendar/calendar';
import './index.css';

const Home = () => {
  return (
    <div>
      <div className="main-message">
        <h1>Hey Viviana</h1>
        <p>
          Check out the calendar below to see the highlights I’ve written down for each day :)
        </p>
      </div>
      <Calendar />
      <Link to="/changes" className="changelog-link">View Change Log</Link>
    </div>
  );
};

export default Home;
