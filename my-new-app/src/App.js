// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencySelector from './components/SelectionCurrency';
import Chart from './components/Graph';
import CSVUploader from './components/CsvUpload';
import './App.css'; 

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    // Récupérer les devises disponibles
    axios.get('http://localhost:5000/api/currencies')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);

    // Récupérer les données de la devise choisie
    axios.get(`http://localhost:5000/api/currencies/${currency}`)
      .then((response) => setCurrencyData(response.data))
      .catch((error) => console.error(error));
  };

  const handleUploadSuccess = () => {
    // Mettre à jour la liste des devises après un upload CSV
    axios.get('http://localhost:5000/api/currencies')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Suivi des Cours des Devises</h1>
      </header>
      <main className="app-main">
        <CurrencySelector 
          currencies={currencies} 
          onSelectCurrency={handleSelectCurrency} 
        />
        {selectedCurrency && (
          <Chart 
            data={currencyData} 
            label={selectedCurrency} 
          />
        )}
        <CSVUploader 
          onUploadSuccess={handleUploadSuccess} 
        />
      </main>
      <footer className="app-footer">
        <p>©Thomas Catros, Noé Chabanon, Baptiste Julienne</p>
      </footer>
    </div>
  );
}

export default App;
