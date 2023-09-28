import React from 'react';
import { Line } from 'react-chartjs-2';

function Chart({ data }) {
  const chartData = {
    labels: data.map(item.data),
    dataset: [
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
        beginatZero: true,
      },
    },
  };
  return (
    <div className="chart">
      <Line data={chartData} option={chartOption} />
    </div>
  );
}

export default Chart;