import React from 'react';

const CurrencySelector = ({ currencies, onSelectCurrency }) => {
  return (
    <div className="currency-selector">
      <h3>Choisir une devise</h3>
      <select 
        className="currency-dropdown" 
        onChange={(e) => onSelectCurrency(e.target.value)}
      >
        <option value="">-- Sélectionner --</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
