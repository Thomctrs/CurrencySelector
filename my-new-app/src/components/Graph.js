import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data, label }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: `Évolution de ${label}`,
        data: data.map((item) => item.value),
        fill: false,
        backgroundColor: '#4bc0c0',
        borderColor: '#36a2eb',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#333',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
        },
      },
      y: {
        ticks: {
          color: '#555',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h3>Graphique des cours pour {label}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
