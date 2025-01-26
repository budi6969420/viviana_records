import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import dataService from '../../services/dataService';
import './index.css';
import Loader from '../../components/loader/loader';

const DatePage = () => {
  const { selectedDate } = useParams();
  const [record, setRecord] = useState(null);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [summaryData, setSummaryData] = useState([]);
  const [isSummaryLoaded, setIsSummaryLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const navigate = useNavigate();

  const getAdjacentDate = (dateStr, offset) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + offset);

    const newDay = date.getDate().toString().padStart(2, '0');
    const newMonth = (date.getMonth() + 1).toString().padStart(2, '0');
    const newYear = date.getFullYear();

    return `${newDay}-${newMonth}-${newYear}`;
  };

  useEffect(() => {
    const fetchRecord = async () => {
      const data = await dataService.getRecordByDate(selectedDate);
      setRecord(data);

      const previousDate = await dataService.getRecordByDate(getAdjacentDate(selectedDate, -1));
      const nextDate = await dataService.getRecordByDate(getAdjacentDate(selectedDate, 1));

      setHasPrevious(!!previousDate);
      setHasNext(!!nextDate);
    };
    fetchRecord();
  }, [selectedDate]);

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  };

  const handleClickOutsideImage = (event) => {
    if (!event.target.closest('.event-image') && isImageZoomed) {
      setIsImageZoomed(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideImage);
    return () => {
      document.removeEventListener('click', handleClickOutsideImage);
    };
  }, [isImageZoomed]);

  const fetchSummaryData = async () => {
    setIsLoading(true); // Set loading to true when fetching starts
    const formData = new FormData();
    const fileResponse = await fetch('https://cdn.budidev.de/75357');
    const fileBlob = await fileResponse.blob();
    formData.append('file', fileBlob, 'file.zip');

    const response = await fetch(`https://vibe.budidev.de/DayContent?fromDate=${selectedDate}&dayCount=1`, {
      method: 'POST',
      body: formData,
    });

    const data = (await response.json()).analysisData;
    if (Array.isArray(data)) {
      setSummaryData(data);
      setIsSummaryLoaded(true);
    }

    setIsLoading(false); // Set loading to false once the fetch is complete
  };

  const handleNavigate = (offset) => {
    const newDate = getAdjacentDate(selectedDate, offset);
    navigate(`/${newDate}`);
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);

    const dayInt = date.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const dayNames = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday'
    ];

    const getDaySuffix = (day) => {
      if (day >= 11 && day <= 13) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const suffix = getDaySuffix(dayInt);
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[month - 1];

    return `${dayName}, ${dayInt}${suffix} of ${monthName} ${year}`;
  };

  if (!record) return <div>Loading...</div>;

  const { date, description, imageUrl } = record;

  return (
    <div className="date-page-container">
      {isLoading && (
        <Loader text={"Loading..."}/>
      )}

      {!isSummaryLoaded && !isLoading && (
        <button className="load-data-button" onClick={fetchSummaryData}>
          Load Events based on Whatsapp Chat
        </button>
      )}
    
      <h2 className="formatted-date">{formatDate(date)}</h2>

      {isSummaryLoaded ? (
        <div className="summary-container">
          <h3>Summary:</h3>
          <ul className="summary-list">
            {summaryData.map((item, index) => (
              <li key={index} className="summary-item">{item}</li>
            ))}
          </ul>
        </div>
      ) : (
        !isLoading && (
          <div className="main-message">
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Event"
                className={`event-image ${isImageZoomed ? 'zoomed' : ''}`}
                onClick={handleImageClick}
              />
            )}
            <p className="description">{description}</p>
          </div>
        )
      )}

      <div className="navigation-buttons">
        {hasPrevious && (
          <button className="nav-button prev-button" onClick={() => handleNavigate(-1)}>
            &lt;
          </button>
        )}
        <button className="back-button" onClick={() => navigate('/')}>
          Back
        </button>
        {hasNext && (
          <button className="nav-button next-button" onClick={() => handleNavigate(1)}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default DatePage;
