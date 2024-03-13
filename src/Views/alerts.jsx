import React from 'react';
import './css/alerts.css';

const Alerts = ({ message, onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alerts;


