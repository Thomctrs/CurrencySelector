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

// Enregistrement des composants nécessaires pour Chart.js
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
  // Vérifiez si des données sont disponibles
  if (!data || data.length === 0) {
    return <p>Pas de données disponibles pour la devise sélectionnée.</p>;
  }

  // Fonction pour calculer la tendance
  const calculateTrendline = (data) => {
    const n = data.length;
    if (n === 0) return [];

    const sumX = data.reduce((sum, _, i) => sum + i, 0);
    const sumY = data.reduce((sum, item) => sum + item.ratio, 0);
    const sumXY = data.reduce((sum, item, i) => sum + i * item.ratio, 0);
    const sumX2 = data.reduce((sum, _, i) => sum + i * i, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return data.map((_, i) => slope * i + intercept);
  };

  const trendlineData = calculateTrendline(data);

  // Données du graphique
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
        {
            label: 'Tendance',
            data: trendlineData,
            fill: false,
            borderColor: '#ff6384',
            borderDash: [10, 5], // Ligne pointillée
            pointRadius: 0, // Pas de points pour la tendance
            tension: 0, // Ligne droite
          },
      {
        label: `Évolution de ${label}`,
        data: data.map((item) => item.ratio),
        fill: false,
        backgroundColor: '#4bc0c0',
        pointRadius: 0,
        borderColor: '#36a2eb',
        tension: 0.1, // Ligne légèrement arrondie
      },
      
    ],
  };

  // Options du graphique
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
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
        grid: {
          drawBorder: false,
          color: '#e5e5e5',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
