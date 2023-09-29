import React, { useState, useEffect} from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://opendata.ecdc.europa.eu/covid19/casedistribution/json/')
    .then(response => response.json())
    .then(data => {
      setData(data);
    })
    .catch(error => {
      console.error('Error in receiving data: ', error);
    });
  });
  return (
    <div className="App">
      <h1>COVID-19 Data</h1>
      <u1>
        {data.map((record, index) => (
          <li key={index}>{record.countriesAndTerritories}</li>
        ))}
      </u1>
    </div>
  );
}