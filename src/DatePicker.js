import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomDatePicker({selectedDate, onChangeData}) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChangeData}
      />
  );
}

export default CustomDatePicker;