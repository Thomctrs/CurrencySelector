import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrement des composants nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data, label }) => {
  const chartData = {
    labels: data.map((item) => item.date), // Les dates pour l'axe des X
    datasets: [
      {
        label: `Évolution de ${label}`,
        data: data.map((item) => item.value), // Les valeurs pour l'axe des Y
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
          color: '#333', // Couleur des labels de la légende
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555', // Couleur des ticks de l'axe des X
        },
      },
      y: {
        ticks: {
          color: '#555', // Couleur des ticks de l'axe des Y
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
