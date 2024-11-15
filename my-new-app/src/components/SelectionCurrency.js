import React from 'react';

const CurrencySelector = ({ currencies, onSelectCurrency }) => {
  // Extraire uniquement les devises (par exemple "SEK" ou "GBP")
  const uniqueCurrencies = [...new Set(currencies.map((item) => item.pair.split('_')[0]))];

  return (
    <div className="currency-selector">
      <h3>Choisir une devise</h3>
      <select 
        className="currency-dropdown" 
        onChange={(e) => onSelectCurrency(e.target.value)}
      >
        <option value="">-- Sélectionner --</option>
        {uniqueCurrencies.map((currency, index) => (
          <option key={`${currency}-${index}`} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
