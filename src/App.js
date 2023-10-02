import './App.css';
import React, { useState, useEffect } from 'react';
import CustomTabs from './Tabs';
import Table from './Table';
import Chart from './Chart';
import DateRangePicker from './DateRangePicker';

function App() {
  const [dateRange, setDateRange] = useState({ startDate: null, endDate: null });
  const [selectedTab, setSelectedTab] = useState(0);
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('All');

  const handleDateRangeChange = (startDate, endDate) => {
    // Handle changes to the date range here
    // You can filter and calculate data based on the selected date range
    setDateRange({ startDate, endDate });
  };

  const handleTabChange = (index) => {
    setSelectedTab(index);
  };

  const handleCountryChange = (country) => {
    // Handle changes to the selected country here
    setSelectedCountry(country);
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
      <DateRangePicker onSelectDateRange={handleDateRangeChange} />
      <CustomTabs selectedTab={selectedTab} onSelectTab={handleTabChange} />
      <div className="data-display">
        {selectedTab === 0 ? (
          <Table
            data={data}
            dateRange={dateRange}
            selectedCountry={selectedCountry}
            onCountryChange={handleCountryChange}
          />
        ) : (
          <Chart data={data} dateRange={dateRange} />
        )}
      </div>
    </div>
  );
}

export default App;
