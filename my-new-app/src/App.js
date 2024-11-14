// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencySelector from './components/SelectionCurrency';
import Chart from './components/Graph';
import CSVUploader from './components/CsvUpload';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Box,
} from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    // Fetch currencies on mount
    axios
      .get('http://localhost:8000/api/devise')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);
    // Fetch data for the selected currency
    axios
      .get(`http://localhost:8000/api/devise/${currency}`)
      .then((response) => setCurrencyData(response.data))
      .catch((error) => console.error(error));
  };

  const handleUploadSuccess = () => {
    // Refresh currencies after successful CSV upload
    axios
      .get('http://localhost:8000/api/devise')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        minHeight: '100vh',
        backgroundImage: 'url(images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <AppBar position="static" color="primary">
        <Toolbar>
          <CurrencyExchangeIcon fontSize="large" style={{ marginRight: '10px' }} />
          <Typography variant="h6" color="inherit" noWrap>
            Suivi des Cours des Devises
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Sélectionner une Devise
                </Typography>
                <CurrencySelector
                  currencies={currencies}
                  onSelectCurrency={handleSelectCurrency}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            {selectedCurrency && (
              <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Évolution du Taux de Change ({selectedCurrency})
                  </Typography>
                  <Chart data={currencyData} label={selectedCurrency} />
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12}>
            <Card sx={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Charger un Fichier CSV
                </Typography>
                <CSVUploader onUploadSuccess={handleUploadSuccess} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <footer className="app-footer">
        <Typography variant="body2">©Thomas Catros, Noé Chabanon, Baptiste Julienne</Typography>
      </footer>
    </Box>
  );
}

export default App;
