import React from 'react';
import './spinner.css';

export const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="lds-dual-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

