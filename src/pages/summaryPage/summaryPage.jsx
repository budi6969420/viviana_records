import React, { useState, useEffect } from 'react';
import dataService from '../../services/dataService';
import './index.css';

const SummaryPage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchAllRecords = async () => {
      const allRecords = (await dataService.getAllAvailableDays()).reverse();
      setRecords(allRecords);
    };

    fetchAllRecords();
  }, []);

  if (!records || records.length === 0) {
    return <div className="loading-message">Loading summary...</div>;
  }

  return (
    <div className="summary-page">
      <h1 className="summary-title">Flashbacks</h1>
      <div className="summary-container">
        {records.map((record) => (
          <div key={record.date} className={`record-card ${record.isDate ? "is-date": ""}`}>
            <h2 className="record-date">{record.date}</h2>
            {record.imageUrl && (
              <img src={record.imageUrl} alt="Event" className="record-image" />
            )}
            <p className="record-description">{record.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;
