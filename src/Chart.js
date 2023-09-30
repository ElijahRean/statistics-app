import React from 'react';
import { Line } from 'react-chartjs-2';

function Chart({ data }) {
  const chartData = {
    labels: data.map(item => item.dataRep),
    datasets: [
      {
        label: 'Cases',
        data: data.map(item=>item.cases),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill:false,
      },
    ],
  };
  const chartOption = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="chart">
      <Line data={chartData} options={chartOption} />
    </div>
  );
}

export default Chart;