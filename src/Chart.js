import React from 'react';
import { Line } from 'react-chartjs-2';

function Chart({selectedDate}) {

   // Пример настройки: https://reactchartjs.github.io/react-chartjs-2/
// Пример данных и настроек графика
const chartData = {
  labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
  datasets: [
    {
      label: 'Dataset 1',
      data: [10, 20, 30, 40, 50],
      borderColor: 'rgba(75,192,192,1)',
      borderWidth: 2,
    },
    {
      label: 'Dataset 2',
      data: [5, 15, 25, 35, 45],
      borderColor: 'rgba(255,0,0,1)',
      borderWidth: 2,
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


  return (
    <div>
    <Line data={chartData} options={chartOptions} />
  </div>
  // Верните JSX графика с двумя кривыми
  );
}

export default Chart;