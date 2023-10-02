import React, { useState } from 'react';

function DateRangePicker({ onSelectDateRange }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleApplyClick = () => {
    if (startDate && endDate) {
      // Call the callback function to pass the selected date range
      onSelectDateRange(startDate, endDate);
    }
  };

  return (
    <div className="date-range-picker">
      <label>Date From:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleStartDateChange(e.target.value)}
      />
      <label>To Date:</label>
      <input
        type="date"
        value={endDate}
        onChange={(e) => handleEndDateChange(e.target.value)}
      />
      <button onClick={handleApplyClick}>Confirm</button>
    </div>
  );
}

export default DateRangePicker;
