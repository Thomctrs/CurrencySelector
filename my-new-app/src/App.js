import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrencySelector from './components/SelectionCurrency';
import Chart from './components/Graph';
import CSVUploader from './components/CsvUpload';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Box } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import './App.css';

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencyData, setCurrencyData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/currencies')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSelectCurrency = (currency) => {
    setSelectedCurrency(currency);

    axios.get(`http://localhost:5000/api/currencies/${currency}`)
      .then((response) => setCurrencyData(response.data))
      .catch((error) => console.error(error));
  };

  const handleUploadSuccess = () => {
    axios.get('http://localhost:5000/api/currencies')
      .then((response) => setCurrencies(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
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
            <Card>
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
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Évolution du Taux de Change ({selectedCurrency})
                  </Typography>
                  <Chart 
                    data={currencyData} 
                    label={selectedCurrency} 
                  />
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12}>
            <Card>
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

      <footer style={{ marginTop: '20px', textAlign: 'center', padding: '10px 0', backgroundColor: '#3f51b5', color: '#ffffff' }}>
        <Typography variant="body2">
          ©Thomas Catros, Noé Chabanon, Baptiste Julienne
        </Typography>
      </footer>
    </Box>
  );
}

export default App;
