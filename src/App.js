import './App.css';
import React, { useState, useEffect } from 'react';
import CustomTabs from './Tabs';
import Table from './Table';
import Chart from './Chart';
import CustomDatePicker from './DatePicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  useEffect(() => {
    fetch('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/')
      .then((response) => response.json())
      .then((data) => {
        setData(data.records);
      })
      .catch((error) => {
        console.error('Error in receiving data: ', error);
      });
  }, []);

  return (
    <div className="App">
      <CustomDatePicker selectedDate={selectedDate} onChangeData={handleDateChange} />
      <CustomTabs selectedTab={selectedTab} onSelectTab={handleTabChange} />
      <div className="data-display">
        {selectedTab === 0 ? <Table selectedDate={selectedDate} data={data} /> : <Chart data={data} />}
      </div>
    </div>
  );
}

export default App;
