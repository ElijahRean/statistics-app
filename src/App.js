
import './App.css';
import React, { useState } from 'react';
import CustomTabs from './Tabs';
import Table from './Table';
import Chart from './Chart';
import CustomDatePicker from './DatePicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(mnull);
  const [selectedTab, setSelectedTab] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className="App">
      <CustomDatePicker selectedDate={selectedDate} onChangeData={handleDateChange} />
      <CustomTabs selectedTab={selectedTab} onSelectTab={handleTabChange} />
      {selectedTab === 0 ? <Table selectedDate={selectedDate} /> : <Chart selectedDate= {selectedDate} />}
    </div>
  );
  
}

export default App;
