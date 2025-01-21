import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import dataService from '../../services/dataService';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);

  useEffect(() => {
    const fetchAvailableDays = async () => {
      const days = await dataService.getAllAvailableDays();
      setAvailableDays(days);
    };
    fetchAvailableDays();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = formatDate(date);
      const newUrl = `${window.location.origin}/${formattedDate}`;
      window.location.href = newUrl;
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const isAvailable = (date) => {
    const formattedDate = formatDate(date);
    return availableDays.includes(formattedDate);
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="dd-MM-yyyy"
        filterDate={isAvailable}
        dayClassName={(date) => (isAvailable(date) ? 'available-day' : 'unavailable-day')}
      />
    </div>
  );
};

export default Calendar;