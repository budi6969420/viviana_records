import React, { useEffect, useState } from 'react';
import './index.css';

const ChangeLogPage = () => {
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/budi6969420/viviana_records/commits')
      .then(response => response.json())
      .then(data => {
        setCommits(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching commit history:', error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  if (loading) {
    return <div className="loading">Loading commit history...</div>;
  }

  return (
    <div className="changelog-container">
      <h2 className="changelog-title">Change Log</h2>
      <div className="changelog-list">
        {commits.map(commit => (
            <a
            href={commit.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="commit-message">
            <div className="changelog-item" key={commit.sha}>
                <div className="commit-info">
                    {commit.commit.message}
                    <p className="commit-date">
                        {formatDate(commit.commit.author.date)}
                    </p>
                </div>
            </div>
          </a>  
        ))}
      </div>
    </div>
  );
};

export default ChangeLogPage;
