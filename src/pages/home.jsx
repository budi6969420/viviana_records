import React from 'react';
import Calendar from '../components/calendar/calendar';

const Home = () => {
  return (
    <div>
        <div className="main-message">
            <h1>Hey Viviana</h1>
                <p>
                    Check out the calendar below to see the highlights I’ve written down for each day :)
                </p>
            </div>
        <Calendar/>
    </div>
  );
};

export default Home;
