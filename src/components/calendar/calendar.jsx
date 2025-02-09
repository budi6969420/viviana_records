import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './index.css';
import dataService from '../../services/dataService';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const navigate = useNavigate();

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
      navigate(formattedDate);
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
    return availableDays.map(d => d.date).includes(formattedDate);
  };

  const isDate = (date) => {
    const formattedDate = formatDate(date);
    return availableDays.some(d => d.date === formattedDate && d.isDate);
  };

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        dateFormat="dd-MM-yyyy"
        filterDate={isAvailable}
        dayClassName={(date) => {
          if (!isAvailable(date)) {
            return 'unavailable-day';
          }
          if (isDate(date)) {
            return 'available-day is-date';
          }
          return 'available-day';
        }}
      />
  </div>

  );
};

export default Calendar;